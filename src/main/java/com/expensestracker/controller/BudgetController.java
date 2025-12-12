package com.expensestracker.controller;

import com.expensestracker.dto.request.BudgetRequest;
import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.dto.response.BudgetResponse;
import com.expensestracker.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
public class BudgetController {
    
    private final BudgetService budgetService;
    
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<BudgetResponse>> createBudget(
            @RequestHeader("userId") Long userId,
            @Valid @RequestBody BudgetRequest request) {
        try {
            BudgetResponse response = budgetService.createBudget(userId, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Budget created successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<BudgetResponse>>> getAllBudgets(
            @RequestHeader("userId") Long userId) {
        try {
            List<BudgetResponse> budgets = budgetService.getUserBudgets(userId);
            return ResponseEntity.ok(ApiResponse.success(budgets));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BudgetResponse>> getBudgetById(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            BudgetResponse budget = budgetService.getBudgetById(userId, id);
            return ResponseEntity.ok(ApiResponse.success(budget));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BudgetResponse>> updateBudget(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequest request) {
        try {
            BudgetResponse response = budgetService.updateBudget(userId, id, request);
            return ResponseEntity.ok(ApiResponse.success("Budget updated successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBudget(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            budgetService.deleteBudget(userId, id);
            return ResponseEntity.ok(ApiResponse.success("Budget deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
