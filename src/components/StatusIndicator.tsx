
import React from 'react';

interface StatusIndicatorProps {
  isConnected: boolean;
  lastUpdate: Date;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isConnected, lastUpdate }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center space-x-2">
        <div className={`
          w-2 h-2 rounded-full 
          ${isConnected ? 'bg-crypto-profit animate-pulse' : 'bg-crypto-loss'}
        `} />
        <span className="text-gray-300">
          {isConnected ? 'MQTT Connected' : 'MQTT Disconnected'}
        </span>
      </div>
      
      <div className="text-gray-400">
        Last Update: {formatTime(lastUpdate)}
      </div>
    </div>
  );
};

export default StatusIndicator;
