import { 
  CreateAccountConfirmedEmailRequest, 
  AutoCreateUsernamePasswordResponse 
} from '../../models/Auth';
import DeviceService from './DeviceService';

export default class AuthService {
  private static instance: AuthService;
  private baseUrl: string = 'https://manage-dev.ventla.io';
  private appId: number = 2147; // Default app ID, should be configurable

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Create account with confirmed email
   */
  public async createAccountConfirmedEmail(
    email: string, 
    phoneId: string, 
    firstName?: string, 
    lastName?: string
  ): Promise<AutoCreateUsernamePasswordResponse> {
    try {
      console.log('🌐 [AuthService] Making API request to:', `${this.baseUrl}/Client/CreateAccountConfirmedEmail`);
      const requestData: CreateAccountConfirmedEmailRequest = {
        appId: this.appId,
        email,
        phoneId,
        firstName,
        lastName
      };
      console.log('📤 [AuthService] Request data:', requestData);

      const response = await this.makeRequest<AutoCreateUsernamePasswordResponse>(
        `${this.baseUrl}/Client/CreateAccountConfirmedEmail`,
        'POST',
        requestData
      );

      console.log('📥 [AuthService] API Response received:', response);
      return response;
    } catch (error) {
      console.error('💥 [AuthService] Exception in createAccountConfirmedEmail:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Verify OTP (account confirmation code)
   */
  public async verifyAccountConfirmedEmail(
    appId: number,
    email: string,
    code: string
  ): Promise<any> {
    try {
      console.log('🌐 [AuthService] Making API request to:', `${this.baseUrl}/Client/VerifyAccountConfirmedEmail`);
      const requestData = {
        appId,
        email,
        code,
      };
      console.log('📤 [AuthService] Request data:', requestData);
      const response = await this.makeRequest<any>(
        `${this.baseUrl}/Client/VerifyAccountConfirmedEmail`,
        'POST',
        requestData
      );
      console.log('📥 [AuthService] API Response received:', response);
      return response;
    } catch (error) {
      console.error('💥 [AuthService] Exception in verifyAccountConfirmedEmail:', error);
      throw error;
    }
  }

  /**
   * Make HTTP request
   */
  private async makeRequest<T>(
    url: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    data?: any
  ): Promise<T> {
    try {
      console.log('🌐 [AuthService] Making HTTP request to:', url);
      console.log('📤 [AuthService] Method:', method);
      console.log('📤 [AuthService] Headers:', { 'Content-Type': 'application/json' });
      console.log('📤 [AuthService] Body:', data);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const requestOptions: RequestInit = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      };

      console.log('⏳ [AuthService] Sending request...');
      const response = await fetch(url, requestOptions);
      console.log('📥 [AuthService] Response status:', response.status);
      console.log('📥 [AuthService] Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [AuthService] HTTP Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ [AuthService] Response parsed successfully:', result);
      return result as T;
    } catch (error) {
      console.error('💥 [AuthService] Request failed for', url, ':', error);
      console.error('💥 [AuthService] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : 'Unknown'
      });
      throw error;
    }
  }

  /**
   * Set app ID (for configuration)
   */
  public setAppId(appId: number): void {
    this.appId = appId;
  }

  /**
   * Get current app ID
   */
  public getAppId(): number {
    return this.appId;
  }
} 