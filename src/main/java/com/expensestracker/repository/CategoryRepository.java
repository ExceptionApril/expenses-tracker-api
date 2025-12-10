package com.expensestracker.repository;

import com.expensestracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // Find user's specific categories
    List<Category> findByUser_UserId(Long userId);
    
    // Find System categories (where user is null)
    List<Category> findByUserIsNull();
    
    // Find System categories (where user is null) OR User categories
    @Query("SELECT c FROM Category c WHERE c.user.userId = :userId OR c.user IS NULL")
    List<Category> findByUserIdOrSystemCategories(@Param("userId") Long userId);
    
    // Find specific category by name for a user
    Optional<Category> findByNameAndUser_UserId(String name, Long userId);
    
    // Find all categories of a specific type (e.g., all EXPENSE categories)
    List<Category> findByType(Category.CategoryType type);
}