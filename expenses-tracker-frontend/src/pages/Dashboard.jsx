import { WalletCard } from '../components/WalletCard';
import { BudgetCard } from '../components/BudgetCard';
import { AddTransactionForm } from '../components/AddTransactionForm';
import { CategoryChart } from '../components/CategoryChart';
import { CardCarousel } from '../components/CardCarousel';
import { DollarSign, TrendingDown, ArrowUpRight } from 'lucide-react';

export function Dashboard({ 
  transactions, 
  budgets,
  categories,
  wallets, 
  onAddTransaction,
  onAddCategory,
  onUpdateBudget 
}) {
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const tDate = new Date(t.transactionDate);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
  });

  const monthlyExpenses = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Calculate total monthly budget
  const totalMonthlyBudget = budgets
    .filter(b => {
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      const now = new Date();
      return now >= start && now <= end;
    })
    .reduce((sum, b) => sum + b.amountLimit, 0);

  const recentTransactions = transactions.slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryClassification = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.classification || 'want';
  };

  // Group expenses by Need vs Want
  const needExpenses = monthlyTransactions
    .filter(t => getCategoryClassification(t.categoryId) === 'need')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const wantExpenses = monthlyTransactions
    .filter(t => getCategoryClassification(t.categoryId) === 'want')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your finances</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Balance</span>
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-gray-900">${totalBalance.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Across all wallets</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Monthly Expenses</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-gray-900">${monthlyExpenses.toFixed(2)}</div>
            <div className="text-xs text-red-600 mt-1">{monthlyTransactions.length} transactions</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Needs vs Wants</span>
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-gray-900">${needExpenses.toFixed(2)} / ${wantExpenses.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {needExpenses > 0 ? ((needExpenses / (needExpenses + wantExpenses)) * 100).toFixed(0) : 0}% needs
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Budget Left</span>
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-gray-900">
              ${totalMonthlyBudget > 0 ? (totalMonthlyBudget - monthlyExpenses).toFixed(2) : 'N/A'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {totalMonthlyBudget > 0 ? `${((1 - monthlyExpenses / totalMonthlyBudget) * 100).toFixed(0)}% remaining` : 'No budget set'}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Add Transaction */}
            <AddTransactionForm 
              wallets={wallets}
              categories={categories}
              onAddTransaction={onAddTransaction}
              onAddCategory={onAddCategory}
            />

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-900">Recent Transactions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentTransactions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 mb-2">No transactions yet</div>
                    <div className="text-sm text-gray-500">Add your first transaction above</div>
                  </div>
                ) : (
                  recentTransactions.map(transaction => {
                    const category = categories.find(c => c.id === transaction.categoryId);
                    return (
                      <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-900">{category?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(transaction.transactionDate)} • {category?.classification === 'need' ? 'Need' : 'Want'}
                            </div>
                          </div>
                          <div className="text-red-600">
                            -${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Budget Card */}
            <BudgetCard 
              budgets={budgets}
              categories={categories}
              monthlyExpenses={monthlyExpenses}
              onUpdateBudget={onUpdateBudget}
            />

            {/* Cards Section with Carousel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Cards</h3>
              <CardCarousel wallets={wallets} />
            </div>

            {/* Other E-Wallets - Scrollable */}
            {wallets.filter(w => w.accountType !== 'credit-card' && w.accountType !== 'debit-card').length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">E-Wallets & Accounts</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {wallets
                    .filter(w => w.accountType !== 'credit-card' && w.accountType !== 'debit-card')
                    .map(wallet => (
                      <WalletCard key={wallet.id} wallet={wallet} />
                    ))
                  }
                </div>
              </div>
            )}

            {/* Category Chart */}
            <CategoryChart 
              transactions={monthlyTransactions}
              categories={categories}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
