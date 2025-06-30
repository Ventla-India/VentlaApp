export interface NotificationModel {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  imageUrl?: string;
  timestamp: Date;
  isRead: boolean;
  type: NotificationType;
  priority: NotificationPriority;
  category?: string;
  actionUrl?: string;
  badge?: number;
}

export enum NotificationType {
  EVENT = 'event',
  CHAT = 'chat',
  SYSTEM = 'system',
  REMINDER = 'reminder',
  UPDATE = 'update',
  PROMOTION = 'promotion'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface PushNotificationPayload {
  notification: {
    title: string;
    body: string;
    image?: string;
  };
  data?: Record<string, any>;
  android?: {
    priority?: 'normal' | 'high';
    channelId?: string;
    sound?: string;
  };
  apns?: {
    payload: {
      aps: {
        badge?: number;
        sound?: string;
        category?: string;
      };
    };
  };
}

export interface FCMTokenResponse {
  token: string;
  timestamp: Date;
  isValid: boolean;
} 