package com.expensestracker.dto.request;

import jakarta.validation.constraints.*;

public class CategoryRequest {
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String categoryName;
    
    @NotBlank(message = "Category type is required")
    @Pattern(regexp = "EXPENSE|INCOME|NEEDS|WANTS|SAVINGS", message = "Category type must be EXPENSE, INCOME, NEEDS, WANTS, or SAVINGS")
    private String categoryType;
    
    @Size(max = 50, message = "Classification must not exceed 50 characters")
    private String classification;
    
    public CategoryRequest() {
    }
    
    public CategoryRequest(String categoryName, String categoryType) {
        this.categoryName = categoryName;
        this.categoryType = categoryType;
    }
    
    public CategoryRequest(String categoryName, String categoryType, String classification) {
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.classification = classification;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getCategoryType() {
        return categoryType;
    }
    
    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }
    
    public String getClassification() {
        return classification;
    }
    
    public void setClassification(String classification) {
        this.classification = classification;
    }
}