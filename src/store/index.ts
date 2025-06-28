import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import notificationSlice from './slices/notificationSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    notification: notificationSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['notification.notifications'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 