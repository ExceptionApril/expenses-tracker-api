# Expense Tracker - Integration Test Guide

## Project Status
✅ **TypeScript Duplicates Removed** - All `.tsx` files have been deleted, keeping only JavaScript (`.jsx`) files
✅ **Backend Build Success** - Maven clean package completed successfully
✅ **Frontend Dependencies** - npm install completed with no critical issues

---

## Backend Configuration

### Database Setup
- **Database**: MySQL
- **Host**: localhost:3306
- **Database Name**: expense_tracker_api
- **Username**: root
- **Password**: Welcome1!
- **Auto-create**: Database will be created if it doesn't exist
- **DDL**: `spring.jpa.hibernate.ddl-auto=update` (entities will auto-create tables)

### Server Configuration
- **Port**: 8080
- **Base URL**: http://localhost:8080/api

### Key Properties
```properties
spring.application.name=ExpenseTracker
server.port=8080
server.error.include-message=always
server.error.include-binding-errors=always
```

---

## Frontend Configuration

### API Configuration
- **Base URL**: http://localhost:8080/api (development)
- **Environment Variable**: `VITE_API_BASE_URL` can override default

### React Router Structure
- `/login` - Login/Register page (unauthenticated)
- `/dashboard` - Main dashboard (authenticated)
- `/transactions` - Transaction management
- `/wallets` - Wallet/Account management
- `/budget` - Budget planning
- `/analytics` - Analytics & reports
- `/settings` - Settings & category management
- `/profile` - User profile

---

## Core Features & Integration Points

### 1. Authentication Flow
**Location**: [src/pages/Login.jsx](../expenses-tracker-frontend/src/pages/Login.jsx)

**Flow**:
```
User Login/Register 
  → POST /api/auth/login or /api/auth/register
  → Store token & user ID in localStorage
  → Emit 'authChanged' event
  → App.jsx loads user data
  → Redirect to /dashboard
```

**API Endpoints**:
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- Stored Data: `localStorage.token`, `localStorage.user` (contains userId)

---

### 2. Dashboard
**Location**: [src/pages/Dashboard.jsx](../expenses-tracker-frontend/src/pages/Dashboard.jsx)

**Features**:
- Total balance from all wallets
- Monthly expenses calculation
- Recent transactions (5 most recent)
- Budget overview for current month
- Category breakdown

**Data Dependencies**:
- `wallets` - Account/wallet data from backend
- `transactions` - All user transactions
- `categories` - Expense categories
- `budgets` - Budget constraints

**API Calls on Load**:
```javascript
Promise.all([
  accountsAPI.getAll(),      // Fetch wallets
  categoriesAPI.getAll(),    // Fetch categories
  transactionsAPI.getAll(),  // Fetch transactions
  budgetsAPI.getAll()        // Fetch budgets
])
```

---

### 3. Transactions Management
**Location**: [src/pages/Transactions.jsx](../expenses-tracker-frontend/src/pages/Transactions.jsx)

**Features**:
- View all transactions
- Add new transactions
- Delete transactions
- Filter by category/wallet
- Sort by date

**Flow**:
```
User fills AddTransactionForm
  → POST /api/transactions
  → Update transactions state
  → Fetch updated wallets (balance changes)
  → Display new transaction in list
```

**Payload Format**:
```javascript
{
  accountId: number,        // Wallet ID
  categoryId: number,       // Category ID
  amount: number,           // Amount spent
  description: string,      // Transaction description
  transactionDate: string,  // Date (YYYY-MM-DD)
  transactionType: "EXPENSE" // Always EXPENSE from form
}
```

**Backend Response**:
```javascript
{
  transactionId: number,
  accountId: number,
  categoryId: number,
  amount: number,
  description: string,
  transactionDate: string,
  transactionType: string,
  userId: number
}
```

---

### 4. Category Management
**Location**: [src/pages/Settings.jsx](../expenses-tracker-frontend/src/pages/Settings.jsx)

**Features**:
- View all categories
- Add new category
- Delete category
- Categories filter transactions

**Flow**:
```
User creates new category in Settings
  → POST /api/categories
  → Backend creates category
  → Frontend adds to categories state
  → Categories available for new transactions
```

**Payload Format**:
```javascript
{
  categoryName: string,      // Category name
  categoryType: "EXPENSE",   // or INCOME
  classification: string     // "NEED", "WANT", "SAVE"
}
```

---

### 5. Wallet Management
**Location**: [src/pages/Wallets.jsx](../expenses-tracker-frontend/src/pages/Wallets.jsx)

**Features**:
- Create multiple wallets/accounts
- Support multiple account types:
  - cash
  - bank
  - e-wallet
  - credit-card
  - debit-card
- Track balance per account
- Delete accounts

**Flow**:
```
User fills wallet form with:
  - Account Name (e.g., "My Checking")
  - Account Type (cash, bank, credit-card, etc.)
  - Initial Balance
  - Color (UI preference)
  - Card details (if card type)

  → POST /api/accounts
  → Backend creates account
  → Frontend adds to wallets state
  → Account available for transactions
```

