export interface ErrorModel {
  id: string;
  message: string;
  code?: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  deviceInfo?: DeviceInfo;
  context?: Record<string, any>;
}

export interface DeviceInfo {
  platform: 'ios' | 'android';
  version: string;
  buildNumber: string;
  deviceModel: string;
  osVersion: string;
}

export interface ErrorResponse {
  success: false;
  error: ErrorModel;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse; 