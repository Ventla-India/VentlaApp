export interface CreateAccountConfirmedEmailRequest {
  appId: number;
  email: string;
  phoneId?: string;
  firstName?: string;
  lastName?: string;
}

export interface AutoCreateUsernamePasswordResponse {
  // Lowercase keys (expected)
  success?: boolean;
  username?: string;
  message?: string;
  error?: string;
  // Capitalized keys (API actual)
  Success?: boolean;
  Username?: string;
  Message?: string;
  Error?: string;
  ErrorCode?: string | null;
  Password?: string | null;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  username: string;
  email: string;
  policyId?: string;
}

export interface AuthError {
  message: string;
  code?: string;
} 