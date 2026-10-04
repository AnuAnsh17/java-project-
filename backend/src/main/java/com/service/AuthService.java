package com.service;

import com.dto.AuthRequest;
import com.dto.AuthResponse;
import com.dto.RegisterRequest;
import com.entity.Student;
import com.repository.StudentRepository;
import com.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Service
public class AuthService {
    private final StudentRepository students;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(StudentRepository students, PasswordEncoder passwordEncoder, JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.students = students;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (!email.endsWith("@tsdcem.ac.in")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Use your @tsdcem.ac.in college email");
        }
        if (students.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
        }
        Student student = new Student();
        student.setName(request.name().trim());
        student.setEmail(email);
        student.setPasswordHash(passwordEncoder.encode(request.password()));
        student.setRole("STUDENT");
        student.setDepartment(request.department());
        student.setYear(request.year());
        student.setDivision(request.division());
        return response(students.save(student));
    }

    public AuthResponse login(AuthRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, request.password()));
        } catch (AuthenticationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        Student student = students.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return response(student);
    }

    private AuthResponse response(Student student) {
        return new AuthResponse(jwtService.issue(student), "Bearer", jwtService.getExpirationMillis(),
                new AuthResponse.UserSummary(student.getId(), student.getName(), student.getEmail(),
                        student.getRole(), student.getDepartment(), student.getYear(), student.getDivision()));
    }
}
