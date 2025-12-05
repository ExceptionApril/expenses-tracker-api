package com.expensestracker.service;

import com.expensestracker.dto.request.AccountRequest;
import com.expensestracker.dto.response.AccountResponse;
import com.expensestracker.model.Account;
import com.expensestracker.model.User;
import com.expensestracker.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {
    
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    
    private final AccountRepository accountRepository;
    private final UserService userService;
    
    public AccountService(AccountRepository accountRepository, UserService userService) {
        this.accountRepository = accountRepository;
        this.userService = userService;
    }
    
    @Transactional
    public AccountResponse createAccount(Long userId, AccountRequest request) {
        log.info("Creating account for user: {}", userId);
        
        User user = userService.getUserById(userId);
        
        Account account = Account.builder()
                .user(user)
                .accountName(request.getAccountName())
                .accountType(Account.AccountType.valueOf(request.getAccountType()))
                .balance(request.getBalance())
                .build();
        
        Account savedAccount = accountRepository.save(account);
        log.info("Account created with ID: {}", savedAccount.getAccountId());
        
        return mapToResponse(savedAccount);
    }
    
    @Transactional(readOnly = true)
    public List<AccountResponse> getUserAccounts(Long userId) {
        return accountRepository.findByUser_UserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public AccountResponse getAccountById(Long userId, Long accountId) {
        Account account = accountRepository.findByAccountIdAndUser_UserId(accountId, userId)
                .orElseThrow(() -> new RuntimeException("Account not found or access denied"));
        
        return mapToResponse(account);
    }
    
    @Transactional
    public void deleteAccount(Long userId, Long accountId) {
        Account account = accountRepository.findByAccountIdAndUser_UserId(accountId, userId)
                .orElseThrow(() -> new RuntimeException("Account not found or access denied"));
        
        accountRepository.delete(account);
        log.info("Account deleted: {}", accountId);
    }
    
    private AccountResponse mapToResponse(Account account) {
        return AccountResponse.builder()
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountType(account.getAccountType().name())
                .balance(account.getBalance())
                .createdAt(account.getCreatedAt())
                .build();
    }
}