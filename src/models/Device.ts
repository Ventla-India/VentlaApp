export interface DeviceModel {
  id: string;
  platform: 'ios' | 'android';
  version: string;
  buildNumber: string;
  deviceModel: string;
  osVersion: string;
  deviceId: string;
  brand?: string;
  manufacturer?: string;
  isTablet: boolean;
  isEmulator: boolean;
  totalMemory?: number;
  freeMemory?: number;
  batteryLevel?: number;
  isCharging?: boolean;
  networkType?: 'wifi' | 'cellular' | 'none';
  isConnected: boolean;
  timezone: string;
  locale: string;
  language: string;
  country: string;
  screenWidth: number;
  screenHeight: number;
  screenScale: number;
  screenDensity: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceInfo {
  platform: 'ios' | 'android';
  version: string;
  buildNumber: string;
  deviceModel: string;
  osVersion: string;
  deviceId: string;
}

export interface DeviceCapabilities {
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasBluetooth: boolean;
  hasNFC: boolean;
  hasFingerprint: boolean;
  hasFaceID: boolean;
  hasTouchID: boolean;
  hasBiometrics: boolean;
  hasLocation: boolean;
  hasNotifications: boolean;
  hasVibration: boolean;
  hasHapticFeedback: boolean;
} 