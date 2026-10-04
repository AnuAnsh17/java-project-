package com.controller;

import com.entity.Notice;
import com.service.NoticeService;
import com.repository.StudentRepository;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;
    private final StudentRepository studentRepository;

    public NoticeController(NoticeService noticeService, StudentRepository studentRepository) {
        this.noticeService = noticeService;
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) {
        Notice notice = noticeService.getNoticeById(id);
        if (notice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(notice);
    }

    @PostMapping
    public ResponseEntity<Notice> createNotice(@Valid @RequestBody Notice notice, Authentication authentication) {
        notice.setAuthor(studentRepository.findByEmailIgnoreCase(authentication.getName())
                .map(student -> student.getName()).orElse(authentication.getName()));
        Notice created = noticeService.createNotice(notice);
        return ResponseEntity
                .created(URI.create("/api/notices/" + created.getId()))
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(@PathVariable Long id, @Valid @RequestBody Notice notice) {
        Notice updated = noticeService.updateNotice(id, notice);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        return noticeService.deleteNotice(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
