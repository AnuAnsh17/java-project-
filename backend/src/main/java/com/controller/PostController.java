package com.controller;

import com.entity.Post;
import com.service.PostService;
import com.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final StudentRepository studentRepository;

    public PostController(PostService postService, StudentRepository studentRepository) {
        this.postService = postService;
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post, Authentication authentication) {
        post.setAuthorName(studentRepository.findByEmailIgnoreCase(authentication.getName())
                .map(student -> student.getName()).orElse(authentication.getName()));
        post.setAuthorEmail(authentication.getName());
        Post created = postService.createPost(post);
        return ResponseEntity
                .created(URI.create("/api/posts/" + created.getId()))
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @Valid @RequestBody Post post, Authentication authentication) {
        Post existing = postService.getPostById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        requireOwnerOrAdmin(existing.getAuthorEmail(), authentication);
        post.setAuthorName(existing.getAuthorName());
        Post updated = postService.updatePost(id, post);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<Post> votePost(@PathVariable Long id, @RequestParam(defaultValue = "1") int delta) {
        Post updated = postService.votePost(id, delta);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, Authentication authentication) {
        Post existing = postService.getPostById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        requireOwnerOrAdmin(existing.getAuthorEmail(), authentication);
        return postService.deletePost(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    private void requireOwnerOrAdmin(String authorEmail, Authentication authentication) {
        boolean admin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        boolean owner = authentication.getName().equalsIgnoreCase(authorEmail);
        if (!admin && !owner) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only manage your own posts");
    }
}
