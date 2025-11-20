package com.expensestracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;  // NULL for system categories, set for user-created categories
    
    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category_type", nullable = false, length = 20)
    private CategoryType categoryType;
    
    @Column(length = 50)
    private String icon;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Transaction> transactions = new ArrayList<>();
    
    public enum CategoryType {
        NEEDS,      // Essential expenses (rent, utilities, groceries)
        WANTS,      // Non-essential (entertainment, dining out)
        SAVINGS     // Savings and investments
    }
}