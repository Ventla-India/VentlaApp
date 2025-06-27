import { makeAutoObservable, runInAction } from 'mobx';
import { NotificationModel, NotificationType, NotificationPriority, FCMTokenResponse } from '../models/Notification';
import PushNotificationService from '../services/api/PushNotificationService';
import CrashlyticsService from '../services/api/CrashlyticsService';

export class NotificationViewModel {
  // Observable state
  notifications: NotificationModel[] = [];
  fcmToken: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  /**
   * Initialize the notification system
   */
  private async initialize(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      await PushNotificationService.initialize();
      
      // Set up listeners
      this.setupNotificationListeners();
      this.setupTokenRefreshListeners();

      runInAction(() => {
        this.isInitialized = true;
        this.isLoading = false;
      });

      await CrashlyticsService.log('NotificationViewModel initialized successfully');
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.isLoading = false;
      });
      await CrashlyticsService.recordError(error as Error);
    }
  }

  /**
   * Setup notification listeners
   */
  private setupNotificationListeners(): void {
    PushNotificationService.onNotificationReceived((notification) => {
      runInAction(() => {
        this.notifications.unshift(notification);
        // Keep only last 100 notifications
        if (this.notifications.length > 100) {
          this.notifications = this.notifications.slice(0, 100);
        }
      });
    });
  }

  /**
   * Setup token refresh listeners
   */
  private setupTokenRefreshListeners(): void {
    PushNotificationService.onTokenRefreshed((token) => {
      runInAction(() => {
        this.fcmToken = token;
      });
    });
  }

  /**
   * Get FCM token
   */
  async getFCMToken(): Promise<FCMTokenResponse | null> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      const tokenResponse = await PushNotificationService.getFCMToken();
      
      runInAction(() => {
        if (tokenResponse) {
          this.fcmToken = tokenResponse.token;
        }
        this.isLoading = false;
      });

      return tokenResponse;
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.isLoading = false;
      });
      await CrashlyticsService.recordError(error as Error);
      return null;
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermission(): Promise<boolean> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      const granted = await PushNotificationService.requestPermission();
      
      runInAction(() => {
        this.isLoading = false;
      });

      return granted;
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.isLoading = false;
      });
      await CrashlyticsService.recordError(error as Error);
      return false;
    }
  }

  /**
   * Check if notifications are enabled
   */
  async checkNotificationStatus(): Promise<boolean> {
    try {
      return await PushNotificationService.areNotificationsEnabled();
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return false;
    }
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    runInAction(() => {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
    });
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(): void {
    runInAction(() => {
      this.notifications.forEach(notification => {
        notification.isRead = true;
      });
    });
  }

  /**
   * Delete notification
   */
  deleteNotification(notificationId: string): void {
    runInAction(() => {
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
    });
  }

  /**
   * Clear all notifications
   */
  clearAllNotifications(): void {
    runInAction(() => {
      this.notifications = [];
    });
  }

  /**
   * Get unread notifications count
   */
  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  /**
   * Get notifications by type
   */
  getNotificationsByType(type: NotificationType): NotificationModel[] {
    return this.notifications.filter(n => n.type === type);
  }

  /**
   * Get notifications by priority
   */
  getNotificationsByPriority(priority: NotificationPriority): NotificationModel[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  /**
   * Get high priority notifications
   */
  get highPriorityNotifications(): NotificationModel[] {
    return this.notifications.filter(n => 
      n.priority === NotificationPriority.HIGH || 
      n.priority === NotificationPriority.URGENT
    );
  }

  /**
   * Get recent notifications (last 24 hours)
   */
  get recentNotifications(): NotificationModel[] {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.notifications.filter(n => n.timestamp > twentyFourHoursAgo);
  }

  /**
   * Get current FCM token
   */
  get currentToken(): string | null {
    return this.fcmToken || PushNotificationService.getCurrentToken();
  }

  /**
   * Check if notification system is ready
   */
  get isReady(): boolean {
    return this.isInitialized && !this.isLoading && this.error === null;
  }

  /**
   * Get error message
   */
  get errorMessage(): string | null {
    return this.error;
  }

  /**
   * Clear error
   */
  clearError(): void {
    runInAction(() => {
      this.error = null;
    });
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    PushNotificationService.cleanup();
  }
}

export default new NotificationViewModel(); 