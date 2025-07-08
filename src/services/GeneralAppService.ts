import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import { ErrorModel, DeviceInfo } from '../models/Error';
import { NotificationModel, NotificationType, NotificationPriority, FCMTokenResponse } from '../models/Notification';

class GeneralAppService {
  private static instance: GeneralAppService;
  private fcmToken: string | null = null;
  private isPushInitialized: boolean = false;
  private notificationListeners: ((notification: NotificationModel) => void)[] = [];
  private tokenRefreshListeners: ((token: string) => void)[] = [];
  private unsubscribeFunctions: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): GeneralAppService {
    if (!GeneralAppService.instance) {
      GeneralAppService.instance = new GeneralAppService();
    }
    return GeneralAppService.instance;
  }

  // --- Crashlytics Methods ---
  public async log(message: string): Promise<void> {
    try {
      await crashlytics().log(message);
    } catch (error) {
      console.error('Failed to log to Crashlytics:', error);
    }
  }

  public async recordError(error: Error): Promise<void> {
    try {
      await crashlytics().recordError(error);
    } catch (crashlyticsError) {
      console.error('Failed to record error in Crashlytics:', crashlyticsError);
    }
  }

  public async setUserId(userId: string): Promise<void> {
    try {
      await crashlytics().setUserId(userId);
    } catch (error) {
      console.error('Failed to set user ID in Crashlytics:', error);
    }
  }

  public async setUserAttributes(attributes: Record<string, string>): Promise<void> {
    try {
      await crashlytics().setAttributes(attributes);
    } catch (error) {
      console.error('Failed to set user attributes in Crashlytics:', error);
    }
  }

  public async setCustomKey(key: string, value: string): Promise<void> {
    try {
      await crashlytics().setAttribute(key, value);
    } catch (error) {
      console.error('Failed to set custom key in Crashlytics:', error);
    }
  }

  public async recordCustomError(error: ErrorModel, deviceInfo?: DeviceInfo): Promise<void> {
    try {
      const customError = new Error(error.message);
      customError.name = error.code || 'CustomError';
      if (error.context) {
        for (const [key, value] of Object.entries(error.context)) {
          await this.setCustomKey(key, String(value));
        }
      }
      if (deviceInfo) {
        await this.setCustomKey('deviceModel', deviceInfo.deviceModel);
        await this.setCustomKey('osVersion', deviceInfo.osVersion);
        await this.setCustomKey('platform', deviceInfo.platform);
      }
      await this.recordError(customError);
    } catch (crashlyticsError) {
      console.error('Failed to record custom error in Crashlytics:', crashlyticsError);
    }
  }

  public async setCrashlyticsCollectionEnabled(enabled: boolean): Promise<void> {
    try {
      await crashlytics().setCrashlyticsCollectionEnabled(enabled);
    } catch (error) {
      console.error('Failed to set Crashlytics collection enabled:', error);
    }
  }

  public async isCrashlyticsCollectionEnabled(): Promise<boolean> {
    try {
      const enabled = await crashlytics().isCrashlyticsCollectionEnabled;
      return enabled;
    } catch (error) {
      console.error('Failed to check Crashlytics collection status:', error);
      return false;
    }
  }

  // --- Push Notification Methods ---
  public async initializePushNotifications(): Promise<void> {
    if (this.isPushInitialized) return;
    try {
      await messaging().registerDeviceForRemoteMessages();
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        await this.setupMessageHandlers();
        await this.getFCMToken();
        this.isPushInitialized = true;
        await this.log('Push notifications initialized successfully');
      } else {
        await this.log('Push notification permission denied');
      }
    } catch (error) {
      await this.recordError(error as Error);
      throw error;
    }
  }

  public async getFCMToken(): Promise<FCMTokenResponse | null> {
    try {
      const token = await messaging().getToken();
      this.fcmToken = token;
      const response: FCMTokenResponse = {
        token,
        timestamp: new Date(),
        isValid: true
      };
      await this.log(`FCM Token received: ${token.substring(0, 10)}...`);
      return response;
    } catch (error) {
      await this.recordError(error as Error);
      return null;
    }
  }

  public getCurrentToken(): string | null {
    return this.fcmToken;
  }

  private async setupMessageHandlers(): Promise<void> {
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      await this.handleForegroundMessage(remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      await this.handleBackgroundMessage(remoteMessage);
    });
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (token) => {
      await this.handleTokenRefresh(token);
    });
    this.unsubscribeFunctions = [unsubscribeForeground, unsubscribeTokenRefresh];
  }

  private async handleForegroundMessage(remoteMessage: any): Promise<void> {
    try {
      const notification: NotificationModel = {
        id: remoteMessage.messageId || Date.now().toString(),
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || '',
        data: remoteMessage.data,
        imageUrl: remoteMessage.notification?.android?.imageUrl,
        timestamp: new Date(),
        isRead: false,
        type: this.getNotificationType(remoteMessage.data?.type),
        priority: this.getNotificationPriority(remoteMessage.data?.priority),
        category: remoteMessage.data?.category,
        actionUrl: remoteMessage.data?.actionUrl,
        badge: remoteMessage.notification?.ios?.badge
      };
      this.emitNotificationReceived(notification);
      await this.log(`Foreground notification received: ${notification.title}`);
    } catch (error) {
      await this.recordError(error as Error);
    }
  }

  private async handleBackgroundMessage(remoteMessage: any): Promise<void> {
    try {
      await this.log(`Background notification received: ${remoteMessage.notification?.title}`);
    } catch (error) {
      await this.recordError(error as Error);
    }
  }

  private async handleTokenRefresh(token: string): Promise<void> {
    try {
      this.fcmToken = token;
      await this.log(`FCM Token refreshed: ${token.substring(0, 10)}...`);
      this.emitTokenRefreshed(token);
    } catch (error) {
      await this.recordError(error as Error);
    }
  }

  private getNotificationType(type?: string): NotificationType {
    switch (type) {
      case 'event': return NotificationType.EVENT;
      case 'chat': return NotificationType.CHAT;
      case 'system': return NotificationType.SYSTEM;
      case 'reminder': return NotificationType.REMINDER;
      case 'update': return NotificationType.UPDATE;
      case 'promotion': return NotificationType.PROMOTION;
      default: return NotificationType.SYSTEM;
    }
  }

  private getNotificationPriority(priority?: string): NotificationPriority {
    switch (priority) {
      case 'low': return NotificationPriority.LOW;
      case 'high': return NotificationPriority.HIGH;
      case 'urgent': return NotificationPriority.URGENT;
      default: return NotificationPriority.NORMAL;
    }
  }

  public async areNotificationsEnabled(): Promise<boolean> {
    try {
      const authStatus = await messaging().hasPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
      await this.recordError(error as Error);
      return false;
    }
  }

  public async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        await this.getFCMToken();
      }
      return enabled;
    } catch (error) {
      await this.recordError(error as Error);
      return false;
    }
  }

  public cleanup(): void {
    if (this.unsubscribeFunctions) {
      this.unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
      this.unsubscribeFunctions = [];
    }
  }

  public onNotificationReceived(callback: (notification: NotificationModel) => void): () => void {
    this.notificationListeners.push(callback);
    return () => {
      const index = this.notificationListeners.indexOf(callback);
      if (index > -1) {
        this.notificationListeners.splice(index, 1);
      }
    };
  }

  public onTokenRefreshed(callback: (token: string) => void): () => void {
    this.tokenRefreshListeners.push(callback);
    return () => {
      const index = this.tokenRefreshListeners.indexOf(callback);
      if (index > -1) {
        this.tokenRefreshListeners.splice(index, 1);
      }
    };
  }

  private emitNotificationReceived(notification: NotificationModel): void {
    this.notificationListeners.forEach(callback => callback(notification));
  }

  private emitTokenRefreshed(token: string): void {
    this.tokenRefreshListeners.forEach(callback => callback(token));
  }
}

export default GeneralAppService.getInstance(); 