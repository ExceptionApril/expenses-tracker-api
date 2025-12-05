package com.expensestracker.config;

import com.expensestracker.model.*;
import com.expensestracker.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           AccountRepository accountRepository,
                           CategoryRepository categoryRepository,
                           TransactionRepository transactionRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            log.info("DataInitializer: existing users found, skipping seed data insertion.");
            return;
        }

        log.info("DataInitializer: seeding default data into DB...");

        // Create default user
        User admin = User.builder()
                .name("Admin User")
                .email("admin@example.com")
                .password(passwordEncoder.encode("Welcome1!"))
                .build();
        admin = userRepository.save(admin);

        // Create default accounts
        Account checking = Account.builder()
                .user(admin)
                .accountName("Checking Account")
                .accountType(Account.AccountType.BANK_ACCOUNT)
                .balance(new BigDecimal("1000.00"))
                .build();
        checking = accountRepository.save(checking);

        Account cash = Account.builder()
                .user(admin)
                .accountName("Cash")
                .accountType(Account.AccountType.CASH)
                .balance(new BigDecimal("50.00"))
                .build();
        cash = accountRepository.save(cash);

        // Create default categories
        Category groceries = Category.builder()
                .user(admin)
                .categoryName("Groceries")
                .categoryType(Category.CategoryType.NEEDS)
                .icon("shopping-cart")
                .build();
        groceries = categoryRepository.save(groceries);

        Category salary = Category.builder()
                .user(admin)
                .categoryName("Salary")
                .categoryType(Category.CategoryType.SAVINGS)
                .icon("wallet")
                .build();
        salary = categoryRepository.save(salary);

        // Create a sample transaction
        Transaction t1 = Transaction.builder()
                .user(admin)
                .account(checking)
                .category(groceries)
                .amount(new BigDecimal("75.25"))
                .transactionType(Transaction.TransactionType.EXPENSE)
                .description("Weekly groceries")
                .transactionDate(LocalDate.now())
                .build();
        transactionRepository.save(t1);

        // Create a sample income
        Transaction t2 = Transaction.builder()
                .user(admin)
                .account(checking)
                .category(salary)
                .amount(new BigDecimal("2500.00"))
                .transactionType(Transaction.TransactionType.INCOME)
                .description("Monthly salary")
                .transactionDate(LocalDate.now())
                .build();
        transactionRepository.save(t2);

        log.info("DataInitializer: default data seeded (user {}, accounts {}, categories {}, transactions {})",
                admin.getEmail(), List.of(checking.getAccountName(), cash.getAccountName()), List.of(groceries.getCategoryName(), salary.getCategoryName()), 2);
    }
}
