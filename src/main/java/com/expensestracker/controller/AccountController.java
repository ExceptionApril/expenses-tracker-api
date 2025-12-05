package com.expensestracker.controller;

import com.expensestracker.dto.request.AccountRequest;
import com.expensestracker.dto.response.AccountResponse;
import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    
    private final AccountService accountService;
    
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
    
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
