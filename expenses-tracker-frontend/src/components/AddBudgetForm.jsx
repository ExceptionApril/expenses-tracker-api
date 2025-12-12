    import { useState } from 'react';
import { Calendar, DollarSign, Tag } from 'lucide-react';

export function AddBudgetForm({ categories, onAddBudget }) {
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  // Default to current month start/end
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !categoryId || !startDate || !endDate) return;

    // ALIGNMENT: User sets Budget (Linked to User & Category with Date Limits)
    onAddBudget({
      amountLimit: parseFloat(amount),
      categoryId: categoryId,
      startDate: startDate, // Handles "History" logic
      endDate: endDate
    });

    setAmount('');
    setCategoryId('');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Monthly Limit</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* RELATION: Category has_limit Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories
                .filter(c => c.type === 'EXPENSE') // Budgets usually for expenses
                .map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Limit Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* RELATION: History Control (Start/End Dates) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}