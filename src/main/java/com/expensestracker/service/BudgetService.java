package com.expensestracker.service;

import com.expensestracker.dto.request.BudgetRequest;
import com.expensestracker.dto.response.BudgetResponse;
import com.expensestracker.model.Budget;
import com.expensestracker.model.Category;
import com.expensestracker.model.User;
import com.expensestracker.repository.BudgetRepository;
import com.expensestracker.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {
    
    private static final Logger log = LoggerFactory.getLogger(BudgetService.class);
    
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;
    
    public BudgetService(BudgetRepository budgetRepository, CategoryRepository categoryRepository, 
                        UserService userService) {
        this.budgetRepository = budgetRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }
    
    @Transactional
    public BudgetResponse createBudget(Long userId, BudgetRequest request) {
        log.info("Creating budget for user: {} with category: {}", userId, request.getCategoryId());
        
        User user = userService.getUserById(userId);
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Budget budget = new Budget();
        budget.setUser(user);
        budget.setCategory(category);
        budget.setAmountLimit(request.getAmountLimit());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        
        Budget savedBudget = budgetRepository.save(budget);
        log.info("Budget created with ID: {}", savedBudget.getBudgetId());
        
        return mapToResponse(savedBudget);
    }
    
    @Transactional(readOnly = true)
    public List<BudgetResponse> getUserBudgets(Long userId) {
        return budgetRepository.findByUser_UserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public BudgetResponse getBudgetById(Long userId, Long budgetId) {
        Budget budget = budgetRepository.findByBudgetIdAndUser_UserId(budgetId, userId)
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));
        
        return mapToResponse(budget);
    }
    
    @Transactional
    public BudgetResponse updateBudget(Long userId, Long budgetId, BudgetRequest request) {
        Budget budget = budgetRepository.findByBudgetIdAndUser_UserId(budgetId, userId)
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));
        
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        budget.setCategory(category);
        budget.setAmountLimit(request.getAmountLimit());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        
        Budget updatedBudget = budgetRepository.save(budget);
        log.info("Budget updated: {}", budgetId);
        
        return mapToResponse(updatedBudget);
    }
    
    @Transactional
    public void deleteBudget(Long userId, Long budgetId) {
        Budget budget = budgetRepository.findByBudgetIdAndUser_UserId(budgetId, userId)
                .orElseThrow(() -> new RuntimeException("Budget not found or access denied"));
        
        budgetRepository.delete(budget);
        log.info("Budget deleted: {}", budgetId);
    }
    
    private BudgetResponse mapToResponse(Budget budget) {
        return BudgetResponse.builder()
                .budgetId(budget.getBudgetId())
                .categoryId(budget.getCategory().getCategoryId())
                .categoryName(budget.getCategory().getName())
                .categoryType(budget.getCategory().getType().name())
                .amountLimit(budget.getAmountLimit())
                .startDate(budget.getStartDate())
                .endDate(budget.getEndDate())
                .build();
    }
}
