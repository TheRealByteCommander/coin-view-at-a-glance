
import React, { useState, useEffect } from 'react';
import { Bitcoin, DollarSign } from 'lucide-react';
import CryptoCard from '../components/CryptoCard';
import StatusIndicator from '../components/StatusIndicator';
import MqttConfigModal from '../components/MqttConfigModal';
import { useMQTT } from '../hooks/useMQTT';
import { MqttConfig } from '../types/mqtt';

const Index = () => {
  const { cryptoData, isConnected, lastUpdate, mqttConfig, updateMqttConfig } = useMQTT();
  const [showMqttConfig, setShowMqttConfig] = useState(false);

  const cryptoOrder = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'LINK', 'ADA'] as const;

  // Versteckte Tastenkombination für MQTT-Konfiguration (Ctrl+M)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        setShowMqttConfig(true);
        console.log('MQTT Configuration modal opened via Ctrl+M');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleMqttConfigSave = (config: MqttConfig) => {
    updateMqttConfig(config);
  };

  return (
    <div className="min-h-screen bg-crypto-background p-2 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
            <Bitcoin className="text-crypto-gold" size={32} />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-crypto-gold to-crypto-blue bg-clip-text text-transparent">
              Crypto Dashboard
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg px-4">
            the 1. Million Dollar App
          </p>
          {/* Versteckter Hinweis für Entwickler */}
          <div className="text-xs text-gray-600 mt-2 opacity-50 hidden sm:block">
            Press Ctrl+M for configuration
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="crypto-gradient rounded-lg px-4 sm:px-6 py-2 sm:py-3 w-full max-w-lg">
            <StatusIndicator isConnected={isConnected} lastUpdate={lastUpdate} />
          </div>
        </div>

        {/* Balance Card - Featured */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-crypto-gold/20 to-crypto-blue/20 rounded-xl sm:rounded-2xl blur-xl" />
            <div className="relative crypto-gradient rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <DollarSign className="text-crypto-gold" size={24} />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-crypto-gold">Portfolio Balance</h2>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-crypto-gold mb-2">
                ${cryptoData.USDC.amount.toFixed(2)}
              </div>
              <div className="text-gray-400 text-sm sm:text-base">USDC Balance</div>
            </div>
          </div>
        </div>

        {/* Crypto Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {cryptoOrder.map((symbol) => (
            <CryptoCard 
              key={symbol}
              crypto={cryptoData[symbol]}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="crypto-gradient rounded-lg px-4 sm:px-6 py-3 sm:py-4 inline-block max-w-full">
            <p className="text-gray-400 text-xs sm:text-sm break-all sm:break-normal">
              Real-time data via MQTT • Topic: {mqttConfig.topicPrefix}/[SYMBOL]
            </p>
          </div>
        </div>
      </div>

      {/* Hidden MQTT Configuration Modal */}
      <MqttConfigModal
        isOpen={showMqttConfig}
        onClose={() => setShowMqttConfig(false)}
        onSave={handleMqttConfigSave}
      />
    </div>
  );
};

export default Index;
