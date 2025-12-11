import { useState } from 'react';
import { WalletCard } from '../components/WalletCard';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export function Wallets({ 
  wallets, 
  transactions, 
  categories,
  onAddWallet, 
  onUpdateWallet,
  onDeleteWallet 
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    accountName: '',
    accountType: 'cash',
    balance: '',
    color: '#3B82F6',
    cardNumber: '',
    cardHolder: '',
    expiryDate: ''
  });

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Pink', value: '#EC4899' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdateWallet(editingId, {
        accountName: formData.accountName,
        accountType: formData.accountType,
        color: formData.color
      });
      setEditingId(null);
    } else {
      const walletData = {
        accountName: formData.accountName,
        accountType: formData.accountType,
        balance: parseFloat(formData.balance),
        color: formData.color
      };
      
      // Add card-specific fields if it's a card type
      if (formData.accountType === 'credit-card' || formData.accountType === 'debit-card') {
        walletData.cardNumber = formData.cardNumber;
        walletData.cardHolder = formData.cardHolder;
        walletData.expiryDate = formData.expiryDate;
      }
      
      onAddWallet(walletData);
      setShowAddForm(false);
    }
    setFormData({ 
      accountName: '', 
      accountType: 'cash', 
      balance: '', 
      color: '#3B82F6',
      cardNumber: '',
      cardHolder: '',
      expiryDate: ''
    });
  };

  const handleEdit = (wallet) => {
    setEditingId(wallet.id);
    setFormData({
      accountName: wallet.accountName,
      accountType: wallet.accountType,
      balance: wallet.balance.toString(),
      color: wallet.color,
      cardNumber: wallet.cardNumber || '',
      cardHolder: wallet.cardHolder || '',
      expiryDate: wallet.expiryDate || ''
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ accountName: '', accountType: 'cash', balance: '', color: '#3B82F6', cardNumber: '', cardHolder: '', expiryDate: '' });
  };

  const getWalletTransactions = (walletId) => {
    return transactions.filter(t => t.accountId === walletId);
  };

  const getWalletStats = (walletId) => {
    const walletTxns = getWalletTransactions(walletId);
    const totalExpenses = walletTxns.reduce((sum, t) => sum + t.amount, 0);
    
    // Group by Need vs Want
    const needExpenses = walletTxns
      .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'need')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const wantExpenses = walletTxns
      .filter(t => categories.find(c => c.id === t.categoryId)?.classification === 'want')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { totalExpenses, needExpenses, wantExpenses, count: walletTxns.length };
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Wallets</h1>
              <p className="text-gray-500">Manage your payment methods and accounts</p>
            </div>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-gray-900 mb-4">
              {editingId ? 'Edit Wallet' : 'Add New Wallet'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Wallet Name</label>
                  <input
                    type="text"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="e.g., Savings Account, GCash"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Account Type</label>
                  <select
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                    <option value="e-wallet">E-Wallet</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                  </select>
                </div>
                {!editingId && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Initial Balance</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Color</label>
                <div className="flex gap-3">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color.value 
                          ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' 
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {(formData.accountType === 'credit-card' || formData.accountType === 'debit-card') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Card Holder</label>
                    <input
                      type="text"
                      value={formData.cardHolder}
                      onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {editingId ? 'Update' : 'Add'} Wallet
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map(wallet => {
            const stats = getWalletStats(wallet.id);
            return (
              <div key={wallet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-gray-900 mb-1">{wallet.accountName}</div>
                      <div className="text-sm text-gray-500 capitalize mb-2">
                        {wallet.accountType.replace('-', ' ')}
                      </div>
                      <div 
                        className="text-gray-900"
                        style={{ color: wallet.color }}
                      >
                        ${wallet.balance.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(wallet)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${wallet.accountName}? This cannot be undone.`)) {
                            onDeleteWallet(wallet.id);
                          }
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div 
                    className="w-full h-2 rounded-full mb-4"
                    style={{ backgroundColor: `${wallet.color}20` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: `${Math.min((wallet.balance / 10000) * 100, 100)}%`,
                        backgroundColor: wallet.color 
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Transactions</div>
                      <div className="text-sm text-gray-900">{stats.count}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Needs</div>
                      <div className="text-sm text-blue-600">${stats.needExpenses.toFixed(0)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Wants</div>
                      <div className="text-sm text-orange-600">${stats.wantExpenses.toFixed(0)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {wallets.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No wallets yet</div>
            <div className="text-sm text-gray-500 mb-4">Add your first wallet to get started</div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Wallet
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
