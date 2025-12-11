import { PieChart } from 'lucide-react';

export function CategoryChart({ transactions, categories }) {
  // Calculate category totals using category IDs
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + transaction.amount;
    return acc;
  }, {});

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Sort categories by amount and get category names
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([catId, amount]) => {
      const category = categories.find(c => c.id === catId);
      return {
        id: catId,
        name: category?.name || 'Unknown',
        amount,
        classification: category?.classification || 'want'
      };
    });

  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#8B5CF6', // purple
    '#EF4444', // red
  ];

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-blue-500" />
          <h3 className="text-gray-900">Expenses by Category</h3>
        </div>
        <div className="text-center py-8 text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-blue-500" />
        <h3 className="text-gray-900">Expenses by Category</h3>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {sortedCategories.map((category, index) => {
          const percentage = (category.amount / totalExpenses) * 100;
          return (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-sm text-gray-700">
                    {category.name}
                    <span className={`ml-1 text-xs ${category.classification === 'need' ? 'text-blue-600' : 'text-orange-600'}`}>
                      ({category.classification === 'need' ? 'Need' : 'Want'})
                    </span>
                  </span>
                </div>
                <div className="text-sm text-gray-900">
                  ${category.amount.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: colors[index]
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-12 text-right">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Total Expenses</span>
          <span className="text-gray-900">${totalExpenses.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
