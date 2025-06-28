import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import NotificationService from '../../services/api/PushNotificationService';
import CrashlyticsService from '../../services/api/CrashlyticsService';

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

// Async thunk for app initialization
export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (_, { rejectWithValue }) => {
    try {
      // Initialize notification system
      await NotificationService.getFCMToken();
      return true;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

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
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, showToast, hideToast, clearError } = appSlice.actions;
export default appSlice.reducer; 