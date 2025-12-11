package com.expensestracker.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TransactionRequest {
    
    @NotNull(message = "Account ID is required")
    private Long accountId;
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;
    
    // ✅ CORRECT: No @NotBlank here. 
    // This allows the Service to derive it from the Category.
    private String transactionType;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotNull(message = "Transaction date is required")
    private LocalDate transactionDate;

    // ✅ CORRECT: Field exists to capture priority from frontend
    private String priority; 
    
    public TransactionRequest() {
    }
    
    public TransactionRequest(Long accountId, Long categoryId, BigDecimal amount, 
                            String transactionType, String description, LocalDate transactionDate, String priority) {
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.priority = priority;
    }
    
    // Getters and Setters match perfectly
    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDate getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}