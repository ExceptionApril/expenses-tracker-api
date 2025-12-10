package com.expensestracker.service;

import com.expensestracker.dto.response.ReportResponse;
import com.expensestracker.model.Transaction;
import com.expensestracker.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {
    
    private static final Logger log = LoggerFactory.getLogger(ReportService.class);
    
    private final TransactionRepository transactionRepository;
    
    public ReportService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    
    @Transactional(readOnly = true)
    public ReportResponse generateMonthlyReport(Long userId, LocalDate startDate, LocalDate endDate) {
        log.info("Generating report for user {} from {} to {}", userId, startDate, endDate);
        
        // Get all transactions for the date range
        List<Transaction> transactions = transactionRepository
                .findByAccount_User_UserIdAndTransactionDateBetweenOrderByTransactionDateDesc(userId, startDate, endDate);
        
        // Calculate totals
        BigDecimal totalIncome = transactions.stream()
                .filter(t -> t.getTransactionType() == Transaction.TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalExpenses = transactions.stream()
                .filter(t -> t.getTransactionType() == Transaction.TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal needsSpending = BigDecimal.ZERO;
        BigDecimal wantsSpending = BigDecimal.ZERO;
        
        BigDecimal savingsAmount = BigDecimal.ZERO;
        
        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        
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