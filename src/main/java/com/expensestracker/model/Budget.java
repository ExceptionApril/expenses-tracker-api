package com.expensestracker.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "budget")
public class Budget {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long budgetId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //
    
    // Goal removed: budgets are no longer linked to Goal
    
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;
    
    @Column(name = "deadline_date")
    private LocalDate deadlineDate;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private BudgetStatus status;
    
    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();//
    
    public enum BudgetStatus {
        ACTIVE,
        COMPLETED,
        EXPIRED
    }
    
    public Budget() {
    }
    
    public Long getBudgetId() {
        return budgetId;
    }
    
    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    // Goal association removed; getters/setters deleted
    
    public BigDecimal getTargetAmount() {
        return targetAmount;
    }
    
    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }
    
    public LocalDate getDeadlineDate() {
        return deadlineDate;
    }
    
    public void setDeadlineDate(LocalDate deadlineDate) {
        this.deadlineDate = deadlineDate;
    }
    
    public BudgetStatus getStatus() {
        return status;
    }
    
    public void setStatus(BudgetStatus status) {
        this.status = status;
    }
    
    public List<Transaction> getTransactions() {
        return transactions;
    }
    
    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
    
    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = BudgetStatus.ACTIVE;
        }
    }
}