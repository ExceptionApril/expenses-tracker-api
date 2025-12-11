import { Wallet, CreditCard, Banknote } from 'lucide-react';
import { CreditCardVisual } from './FinanceCards';

const getWalletIcon = (accountType) => {
  switch (accountType) {
    case 'cash':
      return Banknote;
    case 'bank':
      return Wallet;
    case 'e-wallet':
      return CreditCard;
    case 'credit-card':
    case 'debit-card':
      return CreditCard;
    default:
      return Wallet;
  }
};

export function WalletCard({ wallet }) {
  const Icon = getWalletIcon(wallet.accountType);

  // If it's a credit or debit card, show the credit card visual
  if (wallet.accountType === 'credit-card' || wallet.accountType === 'debit-card') {
    return (
      <div className="mb-4">
        <CreditCardVisual 
          cardNumber={wallet.cardNumber}
          cardName={wallet.cardHolder}
          expiryDate={wallet.expiryDate}
        />
        <div className="mt-2 text-sm text-gray-600 text-center">
          Balance: <span className="text-gray-900">${wallet.balance.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${wallet.color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: wallet.color }} />
          </div>
          <div>
            <div className="text-gray-900">{wallet.accountName}</div>
            <div className="text-gray-500 text-sm capitalize">
              {wallet.accountType ? wallet.accountType.replace('-', ' ') : 'wallet'}
            </div>
          </div>
        </div>
      </div>
      <div 
        className="text-gray-900 mt-2"
        style={{ color: wallet.color }}
      >
        ${wallet.balance.toFixed(2)}
      </div>
    </div>
  );
}
