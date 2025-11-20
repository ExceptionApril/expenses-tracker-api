package com.expensestracker.controller;

import com.expensestracker.dto.request.TransactionRequest;
import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.dto.response.TransactionResponse;
import com.expensestracker.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TransactionController {
    
    private final TransactionService transactionService;
    
    /**
     * Add a new transaction (income or expense)
     * POST /api/transactions
     */
    @PostMapping
    public ResponseEntity<ApiResponse<TransactionResponse>> addTransaction(
            @RequestHeader("userId") Long userId,
            @Valid @RequestBody TransactionRequest request) {
        try {
            TransactionResponse response = transactionService.addTransaction(userId, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Transaction added successfully", response));
        } catch (RuntimeException e) {
            log.error("Error adding transaction: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Get all transactions for current user
     * GET /api/transactions
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getAllTransactions(
            @RequestHeader("userId") Long userId) {
        try {
            List<TransactionResponse> transactions = transactionService.getUserTransactions(userId);
            return ResponseEntity.ok(ApiResponse.success(transactions));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Get transaction by ID
     * GET /api/transactions/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionResponse>> getTransactionById(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            TransactionResponse transaction = transactionService.getTransactionById(userId, id);
            return ResponseEntity.ok(ApiResponse.success(transaction));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Delete a transaction
     * DELETE /api/transactions/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTransaction(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            transactionService.deleteTransaction(userId, id);
            return ResponseEntity.ok(ApiResponse.success("Transaction deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}