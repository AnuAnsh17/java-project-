package com.security;

import com.repository.StudentRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsService implements UserDetailsService {
    private final StudentRepository students;

    public StudentDetailsService(StudentRepository students) { this.students = students; }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var student = students.findByEmailIgnoreCase(email)
                .filter(account -> account.getPasswordHash() != null)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));
        return User.withUsername(student.getEmail())
                .password(student.getPasswordHash())
                .authorities("ROLE_" + student.getRole())
                .build();
    }
}
