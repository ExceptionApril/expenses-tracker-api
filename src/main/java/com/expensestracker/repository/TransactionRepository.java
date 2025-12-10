package com.expensestracker.repository;

import com.expensestracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
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
    
    // Sum transactions by type and date range
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
           "WHERE t.account.user.userId = :userId " +
           "AND t.transactionType = :type " +
           "AND t.transactionDate BETWEEN :start AND :end")
    BigDecimal sumByUserAndTypeAndDateRange(
        @Param("userId") Long userId,
        @Param("type") Transaction.TransactionType type,
        @Param("start") LocalDate start,
        @Param("end") LocalDate end);
    
    // Sum by category type
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
           "WHERE t.account.user.userId = :userId " +
           "AND t.category.type = :categoryType " +
           "AND t.transactionType = 'EXPENSE' " +
           "AND t.transactionDate BETWEEN :start AND :end")
    BigDecimal sumByCategoryTypeAndDateRange(
        @Param("userId") Long userId,
        @Param("categoryType") Category.CategoryType categoryType,
        @Param("start") LocalDate start,
        @Param("end") LocalDate end);
}