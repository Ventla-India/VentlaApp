# Push Notifications Setup Guide

This guide explains how to set up and use push notifications in your React Native VentlaApp.

## What's Already Configured

✅ Firebase Messaging package installed (`@react-native-firebase/messaging`)  
✅ Android permissions added to `AndroidManifest.xml`  
✅ iOS background modes added to `Info.plist`  
✅ Push notification service utility created  
✅ App.tsx updated with push notification functionality  

## Features Implemented

1. **Permission Handling**: Automatic permission requests for iOS
2. **FCM Token Management**: Get and refresh FCM tokens
3. **Foreground Notifications**: Handle notifications when app is open
4. **Background Notifications**: Handle notifications when app is in background
5. **App Launch from Notification**: Handle when app is opened from notification
6. **Token Refresh**: Automatic handling of token refreshes

## How to Test Push Notifications

### 1. Run the App
```bash
# For Android
npm run android

# For iOS
npm run ios
```

### 2. Check the UI
The app will show:
- Permission status (Granted/Denied)
- FCM Token status (Received/Loading)
- FCM Token preview (first 50 characters)
- Test notification button

### 3. Send Test Notifications

#### Option A: Using Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to "Messaging" in the left sidebar
4. Click "Send your first message"
5. Fill in the notification details:
   - Title: "Test Notification"
   - Body: "This is a test message"
6. Under "Target", select "Single device" and paste your FCM token
7. Send the message

#### Option B: Using cURL (for testing)
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "YOUR_FCM_TOKEN",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test message from cURL"
    },
    "data": {
      "custom_key": "custom_value"
    }
  }'
```

## Using the Push Notification Service

### Basic Usage
```typescript
import { pushNotificationService } from './src/utils/pushNotifications';

// Initialize the service
const isInitialized = await pushNotificationService.initialize();

// Get FCM token
const token = pushNotificationService.getFCMToken();

// Listen for token refresh
const unsubscribe = pushNotificationService.onTokenRefresh((newToken) => {
  console.log('New token:', newToken);
  // Send new token to your backend
});

// Listen for foreground messages
const unsubscribeMessage = pushNotificationService.onMessage((message) => {
  console.log('Foreground message:', message);
  // Handle the message
});

// Listen for app opened from notification
const unsubscribeOpened = pushNotificationService.onNotificationOpenedApp((message) => {
  console.log('App opened from notification:', message);
  // Navigate to specific screen based on notification
});
```

### Advanced Usage
```typescript
// Check permission status
const hasPermission = await pushNotificationService.hasPermission();

// Request permission (iOS only)
const permissionGranted = await pushNotificationService.requestPermission();

// Refresh FCM token manually
const newToken = await pushNotificationService.refreshToken();

// Get initial notification (if app was opened from notification)
const initialNotification = await pushNotificationService.getInitialNotification();
```

## Backend Integration

To send notifications from your backend, you'll need:

1. **Server Key**: Get this from Firebase Console → Project Settings → Cloud Messaging
2. **FCM Token**: Send this token to your backend when the user logs in
3. **API Endpoint**: Use Firebase FCM HTTP v1 API

### Example Backend Code (Node.js)
```javascript
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'your-project-id',
});

// Send notification
async function sendNotification(fcmToken, title, body, data = {}) {
  const message = {
    notification: {
      title,
      body,
    },
    data,
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.log('Error sending message:', error);
    throw error;
  }
}
```

## Troubleshooting

### Common Issues

1. **Permission Denied (iOS)**
   - Check if user denied permission in Settings
   - Guide user to Settings → Your App → Notifications

2. **No FCM Token**
   - Ensure Firebase is properly configured
   - Check internet connection
   - Verify `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) are in place

3. **Notifications Not Received**
   - Check if device is online
   - Verify FCM token is valid
   - Check Firebase Console for delivery status

4. **Background Notifications Not Working**
   - Ensure `UIBackgroundModes` is set in `Info.plist` (iOS)
   - Check Android manifest permissions
   - Verify notification payload format

### Debug Tips

1. **Enable Debug Logging**
   ```typescript
   // Add this to your App.tsx
   if (__DEV__) {
     messaging().setAutoInitEnabled(true);
   }
   ```

2. **Check Console Logs**
   - Look for FCM token logs
   - Check for permission status
   - Monitor notification events

3. **Test on Physical Device**
   - Push notifications may not work properly on simulators
   - Always test on real devices

## Next Steps

1. **Customize Notification UI**: Modify the notification display in your app
2. **Add Navigation**: Navigate to specific screens when notifications are tapped
3. **Implement Topics**: Subscribe users to notification topics
4. **Add Analytics**: Track notification engagement
5. **Set up Backend**: Create API endpoints to send notifications

## Resources

- [React Native Firebase Messaging Documentation](https://rnfirebase.io/messaging/usage)
- [Firebase Console](https://console.firebase.google.com/)
- [FCM HTTP v1 API Reference](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages) 