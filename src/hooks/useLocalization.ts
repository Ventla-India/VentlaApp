import { useState, useEffect, useCallback } from 'react';
import LocalizationService, { SupportedLanguage } from '../services/api/LocalizationService';

export const useLocalization = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Get current language from service
    setCurrentLanguage(LocalizationService.getCurrentLanguage());
  }, []);

  const t = useCallback((key: string, params?: { [key: string]: string | number }): string => {
    return LocalizationService.t(key, params);
  }, [currentLanguage]); // Re-create function when language changes

  const setLanguage = useCallback((language: SupportedLanguage): void => {
    LocalizationService.setLanguage(language);
    setCurrentLanguage(language);
  }, []);

  const getCurrentLanguage = useCallback((): SupportedLanguage => {
    return LocalizationService.getCurrentLanguage();
  }, []);

  const getAvailableLanguages = useCallback(() => {
    return LocalizationService.getAvailableLanguages();
  }, []);

  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return LocalizationService.formatDate(date, options);
  }, [currentLanguage]);

  const formatTime = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return LocalizationService.formatTime(date, options);
  }, [currentLanguage]);

  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions): string => {
    return LocalizationService.formatNumber(number, options);
  }, [currentLanguage]);

  const getMonthName = useCallback((month: number): string => {
    return LocalizationService.getMonthName(month);
  }, [currentLanguage]);

  const getDayName = useCallback((day: number): string => {
    return LocalizationService.getDayName(day);
  }, [currentLanguage]);

  return {
    t,
    currentLanguage,
    setLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    formatDate,
    formatTime,
    formatNumber,
    getMonthName,
    getDayName,
  };
};

export default useLocalization; 