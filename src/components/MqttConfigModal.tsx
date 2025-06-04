
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Save, X } from 'lucide-react';
import { MqttConfig, defaultMqttConfig } from '../types/mqtt';

interface MqttConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: MqttConfig) => void;
}

const MqttConfigModal: React.FC<MqttConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [config, setConfig] = useState<MqttConfig>(defaultMqttConfig);

  useEffect(() => {
    // Lade gespeicherte Konfiguration aus localStorage
    const savedConfig = localStorage.getItem('mqttConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error loading MQTT config:', error);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    // Speichere Konfiguration in localStorage
    localStorage.setItem('mqttConfig', JSON.stringify(config));
    onSave(config);
    onClose();
  };

  const handleInputChange = (field: keyof MqttConfig, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md crypto-gradient border-crypto-gold/20">
        <DialogHeader>
          <DialogTitle className="text-crypto-gold flex items-center space-x-2">
            <span>MQTT Configuration</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="brokerUrl" className="text-white">Broker URL</Label>
            <Input
              id="brokerUrl"
              value={config.brokerUrl}
              onChange={(e) => handleInputChange('brokerUrl', e.target.value)}
              placeholder="localhost"
              className="bg-crypto-background border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port" className="text-white">Port</Label>
            <Input
              id="port"
              type="number"
              value={config.port}
              onChange={(e) => handleInputChange('port', parseInt(e.target.value) || 1883)}
              placeholder="1883"
              className="bg-crypto-background border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topicPrefix" className="text-white">Topic Prefix</Label>
            <Input
              id="topicPrefix"
              value={config.topicPrefix}
              onChange={(e) => handleInputChange('topicPrefix', e.target.value)}
              placeholder="trading_bot/gui"
              className="bg-crypto-background border-gray-600 text-white"
            />
            <p className="text-xs text-gray-400">
              Format: {config.topicPrefix}/[SYMBOL] (z.B. {config.topicPrefix}/ETH)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">Username (optional)</Label>
            <Input
              id="username"
              value={config.username || ''}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Optional"
              className="bg-crypto-background border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password (optional)</Label>
            <Input
              id="password"
              type="password"
              value={config.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Optional"
              className="bg-crypto-background border-gray-600 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="useSSL"
              checked={config.useSSL}
              onCheckedChange={(checked) => handleInputChange('useSSL', checked)}
            />
            <Label htmlFor="useSSL" className="text-white">Use SSL/TLS</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-crypto-gold text-black hover:bg-crypto-gold/90"
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MqttConfigModal;
