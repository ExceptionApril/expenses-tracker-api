package com.expensestracker.service;

import com.expensestracker.dto.request.CategoryRequest;
import com.expensestracker.dto.response.CategoryResponse;
import com.expensestracker.model.Category;
import com.expensestracker.model.User;
import com.expensestracker.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final UserService userService;
    
    @Transactional
    public CategoryResponse createCategory(Long userId, CategoryRequest request) {
        log.info("Creating category for user: {}", userId);
        
        User user = userService.getUserById(userId);
        
        Category category = Category.builder()
                .user(user)
                .categoryName(request.getCategoryName())
                .categoryType(Category.CategoryType.valueOf(request.getCategoryType()))
                .icon(request.getIcon())
                .build();
        
        Category savedCategory = categoryRepository.save(category);
        log.info("Category created with ID: {}", savedCategory.getCategoryId());
        
        return mapToResponse(savedCategory);
    }
    
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories(Long userId) {
        // Returns both system categories and user's custom categories
        return categoryRepository.findByUserIdOrSystemCategories(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<CategoryResponse> getSystemCategories() {
        return categoryRepository.findByUserIsNull()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void deleteCategory(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
        
        // Can only delete user's own categories, not system categories
        if (category.getUser() == null || !category.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Cannot delete this category");
        }
        
        categoryRepository.delete(category);
        log.info("Category deleted: {}", categoryId);
    }
    
    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryType(category.getCategoryType().name())
                .icon(category.getIcon())
                .isSystemCategory(category.getUser() == null)
                .build();
    }
}