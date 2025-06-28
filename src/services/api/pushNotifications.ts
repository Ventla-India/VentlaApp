import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export interface PushNotificationData {
  title?: string;
  body?: string;
  data?: Record<string, string>;
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private fcmToken: string = '';
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  public async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      // Request permission for iOS
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        
        if (!enabled) {
          console.log('Push notification permission denied');
          return false;
        }
      }

      // Get FCM token
      const token = await messaging().getToken();
      if (token) {
        this.fcmToken = token;
        console.log('FCM Token obtained:', token);
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing push notifications:', error);
      return false;
    }
  }

  public getFCMToken(): string {
    return this.fcmToken;
  }

  public async refreshToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      if (token) {
        this.fcmToken = token;
        console.log('FCM Token refreshed:', token);
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing FCM token:', error);
      return null;
    }
  }

  public onTokenRefresh(callback: (token: string) => void): () => void {
    return messaging().onTokenRefresh(callback);
  }

  public onMessage(callback: (message: any) => void): () => void {
    return messaging().onMessage(callback);
  }

  public onNotificationOpenedApp(callback: (message: any) => void): () => void {
    return messaging().onNotificationOpenedApp(callback);
  }

  public async getInitialNotification(): Promise<any> {
    return await messaging().getInitialNotification();
  }

  public async hasPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().hasPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }
    return true; // Android doesn't need explicit permission
  }

  public async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }
    return true; // Android doesn't need explicit permission
  }
}

// Export a singleton instance
export const pushNotificationService = PushNotificationService.getInstance(); 