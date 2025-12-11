import { useState } from 'react';
import { CreditCardVisual } from './FinanceCards';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CardCarousel({ wallets }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only card-type wallets
  const cards = wallets.filter(
    w => w.accountType === 'credit-card' || w.accountType === 'debit-card'
  );

  if (cards.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 text-center h-[200px] flex items-center justify-center">
        <div>
          <p className="text-gray-500 text-sm">No cards yet</p>
          <p className="text-gray-400 text-xs mt-1">Add a card from Wallets page</p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full">
      {/* Card Display with Stack Effect */}
      <div className="relative h-[200px] mb-4 w-full">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;
          
          // Create stacking effect
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          
          if (offset === 0) {
            // Active card
            transform = 'translateX(0) scale(1)';
            opacity = 1;
            zIndex = 30;
          } else if (offset === 1) {
            // Next card (stacked behind right)
            transform = 'translateX(20px) scale(0.95)';
            opacity = 0.5;
            zIndex = 20;
          } else if (offset === -1) {
            // Previous card (stacked behind left)
            transform = 'translateX(-20px) scale(0.95)';
            opacity = 0.5;
            zIndex = 20;
          } else if (offset > 1) {
            // Cards further ahead
            transform = 'translateX(40px) scale(0.9)';
            opacity = 0;
            zIndex = 10;
          } else {
            // Cards further behind
            transform = 'translateX(-40px) scale(0.9)';
            opacity = 0;
            zIndex = 10;
          }

          return (
            <div
              key={card.id}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                transform,
                opacity,
                zIndex,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <CreditCardVisual
                cardNumber={card.cardNumber}
                cardName={card.cardHolder}
                expiryDate={card.expiryDate}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {cards.length > 1 && (
        <>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 bg-blue-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Card Counter */}
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              {currentIndex + 1} of {cards.length} cards
            </p>
          </div>
        </>
      )}
    </div>
  );
}
