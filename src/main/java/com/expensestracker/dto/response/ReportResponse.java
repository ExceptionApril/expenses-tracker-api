package com.expensestracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}