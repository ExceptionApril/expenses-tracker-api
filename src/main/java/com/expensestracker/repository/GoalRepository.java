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


@Repository
public interface GoalRepository extends JpaRepository<Goal, String> {
    List<Goal> findByUser_UserId(Long userId);
    Optional<Goal> findByGoalNameAndUser_UserId(String goalName, Long userId);
    List<Goal> findByUser_UserIdAndStatus(Long userId, Goal.GoalStatus status);
    
    @Query("SELECT g FROM Goal g WHERE g.user.userId = :userId " +
           "AND g.currentAmount >= g.targetAmount")
    List<Goal> findAchievedGoals(@Param("userId") Long userId);
}