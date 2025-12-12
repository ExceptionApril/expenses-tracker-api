# Expense Tracker API - Postman JSON Examples

## Base URL
```
http://localhost:8080/api
```

## Authentication Headers (for all requests except auth)
```
Content-Type: application/json
userId: 1
```

---

## 1. AUTH - Register
**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

---

## 2. AUTH - Login
**POST** `/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "Welcome1!"
}
```

**Response (copy userId for other requests):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "createdAt": "2025-12-12T16:43:28"
  }
}
```

---

## 3. ACCOUNTS (Wallets) - Create Account
**POST** `/accounts`

Headers:
```
Content-Type: application/json
userId: 1
```

**Cash Account:**
```json
{
  "accountName": "My Cash Wallet",
  "accountType": "CASH",
  "balance": 500.00
}
```

**Bank Account:**
```json
{
  "accountName": "BDO Savings",
  "accountType": "BANK",
  "balance": 5000.00
}
```

**E-Wallet:**
```json
{
  "accountName": "GCash",
  "accountType": "E_WALLET",
  "balance": 2000.00
}
```

**Credit Card:**
```json
{
  "accountName": "BDO Credit Card",
  "accountType": "CREDIT_CARD",
  "balance": 10000.00
}
```

**Debit Card:**
```json
{
  "accountName": "Visa Debit Card",
  "accountType": "DEBIT_CARD",
  "balance": 3000.00
}
```

---

## 4. ACCOUNTS - Get All Accounts
**GET** `/accounts`

Headers:
```
userId: 1
```

---

## 5. ACCOUNTS - Get Account by ID
**GET** `/accounts/{id}`

Example: `/accounts/1`

Headers:
```
userId: 1
```

---

## 6. ACCOUNTS - Delete Account
**DELETE** `/accounts/{id}`

Example: `/accounts/1`

Headers:
```
userId: 1
```

---

## 7. CATEGORIES - Create Category
**POST** `/categories`

Headers:
```
Content-Type: application/json
userId: 1
```

**Expense Category (Need):**
```json
{
  "categoryName": "Groceries",
  "categoryType": "EXPENSE",
  "classification": "NEED"
}
```

**Expense Category (Want):**
```json
{
  "categoryName": "Entertainment",
  "categoryType": "EXPENSE",
  "classification": "WANT"
}
```

**Income Category:**
```json
{
  "categoryName": "Salary",
  "categoryType": "INCOME",
  "classification": "INCOME"
}
```

**All Category Types:**
```json
{
  "categoryName": "Medical",
  "categoryType": "EXPENSE",
  "classification": "NEED"
}
```

---

## 8. CATEGORIES - Get All Categories
**GET** `/categories`

Headers:
```
userId: 1
```

---

## 9. CATEGORIES - Update Category
**PUT** `/categories/{id}`

Example: `/categories/1`

Headers:
```
Content-Type: application/json
userId: 1
```

```json
{
  "categoryName": "Groceries & Food",
  "categoryType": "EXPENSE",
  "classification": "NEED"
}
```

---

## 10. CATEGORIES - Delete Category
**DELETE** `/categories/{id}`

Example: `/categories/1`

Headers:
```
userId: 1
```

---

## 11. TRANSACTIONS - Create Transaction
**POST** `/transactions`

Headers:
```
Content-Type: application/json
userId: 1
```

**Expense Transaction:**
```json
{
  "accountId": 1,
  "categoryId": 1,
  "amount": 500.00,
  "transactionDate": "2025-12-12",
  "description": "Weekly groceries",
  "transactionType": "EXPENSE"
}
```

**Income Transaction:**
```json
{
  "accountId": 1,
  "categoryId": 5,
  "amount": 25000.00,
  "transactionDate": "2025-12-01",
  "description": "Monthly salary",
  "transactionType": "INCOME"
}
```

**Transfer Transaction:**
```json
{
  "accountId": 1,
  "categoryId": 10,
  "amount": 1000.00,
  "transactionDate": "2025-12-12",
  "description": "Transfer to savings",
  "transactionType": "TRANSFER"
}
```

---

## 12. TRANSACTIONS - Get All Transactions
**GET** `/transactions`

Headers:
```
userId: 1
```

---

## 13. TRANSACTIONS - Get Transaction by ID
**GET** `/transactions/{id}`

Example: `/transactions/1`

Headers:
```
userId: 1
```

---

## 14. TRANSACTIONS - Update Transaction
**PUT** `/transactions/{id}`

Example: `/transactions/1`

Headers:
```
Content-Type: application/json
userId: 1
```

```json
{
  "accountId": 1,
  "categoryId": 2,
  "amount": 600.00,
  "transactionDate": "2025-12-12",
  "description": "Updated grocery amount",
  "transactionType": "EXPENSE"
}
```

---

## 15. TRANSACTIONS - Delete Transaction
**DELETE** `/transactions/{id}`

Example: `/transactions/1`

Headers:
```
userId: 1
```

---

## 16. BUDGETS - Create Budget
**POST** `/budgets`

Headers:
```
Content-Type: application/json
userId: 1
```

```json
{
  "categoryId": 1,
  "amountLimit": 5000.00,
  "startDate": "2025-12-01",
  "endDate": "2025-12-31"
}
```

**Another Budget Example:**
```json
{
  "categoryId": 2,
  "amountLimit": 3000.00,
  "startDate": "2025-12-01",
  "endDate": "2025-12-31"
}
```

---

## 17. BUDGETS - Get All Budgets
**GET** `/budgets`

Headers:
```
userId: 1
```

---

## 18. BUDGETS - Get Budget by ID
**GET** `/budgets/{id}`

Example: `/budgets/1`

Headers:
```
userId: 1
```

---

## 19. BUDGETS - Update Budget
**PUT** `/budgets/{id}`

Example: `/budgets/1`

Headers:
```
Content-Type: application/json
userId: 1
```

```json
{
  "categoryId": 1,
  "amountLimit": 6000.00,
  "startDate": "2025-12-01",
  "endDate": "2025-12-31"
}
```

---

## 20. BUDGETS - Delete Budget
**DELETE** `/budgets/{id}`

Example: `/budgets/1`

Headers:
```
userId: 1
```

---

## Quick Postman Setup Steps

1. **Create a new Postman Environment variable:**
   - Variable: `baseUrl` = `http://localhost:8080/api`
   - Variable: `userId` = `1`

2. **In all requests (except auth), add headers:**
   ```
   Content-Type: application/json
   userId: {{userId}}
   ```

3. **Use `{{baseUrl}}` in your URLs:**
   - Example: `{{baseUrl}}/accounts`

4. **First, login to get your userId:**
   - POST `{{baseUrl}}/auth/login` with email/password
   - Copy the `userId` from response and update your environment variable

5. **Create test data in this order:**
   - Create Accounts (Wallets)
   - Create Categories
   - Create Transactions
   - Create Budgets
