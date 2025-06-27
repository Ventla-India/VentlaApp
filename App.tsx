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
import { observer } from 'mobx-react-lite';
import SplashScreen from 'react-native-splash-screen';

// Import ViewModels
import AppViewModel from './src/viewmodels/AppViewModel';

// Import Components
import LoadingSpinner from './src/components/common/LoadingSpinner';
import Toast from './src/components/common/Toast';

// Import Constants
import { COLORS } from './src/constants';

// Import Localization
import useLocalization from './src/hooks/useLocalization';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { t, currentLanguage } = useLocalization();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.DARK.BACKGROUND : COLORS.LIGHT.BACKGROUND,
    flex: 1,
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await AppViewModel.initializeApp();
    // Hide splash screen after initialization
    SplashScreen.hide();
  };

  if (AppViewModel.isAppLoading) {
    return <LoadingSpinner />;
  }

  const { notificationStatus, recentNotifications } = AppViewModel;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('app_name')}
            </Text>
            
            <Text style={[styles.subtitle, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
              {t('common.mvvm_architecture')}
            </Text>

            <View style={styles.languageContainer}>
              <Text style={[styles.languageText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('common.language')}: {currentLanguage.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('notification.status')}
            </Text>
            
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('common.initialized')}: {notificationStatus.isInitialized ? '✅' : '❌'}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.notifications')}: {notificationStatus.notificationCount}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.unread')}: {notificationStatus.unreadCount}
              </Text>
              <Text style={[styles.statusText, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                {t('notification.fcm_token')}: {notificationStatus.hasToken ? '✅' : '❌'}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.PRIMARY }]}
                onPress={() => AppViewModel.handleGetFCMToken()}
              >
                <Text style={styles.buttonText}>{t('notification.get_token')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.SUCCESS }]}
                onPress={() => AppViewModel.handleRequestPermission()}
              >
                <Text style={styles.buttonText}>{t('notification.request_permission')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {notificationStatus.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {t('common.error')}: {notificationStatus.error}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
              {t('notification.recent')}
            </Text>
            
            {recentNotifications.length > 0 ? (
              recentNotifications.slice(0, 3).map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <Text style={[styles.notificationTitle, { color: isDarkMode ? COLORS.DARK.TEXT : COLORS.LIGHT.TEXT }]}>
                    {notification.title}
                  </Text>
                  <Text style={[styles.notificationBody, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                    {notification.body}
                  </Text>
                  <Text style={[styles.notificationTime, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: isDarkMode ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY }]}>
                {t('notification.no_recent')}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.ERROR }]}
              onPress={() => AppViewModel.triggerTestCrash()}
            >
              <Text style={styles.buttonText}>Test Crash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Toast
        visible={AppViewModel.toastVisible}
        message={AppViewModel.toastMessage}
        type={AppViewModel.toastType}
        onHide={() => AppViewModel.hideToast()}
      />
    </SafeAreaView>
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

export default observer(App);
