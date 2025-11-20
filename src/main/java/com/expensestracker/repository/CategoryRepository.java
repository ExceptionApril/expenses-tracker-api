package com.expensestracker.repository;

import com.expensestracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Find user's custom categories
    List<Category> findByUser_UserId(Long userId);
    
    // Find system categories (where user_id is NULL) OR user's categories
    @Query("SELECT c FROM Category c WHERE c.user.userId = :userId OR c.user IS NULL")
    List<Category> findByUserIdOrSystemCategories(@Param("userId") Long userId);
    
    // Find by name and user
    Optional<Category> findByCategoryNameAndUser_UserId(String name, Long userId);
    
    // Find system categories only
    List<Category> findByUserIsNull();
    
    // Find by category type
    List<Category> findByCategoryType(Category.CategoryType categoryType);
}