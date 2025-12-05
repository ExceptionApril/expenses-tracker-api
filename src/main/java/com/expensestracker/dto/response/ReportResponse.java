package com.expensestracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ReportResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netBalance;
    private BigDecimal needsSpending;
    private BigDecimal wantsSpending;
    private BigDecimal savingsAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double needsPercentage;
    private Double wantsPercentage;
    private Double savingsPercentage;
    
    public ReportResponse() {
    }
    
    public ReportResponse(BigDecimal totalIncome, BigDecimal totalExpenses, BigDecimal netBalance,
                         BigDecimal needsSpending, BigDecimal wantsSpending, BigDecimal savingsAmount,
                         LocalDate startDate, LocalDate endDate, Double needsPercentage,
                         Double wantsPercentage, Double savingsPercentage) {
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.netBalance = netBalance;
        this.needsSpending = needsSpending;
        this.wantsSpending = wantsSpending;
        this.savingsAmount = savingsAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.needsPercentage = needsPercentage;
        this.wantsPercentage = wantsPercentage;
        this.savingsPercentage = savingsPercentage;
    }
    
    public static ReportResponseBuilder builder() {
        return new ReportResponseBuilder();
    }
    
    public static class ReportResponseBuilder {
        private BigDecimal totalIncome;
        private BigDecimal totalExpenses;
        private BigDecimal netBalance;
        private BigDecimal needsSpending;
        private BigDecimal wantsSpending;
        private BigDecimal savingsAmount;
        private LocalDate startDate;
        private LocalDate endDate;
        private Double needsPercentage;
        private Double wantsPercentage;
        private Double savingsPercentage;
        
        public ReportResponseBuilder totalIncome(BigDecimal totalIncome) {
            this.totalIncome = totalIncome;
            return this;
        }
        
        public ReportResponseBuilder totalExpenses(BigDecimal totalExpenses) {
            this.totalExpenses = totalExpenses;
            return this;
        }
        
        public ReportResponseBuilder netBalance(BigDecimal netBalance) {
            this.netBalance = netBalance;
            return this;
        }
        
        public ReportResponseBuilder needsSpending(BigDecimal needsSpending) {
            this.needsSpending = needsSpending;
            return this;
        }
        
        public ReportResponseBuilder wantsSpending(BigDecimal wantsSpending) {
            this.wantsSpending = wantsSpending;
            return this;
        }
        
        public ReportResponseBuilder savingsAmount(BigDecimal savingsAmount) {
            this.savingsAmount = savingsAmount;
            return this;
        }
        
        public ReportResponseBuilder startDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }
        
        public ReportResponseBuilder endDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }
        
        public ReportResponseBuilder needsPercentage(Double needsPercentage) {
            this.needsPercentage = needsPercentage;
            return this;
        }
        
        public ReportResponseBuilder wantsPercentage(Double wantsPercentage) {
            this.wantsPercentage = wantsPercentage;
            return this;
        }
        
        public ReportResponseBuilder savingsPercentage(Double savingsPercentage) {
            this.savingsPercentage = savingsPercentage;
            return this;
        }
        
        public ReportResponse build() {
            return new ReportResponse(totalIncome, totalExpenses, netBalance, needsSpending,
                                     wantsSpending, savingsAmount, startDate, endDate,
                                     needsPercentage, wantsPercentage, savingsPercentage);
        }
    }
    
    public BigDecimal getTotalIncome() { return totalIncome; }
    public void setTotalIncome(BigDecimal totalIncome) { this.totalIncome = totalIncome; }
    
    public BigDecimal getTotalExpenses() { return totalExpenses; }
    public void setTotalExpenses(BigDecimal totalExpenses) { this.totalExpenses = totalExpenses; }
    
    public BigDecimal getNetBalance() { return netBalance; }
    public void setNetBalance(BigDecimal netBalance) { this.netBalance = netBalance; }
    
    public BigDecimal getNeedsSpending() { return needsSpending; }
    public void setNeedsSpending(BigDecimal needsSpending) { this.needsSpending = needsSpending; }
    
    public BigDecimal getWantsSpending() { return wantsSpending; }
    public void setWantsSpending(BigDecimal wantsSpending) { this.wantsSpending = wantsSpending; }
    
    public BigDecimal getSavingsAmount() { return savingsAmount; }
    public void setSavingsAmount(BigDecimal savingsAmount) { this.savingsAmount = savingsAmount; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public Double getNeedsPercentage() { return needsPercentage; }
    public void setNeedsPercentage(Double needsPercentage) { this.needsPercentage = needsPercentage; }
    
    public Double getWantsPercentage() { return wantsPercentage; }
    public void setWantsPercentage(Double wantsPercentage) { this.wantsPercentage = wantsPercentage; }
    
    public Double getSavingsPercentage() { return savingsPercentage; }
    public void setSavingsPercentage(Double savingsPercentage) { this.savingsPercentage = savingsPercentage; }
}