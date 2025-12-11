import { Trash2, ArrowUpRight } from 'lucide-react';

export function TransactionList({ transactions, wallets, categories, onDelete }) {
  const getWalletName = (walletId) => {
    return wallets.find(w => w.id === walletId)?.accountName || 'Unknown';
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryClassification = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.classification || 'want';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (transactions.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-gray-400 mb-2">No transactions yet</div>
        <div className="text-sm text-gray-500">Add your first transaction to get started</div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {transactions.map((transaction) => {
        const classification = getCategoryClassification(transaction.categoryId);
        return (
          <div
            key={transaction.id}
            className="p-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-gray-900 truncate">
                      {getCategoryName(transaction.categoryId)}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      classification === 'need' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {classification === 'need' ? 'Need' : 'Want'}
                    </span>
                    <span className="text-sm text-gray-500 px-2 py-0.5 bg-gray-100 rounded">
                      {getWalletName(transaction.accountId)}
                    </span>
                  </div>
                  {transaction.description && (
                    <div className="text-sm text-gray-500 truncate">
                      {transaction.description}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDate(transaction.transactionDate)}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="text-red-600">
                    -${transaction.amount.toFixed(2)}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete transaction"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
