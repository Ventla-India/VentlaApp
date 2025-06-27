import { makeAutoObservable, runInAction } from 'mobx';
import NotificationViewModel from './NotificationViewModel';
import ErrorViewModel from './ErrorViewModel';
import CrashlyticsService from '../services/api/CrashlyticsService';

export class AppViewModel {
  // Observable state
  isInitialized: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Initialize the app
   */
  async initializeApp(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.error = null;
      });

      // Initialize notification system
      await NotificationViewModel.getFCMToken();
      
      runInAction(() => {
        this.isInitialized = true;
        this.isLoading = false;
      });

      this.showToast('App initialized successfully', 'success');
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.isLoading = false;
      });
      this.showToast('App initialization failed', 'error');
      await ErrorViewModel.recordError(error as Error);
    }
  }

  /**
   * Show toast message
   */
  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    runInAction(() => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;
    });
  }

  /**
   * Hide toast message
   */
  hideToast(): void {
    runInAction(() => {
      this.toastVisible = false;
    });
  }

  /**
   * Handle FCM token request
   */
  async handleGetFCMToken(): Promise<void> {
    try {
      const token = await NotificationViewModel.getFCMToken();
      if (token) {
        this.showToast('FCM token received successfully', 'success');
      } else {
        this.showToast('Failed to get FCM token', 'error');
      }
    } catch (error) {
      this.showToast('Error getting FCM token', 'error');
      await ErrorViewModel.recordError(error as Error);
    }
  }

  /**
   * Handle permission request
   */
  async handleRequestPermission(): Promise<void> {
    try {
      const granted = await NotificationViewModel.requestPermission();
      if (granted) {
        this.showToast('Notification permission granted', 'success');
      } else {
        this.showToast('Notification permission denied', 'warning');
      }
    } catch (error) {
      this.showToast('Error requesting permission', 'error');
      await ErrorViewModel.recordError(error as Error);
    }
  }

  /**
   * Trigger test crash
   */
  triggerTestCrash(): void {
    try {
      // Log the action through the ViewModel
      this.logTestCrash();
      throw new Error('Test crash triggered by user');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Log test crash action
   */
  private async logTestCrash(): Promise<void> {
    try {
      await CrashlyticsService.log('Test crash button pressed');
    } catch (error) {
      // Silently handle logging errors
    }
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
   * Get notification status
   */
  get notificationStatus() {
    return {
      isInitialized: NotificationViewModel.isInitialized,
      notificationCount: NotificationViewModel.notifications.length,
      unreadCount: NotificationViewModel.unreadCount,
      hasToken: !!NotificationViewModel.currentToken,
      error: NotificationViewModel.error
    };
  }

  /**
   * Get recent notifications
   */
  get recentNotifications() {
    return NotificationViewModel.recentNotifications;
  }

  /**
   * Get app loading state
   */
  get isAppLoading(): boolean {
    return this.isLoading || NotificationViewModel.isLoading;
  }
}

// Export singleton instance
export default new AppViewModel(); 