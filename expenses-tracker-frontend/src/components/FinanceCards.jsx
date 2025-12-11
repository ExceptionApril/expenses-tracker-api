import { ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

export function CreditCardVisual({ 
  cardNumber = '6.3758  4.5698  2567  7546',
  cardName = 'John Mox',
  expiryDate = '08/28'
}) {
  return (
    <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-2xl p-6 text-gray-800 shadow-lg aspect-[1.8/1] flex flex-col justify-between relative overflow-hidden max-w-md">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl -ml-24 -mb-24" />
      
      {/* Card Type and Contactless */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          {/* Mastercard Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 opacity-90" />
            <div className="w-8 h-8 rounded-full bg-orange-400 opacity-90 -ml-3" />
          </div>
        </div>
        <div className="text-gray-700">
          {/* Contactless Payment Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 7.5c0 4.97 4.03 9 9 9M2 12c0 5.52 4.48 10 10 10M8.5 9.5c0 3.04 2.46 5.5 5.5 5.5"/>
          </svg>
        </div>
      </div>

      {/* Card Number */}
      <div className="relative z-10">
        <div className="text-lg mb-4 tracking-wider">{cardNumber}</div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-600 mb-1">Name</div>
            <div className="text-sm">{cardName}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Exp Date</div>
            <div className="text-sm">{expiryDate}</div>
          </div>
          {/* Chip/EMV Icon */}
          <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded border border-yellow-500/30 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-yellow-600 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BankAccountCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-gray-900 mb-6">Your Bank Account</h3>
      
      <div className="space-y-4">
        {/* You Send */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="text-xs text-gray-500 mb-1">You Send</div>
            <div className="text-gray-900">$1,910.34</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs">
              🇺🇸
            </div>
            <span className="text-sm text-gray-700">USA</span>
          </div>
        </div>

        {/* You Receive */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <div className="text-xs text-gray-500 mb-1">You Receive</div>
            <div className="text-gray-900">$1,910.34</div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs">
              🇧🇷
            </div>
            <span className="text-sm text-gray-700">BRA</span>
          </div>
        </div>

        {/* Send Button */}
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Send Now
        </button>
      </div>
    </div>
  );
}

export function TransactionLimitCard() {
  const spent = 1900;
  const limit = 2499;
  const percentage = Math.round((spent / limit) * 100);
  const isHighRisk = percentage >= 75;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className={`px-3 py-1.5 rounded-lg text-xs ${
          isHighRisk 
            ? 'bg-red-50 text-red-600' 
            : 'bg-green-50 text-green-600'
        }`}>
          {isHighRisk ? 'Highly risky' : 'Safe'}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* Title and Amount */}
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">Daily Transaction Limit</h3>
        <div className="text-sm text-gray-500">
          <span className="text-red-600">${spent.toFixed(2)}</span>
          {' '}spent of{' '}
          <span className="text-gray-900">${limit.toFixed(2)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${
              isHighRisk ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-900">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

export function ReceivedSentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Received Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-gray-600">Received</span>
        </div>
        
        {/* Circular Progress */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * 0.35}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl text-gray-900">65%</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl text-gray-900 mb-1">$1263.00</div>
          <div className="text-sm text-green-600 flex items-center justify-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>8.2% Per year</span>
          </div>
        </div>
      </div>

      {/* Sent Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6 text-orange-600" />
          </div>
          <span className="text-gray-600">Sent</span>
        </div>
        
        {/* Circular Progress */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f97316"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * 0.60}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl text-gray-900">40%</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl text-gray-900 mb-1">$163.00</div>
          <div className="text-sm text-green-600 flex items-center justify-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>11.2% Per year</span>
          </div>
        </div>
      </div>
    </div>
  );
}
