package com.expensestracker.repository;

import com.expensestracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


// ==================== BUDGET REPOSITORY ====================
@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUser_UserId(Long userId);
    Optional<Budget> findByBudgetIdAndUser_UserId(Long budgetId, Long userId);
    List<Budget> findByUser_UserIdAndStatus(Long userId, Budget.BudgetStatus status);
    List<Budget> findByUser_UserIdAndDeadlineDateBefore(Long userId, LocalDate date);
}