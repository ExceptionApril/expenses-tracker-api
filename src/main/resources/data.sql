-- ==========================================
-- 1. DATABASE SETUP
-- ==========================================
CREATE DATABASE IF NOT EXISTS expense_tracker_api;
USE expense_tracker_api;

-- ==========================================
-- 2. TABLE CREATION (Structure & Relations)
-- ==========================================

-- USERS Table (The Owner)
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ACCOUNT Table (User owns Account)
-- Includes color and card details for the "Wallet" feature
CREATE TABLE IF NOT EXISTS account (
    account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- Stores 'CASH', 'BANK', 'GCASH', etc.
    balance DECIMAL(15,2) NOT NULL DEFAULT 0,
    color VARCHAR(20) DEFAULT '#3B82F6',
    card_number VARCHAR(20),
    card_holder VARCHAR(100),
    expiry_date VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CATEGORY Table (User defines Category)
CREATE TABLE IF NOT EXISTS category (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT, -- Nullable because some categories are system-wide
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'INCOME' or 'EXPENSE'
    classification VARCHAR(20), -- 'NEED' or 'WANT'
    icon VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TRANSACTION Table (Account funds Transaction & Category classifies Transaction)
-- Includes 'priority' to match your Frontend "Need/Want" switch
CREATE TABLE IF NOT EXISTS transaction (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    description VARCHAR(255),
    transaction_type VARCHAR(20), -- 'INCOME' or 'EXPENSE'
    priority VARCHAR(20) DEFAULT 'Medium', -- Stores 'High' (Need) or 'Low' (Want)
    FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- BUDGET Table (Category has_limit Budget)
-- Includes start_date/end_date to support "Budget History" (e.g. Nov Budget vs Dec Budget)
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

-- ==========================================
-- 3. INITIAL DATA SEEDING (Essentials Only)
-- ==========================================

-- 1. Insert Default Admin User
-- Credentials: admin@example.com / Welcome1!
INSERT INTO users (name, email, password, created_at) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gBsZ34', NOW())
ON DUPLICATE KEY UPDATE user_id=LAST_INSERT_ID(user_id);

-- Get the ID of the user we just inserted
SET @user_id = (SELECT user_id FROM users WHERE email = 'admin@example.com' LIMIT 1);

-- 2. Insert Basic System Categories
-- These are required so the user can classify transactions immediately
INSERT INTO category (user_id, name, type, classification, icon)
VALUES 
    (NULL, 'Salary', 'INCOME', 'NEED', '💰'),
    (NULL, 'Freelance', 'INCOME', 'WANT', '💻'),
    (NULL, 'Groceries', 'EXPENSE', 'NEED', '🛒'),
    (NULL, 'Utilities', 'EXPENSE', 'NEED', '💡'),
    (NULL, 'Entertainment', 'EXPENSE', 'WANT', '🎬'),
    (NULL, 'Transportation', 'EXPENSE', 'NEED', '🚌'),
    (NULL, 'Savings', 'EXPENSE', NULL, '🏦')
ON DUPLICATE KEY UPDATE category_id=LAST_INSERT_ID(category_id);

-- 3. Insert Default Accounts (Optional - removes manual setup for testing)
INSERT INTO account (user_id, account_name, account_type, balance, color, card_number, card_holder, expiry_date, created_at)
VALUES 
    (@user_id, 'Checking Account', 'BANK', 0.00, '#3B82F6', '4532 **** **** 1234', 'Admin User', '12/28', NOW()),
    (@user_id, 'Cash', 'CASH', 0.00, '#10B981', NULL, NULL, NULL, NOW())
ON DUPLICATE KEY UPDATE account_id=LAST_INSERT_ID(account_id);

-- ==========================================
-- NOTE: Transactions and Budgets are intentionally LEFT EMPTY.
-- This ensures that only the data YOU input on the website is stored.
-- ==========================================