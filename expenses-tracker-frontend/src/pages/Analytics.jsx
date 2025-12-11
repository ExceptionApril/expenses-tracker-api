import { BarChart3, TrendingDown, Calendar, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Analytics({ transactions, categories, wallets }) {
  // Get last 6 months data
  const getLast6Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        year: date.getFullYear(),
        monthIndex: date.getMonth()
      });
    }
    return months;
  };

  const last6Months = getLast6Months();

  const monthlyData = last6Months.map(({ month, year, monthIndex }) => {
    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.transactionDate);
      return tDate.getMonth() === monthIndex && tDate.getFullYear() === year;
    });

    const total = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const needs = monthTransactions
      .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'need')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const wants = monthTransactions
      .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'want')
      .reduce((sum, t) => sum + t.amount, 0);

    return { month, total, needs, wants };
  });

  // Category insights
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([catId, amount]) => {
      const category = categories.find(c => c.id === catId);
      return {
        id: catId,
        name: category?.name || 'Unknown',
        classification: category?.classification || 'want',
        amount
      };
    });

  // Wallet insights
  const walletStats = wallets.map(wallet => {
    const walletTxns = transactions.filter(t => t.accountId === wallet.id);
    const expenses = walletTxns.reduce((sum, t) => sum + t.amount, 0);
    return {
      ...wallet,
      transactionCount: walletTxns.length,
      expenses
    };
  }).sort((a, b) => b.transactionCount - a.transactionCount);

  // Overall stats
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const needsTotal = transactions
    .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'need')
    .reduce((sum, t) => sum + t.amount, 0);
  const wantsTotal = transactions
    .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'want')
    .reduce((sum, t) => sum + t.amount, 0);
  const needsPercentage = totalExpenses > 0 ? (needsTotal / totalExpenses) * 100 : 0;

  const maxValue = Math.max(...monthlyData.map(d => d.total));

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">Analytics</h1>
          <p className="text-gray-500">Insights and trends from your spending data</p>
        </div>
      </header>

      <main className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-gray-600 mb-2">Total Expenses</div>
            <div className="text-red-600 mb-1">${totalExpenses.toFixed(2)}</div>
            <div className="text-xs text-gray-500">All time</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-gray-600 mb-2">Needs</div>
            <div className="text-blue-600 mb-1">${needsTotal.toFixed(2)}</div>
            <div className="text-xs text-gray-500">{needsPercentage.toFixed(0)}% of total</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-gray-600 mb-2">Wants</div>
            <div className="text-orange-600 mb-1">${wantsTotal.toFixed(2)}</div>
            <div className="text-xs text-gray-500">{(100 - needsPercentage).toFixed(0)}% of total</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-gray-600 mb-2">Monthly Average</div>
            <div className="text-gray-900 mb-1">${(totalExpenses / 6).toFixed(2)}</div>
            <div className="text-xs text-gray-500">Last 6 months</div>
          </div>
        </div>

        {/* Overview Section with Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Overview</h2>
            <div className="text-sm text-gray-500">Last 6 months</div>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h2 className="text-gray-900">6-Month Spending Trend</h2>
            </div>

            {/* Chart */}
            <div className="space-y-6">
              {monthlyData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex gap-2 h-8">
                        {/* Needs bar */}
                        <div className="flex-1 relative">
                          <div 
                            className="absolute bottom-0 w-full bg-blue-500 rounded transition-all"
                            style={{ height: `${maxValue > 0 ? (data.needs / maxValue) * 100 : 0}%` }}
                          />
                        </div>
                        {/* Wants bar */}
                        <div className="flex-1 relative">
                          <div 
                            className="absolute bottom-0 w-full bg-orange-500 rounded transition-all"
                            style={{ height: `${maxValue > 0 ? (data.wants / maxValue) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm w-48">
                      <span className="text-blue-600">${data.needs.toFixed(0)}</span>
                      <span className="text-orange-600">${data.wants.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span className="text-sm text-gray-600">Needs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded" />
                <span className="text-sm text-gray-600">Wants</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-blue-500" />
                <h3 className="text-gray-900">Top Spending Categories</h3>
              </div>
              <div className="space-y-3">
                {topCategories.length === 0 ? (
                  <div className="text-sm text-gray-400 text-center py-4">
                    No expense data
                  </div>
                ) : (
                  topCategories.map((category, index) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-gray-700 truncate block">{category.name}</span>
                          <span className={`text-xs ${
                            category.classification === 'need' ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {category.classification === 'need' ? 'Need' : 'Want'}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-900">${category.amount.toFixed(0)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Wallet Usage */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Wallet Activity</h3>
              <div className="space-y-4">
                {walletStats.map(wallet => (
                  <div key={wallet.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: wallet.color }}
                        />
                        <span className="text-sm text-gray-700">{wallet.accountName}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {wallet.transactionCount} txns
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 capitalize">{wallet.accountType.replace('-', ' ')}</span>
                      <span className="text-red-600">-${wallet.expenses.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5" />
                <span className="text-sm opacity-90">Spending Breakdown</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Needs</span>
                  <span>${needsTotal.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Wants</span>
                  <span>${wantsTotal.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="text-sm opacity-90">Total</span>
                  <span>${totalExpenses.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
