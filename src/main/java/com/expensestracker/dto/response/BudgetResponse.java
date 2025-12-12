package com.expensestracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BudgetResponse {
    private Long budgetId;
    private Long categoryId;
    private String categoryName;
    private String categoryType;
    private BigDecimal amountLimit;
    private LocalDate startDate;
    private LocalDate endDate;
    
    public BudgetResponse() {
    }
    
    public BudgetResponse(Long budgetId, Long categoryId, String categoryName, 
                         String categoryType, BigDecimal amountLimit, 
                         LocalDate startDate, LocalDate endDate) {
        this.budgetId = budgetId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.amountLimit = amountLimit;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    public static BudgetResponseBuilder builder() {
        return new BudgetResponseBuilder();
    }
    
    public static class BudgetResponseBuilder {
        private Long budgetId;
        private Long categoryId;
        private String categoryName;
        private String categoryType;
        private BigDecimal amountLimit;
        private LocalDate startDate;
        private LocalDate endDate;
        
        public BudgetResponseBuilder budgetId(Long budgetId) {
            this.budgetId = budgetId;
            return this;
        }
        
        public BudgetResponseBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }
        
        public BudgetResponseBuilder categoryName(String categoryName) {
            this.categoryName = categoryName;
            return this;
        }
        
        public BudgetResponseBuilder categoryType(String categoryType) {
            this.categoryType = categoryType;
            return this;
        }
        
        public BudgetResponseBuilder amountLimit(BigDecimal amountLimit) {
            this.amountLimit = amountLimit;
            return this;
        }
        
        public BudgetResponseBuilder startDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }
        
        public BudgetResponseBuilder endDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }
        
        public BudgetResponse build() {
            return new BudgetResponse(budgetId, categoryId, categoryName, categoryType, 
                                     amountLimit, startDate, endDate);
        }
    }
    
    // Getters and Setters
    public Long getBudgetId() {
        return budgetId;
    }
    
    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
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
}
