package com.expensestracker.repository;

import com.expensestracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// ==================== ACCOUNT REPOSITORY ====================
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUser_UserId(Long userId);
    Optional<Account> findByAccountIdAndUser_UserId(Long accountId, Long userId);
    List<Account> findByUser_UserIdAndAccountType(Long userId, Account.AccountType accountType);
}