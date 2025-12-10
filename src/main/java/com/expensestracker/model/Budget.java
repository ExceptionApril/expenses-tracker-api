package com.expensestracker.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "budget")
public class Budget {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long budgetId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @Column(name = "amount_limit", nullable = false, precision = 15, scale = 2)
    private BigDecimal amountLimit;
    
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    public Budget() {
    }

    public Budget(Long budgetId, User user, Category category, BigDecimal amountLimit,
                  LocalDate startDate, LocalDate endDate) {
        this.budgetId = budgetId;
        this.user = user;
        this.category = category;
        this.amountLimit = amountLimit;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public BigDecimal getAmountLimit() {
        return amountLimit;
    }

    public void setAmountLimit(BigDecimal amountLimit) {
        this.amountLimit = amountLimit;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public static BudgetBuilder builder() {
        return new BudgetBuilder();
    }

    public static class BudgetBuilder {
        private Long budgetId;
        private User user;
        private Category category;
        private BigDecimal amountLimit;
        private LocalDate startDate;
        private LocalDate endDate;

        public BudgetBuilder budgetId(Long budgetId) {
            this.budgetId = budgetId;
            return this;
        }

        public BudgetBuilder user(User user) {
            this.user = user;
            return this;
        }

        public BudgetBuilder category(Category category) {
            this.category = category;
            return this;
        }

        public BudgetBuilder amountLimit(BigDecimal amountLimit) {
            this.amountLimit = amountLimit;
            return this;
        }

        public BudgetBuilder startDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public BudgetBuilder endDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public Budget build() {
            return new Budget(budgetId, user, category, amountLimit, startDate, endDate);
        }
    }
}