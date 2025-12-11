package com.expensestracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.expensestracker.dto.request.TransactionRequest;
import com.expensestracker.dto.response.TransactionResponse;
import com.expensestracker.model.Account;
import com.expensestracker.model.Category;
import com.expensestracker.model.Transaction;
import com.expensestracker.repository.AccountRepository;
import com.expensestracker.repository.CategoryRepository;
import com.expensestracker.repository.TransactionRepository;

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
        
        // 1. Validate Account
        Account account = accountRepository.findByAccountIdAndUser_UserId(
                request.getAccountId(), userId)
                .orElseThrow(() -> new RuntimeException("Account not found or access denied"));
        
        // 2. Validate Category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        // 3. Create Transaction
        // FIX 1: Set Transaction Type automatically from the Category
        // FIX 2: Save the priority from the request
        Transaction transaction = Transaction.builder()
                .account(account)
                .category(category)
                .amount(request.getAmount())
                .description(request.getDescription())
                .transactionDate(request.getTransactionDate())
                .transactionType(Transaction.TransactionType.valueOf(category.getType().name())) 
                .priority(request.getPriority())
                .build();
        
        // 4. Update Account Balance based on CATEGORY Type
        if (category.getType() == Category.CategoryType.INCOME) {
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
        return transactionRepository.findByAccount_User_UserIdOrderByTransactionDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TransactionResponse getTransactionById(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        // Check ownership via Account -> User
        if (!transaction.getAccount().getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        
        return mapToResponse(transaction);
    }
    
    @Transactional
    public void deleteTransaction(Long userId, Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getAccount().getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        
        Account account = transaction.getAccount();
        // Revert balance using Category Type
        if (transaction.getCategory().getType() == Category.CategoryType.INCOME) {
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
                .accountId(transaction.getAccount().getAccountId())
                .categoryName(transaction.getCategory().getName())
                .categoryId(transaction.getCategory().getCategoryId())
                .categoryType(transaction.getCategory().getType().name())
                .amount(transaction.getAmount())
                .transactionType(transaction.getCategory().getType().name())
                .description(transaction.getDescription())
                .transactionDate(transaction.getTransactionDate())
                .priority(transaction.getPriority()) // Return priority to frontend
                .build();
    }
}