package com.expensestracker.dto.response;

public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
    private String categoryType;
    private String icon;
    private boolean isSystemCategory;
    
    public CategoryResponse() {
    }
    
    public CategoryResponse(Long categoryId, String categoryName, String categoryType, 
                           String icon, boolean isSystemCategory) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.icon = icon;
        this.isSystemCategory = isSystemCategory;
    }
    
    public static CategoryResponseBuilder builder() {
        return new CategoryResponseBuilder();
    }
    
    public static class CategoryResponseBuilder {
        private Long categoryId;
        private String categoryName;
        private String categoryType;
        private String icon;
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
        
        public CategoryResponseBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }
        
        public CategoryResponseBuilder isSystemCategory(boolean isSystemCategory) {
            this.isSystemCategory = isSystemCategory;
            return this;
        }
        
        public CategoryResponse build() {
            return new CategoryResponse(categoryId, categoryName, categoryType, icon, isSystemCategory);
        }
    }
    
    public Long getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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
    
    public boolean isSystemCategory() {
        return isSystemCategory;
    }
    
    public void setSystemCategory(boolean systemCategory) {
        isSystemCategory = systemCategory;
    }
}