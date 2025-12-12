import { useState } from 'react';
import { AddTransactionForm } from '../components/AddTransactionForm';
import { TransactionList } from '../components/TransactionList';
import { TransactionFilters } from '../components/TransactionFilters';
import { Receipt, Download } from 'lucide-react';

export function Transactions({ 
  transactions, 
  categories,
  wallets, 
  onAddTransaction,
  onAddCategory,
  onDelete 
}) {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleExport = () => {
    const csv = [
      ['Date', 'Category', 'Classification', 'Description', 'Amount', 'Wallet'],
      ...transactions.map(t => {
        const category = categories.find(c => c.categoryId === t.categoryId);
        const wallet = wallets.find(w => w.accountId === t.accountId);
        return [
          t.transactionDate,
          category?.categoryName || 'Unknown',
          category?.classification || 'want',
          t.description,
          t.amount.toString(),
          wallet?.accountName || ''
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount || 0)), 0);
  
  // Calculate need vs want
  const needExpenses = transactions
    .filter(t => categories.find(c => c.categoryId === t.categoryId)?.classification === 'need')
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount || 0)), 0);
  
  const wantExpenses = transactions
    .filter(t => categories.find(c => c.categoryId === t.categoryId)?.classification === 'want')
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount || 0)), 0);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Transactions</h1>
              <p className="text-gray-500">Manage all your expenses</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-gray-600 mb-2">Total Transactions</div>
                <div className="text-gray-900">{transactions.length}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-gray-600 mb-2">Needs</div>
                <div className="text-blue-600">
                  ${needExpenses.toFixed(2)}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-gray-600 mb-2">Wants</div>
                <div className="text-orange-600">
                  ${wantExpenses.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="w-5 h-5 text-blue-500" />
                  <h2 className="text-gray-900">All Transactions</h2>
                </div>
                <TransactionFilters 
                  transactions={transactions}
                  categories={categories}
                  onFilterChange={setFilteredTransactions}
                />
              </div>
              <TransactionList 
                transactions={filteredTransactions}
                categories={categories}
                wallets={wallets}
                onDelete={onDelete}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="sticky top-24">
              <AddTransactionForm 
                wallets={wallets}
                categories={categories}
                onAddTransaction={onAddTransaction}
                onAddCategory={onAddCategory}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
