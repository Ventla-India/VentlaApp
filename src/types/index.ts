import { NotificationModel as Notification } from '../models/Notification';

// Navigation Types
export interface RootStackParamList {
  Home: undefined;
  Event: { eventId: string };
  Chat: { chatId: string };
  Profile: undefined;
  Settings: undefined;
  Notification: undefined;
  Login: undefined;
  Register: undefined;
  Splash: undefined;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: Location;
  organizer: User;
  participants: Participant[];
  maxParticipants?: number;
  category: string;
  tags: string[];
  image?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Participant {
  user: User;
  status: 'pending' | 'confirmed' | 'declined' | 'waitlist';
  joinedAt: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'file' | 'location';
  timestamp: string;
  isRead: boolean;
  metadata?: Record<string, any>;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

// Component Props Types
export interface BaseComponentProps {
  style?: any;
  testID?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

// State Management Types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  fcmToken: string | null;
  isInitialized: boolean;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Hook Types
export interface UseAsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: any;
  onSubmit: (values: T) => void | Promise<void>;
}

// Service Types
export interface ServiceConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

// Storage Types
export interface StorageAdapter {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Analytics Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export interface AnalyticsUser {
  id: string;
  properties?: Record<string, any>;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Network Types
export interface NetworkState {
  isConnected: boolean;
  type: 'wifi' | 'cellular' | 'none';
  isInternetReachable: boolean;
}

// Permission Types
export interface PermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: 'granted' | 'denied' | 'blocked' | 'unavailable';
}

// Device Types
export interface DeviceInfo {
  platform: 'ios' | 'android';
  version: string;
  buildNumber: string;
  deviceModel: string;
  osVersion: string;
  deviceId: string;
}

// Theme Types
export interface Theme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
}

export interface TextStyle {
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
} 