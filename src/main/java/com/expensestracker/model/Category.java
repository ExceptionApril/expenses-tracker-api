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
    private User user; // Nullable for system categories
    
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private CategoryType type;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "classification", length = 20)
    private CategoryClassification classification;
    
    @Column(length = 50)
    private String icon;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Budget> budgets = new ArrayList<>();
    
    public Category() {
    }

    public Category(Long categoryId, User user, String name, CategoryType type, 
                    CategoryClassification classification, String icon, 
                    List<Transaction> transactions, List<Budget> budgets) {
        this.categoryId = categoryId;
        this.user = user;
        this.name = name;
        this.type = type;
        this.classification = classification;
        this.icon = icon;
        this.transactions = transactions;
        this.budgets = budgets;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryType getType() {
        return type;
    }

    public void setType(CategoryType type) {
        this.type = type;
    }

    public CategoryClassification getClassification() {
        return classification;
    }

    public void setClassification(CategoryClassification classification) {
        this.classification = classification;
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

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }

    public static CategoryBuilder builder() {
        return new CategoryBuilder();
    }

    public static class CategoryBuilder {
        private Long categoryId;
        private User user;
        private String name;
        private CategoryType type;
        private CategoryClassification classification;
        private String icon;
        private List<Transaction> transactions = new ArrayList<>();
        private List<Budget> budgets = new ArrayList<>();

        public CategoryBuilder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }

        public CategoryBuilder user(User user) {
            this.user = user;
            return this;
        }

        public CategoryBuilder name(String name) {
            this.name = name;
            return this;
        }

        public CategoryBuilder categoryName(String name) {
            this.name = name;
            return this;
        }

        public CategoryBuilder type(CategoryType type) {
            this.type = type;
            return this;
        }

        public CategoryBuilder categoryType(CategoryType type) {
            this.type = type;
            return this;
        }

        public CategoryBuilder classification(CategoryClassification classification) {
            this.classification = classification;
            return this;
        }

        public CategoryBuilder icon(String icon) {
            this.icon = icon;
            return this;
        }

        public CategoryBuilder transactions(List<Transaction> transactions) {
            this.transactions = transactions;
            return this;
        }

        public CategoryBuilder budgets(List<Budget> budgets) {
            this.budgets = budgets;
            return this;
        }

        public Category build() {
            return new Category(categoryId, user, name, type, classification, icon, transactions, budgets);
        }
    }
    
    public enum CategoryType {
        INCOME,
        EXPENSE
    }

    public enum CategoryClassification {
        NEED,
        WANT
    }
}