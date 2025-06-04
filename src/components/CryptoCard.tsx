
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
    return value < 0.001 ? value.toExponential(3) : value.toFixed(8);
  };

  const formatPnl = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className={`
      crypto-gradient rounded-xl p-6 transition-all duration-300 hover:scale-105 
      hover:bg-crypto-cardHover animate-slide-up
      ${isBalance ? 'col-span-2 lg:col-span-1' : ''}
      ${hasPnl && isProfit ? 'profit-gradient' : ''}
      ${hasPnl && isLoss ? 'loss-gradient' : ''}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${isBalance ? 'text-crypto-gold' : 'text-white'}`}>
            {isBalance ? 'Balance' : symbol}
          </h3>
          <p className="text-sm text-gray-400">
            {isBalance ? 'USDC' : 'Holdings'}
          </p>
        </div>
        
        {hasPnl && (
          <div className={`
            flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
            ${isProfit ? 'bg-crypto-profit/20 text-crypto-profit' : 'bg-crypto-loss/20 text-crypto-loss'}
          `}>
            {isProfit ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{formatPnl(pnl)}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className={`text-2xl font-bold ${isBalance ? 'text-crypto-gold' : 'text-white'}`}>
          {formatAmount(amount)}
        </div>
        
        {hasPnl && (
          <div className={`
            text-sm font-medium
            ${isProfit ? 'text-crypto-profit' : 'text-crypto-loss'}
          `}>
            {isProfit ? '+' : ''}{pnl.toFixed(2)}% today
          </div>
        )}
      </div>

      {/* Animated border for active coins */}
      {hasPnl && (
        <div className={`
          absolute inset-0 rounded-xl opacity-50 pointer-events-none
          ${isProfit ? 'animate-pulse-profit' : 'animate-pulse-loss'}
        `} />
      )}
    </div>
  );
};

export default CryptoCard;
