
import { useState, useEffect, useRef } from 'react';
import { MqttConfig, defaultMqttConfig } from '../types/mqtt';

export interface CryptoData {
  symbol: string;
  amount: number;
  pnl?: number;
}

export interface CryptoState {
  ETH: CryptoData;
  BTC: CryptoData;
  XRP: CryptoData;
  LINK: CryptoData;
  SOL: CryptoData;
  ADA: CryptoData;
  BNB: CryptoData;
  USDC: CryptoData;
}

const initialState: CryptoState = {
  ETH: { symbol: 'ETH', amount: 0.00290584, pnl: 0.25 },
  BTC: { symbol: 'BTC', amount: 0.00000753 },
  XRP: { symbol: 'XRP', amount: 0.09135500 },
  LINK: { symbol: 'LINK', amount: 0.00000000 },
  SOL: { symbol: 'SOL', amount: 0.04900000, pnl: -1.58 },
  ADA: { symbol: 'ADA', amount: 0.00000000 },
  BNB: { symbol: 'BNB', amount: 0.01168594, pnl: -0.22 },
  USDC: { symbol: 'USDC', amount: 30.15 },
};

export const useMQTT = () => {
  const [cryptoData, setCryptoData] = useState<CryptoState>(initialState);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [mqttConfig, setMqttConfig] = useState<MqttConfig>(defaultMqttConfig);
  
  // Simulation von MQTT Updates für Demo-Zwecke
  const intervalRef = useRef<NodeJS.Timeout>();

  // Lade MQTT-Konfiguration beim Start
  useEffect(() => {
    const savedConfig = localStorage.getItem('mqttConfig');
    if (savedConfig) {
      try {
        setMqttConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error loading MQTT config:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('MQTT Hook initialized');
    console.log('MQTT Config:', mqttConfig);
    console.log('Topics will be:', {
      ETH: `${mqttConfig.topicPrefix}/ETH`,
      BTC: `${mqttConfig.topicPrefix}/BTC`,
      // ... weitere Topics
    });
    
    setIsConnected(true);
    
    // Simuliere Live-Updates alle 3 Sekunden
    intervalRef.current = setInterval(() => {
      setCryptoData(prevData => {
        const newData = { ...prevData };
        
        // Simuliere kleine Preisänderungen
        Object.keys(newData).forEach(key => {
          if (key !== 'USDC') {
            const crypto = newData[key as keyof CryptoState];
            const change = (Math.random() - 0.5) * 0.1;
            crypto.amount = Math.max(0, crypto.amount * (1 + change));
            
            if (crypto.pnl !== undefined) {
              const pnlChange = (Math.random() - 0.5) * 2;
              crypto.pnl = parseFloat((crypto.pnl + pnlChange).toFixed(2));
            }
          }
        });
        
        return newData;
      });
      
      setLastUpdate(new Date());
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mqttConfig]);

  const updateMqttConfig = (newConfig: MqttConfig) => {
    setMqttConfig(newConfig);
    console.log('MQTT Config updated:', newConfig);
    // Hier würde die echte MQTT-Verbindung neu gestartet werden
  };

  return {
    cryptoData,
    isConnected,
    lastUpdate,
    mqttConfig,
    updateMqttConfig,
  };
};
