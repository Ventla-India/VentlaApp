import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import NotificationService from '../../services/api/PushNotificationService';
import CrashlyticsService from '../../services/api/CrashlyticsService';
import DatabaseService from '../../services/DatabaseService';

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async () => {
    try {
      // Initialize database
      await DatabaseService.initialize();
      
      // Initialize notification system
      await NotificationService.getFCMToken();
      
      // Add any other initialization logic here
      return { success: true };
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      console.error('App initialization failed:', error);
      throw error;
    }
  }
);

interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  toastVisible: boolean;
  toastMessage: string;
  toastType: 'success' | 'error' | 'warning' | 'info';
}

const initialState: AppState = {
  isInitialized: false,
  isLoading: false,
  error: null,
  toastVisible: false,
  toastMessage: '',
  toastType: 'info',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>) => {
      state.toastVisible = true;
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
    },
    hideToast: (state) => {
      state.toastVisible = false;
      state.toastMessage = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = false;
        state.error = action.error.message || 'App initialization failed';
      });
  },
});

export const { setLoading, setError, showToast, hideToast, clearError } = appSlice.actions;
export default appSlice.reducer; 