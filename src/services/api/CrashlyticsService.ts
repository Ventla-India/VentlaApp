import crashlytics from '@react-native-firebase/crashlytics';
import { ErrorModel, DeviceInfo } from '../../models/Error';

export class CrashlyticsService {
  private static instance: CrashlyticsService;

  private constructor() {}

  public static getInstance(): CrashlyticsService {
    if (!CrashlyticsService.instance) {
      CrashlyticsService.instance = new CrashlyticsService();
    }
    return CrashlyticsService.instance;
  }

  /**
   * Log a message to Crashlytics
   */
  public async log(message: string): Promise<void> {
    try {
      await crashlytics().log(message);
    } catch (error) {
      console.error('Failed to log to Crashlytics:', error);
    }
  }

  /**
   * Record an error in Crashlytics
   */
  public async recordError(error: Error): Promise<void> {
    try {
      await crashlytics().recordError(error);
    } catch (crashlyticsError) {
      console.error('Failed to record error in Crashlytics:', crashlyticsError);
    }
  }

  /**
   * Set user identifier for crash reports
   */
  public async setUserId(userId: string): Promise<void> {
    try {
      await crashlytics().setUserId(userId);
    } catch (error) {
      console.error('Failed to set user ID in Crashlytics:', error);
    }
  }

  /**
   * Set user attributes for crash reports
   */
  public async setUserAttributes(attributes: Record<string, string>): Promise<void> {
    try {
      await crashlytics().setAttributes(attributes);
    } catch (error) {
      console.error('Failed to set user attributes in Crashlytics:', error);
    }
  }

  /**
   * Set custom key-value pairs for crash reports
   */
  public async setCustomKey(key: string, value: string): Promise<void> {
    try {
      await crashlytics().setAttribute(key, value);
    } catch (error) {
      console.error('Failed to set custom key in Crashlytics:', error);
    }
  }

  /**
   * Record a custom error with additional context
   */
  public async recordCustomError(
    error: ErrorModel,
    deviceInfo?: DeviceInfo
  ): Promise<void> {
    try {
      const customError = new Error(error.message);
      customError.name = error.code || 'CustomError';
      
      // Set custom attributes before recording error
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

  /**
   * Enable or disable crashlytics collection
   */
  public async setCrashlyticsCollectionEnabled(enabled: boolean): Promise<void> {
    try {
      await crashlytics().setCrashlyticsCollectionEnabled(enabled);
    } catch (error) {
      console.error('Failed to set Crashlytics collection enabled:', error);
    }
  }

  /**
   * Check if crashlytics collection is enabled
   */
  public async isCrashlyticsCollectionEnabled(): Promise<boolean> {
    try {
      const enabled = await crashlytics().isCrashlyticsCollectionEnabled;
      return enabled;
    } catch (error) {
      console.error('Failed to check Crashlytics collection status:', error);
      return false;
    }
  }
}

export default CrashlyticsService.getInstance(); 