package com.expensestracker.controller;

import com.expensestracker.dto.request.CategoryRequest;
import com.expensestracker.dto.response.ApiResponse;
import com.expensestracker.dto.response.CategoryResponse;
import com.expensestracker.service.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

// ==================== CATEGORY CONTROLLER ====================
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
class CategoryController {
    
    private final CategoryService categoryService;
    
    /**
     * Get all categories (system + user's custom)
     * GET /api/categories
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories(
            @RequestHeader("userId") Long userId) {
        try {
            List<CategoryResponse> categories = categoryService.getAllCategories(userId);
            return ResponseEntity.ok(ApiResponse.success(categories));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Create custom category
     * POST /api/categories
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(
            @RequestHeader("userId") Long userId,
            @Valid @RequestBody CategoryRequest request) {
        try {
            CategoryResponse response = categoryService.createCategory(userId, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Category created successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Delete custom category
     * DELETE /api/categories/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @RequestHeader("userId") Long userId,
            @PathVariable Long id) {
        try {
            categoryService.deleteCategory(userId, id);
            return ResponseEntity.ok(ApiResponse.success("Category deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
