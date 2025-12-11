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

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  // Default categories with Need/Want classification
  const defaultCategories = [
    { id: '1', name: 'Food & Dining', type: 'expense', classification: 'need' },
    { id: '2', name: 'Transportation', type: 'expense', classification: 'need' },
    { id: '3', name: 'Bills & Utilities', type: 'expense', classification: 'need' },
    { id: '4', name: 'Healthcare', type: 'expense', classification: 'need' },
    { id: '5', name: 'Shopping', type: 'expense', classification: 'want' },
    { id: '6', name: 'Entertainment', type: 'expense', classification: 'want' },
    { id: '7', name: 'Education', type: 'expense', classification: 'need' },
    { id: '8', name: 'Other', type: 'expense', classification: 'want' },
  ];

  const [categories, setCategories] = useState(defaultCategories);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [wallets, setWallets] = useState([
    { id: '1', accountName: 'Cash', accountType: 'cash', balance: 1500, color: '#10B981' },
    { id: '2', accountName: 'Bank Account', accountType: 'bank', balance: 8500, color: '#3B82F6' },
    { id: '3', accountName: 'GCash', accountType: 'e-wallet', balance: 2000, color: '#8B5CF6' },
  ]);

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(!!localStorage.getItem('token'));
    };
    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    const savedTransactions = localStorage.getItem('transactions');
    const savedBudgets = localStorage.getItem('budgets');
    const savedWallets = localStorage.getItem('wallets');

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    if (savedWallets) setWallets(JSON.parse(savedWallets));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [categories, transactions, budgets, wallets]);

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setTransactions([newTransaction, ...transactions]);

    // Update wallet balance (deduct for expenses)
    setWallets(wallets.map(w => {
      if (w.id === transaction.accountId) {
        return {
          ...w,
          balance: w.balance - transaction.amount
        };
      }
      return w;
    }));
  };

  const handleDeleteTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Restore wallet balance
    setWallets(wallets.map(w => {
      if (w.id === transaction.accountId) {
        return {
          ...w,
          balance: w.balance + transaction.amount
        };
      }
      return w;
    }));

    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = (id, updates) => {
    setCategories(categories.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleAddBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
    };
    setBudgets([...budgets, newBudget]);
  };

  const handleUpdateBudget = (id, updates) => {
    setBudgets(budgets.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const handleAddWallet = (wallet) => {
    const newWallet = {
      ...wallet,
      id: Date.now().toString(),
    };
    setWallets([...wallets, newWallet]);
  };

  const handleUpdateWallet = (id, updates) => {
    setWallets(wallets.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const handleDeleteWallet = (id) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

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
              <Route 
                path="/profile" 
                element={
                  <Profile />
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}
