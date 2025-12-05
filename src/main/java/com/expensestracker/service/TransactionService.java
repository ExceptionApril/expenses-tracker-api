package com.expensestracker.service;

import com.expensestracker.dto.request.TransactionRequest;
import com.expensestracker.dto.response.TransactionResponse;
import com.expensestracker.model.*;
import com.expensestracker.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    
    private static final Logger log = LoggerFactory.getLogger(TransactionService.class);
    
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;
    
    public TransactionService(TransactionRepository transactionRepository, 
                            AccountRepository accountRepository,
                            CategoryRepository categoryRepository, 
                            UserService userService) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }
    
    @Transactional
    public TransactionResponse addTransaction(Long userId, TransactionRequest request) {
        log.info("Adding transaction for user: {}", userId);
        
        User user = userService.getUserById(userId);
        
        Account account = accountRepository.findByAccountIdAndUser_UserId(
                request.getAccountId(), userId)
                .orElseThrow(() -> new RuntimeException("Account not found or access denied"));
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Transaction transaction = Transaction.builder()
                .user(user)
                .account(account)
                .category(category)
                .amount(request.getAmount())
                .transactionType(Transaction.TransactionType.valueOf(request.getTransactionType()))
                .description(request.getDescription())
                .transactionDate(request.getTransactionDate())
                .build();
        
        if (transaction.getTransactionType() == Transaction.TransactionType.INCOME) {
            account.setBalance(account.getBalance().add(request.getAmount()));
            log.info("Account balance increased by: {}", request.getAmount());
        } else {
            account.setBalance(account.getBalance().subtract(request.getAmount()));
            log.info("Account balance decreased by: {}", request.getAmount());
        }
        
        accountRepository.save(account);
        Transaction savedTransaction = transactionRepository.save(transaction);
        
        log.info("Transaction created with ID: {}", savedTransaction.getTransactionId());
        
        return mapToResponse(savedTransaction);
    }
    
    @Transactional(readOnly = true)
    public List<TransactionResponse> getUserTransactions(Long userId) {
        return transactionRepository.findByUser_UserIdOrderByTransactionDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TransactionResponse getTransactionById(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        
        return mapToResponse(transaction);
    }
    
    @Transactional
    public void deleteTransaction(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        
        Account account = transaction.getAccount();
        if (transaction.getTransactionType() == Transaction.TransactionType.INCOME) {
            account.setBalance(account.getBalance().subtract(transaction.getAmount()));
        } else {
            account.setBalance(account.getBalance().add(transaction.getAmount()));
        }
        
        accountRepository.save(account);
        transactionRepository.delete(transaction);
        
        log.info("Transaction deleted: {}", transactionId);
    }
    
    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .transactionId(transaction.getTransactionId())
                .accountName(transaction.getAccount().getAccountName())
                .categoryName(transaction.getCategory().getCategoryName())
                .categoryType(transaction.getCategory().getCategoryType().name())
                .amount(transaction.getAmount())
                .transactionType(transaction.getTransactionType().name())
                .description(transaction.getDescription())
                .transactionDate(transaction.getTransactionDate())
                .build();
    }
}