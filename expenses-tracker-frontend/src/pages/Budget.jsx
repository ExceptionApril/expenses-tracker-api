import { useState } from 'react';
import { Target, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

export function Budget({ budgets, categories, transactions, onAddBudget, onUpdateBudget, onDeleteBudget }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    categoryId: '',
    amountLimit: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const tDate = new Date(t.transactionDate);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
  });

  // Get active budgets (current date within start/end range)
  const activeBudgets = budgets.filter(b => {
    const start = new Date(b.startDate);
    const end = new Date(b.endDate);
    const now = new Date();
    return now >= start && now <= end;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBudget.categoryId || !newBudget.amountLimit) return;

    onAddBudget({
      categoryId: newBudget.categoryId,
      amountLimit: parseFloat(newBudget.amountLimit),
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
    });

    setNewBudget({
      categoryId: '',
      amountLimit: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    });
    setShowAddForm(false);
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategorySpending = (categoryId) => {
    return monthlyTransactions
      .filter(t => t.categoryId === categoryId)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const totalBudget = activeBudgets.reduce((sum, b) => sum + b.amountLimit, 0);
  const totalSpent = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRemaining = totalBudget - totalSpent;
  const totalPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">Budget</h1>
          <p className="text-gray-500">Track and manage your category budgets</p>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Budget Section */}
          <div className="lg:col-span-2">
            {/* Overall Budget Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-gray-900">Total Monthly Budget</h2>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Budget
                </button>
              </div>

              {totalBudget === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">No budget set</div>
                  <div className="text-sm text-gray-500">Click "Add Budget" to create category budgets</div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-gray-900 mb-2">${totalBudget.toFixed(2)}</div>
                    <p className="text-sm text-gray-500">Total budget limit</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600">Spent: ${totalSpent.toFixed(2)}</span>
                      <span className={`${
                        totalPercentage > 100 ? 'text-red-600' :
                        totalPercentage > 80 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {totalPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          totalPercentage > 100 ? 'bg-red-500' :
                          totalPercentage > 80 ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Remaining</div>
                      <div className={`${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(totalRemaining).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Active Budgets</div>
                      <div className="text-gray-900">{activeBudgets.length}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Transactions</div>
                      <div className="text-gray-900">{monthlyTransactions.length}</div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {totalPercentage > 80 && (
                    <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                      totalPercentage > 100 ? 'bg-red-50' : 'bg-orange-50'
                    }`}>
                      <AlertCircle className={`w-5 h-5 mt-0.5 ${
                        totalPercentage > 100 ? 'text-red-600' : 'text-orange-600'
                      }`} />
                      <div>
                        <div className={`text-sm ${
                          totalPercentage > 100 ? 'text-red-900' : 'text-orange-900'
                        }`}>
                          {totalPercentage > 100 
                            ? 'Budget exceeded! You have overspent this month.'
                            : 'Warning: You have used over 80% of your budget.'}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Add Budget Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h3 className="text-gray-900 mb-4">Create New Budget</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Category</label>
                      <select
                        value={newBudget.categoryId}
                        onChange={(e) => setNewBudget({ ...newBudget, categoryId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.classification === 'need' ? 'Need' : 'Want'})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Budget Limit</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newBudget.amountLimit}
                        onChange={(e) => setNewBudget({ ...newBudget, amountLimit: e.target.value })}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newBudget.startDate}
                        onChange={(e) => setNewBudget({ ...newBudget, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={newBudget.endDate}
                        onChange={(e) => setNewBudget({ ...newBudget, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Create Budget
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Category Budgets List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Category Budgets</h3>
              <div className="space-y-6">
                {activeBudgets.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No active budgets
                  </div>
                ) : (
                  activeBudgets.map((budget) => {
                    const category = categories.find(c => c.id === budget.categoryId);
                    const spent = getCategorySpending(budget.categoryId);
                    const percentage = (spent / budget.amountLimit) * 100;
                    const remaining = budget.amountLimit - spent;

                    return (
                      <div key={budget.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">{category?.name || 'Unknown'}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              category?.classification === 'need' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {category?.classification === 'need' ? 'Need' : 'Want'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onDeleteBudget(budget.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">
                            ${spent.toFixed(2)} / ${budget.amountLimit.toFixed(2)}
                          </span>
                          <span className={`${
                            percentage > 100 ? 'text-red-600' :
                            percentage > 80 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              percentage > 100 ? 'bg-red-500' :
                              percentage > 80 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over budget`}
                          {' • '}
                          {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Side Tips */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Budget Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Set separate budgets for each category to track spending better</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Focus on "Need" categories first when setting budgets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Review and adjust budgets monthly based on actual spending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Set budget periods that align with your income schedule</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
