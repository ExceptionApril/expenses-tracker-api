package com.expensestracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AccountResponse {
    private Long accountId;
    private String accountName;
    private String accountType;
    private BigDecimal balance;
    private LocalDateTime createdAt;
    
    public AccountResponse() {
    }
    
    public AccountResponse(Long accountId, String accountName, String accountType, 
                          BigDecimal balance, LocalDateTime createdAt) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountType = accountType;
        this.balance = balance;
        this.createdAt = createdAt;
    }
    
    public static AccountResponseBuilder builder() {
        return new AccountResponseBuilder();
    }
    
    public static class AccountResponseBuilder {
        private Long accountId;
        private String accountName;
        private String accountType;
        private BigDecimal balance;
        private LocalDateTime createdAt;
        
        public AccountResponseBuilder accountId(Long accountId) {
            this.accountId = accountId;
            return this;
        }
        
        public AccountResponseBuilder accountName(String accountName) {
            this.accountName = accountName;
            return this;
        }
        
        public AccountResponseBuilder accountType(String accountType) {
            this.accountType = accountType;
            return this;
        }
        
        public AccountResponseBuilder balance(BigDecimal balance) {
            this.balance = balance;
            return this;
        }
        
        public AccountResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }
        
        public AccountResponse build() {
            return new AccountResponse(accountId, accountName, accountType, balance, createdAt);
        }
    }
    
    public Long getAccountId() {
        return accountId;
    }
    
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
    
    public String getAccountName() {
        return accountName;
    }
    
    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
    
    public String getAccountType() {
        return accountType;
    }
    
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
    
    public BigDecimal getBalance() {
        return balance;
    }
    
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}