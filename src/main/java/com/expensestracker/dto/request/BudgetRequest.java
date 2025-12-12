package com.expensestracker.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class BudgetRequest {
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    @NotNull(message = "Amount limit is required")
    @DecimalMin(value = "0.01", message = "Amount limit must be greater than 0")
    private BigDecimal amountLimit;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
    
    public BudgetRequest() {
    }
    
    public BudgetRequest(Long categoryId, BigDecimal amountLimit, 
                        LocalDate startDate, LocalDate endDate) {
        this.categoryId = categoryId;
        this.amountLimit = amountLimit;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    public Long getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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
