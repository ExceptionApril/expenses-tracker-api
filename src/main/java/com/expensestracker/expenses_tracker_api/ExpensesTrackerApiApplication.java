package com.expensestracker.expenses_tracker_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.expensestracker.expense_tracker_api.repository")
@EntityScan(basePackages = "com.expensestracker.expenses_tracker_api.model")
public class ExpensesTrackerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpensesTrackerApiApplication.class, args);
    }
}