// App Constants
export const APP_NAME = 'VentlaApp';
export const APP_VERSION = '1.0.0';
export const BUILD_NUMBER = '1';

// API Constants
export const API_BASE_URL = 'https://api.ventlaapp.com';
export const API_TIMEOUT = 30000; // 30 seconds

// Firebase Constants
export const FIREBASE_CONFIG = {
  // Your Firebase config here
};

// Notification Constants
export const NOTIFICATION_TYPES = {
  EVENT: 'event',
  CHAT: 'chat',
  SYSTEM: 'system',
  REMINDER: 'reminder',
  UPDATE: 'update',
  PROMOTION: 'promotion',
} as const;

export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Theme Constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// Language Constants
export const SUPPORTED_LANGUAGES = {
  EN: 'en',
  SV: 'sv',
  DA: 'da',
  DE: 'de',
  ES: 'es',
  FI: 'fi',
  FR: 'fr',
  NB: 'nb',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  SETTINGS: 'settings',
  THEME: 'theme',
  LANGUAGE: 'language',
  FCM_TOKEN: 'fcm_token',
  NOTIFICATIONS: 'notifications',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please log in again.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  PERMISSION_DENIED: 'Permission denied.',
  INVALID_INPUT: 'Invalid input provided.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  NOTIFICATION_ENABLED: 'Notifications enabled!',
  NOTIFICATION_DISABLED: 'Notifications disabled!',
} as const;

// Validation Constants
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  BORDER_RADIUS: 8,
  BORDER_RADIUS_SMALL: 4,
  BORDER_RADIUS_LARGE: 12,
  PADDING: 16,
  PADDING_SMALL: 8,
  PADDING_LARGE: 24,
  MARGIN: 16,
  MARGIN_SMALL: 8,
  MARGIN_LARGE: 24,
  SHADOW_OPACITY: 0.1,
  SHADOW_RADIUS: 4,
  SHADOW_OFFSET: { width: 0, height: 2 },
} as const;

// Colors
export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  INFO: '#5AC8FA',
  
  // Light Theme
  LIGHT: {
    BACKGROUND: '#FFFFFF',
    SURFACE: '#F2F2F7',
    TEXT: '#000000',
    TEXT_SECONDARY: '#8E8E93',
    BORDER: '#C6C6C8',
    SHADOW: '#000000',
  },
  
  // Dark Theme
  DARK: {
    BACKGROUND: '#000000',
    SURFACE: '#1C1C1E',
    TEXT: '#FFFFFF',
    TEXT_SECONDARY: '#8E8E93',
    BORDER: '#38383A',
    SHADOW: '#000000',
  },
} as const;

// Animation Constants
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Cache Constants
export const CACHE = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 60 * 60 * 1000, // 1 hour
  SHORT_TTL: 60 * 1000, // 1 minute
} as const; 