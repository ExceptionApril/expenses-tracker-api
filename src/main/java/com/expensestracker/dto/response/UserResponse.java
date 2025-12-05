package com.expensestracker.dto.response;

import java.time.LocalDateTime;

public class UserResponse {
    private Long userId;
    private String name;
    private String email;
    private String token;
    private LocalDateTime createdAt;
    
    public UserResponse() {
    }
    
    public UserResponse(Long userId, String name, String email, String token, LocalDateTime createdAt) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.token = token;
        this.createdAt = createdAt;
    }
    
    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }
    
    public static class UserResponseBuilder {
        private Long userId;
        private String name;
        private String email;
        private String token;
        private LocalDateTime createdAt;
        
        public UserResponseBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }
        
        public UserResponseBuilder name(String name) {
            this.name = name;
            return this;
        }
        
        public UserResponseBuilder email(String email) {
            this.email = email;
            return this;
        }
        
        public UserResponseBuilder token(String token) {
            this.token = token;
            return this;
        }
        
        public UserResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }
        
        public UserResponse build() {
            return new UserResponse(userId, name, email, token, createdAt);
        }
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}