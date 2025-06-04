
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '../hooks/useMQTT';

interface CryptoCardProps {
  crypto: CryptoData;
  isBalance?: boolean;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, isBalance = false }) => {
  const { symbol, amount, pnl } = crypto;
  
  const hasPnl = pnl !== undefined;
  const isProfit = hasPnl && pnl > 0;
  const isLoss = hasPnl && pnl < 0;

  const formatAmount = (value: number) => {
    if (isBalance) {
      return `$${value.toFixed(2)}`;
    }
    
    // Verhindere wissenschaftliche Notation und begrenze auf 8 Nachkommastellen
    if (value === 0) {
      return '0.00000000';
    }
    
    // Für sehr kleine Zahlen (< 0.00000001) zeige 8 Nachkommastellen
    if (value < 0.00000001) {
      return value.toFixed(8);
    }
    
    // Für kleine Zahlen (< 0.001) zeige bis zu 8 Nachkommastellen, aber entferne trailing zeros
    if (value < 0.001) {
      const formatted = value.toFixed(8);
      return formatted.replace(/\.?0+$/, '');
    }
    
    // Für größere Zahlen zeige angemessene Nachkommastellen
    if (value >= 1) {
      return value.toFixed(2);
    } else {
      return value.toFixed(6);
    }
  };

  const formatPnl = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className={`
      crypto-gradient rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:scale-105 
      hover:bg-crypto-cardHover animate-slide-up
      ${isBalance ? 'col-span-2 lg:col-span-1' : ''}
      ${hasPnl && isProfit ? 'profit-gradient' : ''}
      ${hasPnl && isLoss ? 'loss-gradient' : ''}
    `}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="min-w-0 flex-1">
          <h3 className={`text-base sm:text-lg font-bold truncate ${isBalance ? 'text-crypto-gold' : 'text-white'}`}>
            {isBalance ? 'Balance' : symbol}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">
            {isBalance ? 'USDC' : 'Holdings'}
          </p>
        </div>
        
        {hasPnl && (
          <div className={`
            flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium shrink-0
            ${isProfit ? 'bg-crypto-profit/20 text-crypto-profit' : 'bg-crypto-loss/20 text-crypto-loss'}
          `}>
            {isProfit ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            <span className="text-xs">{formatPnl(pnl)}</span>
          </div>
        )}
      </div>

      <div className="space-y-1 sm:space-y-2">
        <div className={`text-lg sm:text-xl lg:text-2xl font-bold break-all ${isBalance ? 'text-crypto-gold' : 'text-white'}`}>
          {formatAmount(amount)}
        </div>
        
        {hasPnl && (
          <div className={`
            text-xs sm:text-sm font-medium
            ${isProfit ? 'text-crypto-profit' : 'text-crypto-loss'}
          `}>
            {isProfit ? '+' : ''}{pnl.toFixed(2)}% today
          </div>
        )}
      </div>

      {/* Animated border for active coins */}
      {hasPnl && (
        <div className={`
          absolute inset-0 rounded-lg sm:rounded-xl opacity-50 pointer-events-none
          ${isProfit ? 'animate-pulse-profit' : 'animate-pulse-loss'}
        `} />
      )}
    </div>
  );
};

export default CryptoCard;
