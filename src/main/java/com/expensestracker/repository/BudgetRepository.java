package com.expensestracker.repository;

import com.expensestracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    
    List<Budget> findByUser_UserId(Long userId);
    
    // Find specific budget by ID and User (security check)
    Optional<Budget> findByBudgetIdAndUser_UserId(Long budgetId, Long userId);
    
    // Find budget for a specific category
    Optional<Budget> findByUser_UserIdAndCategory_CategoryId(Long userId, Long categoryId);
    
    // Find budgets ending before a certain date (for expiry checks)
    List<Budget> findByUser_UserIdAndEndDateBefore(Long userId, LocalDate date);
}