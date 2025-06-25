import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const triggerCrash = () => {
    crashlytics().log('🔥 Triggering test crash from App');
    crashlytics().crash(); // 💥 Intentionally crashes app
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
