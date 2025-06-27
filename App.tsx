import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, useColorScheme, Alert, Platform } from 'react-native';
import { getCrashlytics, setCrashlyticsCollectionEnabled, log, recordError } from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const crashlytics = getCrashlytics();
  const [fcmToken, setFcmToken] = useState<string>('');
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

  useEffect(() => {
    setCrashlyticsCollectionEnabled(crashlytics, true);
    setupPushNotifications();
  }, [crashlytics]);

  const setupPushNotifications = async () => {
    try {
      // Request permission for iOS
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        
        setNotificationPermission(enabled);
        
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      } else {
        // Android doesn't need explicit permission request
        setNotificationPermission(true);
      }

      // Get FCM token
      const token = await messaging().getToken();
      if (token) {
        setFcmToken(token);
        console.log('FCM Token:', token);
      }

      // Listen for token refresh
      const unsubscribeToken = messaging().onTokenRefresh(token => {
        setFcmToken(token);
        console.log('New FCM Token:', token);
      });

      // Handle foreground messages
      const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
        console.log('Foreground message received:', remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title || 'New Message',
          remoteMessage.notification?.body || 'You have a new message',
          [{ text: 'OK' }]
        );
      });

      // Handle background/quit state messages
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened app:', remoteMessage);
      });

      // Check if app was opened from a notification
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('App opened from notification:', remoteMessage);
          }
        });

      return () => {
        unsubscribeToken();
        unsubscribeForeground();
      };
    } catch (error) {
      console.error('Error setting up push notifications:', error);
      log(crashlytics, 'Error setting up push notifications');
      recordError(crashlytics, error as Error);
    }
  };

  const triggerCrash = () => {
    log(crashlytics, '🔥 Triggering test crash from App');
    recordError(crashlytics, new Error('Test crash (manual)'));
    throw new Error('Test crash (manual)');
  };

  const sendTestNotification = async () => {
    try {
      Alert.alert(
        'Test Notification',
        'This is a test notification. In a real app, you would send this from your backend server.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
        Push Notifications Test
      </Text>
      
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: isDarkMode ? '#fff' : '#000' }]}>
          Permission: {notificationPermission ? '✅ Granted' : '❌ Denied'}
        </Text>
        <Text style={[styles.statusText, { color: isDarkMode ? '#fff' : '#000' }]}>
          FCM Token: {fcmToken ? '✅ Received' : '⏳ Loading...'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Test Notification" onPress={sendTestNotification} />
        <View style={styles.buttonSpacer} />
        <Button title="Crash the App" onPress={triggerCrash} />
      </View>

      {fcmToken && (
        <View style={styles.tokenContainer}>
          <Text style={[styles.tokenLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
            FCM Token (first 50 chars):
          </Text>
          <Text style={[styles.tokenText, { color: isDarkMode ? '#ccc' : '#666' }]}>
            {fcmToken.substring(0, 50)}...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  statusContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonSpacer: {
    width: 16,
  },
  tokenContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    maxWidth: '100%',
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default App;
