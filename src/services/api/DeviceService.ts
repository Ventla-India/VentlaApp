import { Platform } from 'react-native';

export default class DeviceService {
  static getPlatform(): 'ios' | 'android' | 'web' {
    if (Platform.OS === 'ios') return 'ios';
    if (Platform.OS === 'android') return 'android';
    return 'web';
  }

  static isEmulator(): boolean {
    // Placeholder: In real app, use a library like react-native-device-info
    return false;
  }

  static getDeviceInfo() {
    return {
      platform: this.getPlatform(),
      // Add more device info as needed
    };
  }
} 