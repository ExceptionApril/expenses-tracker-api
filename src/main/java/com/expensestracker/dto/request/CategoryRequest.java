package com.expensestracker.dto.request;

import jakarta.validation.constraints.*;

public class CategoryRequest {
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String categoryName;
    
    @NotBlank(message = "Category type is required")
    @Pattern(regexp = "NEEDS|WANTS|SAVINGS", message = "Category type must be NEEDS, WANTS, or SAVINGS")
    private String categoryType;
    
    @Size(max = 50, message = "Icon must not exceed 50 characters")
    private String icon;
    
    public CategoryRequest() {
    }
    
    public CategoryRequest(String categoryName, String categoryType, String icon) {
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.icon = icon;
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
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
}