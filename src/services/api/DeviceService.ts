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

  /**
   * Generate a unique device ID
   */
  static generateDeviceId(): string {
    const platform = this.getPlatform();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${platform}_${timestamp}_${random}`;
  }

  /**
   * Get device unique identifier (for storage)
   */
  static async getDeviceUniqueId(): Promise<string> {
    // In a real app, you would use react-native-device-info to get a stable device ID
    // For now, we'll generate one and store it
    const deviceId = this.generateDeviceId();
    return deviceId;
  }
} 