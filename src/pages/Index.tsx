
import React from 'react';
import { Bitcoin, DollarSign } from 'lucide-react';
import CryptoCard from '../components/CryptoCard';
import StatusIndicator from '../components/StatusIndicator';
import { useMQTT } from '../hooks/useMQTT';

const Index = () => {
  const { cryptoData, isConnected, lastUpdate } = useMQTT();

  const cryptoOrder = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'LINK', 'ADA'] as const;

  return (
    <div className="min-h-screen bg-crypto-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bitcoin className="text-crypto-gold" size={40} />
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-crypto-gold to-crypto-blue bg-clip-text text-transparent">
              Crypto Dashboard
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Live Kryptowährungen Portfolio mit MQTT Integration
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-8">
          <div className="crypto-gradient rounded-lg px-6 py-3">
            <StatusIndicator isConnected={isConnected} lastUpdate={lastUpdate} />
          </div>
        </div>

        {/* Balance Card - Featured */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-crypto-gold/20 to-crypto-blue/20 rounded-2xl blur-xl" />
            <div className="relative crypto-gradient rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <DollarSign className="text-crypto-gold" size={32} />
                <h2 className="text-2xl font-bold text-crypto-gold">Portfolio Balance</h2>
              </div>
              <div className="text-5xl font-bold text-crypto-gold mb-2">
                ${cryptoData.USDC.amount.toFixed(2)}
              </div>
              <div className="text-gray-400">USDC Balance</div>
            </div>
          </div>
        </div>

        {/* Crypto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cryptoOrder.map((symbol) => (
            <CryptoCard 
              key={symbol}
              crypto={cryptoData[symbol]}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="crypto-gradient rounded-lg px-6 py-4 inline-block">
            <p className="text-gray-400 text-sm">
              Real-time data via MQTT • Updated every 3 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
