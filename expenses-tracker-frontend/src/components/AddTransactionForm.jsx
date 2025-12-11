import { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';

export function AddTransactionForm({ wallets, categories, onAddTransaction, onAddCategory }) {
  const [amount, setAmount] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  // Safety check: handle case where wallets array might be empty initially
  const [accountId, setAccountId] = useState(wallets && wallets.length > 0 ? wallets[0].id : '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [classification, setClassification] = useState('need');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter categories based on input
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categoryInput.toLowerCase())
  );

  const handleCategoryInputChange = (value) => {
    setCategoryInput(value);
    setCategoryId('');
    setShowSuggestions(true);
  };

  const handleSelectCategory = (cat) => {
    setCategoryInput(cat.name);
    setCategoryId(cat.id);
    // Auto-select classification based on the category's default
    if (cat.classification) {
        setClassification(cat.classification.toLowerCase());
    }
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!amount || !categoryInput || !accountId) return;

    let finalCategoryId = categoryId;

    // If user typed a custom category (not selected from dropdown)
    if (!categoryId && onAddCategory) {
      const existingCategory = categories.find(
        c => c.name.toLowerCase() === categoryInput.toLowerCase()
      );

      if (existingCategory) {
        finalCategoryId = existingCategory.id;
        // Update classification if existing category found
        if(existingCategory.classification) {
            setClassification(existingCategory.classification.toLowerCase());
        }
      } else {
        // Create new category
        const newCategoryId = Date.now().toString();
        onAddCategory({
          name: categoryInput,
          type: 'expense',
          classification: classification,
        });
        finalCategoryId = newCategoryId;
      }
    }

    // Prepare payload
    onAddTransaction({
      amount: parseFloat(amount),
      categoryId: finalCategoryId,
      description,
      accountId,
      transactionDate: date,
      // MAP CLASSIFICATION TO PRIORITY
      // 'need' -> 'High', 'want' -> 'Low'
      priority: classification === 'need' ? 'High' : 'Low' 
    });

    // Reset form
    setAmount('');
    setCategoryInput('');
    setCategoryId('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setClassification('need');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-blue-500" />
        <h2 className="text-gray-900">Add Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Category - Text Input with Autocomplete */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => handleCategoryInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Type or select category"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && categoryInput && filteredCategories.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredCategories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="text-gray-900">{cat.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      (cat.classification || 'need').toLowerCase() === 'need' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {(cat.classification === 'need' ? 'Need' : 'Want')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wallet */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Wallet
            </label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Wallet</option>
              {wallets.map(w => (
                <option key={w.id} value={w.id}>{w.accountName}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Classification / Priority Selector
            Always visible so user can override priority even for existing categories 
        */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Classification (Priority)
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="classification"
                value="need"
                checked={classification === 'need'}
                onChange={(e) => setClassification(e.target.value)}
                className="w-4 h-4 text-blue-500"
              />
              <span className="text-sm text-gray-700">Need (High Priority)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="classification"
                value="want"
                checked={classification === 'want'}
                onChange={(e) => setClassification(e.target.value)}
                className="w-4 h-4 text-orange-500"
              />
              <span className="text-sm text-gray-700">Want (Low Priority)</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}