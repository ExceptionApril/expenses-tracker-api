package com.expensestracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponse {
    private Long transactionId;
    private String accountName;
    private Long accountId;  // <--- ADDED
    private String categoryName;
    private Long categoryId; // <--- ADDED
    private String categoryType;
    private BigDecimal amount;
    private String transactionType;
    private String description;
    private LocalDate transactionDate;
    
    // New field for priority matching previous steps
    private String priority; 

    public TransactionResponse() {
    }
    
    // Updated Constructor
    public TransactionResponse(Long transactionId, String accountName, Long accountId, 
                               String categoryName, Long categoryId, String categoryType, 
                               BigDecimal amount, String transactionType, String description, 
                               LocalDate transactionDate, String priority) {
        this.transactionId = transactionId;
        this.accountName = accountName;
        this.accountId = accountId;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.categoryType = categoryType;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.priority = priority;
    }
    
    public static TransactionResponseBuilder builder() {
        return new TransactionResponseBuilder();
    }
    
    public static class TransactionResponseBuilder {
        private Long transactionId;
        private String accountName;
        private Long accountId; // Added to Builder
        private String categoryName;
        private Long categoryId; // Added to Builder
        private String categoryType;
        private BigDecimal amount;
        private String transactionType;
        private String description;
        private LocalDate transactionDate;
        private String priority; // Added to Builder
        
        public TransactionResponseBuilder transactionId(Long transactionId) {
            this.transactionId = transactionId;
            return this;
        }
        
        public TransactionResponseBuilder accountName(String accountName) {
            this.accountName = accountName;
            return this;
        }

        public TransactionResponseBuilder accountId(Long accountId) {
            this.accountId = accountId;
            return this;
        }
        
        public TransactionResponseBuilder categoryName(String categoryName) {
            this.categoryName = categoryName;
            return this;
        }

        public TransactionResponseBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
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

        public TransactionResponseBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }
        
        public TransactionResponse build() {
            return new TransactionResponse(transactionId, accountName, accountId, categoryName, 
                                           categoryId, categoryType, amount, transactionType, 
                                           description, transactionDate, priority);
        }
    }
    
    // --- Getters and Setters ---

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}