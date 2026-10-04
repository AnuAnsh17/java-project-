package com.controller;

import com.entity.Comment;
import com.service.CommentService;
import com.repository.StudentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final StudentRepository studentRepository;

    public CommentController(CommentService commentService, StudentRepository studentRepository) {
        this.commentService = commentService;
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Comment> getAllComments(@RequestParam(required = false) Long postId) {
        if (postId != null) {
            return commentService.getCommentsByPostId(postId);
        }
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentService.getCommentById(id);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(comment);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment, Authentication authentication) {
        comment.setAuthorName(studentRepository.findByEmailIgnoreCase(authentication.getName())
                .map(student -> student.getName()).orElse(authentication.getName()));
        comment.setAuthorEmail(authentication.getName());
        Comment created = commentService.createComment(comment);
        return ResponseEntity
                .created(URI.create("/api/comments/" + created.getId()))
                .body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, Authentication authentication) {
        Comment existing = commentService.getCommentById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        boolean admin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean owner = authentication.getName().equalsIgnoreCase(existing.getAuthorEmail());
        if (!admin && !owner) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only remove your own comments");
        return commentService.deleteComment(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
