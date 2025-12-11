-- Create Database
CREATE DATABASE IF NOT EXISTS expense_tracker_api;
USE expense_tracker_api;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0,
    color VARCHAR(20) DEFAULT '#3B82F6',
    card_number VARCHAR(20),
    card_holder VARCHAR(100),
    expiry_date VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create category table
CREATE TABLE IF NOT EXISTS category (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    classification VARCHAR(20),
    icon VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create transaction table
CREATE TABLE IF NOT EXISTS transaction (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    description VARCHAR(255),
    transaction_type VARCHAR(20),
    priority VARCHAR(20) DEFAULT 'Medium',
    FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create budget table
CREATE TABLE IF NOT EXISTS budget (
    budget_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    amount_limit DECIMAL(15,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert test user (admin@example.com / Welcome1!)
INSERT INTO users (name, email, password, created_at) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBsZ34', NOW())
ON DUPLICATE KEY UPDATE user_id=LAST_INSERT_ID(user_id);

-- Get the inserted user ID
SET @user_id = (SELECT user_id FROM users WHERE email = 'admin@example.com' LIMIT 1);

-- Insert test accounts
INSERT INTO account (user_id, account_name, account_type, balance, color, card_number, card_holder, expiry_date, created_at)
VALUES 
    (@user_id, 'Checking Account', 'BANK', 5000.00, '#3B82F6', '4532 **** **** 1234', 'Admin User', '12/28', NOW()),
    (@user_id, 'Cash', 'CASH', 500.00, '#10B981', NULL, NULL, NULL, NOW()),
    (@user_id, 'Savings', 'SAVINGS', 10000.00, '#F59E0B', '5100 **** **** 9876', 'Admin User', '06/29', NOW())
ON DUPLICATE KEY UPDATE account_id=LAST_INSERT_ID(account_id);

-- Insert system categories
INSERT INTO category (user_id, name, type, classification, icon)
VALUES 
    (NULL, 'Salary', 'INCOME', 'NEED', '💰'),
    (NULL, 'Freelance', 'INCOME', 'WANT', '💻'),
    (NULL, 'Groceries', 'EXPENSE', 'NEED', '🛒'),
    (NULL, 'Utilities', 'EXPENSE', 'NEED', '💡'),
    (NULL, 'Entertainment', 'EXPENSE', 'WANT', '🎬'),
    (NULL, 'Transportation', 'EXPENSE', 'NEED', 'Bus'),
    (NULL, 'Savings', 'EXPENSE', NULL, '🏦')
ON DUPLICATE KEY UPDATE category_id=LAST_INSERT_ID(category_id);

-- Get category IDs
SET @salary_cat = (SELECT category_id FROM category WHERE name = 'Salary' LIMIT 1);
SET @grocery_cat = (SELECT category_id FROM category WHERE name = 'Groceries' LIMIT 1);
SET @checking_acct = (SELECT account_id FROM account WHERE account_name = 'Checking Account' LIMIT 1);

-- Insert test transactions
INSERT INTO transaction (account_id, category_id, amount, transaction_date, description, transaction_type, priority)
VALUES 
    (@checking_acct, @salary_cat, 3000.00, CURDATE(), 'Monthly salary', 'INCOME', 'High'),
    (@checking_acct, @grocery_cat, 150.00, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'Weekly groceries', 'EXPENSE', 'Medium')
ON DUPLICATE KEY UPDATE transaction_id=LAST_INSERT_ID(transaction_id);

-- Insert test budgets
INSERT INTO budget (user_id, category_id, amount_limit, start_date, end_date)
VALUES 
    (@user_id, @grocery_cat, 500.00, DATE_SUB(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 30 DAY))
ON DUPLICATE KEY UPDATE budget_id=LAST_INSERT_ID(budget_id);