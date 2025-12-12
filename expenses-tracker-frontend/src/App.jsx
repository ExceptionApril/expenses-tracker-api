import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Wallets } from './pages/Wallets';
import { Budget } from './pages/Budget';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { accountsAPI, categoriesAPI, transactionsAPI, budgetsAPI } from './services/api';

// Helper to normalize category data
const normalizeCategory = (cat) => ({
  ...cat,
  classification: cat.classification ? cat.classification.toLowerCase() : 'want',
});

// Helper to normalize transaction data
const normalizeTransaction = (txn) => ({
  ...txn,
  transactionType: txn.transactionType ? txn.transactionType.toLowerCase() : 'expense',
});

// Helper to normalize account data
const normalizeAccount = (acc) => ({
  ...acc,
  accountType: acc.accountType ? acc.accountType.toLowerCase() : 'cash',
});

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthChange = () => setAuth(!!localStorage.getItem('token'));
    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  useEffect(() => {
    if (auth) loadData();
    else setLoading(false);
  }, [auth]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsRes, categoriesRes, transactionsRes, budgetsRes] = await Promise.all([
        accountsAPI.getAll(),
        categoriesAPI.getAll(),
        transactionsAPI.getAll(),
        budgetsAPI.getAll(),
      ]);
      if (accountsRes?.success) setWallets((accountsRes.data || []).map(normalizeAccount));
      if (categoriesRes?.success) setCategories((categoriesRes.data || []).map(normalizeCategory));
      if (transactionsRes?.success) setTransactions((transactionsRes.data || []).map(normalizeTransaction));
      if (budgetsRes?.success) setBudgets(budgetsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await transactionsAPI.create(transaction);
      if (response?.success) {
        setTransactions([normalizeTransaction(response.data), ...transactions]);
        const accountsRes = await accountsAPI.getAll();
        if (accountsRes?.success) setWallets((accountsRes.data || []).map(normalizeAccount));
      } else console.error('Error adding transaction:', response?.message);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await transactionsAPI.delete(id);
      if (response?.success) {
        setTransactions(transactions.filter(t => t.transactionId !== id));
        const accountsRes = await accountsAPI.getAll();
        if (accountsRes?.success) setWallets(accountsRes.data || []);
      } else console.error('Error deleting transaction:', response?.message);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleAddCategory = async (category) => {
    try {
      const response = await categoriesAPI.create({
        name: category.name,
        type: category.type || 'EXPENSE',
        classification: category.classification,
      });
      if (response?.success) {
        setCategories([...categories, normalizeCategory(response.data)]);
      } else console.error('Error adding category:', response?.message);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = (id, updates) => {
    setCategories(categories.map(c => c.categoryId === id ? { ...c, ...updates } : c));
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await categoriesAPI.delete(id);
      if (response?.success) setCategories(categories.filter(c => c.categoryId !== id));
      else console.error('Error deleting category:', response?.message);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddBudget = async (budget) => {
    try {
      const response = await budgetsAPI.create(budget);
      if (response?.success) setBudgets([...budgets, response.data]);
      else console.error('Error adding budget:', response?.message);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleUpdateBudget = async (id, updates) => {
    try {
      const response = await budgetsAPI.update(id, updates);
      if (response?.success) setBudgets(budgets.map(b => b.budgetId === id ? response.data : b));
      else console.error('Error updating budget:', response?.message);
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      const response = await budgetsAPI.delete(id);
      if (response?.success) setBudgets(budgets.filter(b => b.budgetId !== id));
      else console.error('Error deleting budget:', response?.message);
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleAddWallet = async (wallet) => {
    try {
      const response = await accountsAPI.create({
        accountName: wallet.accountName,
        accountType: wallet.accountType.toUpperCase(),
        balance: wallet.balance || 0,
      });
      if (response?.success) setWallets([...wallets, normalizeAccount(response.data)]);
      else console.error('Error adding wallet:', response?.message);
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  const handleUpdateWallet = (id, updates) => {
    setWallets(wallets.map(w => w.accountId === id ? { ...w, ...updates } : w));
  };

  const handleDeleteWallet = async (id) => {
    try {
      const response = await accountsAPI.delete(id);
      if (response?.success) setWallets(wallets.filter(w => w.accountId !== id));
      else console.error('Error deleting wallet:', response?.message);
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {!auth ? (
        <Login />
      ) : (
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    transactions={transactions}
                    budgets={budgets}
                    categories={categories}
                    wallets={wallets}
                    onAddTransaction={handleAddTransaction}
                    onAddCategory={handleAddCategory}
                    onAddBudget={handleAddBudget}
                    onUpdateBudget={handleUpdateBudget}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    categories={categories}
                    wallets={wallets}
                    onAddTransaction={handleAddTransaction}
                    onAddCategory={handleAddCategory}
                    onDelete={handleDeleteTransaction}
                  />
                }
              />
              <Route
                path="/wallets"
                element={
                  <Wallets
                    wallets={wallets}
                    transactions={transactions}
                    categories={categories}
                    onAddWallet={handleAddWallet}
                    onUpdateWallet={handleUpdateWallet}
                    onDeleteWallet={handleDeleteWallet}
                  />
                }
              />
              <Route
                path="/budget"
                element={
                  <Budget
                    budgets={budgets}
                    categories={categories}
                    transactions={transactions}
                    onAddBudget={handleAddBudget}
                    onUpdateBudget={handleUpdateBudget}
                    onDeleteBudget={handleDeleteBudget}
                  />
                }
              />
              <Route
                path="/analytics"
                element={
                  <Analytics
                    transactions={transactions}
                    categories={categories}
                    wallets={wallets}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    categories={categories}
                    onAddCategory={handleAddCategory}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}
