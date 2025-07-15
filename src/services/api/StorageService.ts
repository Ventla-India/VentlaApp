// Simple in-memory storage implementation
// In production, install and use @react-native-async-storage/async-storage
export default class StorageService {
  private static instance: StorageService;
  private appId: string = 'ventla_app';
  private storage: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Get formatted app string key
   */
  private getFormattedAppString(key: string): string {
    return `${this.appId}_${key}`;
  }

  /**
   * Set string value in storage
   */
  public async setString(key: string, value: string): Promise<void> {
    try {
      const formattedKey = this.getFormattedAppString(key);
      this.storage.set(formattedKey, value);
    } catch (error) {
      console.error('Error setting string in storage:', error);
      throw error;
    }
  }

  /**
   * Get string value from storage
   */
  public async getString(key: string): Promise<string | null> {
    try {
      const formattedKey = this.getFormattedAppString(key);
      return this.storage.get(formattedKey) || null;
    } catch (error) {
      console.error('Error getting string from storage:', error);
      return null;
    }
  }

  /**
   * Remove item from storage
   */
  public async removeItem(key: string): Promise<void> {
    try {
      const formattedKey = this.getFormattedAppString(key);
      this.storage.delete(formattedKey);
    } catch (error) {
      console.error('Error removing item from storage:', error);
      throw error;
    }
  }

  /**
   * Clear all app data
   */
  public async clearAll(): Promise<void> {
    try {
      const keysToRemove: string[] = [];
      for (const key of this.storage.keys()) {
        if (key.startsWith(this.appId)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => this.storage.delete(key));
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Storage keys constants
  public static readonly MYUNIQUE_ID = 'MYUNIQUE_ID';
  public static readonly MYUSERNAME = 'MYUSERNAME';
  public static readonly POLICY_ID = 'POLICY_ID';
  public static readonly USER_EMAIL = 'USER_EMAIL';
} 