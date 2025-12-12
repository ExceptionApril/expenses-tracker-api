# Quick Reference Card - Expense Tracker

## 🚀 QUICK START

### One-Click Launch
```
double-click: d:\expenses-tracker-api\start-all.bat
```

### Manual Start
```bash
# Terminal 1:
cd d:\expenses-tracker-api
java -jar target/expense-tracker-api-1.0.0.jar

# Terminal 2:
cd d:\expenses-tracker-api\expenses-tracker-frontend
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:3306

---

## 📋 COMPLETE FEATURE CHECKLIST

### ✅ Login & Authentication
- Register new account
- Login with email/password
- Token-based authentication
- Persistent sessions
- Logout functionality

### ✅ Dashboard (Main View After Login)
- Total balance from all wallets
- Monthly expense summary
- Recent transactions (5 most recent)
- Budget overview
- Category spending breakdown
- Real-time data refresh

### ✅ Transactions Management
- Create transactions with:
  - Amount ($)
  - Category (dropdown)
  - Wallet/Account (dropdown)
  - Description (text)
  - Date (picker)
- View all transactions in list
- Delete transactions
- Automatic balance updates
- Filter by category
- Filter by wallet
- Sort by date

### ✅ Wallet/Account Management
- Create multiple wallets
- Account types:
  - Cash
  - Bank account
  - E-wallet
  - Credit card
  - Debit card
- Set initial balance
- Color-coded display
- Total balance calculation
- Delete accounts
- Card visualization for credit cards

### ✅ Category Management
- Create expense categories
- Set category type (Expense/Income)
- Set classification (Need/Want/Save)
- View all categories
- Delete categories
- Immediately available in transaction dropdown
- Used for filtering and budgeting

### ✅ Budget Planning
- Create budget limits
- Set per category
- Date range selection
- Spending vs budget tracking
- Visual indicators
- Monthly budget overview

### ✅ Analytics & Reports
- Category breakdown charts
- Spending trends
- Budget utilization analysis
- Monthly reports
- Visual data representation

---

## 🎯 TYPICAL USER JOURNEY

### First Time User
```
1. Register at login page
2. Verify account created
3. Dashboard loads with $0 balance
4. Click "Wallets" → "Add New Wallet"
5. Add wallet: "My Bank" - Bank - $1000
6. See balance updated to $1000 on dashboard
7. Click "Settings" → "Add Category"
8. Add category: "Groceries" - Expense - Need
9. Click "Transactions" → "Add Transaction"
10. Create: Account="My Bank", Category="Groceries", Amount=$50
11. See balance update to $950
12. See transaction in list
13. Click analytics to see spending breakdown
```

---

## 🔧 TROUBLESHOOTING

### Backend won't start
```
1. Check MySQL is running: net start MySQL80
2. Check port 8080 is free
3. Check application.properties has correct DB password
4. Check target/expense-tracker-api-1.0.0.jar exists
```

### Frontend won't start
```
1. Check npm install completed
2. Check port 5173 is free
3. Check backend is running on 8080
4. Clear node_modules and reinstall if needed
```

### Can't login
```
1. Check MySQL database exists
2. Check user registration successful
3. Check email/password correct
4. Check backend logs for errors
5. Check browser console for errors
```

### Balance not updating
```
1. Refresh page (F5)
2. Check network tab for API errors
3. Check backend logs
4. Verify transaction was created in database
5. Check accountsAPI.getAll() being called
```

### Category/Wallet not appearing in dropdown
```
1. Refresh page (F5)
2. Check item was actually created
3. Check no JavaScript errors in console
4. Verify backend response contains categoryId/accountId
5. Check state is being updated in React
```

---

## 📊 API ENDPOINTS SUMMARY

| Feature | Method | Endpoint |
|---------|--------|----------|
| Login | POST | /api/auth/login |
| Register | POST | /api/auth/register |
| Get Wallets | GET | /api/accounts |
| Add Wallet | POST | /api/accounts |
| Delete Wallet | DELETE | /api/accounts/{id} |
| Get Categories | GET | /api/categories |
| Add Category | POST | /api/categories |
| Delete Category | DELETE | /api/categories/{id} |
| Get Transactions | GET | /api/transactions |
| Add Transaction | POST | /api/transactions |
| Delete Transaction | DELETE | /api/transactions/{id} |
| Get Budgets | GET | /api/budgets |
| Add Budget | POST | /api/budgets |
| Update Budget | PUT | /api/budgets/{id} |
| Delete Budget | DELETE | /api/budgets/{id} |

---

## 💾 DATABASE INFO

**Credentials**:
- Host: localhost
- Port: 3306
- Database: expense_tracker_api
- Username: root
- Password: Welcome1!

**Auto-Created Tables**:
- users
- accounts (wallets)
- categories
- transactions
- budgets

---

## 📁 KEY FILES

**Frontend**:
- App.jsx - Main app with routing
- Login.jsx - Authentication page
- Dashboard.jsx - Main dashboard
- Transactions.jsx - Transaction management
- Wallets.jsx - Wallet management
- Settings.jsx - Category management
- api.js - API client

**Backend**:
- pom.xml - Maven configuration
- application.properties - Server config
- Controllers - REST endpoints
- Services - Business logic
- Models - Database entities

---

## ✨ STATUS

✅ **Ready**: YES
✅ **All Features**: Working
✅ **Integration**: Complete
✅ **Testing**: Ready
✅ **Documentation**: Provided

---

## 📞 NEXT STEPS

1. **Start Application**
   ```
   Run: start-all.bat
   ```

2. **Test Core Flow**
   - Register account
   - Add wallet
   - Add category
   - Add transaction
   - Verify balance update

3. **Run Full Tests**
   - Follow [INTEGRATION_TEST_GUIDE.md](./INTEGRATION_TEST_GUIDE.md)
   - Test all 10 critical paths

4. **Review Documentation**
   - [FINAL_INTEGRATION_SUMMARY.md](./FINAL_INTEGRATION_SUMMARY.md)
   - [COMPLETION_REPORT.md](./COMPLETION_REPORT.md)

5. **Deploy When Ready**
   - Backend: Build WAR or run JAR
   - Frontend: `npm run build` then deploy dist/

---

**Last Updated**: December 12, 2025  
**Version**: 1.0.0  
**Status**: ✨ PRODUCTION READY FOR TESTING
