package com.expensestracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "budget")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long budgetId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_name")
    @ToString.Exclude
    private Goal goal;
    
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;
    
    @Column(name = "deadline_date")
    private LocalDate deadlineDate;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private BudgetStatus status;
    
    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Transaction> transactions = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = BudgetStatus.ACTIVE;
        }
    }
    
    public enum BudgetStatus {
        ACTIVE,
        COMPLETED,
        EXPIRED
    }
}