**Payload Format**:
```javascript
{
  accountName: string,       // e.g., "My Checking Account"
  accountType: string,       // "CASH", "BANK", "CREDIT_CARD", etc.
  balance: number,           // Initial balance
  userId: number            // From localStorage
}
```

**Backend Response**:
```javascript
{
  accountId: number,
  userId: number,
  accountName: string,
  accountType: string,
  balance: number,
  createdAt: string
}
```

---

### 6. Budget Management
**Location**: [src/pages/Budget.jsx](../expenses-tracker-frontend/src/pages/Budget.jsx)

**Features**:
- Create budget limits for categories
- Set start and end dates
- Monitor spending vs. budget
- Visual budget indicators

**Flow**:
```
User creates budget:
  - Select category
  - Set amount limit
  - Set date range

  → POST /api/budgets
  → Backend creates budget
  → Frontend calculates spending against budget
  → Visual indicators show utilization
```

---

## Integration Testing Steps

### Step 1: Start Backend Server
```bash
cd d:\expenses-tracker-api
java -jar target/expense-tracker-api-1.0.0.jar
```
Expected output: Server running on http://localhost:8080

### Step 2: Start Frontend Dev Server
```bash
cd d:\expenses-tracker-api\expenses-tracker-frontend
npm run dev
```
Expected: Frontend on http://localhost:5173

### Step 3: Test Login/Register Flow
1. Navigate to http://localhost:5173
2. Register new account with email/password
3. Verify token stored in localStorage
4. Verify redirect to dashboard

### Step 4: Test Dashboard Load
1. Dashboard should display:
   - Total Balance (initially $0 if new user)
   - Recent Transactions (empty)
   - Monthly Budget
   - Categories section

### Step 5: Test Add Wallet
1. Click "Wallets" in sidebar
2. Click "Add New Wallet"
3. Fill form:
   - Account Name: "My Checking"
   - Account Type: "Bank"
   - Balance: "1000"
4. Click "Add Wallet"
5. **Verify**: 
   - Wallet appears in list
   - Total balance on dashboard increases to $1000

### Step 6: Test Add Category
1. Click "Settings" in sidebar
2. Click "Add Category"
3. Fill form:
   - Category Name: "Groceries"
   - Category Type: "Expense"
   - Classification: "Need"
4. Click "Add"
5. **Verify**: Category appears in list and is available in transaction dropdown

### Step 7: Test Add Transaction
1. Click "Transactions" or "Dashboard"
2. Click "Add Transaction"
3. Fill form:
   - Select Wallet: "My Checking"
   - Select Category: "Groceries"
   - Amount: "50.00"
   - Description: "Weekly groceries"
   - Date: Today
4. Click "Add"
5. **Verify**:
   - Transaction appears in list
   - Wallet balance decreases to $950
   - Dashboard shows transaction

### Step 8: Test Delete Transaction
1. In Transactions page, click delete icon
2. **Verify**:
   - Transaction removed from list
   - Wallet balance restored to $1000

### Step 9: Test Category Filtering
1. On Transactions page, select category filter
2. Only transactions from that category should display

### Step 10: Test Analytics
1. Click "Analytics" in sidebar
2. Should see:
   - Category breakdown chart
   - Spending trends
   - Budget vs actual

---

## Common Issues & Solutions

### Issue: CORS Errors
**Cause**: Frontend trying to reach backend at wrong URL
**Solution**: 
- Verify backend running on http://localhost:8080
- Check VITE_API_BASE_URL environment variable
- Check api.js base URL configuration

### Issue: 401 Unauthorized
**Cause**: Token not sent or expired
**Solution**:
- Check localStorage has 'token' set
- Verify userId header sent in requests
- Check backend AuthController validates token

### Issue: Database Connection Failed
**Cause**: MySQL not running or wrong credentials
**Solution**:
```bash
# Windows: Start MySQL service
net start MySQL80

# Verify connection:
mysql -u root -p
# Enter password: Welcome1!
```

### Issue: Wallet Balance Not Updating
**Cause**: accountsAPI.getAll() not called after transaction
**Solution**:
- Check handleAddTransaction reloads accounts
- Verify backend updates account balance
- Check transaction API response

---

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/accounts | Get all wallets |
| POST | /api/accounts | Create wallet |
| DELETE | /api/accounts/{id} | Delete wallet |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category |
| DELETE | /api/categories/{id} | Delete category |
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Create transaction |
| DELETE | /api/transactions/{id} | Delete transaction |
| GET | /api/budgets | Get all budgets |
| POST | /api/budgets | Create budget |
| PUT | /api/budgets/{id} | Update budget |
| DELETE | /api/budgets/{id} | Delete budget |

---

## Next Steps

1. ✅ Start both backend and frontend servers
2. ✅ Complete the 10-step integration test
3. ✅ Verify all features work end-to-end
4. ✅ Test error scenarios (invalid input, etc.)
5. ✅ Check browser console for errors
6. ✅ Check backend logs for exceptions

---

**Last Updated**: December 12, 2025
**Status**: Ready for Integration Testing
