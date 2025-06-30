import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserPreferences } from '../../types';
import { RootState } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  preferences: UserPreferences;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
    },
    theme: 'auto',
    language: 'en',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  updatePreferences,
  updateUserProfile,
  clearError,
} = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;
export const selectPreferences = (state: RootState) => state.user.preferences;
export const selectDisplayName = (state: RootState) => {
  const user = state.user.user as any;
  return user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.email || 'Guest';
};
export const selectIsLoggedIn = (state: RootState) => 
  state.user.isAuthenticated && state.user.user !== null;
export const selectHasNotificationsEnabled = (state: RootState) => {
  const prefs = state.user.preferences as any;
  return prefs?.notifications?.push || prefs?.notifications?.email;
};

export default userSlice.reducer; 