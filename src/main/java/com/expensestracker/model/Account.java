package com.expensestracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "account")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;
    
    @Column(name = "account_name", nullable = false, length = 100)
    private String accountName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false, length = 50)
    private AccountType accountType;
    
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Transaction> transactions = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (balance == null) balance = BigDecimal.ZERO;
    }
    
    public enum AccountType {
        CASH,
        BANK,
        GCASH,
        WALLET,
        SAVINGS
    }
}