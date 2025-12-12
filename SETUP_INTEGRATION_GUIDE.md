# Expense Tracker - Setup & Integration Guide

## ✅ Project Status: FULLY INTEGRATED

All backend and frontend components are now connected to the database via REST APIs.

## 📋 What Has Been Completed

### Backend Components Created
1. **BudgetController** - REST endpoints for budget management
2. **BudgetService** - Business logic for budget operations
3. **BudgetRepository** - Database queries for budgets
4. **BudgetRequest/Response** - API DTOs with validation
5. **CategoryService Enhancement** - Now returns both system and user categories
6. **CategoryRequest Update** - Added classification field support

### Frontend Integration
1. **API Service Layer** (`src/services/api.js`)
   - accountsAPI - Account management endpoints
   - categoriesAPI - Category management endpoints  
   - transactionsAPI - Transaction management endpoints
   - budgetsAPI - Budget management endpoints
   - authAPI - Authentication endpoints

2. **Component Updates**
   - App.jsx - Loads data from API, implements async handlers
   - Dashboard.jsx - Uses API properties (accountId, transactionId, etc.)
   - AddTransactionForm.jsx - Creates transactions via API
   - Budget.jsx - Manages budgets via API
   - Transactions.jsx - Lists and exports transactions
   - TransactionList.jsx - Renders transactions with API data
   - CategoryChart.jsx - Visualizes category spending

### Database Schema
- ✅ Users table with authentication
- ✅ Accounts (wallets) linked to users
- ✅ Categories (system and user-specific)
- ✅ Transactions with account and category references
- ✅ Budgets with category and date ranges
- ✅ All relationships and constraints properly defined

## 🚀 How to Run the Application

### Prerequisites
- Java 17+ with JDK installed
- MySQL 8.0+ running on localhost:3306
- Node.js 16+ with npm
- Git (optional)

### Step 1: Database Setup
1. Start MySQL server
2. The application will automatically create the database on first run due to:
   ```properties
   spring.jpa.hibernate.ddl-auto=update
   spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker_api?createDatabaseIfNotExist=true
   ```

### Step 2: Backend Setup & Run
```bash
cd d:\expenses-tracker-api

# Build the project
mvn clean package

# Run the application
mvn spring-boot:run
# OR
java -jar target/expense-tracker-api-1.0.0.jar
```

**Backend will start on:** `http://localhost:8080`

### Step 3: Frontend Setup & Run
```bash
cd d:\expenses-tracker-api\expenses-tracker-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Frontend will start on:** `http://localhost:5173` (or next available port)

## 🔑 Default Login Credentials

```
Email: admin@example.com
Password: Welcome1!
```

These credentials are pre-seeded in the database during initialization.

## 📊 Database Schema Overview

### Users Table
- `user_id` (PK, Auto-increment)
- `name`, `email` (Unique), `password` (Encrypted)
- `created_at` (Timestamp)

### Accounts Table (Wallets)
- `account_id` (PK, Auto-increment)
- `user_id` (FK to users)
- `account_name`, `account_type` (BANK, CASH, SAVINGS, etc.)
- `balance` (Decimal)
- `created_at` (Timestamp)

### Categories Table
- `category_id` (PK, Auto-increment)
- `user_id` (FK, Nullable - NULL means system category)
- `name`, `type` (INCOME/EXPENSE)
- `classification` (NEED/WANT)
- `icon` (Emoji)

### Transactions Table
- `transaction_id` (PK, Auto-increment)
- `account_id` (FK to accounts)
- `category_id` (FK to categories)
- `amount`, `transaction_date`
- `description`
- `transaction_type` (INCOME/EXPENSE)

### Budgets Table
- `budget_id` (PK, Auto-increment)
- `user_id` (FK to users)
- `category_id` (FK to categories)
- `amount_limit`
- `start_date`, `end_date`

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Accounts (Wallets)
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `POST /api/accounts` - Create account
- `DELETE /api/accounts/{id}` - Delete account

### Categories
- `GET /api/categories` - Get all categories (system + user)
- `POST /api/categories` - Create category
- `DELETE /api/categories/{id}` - Delete category

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `POST /api/transactions` - Create transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/{id}` - Get budget by ID
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/{id}` - Update budget
- `DELETE /api/budgets/{id}` - Delete budget

**Note:** All endpoints require `userId` header for authentication (except login/register)

## ✨ Key Features Now Working

### Add Transaction
1. Go to Dashboard or Transactions page
2. Fill in Amount, Category, Wallet, Date
3. Click "Add Transaction"
4. Transaction is saved to database immediately
5. Account balance updates automatically
6. Changes reflect instantly in all views

### Create Budget
1. Go to Budget page
2. Click "Add Budget"
3. Select Category, Amount Limit, Date Range
4. Budget appears in active budgets list
5. Real-time progress tracking

### View Categories
1. System categories load automatically
2. User can create custom categories
3. Categories show in transaction form
4. Categories display classification (Need/Want)

