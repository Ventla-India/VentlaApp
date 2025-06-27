# VentlaApp

A React Native app with integrated Firebase Crashlytics and Push Notifications.

---

## Features

- **Crashlytics**: Real-time crash reporting using Firebase Crashlytics
- **Push Notifications**: Receive and handle push notifications via Firebase Cloud Messaging (FCM)
- **Modern React Native**: Built with React Native 0.80 and React 19

---

## Key Dependencies & Versions

- `react-native`: 0.80.0
- `react`: 19.1.0
- `@react-native-firebase/app`: ^22.2.1
- `@react-native-firebase/crashlytics`: ^22.2.1
- `@react-native-firebase/messaging`: ^22.2.1
- TypeScript: 5.0.4

---

## Setup & Installation

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Android**
   - Ensure `android/app/google-services.json` is present (from Firebase Console)
   - Run:
     ```sh
     npm run android
     ```

3. **iOS**
   - Ensure `ios/GoogleService-Info.plist` is present (from Firebase Console)
   - Install CocoaPods:
     ```sh
     cd ios && pod install && cd ..
     ```
   - Run:
     ```sh
     npm run ios
     ```

---

## Usage

### Crashlytics
- Crashlytics is enabled by default.
- To test, use the "Crash the App" button in the app UI. Crashes will be reported to Firebase Console.

### Push Notifications
- FCM token is generated and displayed in the app UI.
- To test, send a push notification from the Firebase Console or via cURL using the displayed FCM token.
- Foreground notifications show an in-app alert; background notifications appear in the system tray.

---

## Essential Commands

- Start Metro bundler:
  ```sh
  npm start
  ```
- Run on Android:
  ```sh
  npm run android
  ```
- Run on iOS:
  ```sh
  npm run ios
  ```
- Run tests:
  ```sh
  npm test
  ```
- Lint code:
  ```sh
  npm run lint
  ```

---

## Project Structure (Highlights)

- `App.tsx` — Main app logic, Crashlytics, and Push Notification integration
- `src/utils/pushNotifications.ts` — Push notification service utility
- `android/app/src/main/AndroidManifest.xml` — Android permissions and config
- `ios/VentlaApp/Info.plist` — iOS permissions and config

---

## Troubleshooting

- **No push notifications?**
  - Ensure correct Firebase config files are present
  - Check device internet connection
  - Test on a real device (not emulator/simulator)
- **Crashes not reported?**
  - Confirm Crashlytics is enabled in Firebase Console
  - Check for build errors or missing native setup

---

## Resources

- [React Native Firebase Docs](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [React Native Docs](https://reactnative.dev/)

---

© 2024 VentlaApp
