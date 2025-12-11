import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';

export function TransactionFilters({ transactions, categories, onFilterChange }) {
  const [filterClassification, setFilterClassification] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...transactions];

    // Filter by classification
    if (filterClassification !== 'all') {
      filtered = filtered.filter(t => {
        const category = categories.find(c => c.id === t.categoryId);
        return category?.classification === filterClassification;
      });
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.categoryId === filterCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => {
        const category = categories.find(c => c.id === t.categoryId);
        return (
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    onFilterChange(filtered);
  }, [filterClassification, filterCategory, searchTerm, transactions, categories, onFilterChange]);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Classification Filter */}
        <select
          value={filterClassification}
          onChange={(e) => setFilterClassification(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Types</option>
          <option value="need">Needs Only</option>
          <option value="want">Wants Only</option>
        </select>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.classification === 'need' ? 'Need' : 'Want'})
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transactions..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Active Filters Summary */}
      {(filterClassification !== 'all' || filterCategory !== 'all' || searchTerm) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">
            Showing filtered results
          </span>
          <button
            onClick={() => {
              setFilterClassification('all');
              setFilterCategory('all');
              setSearchTerm('');
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
