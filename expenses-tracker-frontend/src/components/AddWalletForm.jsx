import { useState } from 'react';
import { Wallet, CreditCard } from 'lucide-react';

export function AddWalletForm({ onAddWallet }) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('CASH'); // Default type
  const [color, setColor] = useState('#3B82F6');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !balance) return;

    // ALIGNMENT: User owns Account (Backend attaches User ID via Token)
    onAddWallet({
      accountName: name,
      accountType: type, // ALIGNMENT: "Places to keep money" (GCash, Bank, etc)
      balance: parseFloat(balance),
      color
    });

    setName('');
    setBalance('');
    setType('CASH');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Wallet</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name (e.g., "My BDO", "GCash") */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. GCash, BDO Savings"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Account Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CASH">Cash</option>
            <option value="BANK">Bank Account</option>
            <option value="GCASH">GCash / Digital Wallet</option>
            <option value="SAVINGS">Savings</option>
          </select>
        </div>

        {/* Initial Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Color Picker (Visuals) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Label</label>
          <div className="flex gap-2">
            {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full transition-transform ${color === c ? 'scale-110 ring-2 ring-offset-2 ring-gray-400' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Wallet
        </button>
      </form>
    </div>
  );
}