package com.expensestracker.controller;

import com.expensestracker.dto.request.AccountRequest;
import com.expensestracker.dto.response.AccountResponse;
import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AccountController {
    
    private final AccountService accountService;
    
    /**
     * Create a new account
     * POST /api/accounts
     * Header: userId (temporary, will be extracted from JWT later)
     */
    @PostMapping
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(
            @RequestHeader("userId") Long userId,
            @Valid @RequestBody AccountRequest request) {
        try {
            AccountResponse response = accountService.createAccount(userId, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Account created successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Get all accounts for current user
     * GET /api/accounts
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAllAccounts(
            @RequestHeader("userId") Long userId) {
        try {
            List<AccountResponse> accounts = accountService.getUserAccounts(userId);
            return ResponseEntity.ok(ApiResponse.success(accounts));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Get account by ID
     * GET /api/accounts/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccountById(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            AccountResponse account = accountService.getAccountById(userId, id);
            return ResponseEntity.ok(ApiResponse.success(account));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Delete account
     * DELETE /api/accounts/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            accountService.deleteAccount(userId, id);
            return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
