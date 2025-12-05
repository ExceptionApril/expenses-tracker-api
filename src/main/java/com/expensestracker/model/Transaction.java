package com.expensestracker.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transaction")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;// wala 
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false, length = 20)
    private TransactionType transactionType;
    
    @Column(length = 500)
    private String description;
    
    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "budget_id")
    private Budget budget;
    
    public enum TransactionType {
        INCOME,
        EXPENSE
    }
    
    // Constructors
    public Transaction() {
    }
    
    public Transaction(Long transactionId, User user, Account account, Category category, 
                      BigDecimal amount, TransactionType transactionType, String description, 
                      LocalDate transactionDate, Budget budget) {
        this.transactionId = transactionId;
        this.user = user;
        this.account = account;
        this.category = category;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
        this.budget = budget;
    }
    
    // Builder
    public static TransactionBuilder builder() {
        return new TransactionBuilder();
    }
    
    public static class TransactionBuilder {
        private Long transactionId;
        private User user;
        private Account account;
        private Category category;
        private BigDecimal amount;
        private TransactionType transactionType;
        private String description;
        private LocalDate transactionDate;
        private Budget budget;
        
        public TransactionBuilder transactionId(Long transactionId) {
            this.transactionId = transactionId;
            return this;
        }
        
        public TransactionBuilder user(User user) {
            this.user = user;
            return this;
        }
        
        public TransactionBuilder account(Account account) {
            this.account = account;
            return this;
        }
        
        public TransactionBuilder category(Category category) {
            this.category = category;
            return this;
        }
        
        public TransactionBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }
        
        public TransactionBuilder transactionType(TransactionType transactionType) {
            this.transactionType = transactionType;
            return this;
        }
        
        public TransactionBuilder description(String description) {
            this.description = description;
            return this;
        }
        
        public TransactionBuilder transactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
            return this;
        }
        
        public TransactionBuilder budget(Budget budget) {
            this.budget = budget;
            return this;
        }
        
        public Transaction build() {
            return new Transaction(transactionId, user, account, category, amount, 
                                 transactionType, description, transactionDate, budget);
        }
    }
    
    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Account getAccount() {
        return account;
    }
    
    public void setAccount(Account account) {
        this.account = account;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public TransactionType getTransactionType() {
        return transactionType;
    }
    
    public void setTransactionType(TransactionType transactionType) {
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
    
    public Budget getBudget() {
        return budget;
    }
    
    public void setBudget(Budget budget) {
        this.budget = budget;
    }
}