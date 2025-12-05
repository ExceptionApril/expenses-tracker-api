package com.expensestracker.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; //wala ni siya
    
    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category_type", nullable = false, length = 20)
    private CategoryType categoryType;
    
    @Column(length = 50)
    private String icon;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();
    
    public enum CategoryType {
        NEEDS,
        WANTS,
        SAVINGS
    }
    
 
    public Category() {
    }
    
    public Category(Long categoryId, User user, String categoryName, CategoryType categoryType, String icon) {
        this.categoryId = categoryId;
        this.user = user;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.icon = icon;
    }
    
   
    public static CategoryBuilder builder() {
        return new CategoryBuilder();
    }
    
    public static class CategoryBuilder {
        private Long categoryId;
        private User user;
        private String categoryName;
        private CategoryType categoryType;
        private String icon;
        
        public CategoryBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }
        
        public CategoryBuilder user(User user) {
            this.user = user;
            return this;
        }
        
        public CategoryBuilder categoryName(String categoryName) {
            this.categoryName = categoryName;
            return this;
        }
        
        public CategoryBuilder categoryType(CategoryType categoryType) {
            this.categoryType = categoryType;
            return this;
        }
        
        public CategoryBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }
        
        public Category build() {
            return new Category(categoryId, user, categoryName, categoryType, icon);
        }
    }
    
  
    public Long getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public CategoryType getCategoryType() {
        return categoryType;
    }
    
    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
    
    public List<Transaction> getTransactions() {
        return transactions;
    }
    
    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}