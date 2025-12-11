import { useState } from 'react';
import { Settings as SettingsIcon, Download, Upload, Trash2, Database, Tag, Plus, Edit2, X } from 'lucide-react';

export function Settings({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    classification: 'need'
  });
  const [editedName, setEditedName] = useState('');
  const [editedClassification, setEditedClassification] = useState('need');

  const handleExportData = () => {
    const data = {
      categories: localStorage.getItem('categories'),
      transactions: localStorage.getItem('transactions'),
      budgets: localStorage.getItem('budgets'),
      wallets: localStorage.getItem('wallets'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        if (data.categories) localStorage.setItem('categories', data.categories);
        if (data.transactions) localStorage.setItem('transactions', data.transactions);
        if (data.budgets) localStorage.setItem('budgets', data.budgets);
        if (data.wallets) localStorage.setItem('wallets', data.wallets);
        alert('Data imported successfully! Please refresh the page.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    localStorage.removeItem('categories');
    localStorage.removeItem('transactions');
    localStorage.removeItem('budgets');
    localStorage.removeItem('wallets');
    alert('All data cleared! Please refresh the page.');
    setShowClearConfirm(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    onAddCategory({
      name: newCategory.name.trim(),
      type: 'expense',
      classification: newCategory.classification
    });

    setNewCategory({ name: '', classification: 'need' });
    setShowAddCategory(false);
  };

  const startEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditedName(category.name);
    setEditedClassification(category.classification);
  };

  const handleUpdateCategory = (id) => {
    if (!editedName.trim()) return;

    onUpdateCategory(id, {
      name: editedName.trim(),
      classification: editedClassification
    });

    setEditingCategory(null);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditedName('');
    setEditedClassification('need');
  };

  const needCategories = categories.filter(c => c.classification === 'need');
  const wantCategories = categories.filter(c => c.classification === 'want');

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your app preferences and data</p>
        </div>
      </header>

      <main className="p-8 max-w-4xl">
        {/* Category Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-blue-500" />
              <h2 className="text-gray-900">Category Management</h2>
            </div>
            <button
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          {/* Add Category Form */}
          {showAddCategory && (
            <form onSubmit={handleAddCategory} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., Groceries"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Classification</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="newClassification"
                        value="need"
                        checked={newCategory.classification === 'need'}
                        onChange={(e) => setNewCategory({ ...newCategory, classification: 'need' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Need</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="newClassification"
                        value="want"
                        checked={newCategory.classification === 'want'}
                        onChange={(e) => setNewCategory({ ...newCategory, classification: 'want' })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Want</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Categories List */}
          <div className="space-y-6">
            {/* Needs */}
            <div>
              <h3 className="text-sm text-gray-500 mb-3">NEEDS ({needCategories.length})</h3>
              <div className="space-y-2">
                {needCategories.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {editingCategory === category.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="editClassification"
                              value="need"
                              checked={editedClassification === 'need'}
                              onChange={() => setEditedClassification('need')}
                              className="w-3 h-3"
                            />
                            Need
                          </label>
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="editClassification"
                              value="want"
                              checked={editedClassification === 'want'}
                              onChange={() => setEditedClassification('want')}
                              className="w-3 h-3"
                            />
                            Want
                          </label>
                        </div>
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-900">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditCategory(category)}
                            className="p-2 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory(category.id)}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Wants */}
            <div>
              <h3 className="text-sm text-gray-500 mb-3">WANTS ({wantCategories.length})</h3>
              <div className="space-y-2">
                {wantCategories.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    {editingCategory === category.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="editClassification"
                              value="need"
                              checked={editedClassification === 'need'}
                              onChange={() => setEditedClassification('need')}
                              className="w-3 h-3"
                            />
                            Need
                          </label>
                          <label className="flex items-center gap-1 text-sm cursor-pointer">
                            <input
                              type="radio"
                              name="editClassification"
                              value="want"
                              checked={editedClassification === 'want'}
                              onChange={() => setEditedClassification('want')}
                              className="w-3 h-3"
                            />
                            Want
                          </label>
                        </div>
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-900">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditCategory(category)}
                            className="p-2 hover:bg-orange-100 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-orange-600" />
                          </button>
                          <button
                            onClick={() => onDeleteCategory(category.id)}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-blue-500" />
            <h2 className="text-gray-900">Data Management</h2>
          </div>

          <div className="space-y-4">
            {/* Export Data */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-900 mb-1">Export Data</div>
                <div className="text-sm text-gray-600">
                  Download all your data as a JSON backup file
                </div>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Import Data */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-900 mb-1">Import Data</div>
                <div className="text-sm text-gray-600">
                  Restore data from a previously exported backup file
                </div>
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <div className="text-red-900 mb-1">Clear All Data</div>
                <div className="text-sm text-red-700">
                  Permanently delete all transactions, budgets, wallets, and categories
                </div>
              </div>
              {!showClearConfirm ? (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-blue-500" />
            <h2 className="text-gray-900">About</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Application</span>
              <span className="text-gray-900">Expense Tracker</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Data Storage</span>
              <span className="text-gray-900">Local Storage</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Created</span>
              <span className="text-gray-900">2025</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-blue-900 mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Regularly export your data to prevent loss</li>
            <li>• Your data is stored locally in your browser</li>
            <li>• Clearing browser data will remove all transactions</li>
            <li>• Import/Export feature helps you backup and restore data</li>
            <li>• Organize categories into Needs and Wants for better budgeting</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
