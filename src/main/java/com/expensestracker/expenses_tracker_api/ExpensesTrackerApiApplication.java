package com.expensestracker.expenses_tracker_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.expensestracker.config", "com.expensestracker.controller", "com.expensestracker.service"})
@EnableJpaRepositories(basePackages = "com.expensestracker.repository")
@EntityScan(basePackages = "com.expensestracker.model")
public class ExpensesTrackerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpensesTrackerApiApplication.class, args);
    }
}