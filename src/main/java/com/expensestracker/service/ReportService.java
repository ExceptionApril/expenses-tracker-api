package com.expensestracker.service;

import com.expensestracker.dto.response.ReportResponse;
import com.expensestracker.model.Category;
import com.expensestracker.model.Transaction;
import com.expensestracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {
    
    private final TransactionRepository transactionRepository;
    
    @Transactional(readOnly = true)
    public ReportResponse generateMonthlyReport(Long userId, LocalDate startDate, LocalDate endDate) {
        log.info("Generating report for user {} from {} to {}", userId, startDate, endDate);
        
        // Calculate total income
        BigDecimal totalIncome = transactionRepository
                .sumByUserAndTypeAndDateRange(
                        userId,
                        Transaction.TransactionType.INCOME,
                        startDate,
                        endDate
                );
        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        
        // Calculate total expenses
        BigDecimal totalExpenses = transactionRepository
                .sumByUserAndTypeAndDateRange(
                        userId,
                        Transaction.TransactionType.EXPENSE,
                        startDate,
                        endDate
                );
        if (totalExpenses == null) totalExpenses = BigDecimal.ZERO;
        
        // Calculate spending by category type
        BigDecimal needsSpending = transactionRepository
                .sumByCategoryTypeAndDateRange(
                        userId,
                        Category.CategoryType.NEEDS,
                        startDate,
                        endDate
                );
        if (needsSpending == null) needsSpending = BigDecimal.ZERO;
        
        BigDecimal wantsSpending = transactionRepository
                .sumByCategoryTypeAndDateRange(
                        userId,
                        Category.CategoryType.WANTS,
                        startDate,
                        endDate
                );
        if (wantsSpending == null) wantsSpending = BigDecimal.ZERO;
        
        BigDecimal savingsAmount = transactionRepository
                .sumByCategoryTypeAndDateRange(
                        userId,
                        Category.CategoryType.SAVINGS,
                        startDate,
                        endDate
                );
        if (savingsAmount == null) savingsAmount = BigDecimal.ZERO;
        
        // Calculate net balance
        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        
        // Calculate percentages
        Double needsPercentage = 0.0;
        Double wantsPercentage = 0.0;
        Double savingsPercentage = 0.0;
        
        if (totalExpenses.compareTo(BigDecimal.ZERO) > 0) {
            needsPercentage = needsSpending
                    .divide(totalExpenses, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();
            
            wantsPercentage = wantsSpending
                    .divide(totalExpenses, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();
            
            savingsPercentage = savingsAmount
                    .divide(totalExpenses, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .doubleValue();
        }
        
        return ReportResponse.builder()
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .netBalance(netBalance)
                .needsSpending(needsSpending)
                .wantsSpending(wantsSpending)
                .savingsAmount(savingsAmount)
                .startDate(startDate)
                .endDate(endDate)
                .needsPercentage(needsPercentage)
                .wantsPercentage(wantsPercentage)
                .savingsPercentage(savingsPercentage)
                .build();
    }
}
