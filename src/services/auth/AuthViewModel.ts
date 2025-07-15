import { useState, useCallback } from 'react';
import AuthService from '../api/AuthService';
import StorageService from '../api/StorageService';
import DeviceService from '../api/DeviceService';
import { AuthState, User, AuthError } from '../../models/Auth';

export class AuthViewModel {
  private authService: AuthService;
  private storageService: StorageService;

  constructor() {
    this.authService = AuthService.getInstance();
    this.storageService = StorageService.getInstance();
  }

  /**
   * Create account with confirmed email
   */
  public async createAccountConfirmedEmail(
    email: string,
    onSuccess: (user: User) => void,
    onError: (error: AuthError) => void,
    onLoadingChange: (loading: boolean) => void
  ): Promise<void> {
    try {
      console.log('🔐 [AuthViewModel] Starting account creation for:', email);
      onLoadingChange(true);

      // Get or generate device unique ID
      let myUniqueId = await this.storageService.getString(StorageService.MYUNIQUE_ID);
      if (!myUniqueId) {
        myUniqueId = await DeviceService.getDeviceUniqueId();
        await this.storageService.setString(StorageService.MYUNIQUE_ID, myUniqueId);
      }
      console.log('📱 [AuthViewModel] Device ID:', myUniqueId);
      
      // Call API
      console.log('🌐 [AuthViewModel] Calling API...');
      const response = await this.authService.createAccountConfirmedEmail(email, myUniqueId);
      console.log('📡 [AuthViewModel] API Response:', response);

      // Normalize keys for both possible cases
      const isSuccess = response.success ?? response.Success;
      const username = response.username ?? response.Username;
      const errorMsg =
        response.error ||
        response.Error ||
        response.message ||
        response.Message ||
        response.ErrorCode ||
        'Unknown error occurred';

      if (isSuccess && username) {
        console.log('✅ [AuthViewModel] Account created successfully!');
        // Store user data
        await this.storageService.setString(StorageService.MYUSERNAME, username);
        await this.storageService.setString(StorageService.USER_EMAIL, email);
        await this.storageService.setString(StorageService.POLICY_ID, '2147'); // Default policy ID
        console.log('💾 [AuthViewModel] User data stored');

        // Create user object
        const user: User = {
          username: username,
          email: email,
          policyId: '2147'
        };

        onSuccess(user);
      } else {
        console.log('❌ [AuthViewModel] Account creation failed:', errorMsg);
        const error: AuthError = {
          message: errorMsg,
          code: 'CREATE_ACCOUNT_FAILED'
        };
        onError(error);
      }
    } catch (error) {
      console.log('💥 [AuthViewModel] Exception caught:', error);
      const authError: AuthError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'NETWORK_ERROR'
      };
      onError(authError);
    } finally {
      console.log('🏁 [AuthViewModel] Account creation process completed');
      onLoadingChange(false);
    }
  }

  /**
   * Verify OTP (account confirmation code)
   */
  public async verifyOtp(
    email: string,
    code: string,
    onSuccess: (result: any) => void,
    onError: (error: AuthError) => void,
    onLoadingChange: (loading: boolean) => void
  ): Promise<void> {
    try {
      onLoadingChange(true);
      const response = await this.authService.verifyAccountConfirmedEmail(2147, email, code);
      // Normalize keys for both possible cases
      const isSuccess = response.success ?? response.Success;
      if (isSuccess) {
        onSuccess(response);
      } else {
        const errorMsg =
          response.error ||
          response.Error ||
          response.message ||
          response.Message ||
          response.ErrorCode ||
          'Invalid or expired code';
        onError({ message: errorMsg });
      }
    } catch (error) {
      onError({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
    } finally {
      onLoadingChange(false);
    }
  }

  /**
   * Get stored user data
   */
  public async getStoredUser(): Promise<User | null> {
    try {
      const username = await this.storageService.getString(StorageService.MYUSERNAME);
      const email = await this.storageService.getString(StorageService.USER_EMAIL);
      const policyId = await this.storageService.getString(StorageService.POLICY_ID);

      if (username && email) {
        return {
          username,
          email,
          policyId: policyId || undefined
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  /**
   * Clear stored user data
   */
  public async clearStoredUser(): Promise<void> {
    try {
      await this.storageService.removeItem(StorageService.MYUSERNAME);
      await this.storageService.removeItem(StorageService.USER_EMAIL);
      await this.storageService.removeItem(StorageService.POLICY_ID);
    } catch (error) {
      console.error('Error clearing stored user:', error);
    }
  }
}

// React Hook for using AuthViewModel
export const useAuthViewModel = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
    user: null
  });

  const authViewModel = new AuthViewModel();

  const createAccountConfirmedEmail = useCallback(async (email: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    await authViewModel.createAccountConfirmedEmail(
      email,
      (user) => {
        setAuthState({ isLoading: false, error: null, user });
      },
      (error) => {
        setAuthState({ isLoading: false, error: error.message, user: null });
      },
      (loading) => {
        setAuthState(prev => ({ ...prev, isLoading: loading }));
      }
    );
  }, []);

  const verifyOtp = useCallback(
    async (
      email: string,
      code: string,
      onSuccess: (result: any) => void,
      onError: (error: AuthError) => void,
      onLoadingChange: (loading: boolean) => void
    ) => {
      await authViewModel.verifyOtp(email, code, onSuccess, onError, onLoadingChange);
    },
    []
  );

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const logout = useCallback(async () => {
    await authViewModel.clearStoredUser();
    setAuthState({ isLoading: false, error: null, user: null });
  }, []);

  return {
    authState,
    createAccountConfirmedEmail,
    verifyOtp,
    clearError,
    logout
  };
}; 