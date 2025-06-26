import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { getCrashlytics, setCrashlyticsCollectionEnabled, log, recordError } from '@react-native-firebase/crashlytics';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const crashlytics = getCrashlytics();

  useEffect(() => {
    setCrashlyticsCollectionEnabled(crashlytics, true);
  }, [crashlytics]);

  const triggerCrash = () => {
    log(crashlytics, '🔥 Triggering test crash from App');
    recordError(crashlytics, new Error('Test crash (manual)'));
    // Throw a fatal error to crash the app (JS thread crash)
    throw new Error('Test crash (manual)');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
        Crashlytics Test
      </Text>
      <Button title="Crash the App" onPress={triggerCrash} />
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
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
