import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import SplashScreen from 'react-native-splash-screen';
import { getCrashlytics } from '@react-native-firebase/crashlytics';

// Import Components
import LoadingSpinner from './src/components/common/LoadingSpinner';
import Toast from './src/components/common/Toast';

// Import Constants
import { COLORS } from './src/constants';

// Import Localization
import useLocalization from './src/hooks/useLocalization';

// Import Redux hooks and actions
import { useAppDispatch, useAppSelector } from './src/hooks/useRedux';
import { initializeApp, showToast, hideToast } from './src/store/slices/appSlice';
import { 
  getFCMToken, 
  requestNotificationPermission, 
  initializeNotifications
} from './src/store/slices/notificationSlice';

import CrashlyticsService from './src/services/api/CrashlyticsService';

const AppContent: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, currentLanguage } = useLocalization();
  const dispatch = useAppDispatch();

  // Redux selectors
  const { isInitialized, isLoading, error, toastVisible, toastMessage, toastType } = useAppSelector((state: any) => state.app);
  const notifications = useAppSelector((state: any) => state.notification.notifications);
  const unreadCount = useAppSelector((state: any) => state.notification.notifications.filter((n: any) => !n.isRead).length);
  const fcmToken = useAppSelector((state: any) => state.notification.fcmToken);
  const notificationIsInitialized = useAppSelector((state: any) => state.notification.isInitialized);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.DARK.BACKGROUND : COLORS.LIGHT.BACKGROUND,
    flex: 1,
  };

  useEffect(() => {
    initializeAppAsync();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toastVisible) {
      timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toastVisible, dispatch]);

  const initializeAppAsync = async () => {
    try {
      await dispatch(initializeApp()).unwrap();
      await dispatch(initializeNotifications()).unwrap();
      dispatch(showToast({ message: 'App initialized successfully', type: 'success' }));
      // Hide splash screen after initialization
      SplashScreen.hide();
    } catch (error) {
      dispatch(showToast({ message: 'App initialization failed', type: 'error' }));
    }
  };

  const handleGetFCMToken = async () => {
    try {
      await dispatch(getFCMToken()).unwrap();
      dispatch(showToast({ message: 'FCM token retrieved successfully', type: 'success' }));
    } catch (error) {
      dispatch(showToast({ message: 'Failed to get FCM token', type: 'error' }));
    }
  };

  const handleRequestPermission = async () => {
    try {
      await dispatch(requestNotificationPermission()).unwrap();
      dispatch(showToast({ message: 'Notification permission granted', type: 'success' }));
    } catch (error) {
      dispatch(showToast({ message: 'Notification permission denied', type: 'error' }));
    }
  };

  const handleTestCrash = () => {
    getCrashlytics().crash();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? COLORS.DARK.BACKGROUND : COLORS.LIGHT.BACKGROUND}
      />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('app.title')}
            </Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
              {t('app.subtitle')}
            </Text>
            
            <View style={styles.languageContainer}>
              <Text style={[styles.languageText, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                {t('common.language')}: {currentLanguage}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('app.status')}
            </Text>
            
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('common.initialized')}: {isInitialized ? '✅' : '❌'}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('app.loading')}: {isLoading ? '🔄' : '✅'}
              </Text>
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('notification.status')}
            </Text>
            
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('common.initialized')}: {notificationIsInitialized ? '✅' : '❌'}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.notifications')}: {notifications.length}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.unread')}: {unreadCount}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.fcm_token')}: {fcmToken ? '✅' : '❌'}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.PRIMARY }]}
                onPress={handleGetFCMToken}
              >
                <Text style={styles.buttonText}>{t('notification.get_token')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.SUCCESS }]}
                onPress={handleRequestPermission}
              >
                <Text style={styles.buttonText}>{t('notification.request_permission')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('notification.recent')}
            </Text>
            
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification: any) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <Text style={[styles.notificationTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                    {notification.title}
                  </Text>
                  <Text style={[styles.notificationBody, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                    {notification.body}
                  </Text>
                  <Text style={[styles.notificationTime, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                    {notification.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                {t('notification.no_notifications')}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.ERROR }]}
              onPress={handleTestCrash}
            >
              <Text style={styles.buttonText}>Test Crash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {toastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onHide={() => {}}
        />
      )}
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  languageContainer: {
    marginTop: 16,
  },
  languageText: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  statusContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ERROR,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 14,
  },
  notificationItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
