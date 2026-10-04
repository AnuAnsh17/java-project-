package com.dto;

public record AuthResponse(String token, String tokenType, long expiresIn, UserSummary user) {
    public record UserSummary(Long id, String name, String email, String role,
                              String department, String year, String division) { }
}
