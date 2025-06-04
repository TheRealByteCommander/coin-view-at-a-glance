
export interface MqttConfig {
  brokerUrl: string;
  port: number;
  username?: string;
  password?: string;
  topicPrefix: string;
  useSSL: boolean;
}

export const defaultMqttConfig: MqttConfig = {
  brokerUrl: 'localhost',
  port: 1883,
  topicPrefix: 'trading_bot/gui',
  useSSL: false,
};
