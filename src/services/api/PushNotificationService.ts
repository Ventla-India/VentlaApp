import messaging from '@react-native-firebase/messaging';
import { 
  NotificationModel, 
  NotificationType, 
  NotificationPriority,
  FCMTokenResponse,
  PushNotificationPayload 
} from '../../models/Notification';
import CrashlyticsService from './CrashlyticsService';

export class PushNotificationService {
  private static instance: PushNotificationService;
  private fcmToken: string | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  /**
   * Initialize push notification service
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Register for remote messages (iOS)
      await messaging().registerDeviceForRemoteMessages();
      
      // Request permission
      const authStatus = await messaging().requestPermission();
      const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await this.setupMessageHandlers();
        await this.getFCMToken();
        this.isInitialized = true;
        await CrashlyticsService.log('Push notifications initialized successfully');
      } else {
        await CrashlyticsService.log('Push notification permission denied');
      }
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      throw error;
    }
  }

  /**
   * Get FCM token
   */
  public async getFCMToken(): Promise<FCMTokenResponse | null> {
    try {
      const token = await messaging().getToken();
      this.fcmToken = token;
      
      const response: FCMTokenResponse = {
        token,
        timestamp: new Date(),
        isValid: true
      };

      await CrashlyticsService.log(`FCM Token received: ${token.substring(0, 10)}...`);
      return response;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return null;
    }
  }

  /**
   * Get current FCM token
   */
  public getCurrentToken(): string | null {
    return this.fcmToken;
  }

  /**
   * Setup message handlers
   */
  private async setupMessageHandlers(): Promise<void> {
    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      await this.handleForegroundMessage(remoteMessage);
    });

    // Handle background messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      await this.handleBackgroundMessage(remoteMessage);
    });

    // Handle token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (token) => {
      await this.handleTokenRefresh(token);
    });

    // Store unsubscribe functions for cleanup
    this.unsubscribeFunctions = [unsubscribeForeground, unsubscribeTokenRefresh];
  }

  /**
   * Handle foreground messages
   */
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

      // Emit notification to listeners
      this.emitNotificationReceived(notification);
      
      await CrashlyticsService.log(`Foreground notification received: ${notification.title}`);
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
    }
  }

  /**
   * Handle background messages
   */
  private async handleBackgroundMessage(remoteMessage: any): Promise<void> {
    try {
      await CrashlyticsService.log(`Background notification received: ${remoteMessage.notification?.title}`);
      // Handle background message processing here
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
    }
  }

  /**
   * Handle token refresh
   */
  private async handleTokenRefresh(token: string): Promise<void> {
    try {
      this.fcmToken = token;
      await CrashlyticsService.log(`FCM Token refreshed: ${token.substring(0, 10)}...`);
      
      // Emit token refresh event
      this.emitTokenRefreshed(token);
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
    }
  }

  /**
   * Get notification type from data
   */
  private getNotificationType(type?: string): NotificationType {
    switch (type) {
      case 'event':
        return NotificationType.EVENT;
      case 'chat':
        return NotificationType.CHAT;
      case 'system':
        return NotificationType.SYSTEM;
      case 'reminder':
        return NotificationType.REMINDER;
      case 'update':
        return NotificationType.UPDATE;
      case 'promotion':
        return NotificationType.PROMOTION;
      default:
        return NotificationType.SYSTEM;
    }
  }

  /**
   * Get notification priority from data
   */
  private getNotificationPriority(priority?: string): NotificationPriority {
    switch (priority) {
      case 'low':
        return NotificationPriority.LOW;
      case 'high':
        return NotificationPriority.HIGH;
      case 'urgent':
        return NotificationPriority.URGENT;
      default:
        return NotificationPriority.NORMAL;
    }
  }

  /**
   * Check if notifications are enabled
   */
  public async areNotificationsEnabled(): Promise<boolean> {
    try {
      const authStatus = await messaging().hasPermission();
      return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
             authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return false;
    }
  }

  /**
   * Request notification permissions
   */
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
      await CrashlyticsService.recordError(error as Error);
      return false;
    }
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    if (this.unsubscribeFunctions) {
      this.unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
      this.unsubscribeFunctions = [];
    }
  }

  // Event listeners for notification updates
  private notificationListeners: ((notification: NotificationModel) => void)[] = [];
  private tokenRefreshListeners: ((token: string) => void)[] = [];
  private unsubscribeFunctions: (() => void)[] = [];

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

export default PushNotificationService.getInstance(); 