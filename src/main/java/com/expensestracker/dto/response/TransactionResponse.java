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
public class TransactionResponse {
    private Long transactionId;
    private String accountName;
    private String categoryName;
    private String categoryType;
    private BigDecimal amount;
    private String transactionType;
    private String description;
    private LocalDate transactionDate;
}