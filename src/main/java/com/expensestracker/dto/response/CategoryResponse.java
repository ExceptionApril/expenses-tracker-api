package com.expensestracker.dto.response;

public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
    private String categoryType;
    private String classification;
    private boolean isSystemCategory;
    
    public CategoryResponse() {
    }
    
    public CategoryResponse(Long categoryId, String categoryName, String categoryType, 
                           String classification, boolean isSystemCategory) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.classification = classification;
        this.isSystemCategory = isSystemCategory;
    }
    
    public static CategoryResponseBuilder builder() {
        return new CategoryResponseBuilder();
    }
    
    public static class CategoryResponseBuilder {
        private Long categoryId;
        private String categoryName;
        private String categoryType;
        private String classification;
        private boolean isSystemCategory;
        
        public CategoryResponseBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }
        
        public CategoryResponseBuilder categoryName(String categoryName) {
            this.categoryName = categoryName;
            return this;
        }
        
        public CategoryResponseBuilder categoryType(String categoryType) {
            this.categoryType = categoryType;
            return this;
        }

        public CategoryResponseBuilder classification(String classification) { // <--- ADDED THIS
            this.classification = classification;
            return this;
        }
        
        public CategoryResponseBuilder isSystemCategory(boolean isSystemCategory) {
            this.isSystemCategory = isSystemCategory;
            return this;
        }
        
        public CategoryResponse build() {
            return new CategoryResponse(categoryId, categoryName, categoryType, classification, isSystemCategory);
        }
    }
    
    // Getters and Setters
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public String getCategoryType() { return categoryType; }
    public void setCategoryType(String categoryType) { this.categoryType = categoryType; }

    public String getClassification() { return classification; } // <--- ADDED THIS
    public void setClassification(String classification) { this.classification = classification; } // <--- ADDED THIS
    
    public boolean isSystemCategory() { return isSystemCategory; }
    public void setSystemCategory(boolean systemCategory) { isSystemCategory = systemCategory; }
}