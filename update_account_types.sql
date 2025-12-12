-- Migration script to support new account types
-- Run this in MySQL Workbench Query Editor

USE expense_tracker_api;

-- Check current column definition
SHOW COLUMNS FROM account LIKE 'account_type';

-- The VARCHAR(50) column should already be sufficient
-- But let's ensure it can handle all the new enum values
ALTER TABLE account MODIFY COLUMN account_type VARCHAR(50) NOT NULL COMMENT 'Supported: BANK_ACCOUNT, CASH, BANK, GCASH, WALLET, SAVINGS, E_WALLET, CREDIT_CARD, DEBIT_CARD';

-- Verify the change
SHOW COLUMNS FROM account LIKE 'account_type';

SELECT 'Migration complete! The account_type column now supports all account types.' AS status;
