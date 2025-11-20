package com.expensestracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "goal")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {
    
    @Id
    @Column(name = "goal_name", length = 100)
    private String goalName;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;
    
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;
    
    @Column(name = "current_amount", precision = 15, scale = 2)
    private BigDecimal currentAmount = BigDecimal.ZERO;
    
    @Column(name = "deadline_date")
    private LocalDate deadlineDate;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private GoalStatus status;
    
    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Budget> budgets = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        if (currentAmount == null) {
            currentAmount = BigDecimal.ZERO;
        }
        if (status == null) {
            status = GoalStatus.IN_PROGRESS;
        }
    }
    
    public enum GoalStatus {
        IN_PROGRESS,
        ACHIEVED,
        PAUSED
    }
}
