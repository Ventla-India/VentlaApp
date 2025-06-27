import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import en from '../../assets/locales/en.json';
import sv from '../../assets/locales/sv.json';
import da from '../../assets/locales/da.json';
import de from '../../assets/locales/de.json';
import es from '../../assets/locales/es.json';
import fi from '../../assets/locales/fi.json';
import fr from '../../assets/locales/fr.json';
import nb from '../../assets/locales/nb.json';
import CrashlyticsService from './CrashlyticsService';

// Import other language files (you'll need to create these)
// import da from '../../assets/locales/da.json';
// import de from '../../assets/locales/de.json';
// import es from '../../assets/locales/es.json';
// import fi from '../../assets/locales/fi.json';
// import fr from '../../assets/locales/fr.json';
// import nb from '../../assets/locales/nb.json';

export type SupportedLanguage = 'en' | 'sv' | 'da' | 'de' | 'es' | 'fi' | 'fr' | 'nb';

interface LocalizationData {
  [key: string]: any;
}

export class LocalizationService {
  private static instance: LocalizationService;
  private currentLanguage: SupportedLanguage = 'en';
  private translations: { [key in SupportedLanguage]: LocalizationData } = {
    en,
    sv,
    da,
    de,
    es,
    fi,
    fr,
    nb,
  };

  private constructor() {
    this.initializeLanguage();
  }

  public static getInstance(): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService();
    }
    return LocalizationService.instance;
  }

  /**
   * Initialize the language based on device settings
   */
  private async initializeLanguage(): Promise<void> {
    try {
      const deviceLocale = await this.getDeviceLocale();
      const supportedLanguage = this.getSupportedLanguage(deviceLocale);
      this.setLanguage(supportedLanguage);
      
      await CrashlyticsService.log(`Localization initialized with language: ${supportedLanguage}`);
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      // Fallback to English
      this.setLanguage('en');
    }
  }

  /**
   * Get device locale
   */
  private async getDeviceLocale(): Promise<string> {
    try {
      // Use JavaScript's built-in locale detection
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      return locale || 'en';
    } catch (error) {
      return 'en';
    }
  }

  /**
   * Get supported language from device locale
   */
  private getSupportedLanguage(deviceLocale: string): SupportedLanguage {
    const languageCode = deviceLocale.split('-')[0].toLowerCase();
    
    const languageMap: { [key: string]: SupportedLanguage } = {
      'en': 'en',
      'sv': 'sv',
      'da': 'da',
      'de': 'de',
      'es': 'es',
      'fi': 'fi',
      'fr': 'fr',
      'nb': 'nb',
      'no': 'nb', // Norwegian Bokmål
    };

    return languageMap[languageCode] || 'en';
  }

  /**
   * Set the current language
   */
  public setLanguage(language: SupportedLanguage): void {
    console.log(`Setting language from ${this.currentLanguage} to ${language}`);
    this.currentLanguage = language;
    console.log(`Language set to: ${this.currentLanguage}`);
  }

  /**
   * Get the current language
   */
  public getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Get a translation by key
   */
  public t(key: string, params?: { [key: string]: string | number }): string {
    try {
      console.log(`Getting translation for key: ${key}, language: ${this.currentLanguage}`);
      const keys = key.split('.');
      let value: any = this.translations[this.currentLanguage];

      // Navigate through nested keys
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English if key not found
          value = this.getNestedValue(this.translations.en, keys);
          break;
        }
      }

      // If value is not a string, return the key
      if (typeof value !== 'string') {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }

      // Replace parameters if provided
      if (params) {
        return this.replaceParameters(value, params);
      }

      console.log(`Translation result: ${value}`);
      return value;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  }

  /**
   * Get nested value from object
   */
  private getNestedValue(obj: any, keys: string[]): any {
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
  }

  /**
   * Replace parameters in translation string
   */
  private replaceParameters(text: string, params: { [key: string]: string | number }): string {
    let result = text;
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }
    return result;
  }

  /**
   * Get all available languages
   */
  public getAvailableLanguages(): { code: SupportedLanguage; name: string; nativeName: string }[] {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
      { code: 'da', name: 'Danish', nativeName: 'Dansk' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'nb', name: 'Norwegian', nativeName: 'Norsk' },
    ];
  }

  /**
   * Check if a language is supported
   */
  public isLanguageSupported(language: string): language is SupportedLanguage {
    return ['en', 'sv', 'da', 'de', 'es', 'fi', 'fr', 'nb'].includes(language);
  }

  /**
   * Get formatted date based on current language
   */
  public formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    try {
      const locale = this.currentLanguage === 'nb' ? 'no' : this.currentLanguage;
      return date.toLocaleDateString(locale, options);
    } catch (error) {
      return date.toLocaleDateString('en', options);
    }
  }

  /**
   * Get formatted time based on current language
   */
  public formatTime(date: Date, options?: Intl.DateTimeFormatOptions): string {
    try {
      const locale = this.currentLanguage === 'nb' ? 'no' : this.currentLanguage;
      return date.toLocaleTimeString(locale, options);
    } catch (error) {
      return date.toLocaleTimeString('en', options);
    }
  }

  /**
   * Get formatted number based on current language
   */
  public formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    try {
      const locale = this.currentLanguage === 'nb' ? 'no' : this.currentLanguage;
      return number.toLocaleString(locale, options);
    } catch (error) {
      return number.toLocaleString('en', options);
    }
  }

  /**
   * Get month name
   */
  public getMonthName(month: number): string {
    const months = [
      'months.january', 'months.february', 'months.march', 'months.april',
      'months.may', 'months.june', 'months.july', 'months.august',
      'months.september', 'months.october', 'months.november', 'months.december'
    ];
    return this.t(months[month]);
  }

  /**
   * Get day name
   */
  public getDayName(day: number): string {
    const days = [
      'days.sunday', 'days.monday', 'days.tuesday', 'days.wednesday',
      'days.thursday', 'days.friday', 'days.saturday'
    ];
    return this.t(days[day]);
  }
}

export default LocalizationService.getInstance(); 