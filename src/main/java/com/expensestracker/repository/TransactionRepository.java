package com.expensestracker.repository;

import com.expensestracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;



@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Find all transactions for a user (through account)
    List<Transaction> findByAccount_User_UserIdOrderByTransactionDateDesc(Long userId);
    
    // Find transactions by date range
    List<Transaction> findByAccount_User_UserIdAndTransactionDateBetweenOrderByTransactionDateDesc(
        Long userId, LocalDate startDate, LocalDate endDate);
    
    // Find by transaction type
    List<Transaction> findByAccount_User_UserIdAndTransactionType(
        Long userId, Transaction.TransactionType type);
    
    // Find by category
    List<Transaction> findByAccount_User_UserIdAndCategory_CategoryId(Long userId, Long categoryId);
    
    // Find by account
    List<Transaction> findByAccount_AccountId(Long accountId);
}