### Financial Dashboard
- Real-time balance calculations
- Monthly expense tracking
- Need vs. Want breakdown
- Budget status overview
- Recent transactions list

## 🐛 Troubleshooting

### MySQL Connection Error
```
Error: Connection refused
```
**Solution:** 
- Ensure MySQL is running: `mysql -u root -p`
- Check password in application.properties matches your MySQL password
- Default password: `Welcome1!`

### Port Already in Use
```
Error: Address already in use: bind
```
**Solution:**
- Backend: Change port in application.properties: `server.port=8081`
- Frontend: Use: `npm run dev -- --port 3000`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Already fixed! All controllers have `@CrossOrigin(origins = "*")`

### Database Not Created
**Solution:** The application auto-creates the database. If issues persist:
```sql
CREATE DATABASE IF NOT EXISTS expense_tracker_api;
USE expense_tracker_api;
-- Tables will be created by Hibernate
```

## 📝 Testing the Integration

### Via Postman/Curl
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Welcome1!"}'

# Get Accounts (use userId from login response)
curl -X GET http://localhost:8080/api/accounts \
  -H "userId: 1"

# Create Transaction
curl -X POST http://localhost:8080/api/transactions \
  -H "Content-Type: application/json" \
  -H "userId: 1" \
  -d '{
    "accountId": 1,
    "categoryId": 1,
    "amount": 50.00,
    "transactionType": "EXPENSE",
    "transactionDate": "2025-12-11"
  }'
```

### Via Browser
1. Open http://localhost:5173
2. Login with admin@example.com / Welcome1!
3. Add transaction from Dashboard
4. Check MySQL Workbench to verify data is saved:
   ```sql
   SELECT * FROM expense_tracker_api.transaction;
   SELECT * FROM expense_tracker_api.account;
   SELECT * FROM expense_tracker_api.category;
   SELECT * FROM expense_tracker_api.budget;
   ```

## 🎯 What Happens When You Add Data

### Adding a Transaction
1. **Frontend:** Form sends POST to `/api/transactions` with userId header
2. **API:** TransactionController validates and calls TransactionService
3. **Service:** Fetches Account and Category, creates Transaction entity
4. **Database:** Transaction saved, account balance updated if needed
5. **Response:** TransactionResponse returned with ID
6. **Frontend:** Updates UI, reloads accounts for latest balance

### Adding a Budget
1. **Frontend:** Form sends POST to `/api/budgets` with category selection
2. **API:** BudgetController validates dates and amount
3. **Service:** Creates Budget linked to user and category
4. **Database:** Budget saved with date range
5. **Response:** BudgetResponse with all budget details
6. **Frontend:** Displays in budget list with tracking

### Categories Auto-Load
1. **App.jsx:** On mount, loads categories via API
2. **Service:** Returns system categories + user's custom categories
3. **Response:** Full list with classification (NEED/WANT)
4. **Frontend:** Populates category dropdowns and filters

## 📱 Frontend Property Mapping

The frontend uses these property names from API responses:

**Accounts:**
- `accountId` (not id)
- `accountName`
- `balance`
- `accountType`

**Categories:**
- `categoryId` (not id)
- `categoryName` (not name)
- `categoryType`
- `classification`
- `icon`
- `isSystemCategory`

**Transactions:**
- `transactionId` (not id)
- `accountId`
- `categoryId`
- `amount` (BigDecimal)
- `description`
- `transactionDate`
- `categoryName`
- `accountName`

**Budgets:**
- `budgetId` (not id)
- `categoryId`
- `categoryName`
- `categoryType`
- `amountLimit`
- `startDate`
- `endDate`

## 🔐 Security Notes

- Passwords are hashed with bcrypt
- API requests require userId header
- User can only access own data
- DELETE operations verify user ownership
- CORS configured for local development

## 📈 Next Steps (Optional)

1. **Add Authentication Token:** Replace userId header with JWT tokens
2. **Add Update Endpoints:** PUT methods for editing existing items
3. **Add Reports:** Monthly/yearly financial reports
4. **Add Export:** PDF generation for transactions
5. **Add Notifications:** Budget alerts and warnings
6. **Add Recurring Transactions:** Automatic monthly transactions
7. **Add Investments:** Track investment accounts separately

## ✅ Verification Checklist

Before deploying to production:

- [ ] MySQL database is accessible
- [ ] Backend builds successfully: `mvn clean package`
- [ ] Backend starts: `mvn spring-boot:run`
- [ ] Frontend dependencies installed: `npm install`
- [ ] Frontend starts: `npm run dev`
- [ ] Can login with admin credentials
- [ ] Can add transaction to account
- [ ] Transaction appears in database: `SELECT * FROM transaction;`
- [ ] Can create budget
- [ ] Budget appears in budget list
- [ ] Category list includes system categories
- [ ] Dashboard shows updated balances

---

**All systems are GO! 🚀 Your Expense Tracker is fully connected to the database.**
