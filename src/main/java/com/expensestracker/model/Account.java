package com.expensestracker.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "account")
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "account_name", nullable = false, length = 100)
    private String accountName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false, length = 50)
    private AccountType accountType;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;

    // --- NEW FIELDS START ---
    @Column(length = 20)
    private String color;

    @Column(name = "card_number", length = 20)
    private String cardNumber;

    @Column(name = "card_holder", length = 100)
    private String cardHolder;

    @Column(name = "expiry_date", length = 10)
    private String expiryDate;
    // --- NEW FIELDS END ---
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (balance == null) balance = BigDecimal.ZERO;
    }

    public Account() {
    }

    public Account(Long accountId, User user, String accountName, AccountType accountType,
                   BigDecimal balance, String color, String cardNumber, String cardHolder, String expiryDate,
                   LocalDateTime createdAt, List<Transaction> transactions) {
        this.accountId = accountId;
        this.user = user;
        this.accountName = accountName;
        this.accountType = accountType;
        this.balance = balance;
        this.color = color;
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expiryDate = expiryDate;
        this.createdAt = createdAt;
        this.transactions = transactions;
    }

    // --- GETTERS AND SETTERS ---
    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getAccountName() { return accountName; }
    public void setAccountName(String accountName) { this.accountName = accountName; }

    public AccountType getAccountType() { return accountType; }
    public void setAccountType(AccountType accountType) { this.accountType = accountType; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getCardHolder() { return cardHolder; }
    public void setCardHolder(String cardHolder) { this.cardHolder = cardHolder; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }

    // --- BUILDER (Important for Service) ---
    public static AccountBuilder builder() {
        return new AccountBuilder();
    }

    public static class AccountBuilder {
        private Long accountId;
        private User user;
        private String accountName;
        private AccountType accountType;
        private BigDecimal balance = BigDecimal.ZERO;
        private String color;
        private String cardNumber;
        private String cardHolder;
        private String expiryDate;
        private LocalDateTime createdAt;
        private List<Transaction> transactions = new ArrayList<>();

        public AccountBuilder accountId(Long accountId) { this.accountId = accountId; return this; }
        public AccountBuilder user(User user) { this.user = user; return this; }
        public AccountBuilder accountName(String accountName) { this.accountName = accountName; return this; }
        public AccountBuilder accountType(AccountType accountType) { this.accountType = accountType; return this; }
        public AccountBuilder balance(BigDecimal balance) { this.balance = balance; return this; }
        public AccountBuilder color(String color) { this.color = color; return this; }
        public AccountBuilder cardNumber(String cardNumber) { this.cardNumber = cardNumber; return this; }
        public AccountBuilder cardHolder(String cardHolder) { this.cardHolder = cardHolder; return this; }
        public AccountBuilder expiryDate(String expiryDate) { this.expiryDate = expiryDate; return this; }
        public AccountBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public AccountBuilder transactions(List<Transaction> transactions) { this.transactions = transactions; return this; }

        public Account build() {
            return new Account(accountId, user, accountName, accountType, balance, color, cardNumber, cardHolder, expiryDate, createdAt, transactions);
        }
    }
    
    public enum AccountType {
        BANK_ACCOUNT, CASH, BANK, GCASH, WALLET, SAVINGS
    }
}