package com.expensestracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponse {
    private Long transactionId;
    private Long accountId;
    private Long categoryId;
    private String accountName;
    private String categoryName;
    private String categoryType;
    private BigDecimal amount;
    private String transactionType;
    private String description;
    private LocalDate transactionDate;
    
    public TransactionResponse() {
    }
    
    public TransactionResponse(Long transactionId, Long accountId, Long categoryId, String accountName, String categoryName, 
                              String categoryType, BigDecimal amount, String transactionType, 
                              String description, LocalDate transactionDate) {
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.accountName = accountName;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
    }
    
    public static TransactionResponseBuilder builder() {
        return new TransactionResponseBuilder();
    }
    
    public static class TransactionResponseBuilder {
        private Long transactionId;
        private Long accountId;
        private Long categoryId;
        private String accountName;
        private String categoryName;
        private String categoryType;
        private BigDecimal amount;
        private String transactionType;
        private String description;
        private LocalDate transactionDate;
        
        public TransactionResponseBuilder transactionId(Long transactionId) {
            this.transactionId = transactionId;
            return this;
        }
        
        public TransactionResponseBuilder accountId(Long accountId) {
            this.accountId = accountId;
            return this;
        }
        
        public TransactionResponseBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }
        
        public TransactionResponseBuilder accountName(String accountName) {
            this.accountName = accountName;
            return this;
        }
        
        public TransactionResponseBuilder categoryName(String categoryName) {
            this.categoryName = categoryName;
            return this;
        }
        
        public TransactionResponseBuilder categoryType(String categoryType) {
            this.categoryType = categoryType;
            return this;
        }
        
        public TransactionResponseBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }
        
        public TransactionResponseBuilder transactionType(String transactionType) {
            this.transactionType = transactionType;
            return this;
        }
        
        public TransactionResponseBuilder description(String description) {
            this.description = description;
            return this;
        }
        
        public TransactionResponseBuilder transactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
            return this;
        }
        
        public TransactionResponse build() {
            return new TransactionResponse(transactionId, accountId, categoryId, accountName, categoryName, 
                                          categoryType, amount, transactionType, description, transactionDate);
        }
    }
    
    public Long getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    
    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getCategoryType() {
        return categoryType;
    }
    
    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getTransactionType() {
        return transactionType;
    }
    
    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDate getTransactionDate() {
        return transactionDate;
    }
    
    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }
}