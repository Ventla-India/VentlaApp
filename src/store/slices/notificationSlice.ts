import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NotificationModel } from '../../models/Notification';
import PushNotificationService from '../../services/api/PushNotificationService';
import CrashlyticsService from '../../services/api/CrashlyticsService';

interface NotificationState {
  notifications: NotificationModel[];
  fcmToken: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  fcmToken: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Async thunk for getting FCM token
export const getFCMToken = createAsyncThunk(
  'notification/getFCMToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await PushNotificationService.getFCMToken();
      return response?.token || null;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for requesting notification permission
export const requestNotificationPermission = createAsyncThunk(
  'notification/requestPermission',
  async (_, { rejectWithValue }) => {
    try {
      const granted = await PushNotificationService.requestPermission();
      return granted;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for initializing notifications
export const initializeNotifications = createAsyncThunk(
  'notification/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await PushNotificationService.initialize();
      
      // Setup listeners
      PushNotificationService.onNotificationReceived((notification) => {
        dispatch(addNotification(notification));
      });

      PushNotificationService.onTokenRefreshed((token) => {
        dispatch(setFCMToken(token));
      });

      return true;
    } catch (error) {
      await CrashlyticsService.recordError(error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationModel>) => {
      state.notifications.unshift(action.payload);
      // Keep only last 100 notifications
      if (state.notifications.length > 100) {
        state.notifications = state.notifications.slice(0, 100);
      }
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getFCMToken cases
      .addCase(getFCMToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFCMToken.fulfilled, (state, action) => {
        state.fcmToken = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFCMToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // requestNotificationPermission cases
      .addCase(requestNotificationPermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestNotificationPermission.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(requestNotificationPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // initializeNotifications cases
      .addCase(initializeNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeNotifications.fulfilled, (state) => {
        state.isInitialized = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initializeNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addNotification,
  setFCMToken,
  clearNotifications,
  markNotificationAsRead,
  setError,
  clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer; 