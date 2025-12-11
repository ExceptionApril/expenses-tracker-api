import { Target, TrendingUp } from 'lucide-react';

export function BudgetCard({ budgets, categories, monthlyExpenses, onUpdateBudget }) {
  // Get active budgets (current date within start/end range)
  const activeBudgets = budgets.filter(b => {
    const start = new Date(b.startDate);
    const end = new Date(b.endDate);
    const now = new Date();
    return now >= start && now <= end;
  });

  const totalBudget = activeBudgets.reduce((sum, b) => sum + b.amountLimit, 0);
  const percentage = totalBudget > 0 ? (monthlyExpenses / totalBudget) * 100 : 0;
  const remaining = totalBudget - monthlyExpenses;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          <h3 className="text-gray-900">Monthly Budget</h3>
        </div>
      </div>

      {totalBudget === 0 ? (
        <div className="text-center py-6">
          <div className="text-gray-400 mb-2">No budget set</div>
          <div className="text-sm text-gray-500">Go to Budget page to set budgets</div>
        </div>
      ) : (
        <>
          <div className="text-gray-900 mb-4">${totalBudget.toFixed(2)}</div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Spent: ${monthlyExpenses.toFixed(2)}</span>
              <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percentage > 100 ? 'bg-red-500' :
                  percentage > 80 ? 'bg-orange-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Remaining Budget */}
          <div className={`p-3 rounded-lg ${
            remaining >= 0 ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="text-sm text-gray-600 mb-1">Remaining</div>
            <div className={remaining >= 0 ? 'text-green-700' : 'text-red-700'}>
              ${Math.abs(remaining).toFixed(2)}
            </div>
            {remaining < 0 && (
              <div className="text-sm text-red-600 mt-1">Over budget!</div>
            )}
          </div>

          {/* Active Budget Count */}
          {activeBudgets.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <TrendingUp className="w-4 h-4" />
                <span>{activeBudgets.length} active budget{activeBudgets.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
