import { ErrorModel, DeviceInfo } from '../models/Error';
import CrashlyticsService from '../services/api/CrashlyticsService';

export class ErrorViewModel {
  private errors: ErrorModel[] = [];
  private deviceInfo: DeviceInfo | null = null;

  constructor() {
    this.initializeDeviceInfo();
  }

  /**
   * Initialize device information
   */
  private async initializeDeviceInfo(): Promise<void> {
    try {
      // This would typically come from a device service
      this.deviceInfo = {
        platform: 'ios', // This should be dynamic
        version: '1.0.0',
        buildNumber: '1',
        deviceModel: 'iPhone',
        osVersion: 'iOS 17.0'
      };
    } catch (error) {
      console.error('Failed to initialize device info:', error);
    }
  }

  /**
   * Record an error
   */
  async recordError(error: Error, context?: Record<string, any>): Promise<void> {
    try {
      const errorModel: ErrorModel = {
        id: Date.now().toString(),
        message: error.message,
        code: error.name,
        stack: error.stack,
        timestamp: new Date(),
        deviceInfo: this.deviceInfo || undefined,
        context
      };

      this.errors.push(errorModel);

      // Send to Crashlytics
      await CrashlyticsService.recordCustomError(errorModel, this.deviceInfo || undefined);
    } catch (crashlyticsError) {
      console.error('Failed to record error:', crashlyticsError);
    }
  }

  /**
   * Log a message
   */
  async log(message: string): Promise<void> {
    try {
      await CrashlyticsService.log(message);
    } catch (error) {
      console.error('Failed to log message:', error);
    }
  }

  /**
   * Set user ID for error tracking
   */
  async setUserId(userId: string): Promise<void> {
    try {
      await CrashlyticsService.setUserId(userId);
    } catch (error) {
      console.error('Failed to set user ID:', error);
    }
  }

  /**
   * Set user attributes for error tracking
   */
  async setUserAttributes(attributes: Record<string, string>): Promise<void> {
    try {
      await CrashlyticsService.setUserAttributes(attributes);
    } catch (error) {
      console.error('Failed to set user attributes:', error);
    }
  }

  /**
   * Get all recorded errors
   */
  getErrors(): ErrorModel[] {
    return [...this.errors];
  }

  /**
   * Get recent errors (last 24 hours)
   */
  getRecentErrors(): ErrorModel[] {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.errors.filter(error => error.timestamp > twentyFourHoursAgo);
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Get error count
   */
  getErrorCount(): number {
    return this.errors.length;
  }
}

export default new ErrorViewModel(); 