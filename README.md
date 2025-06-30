# VentlaApp

A React Native app built with MVVM architecture, featuring integrated Firebase Crashlytics, Push Notifications, and multi-language support.

---

## 🏗️ Architecture

VentlaApp follows the **Model-View-ViewModel (MVVM)** pattern, providing a clean separation of concerns and maintainable codebase.

### MVVM Structure
```
src/
├── assets/                 # Static assets
│   └── locales/           # Localization files
├── components/             # Reusable UI components
│   ├── common/            # Generic components (Toast, LoadingSpinner)
│   ├── ui/                # UI-specific components
│   └── modular/           # Complex reusable components
├── constants/             # App constants and configurations
├── hooks/                 # Custom React hooks
├── models/                # Data models and interfaces
├── navigation/            # Navigation configuration
│   ├── stacks/           # Stack navigators
│   ├── tabs/             # Tab navigators
│   └── drawers/          # Drawer navigators
├── services/              # Business logic and external services
│   ├── api/              # API services and external integrations
│   └── utils/            # Utility services
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions and utilities
├── viewmodels/            # ViewModels (business logic for views)
└── views/                 # UI Views (screens and components)
    ├── screens/           # Main app screens
    └── fragments/         # Screen fragments and sub-components
```

---

## 🚀 Features

- **MVVM Architecture**: Clean separation of concerns with Models, ViewModels, and Views
- **Crashlytics**: Real-time crash reporting using Firebase Crashlytics
- **Push Notifications**: Receive and handle push notifications via Firebase Cloud Messaging (FCM)
- **Multi-language Support**: Internationalization with device locale detection
- **State Management**: MobX for reactive state management
- **TypeScript**: Full TypeScript support for better development experience
- **Modern React Native**: Built with React Native 0.80 and React 19

---

## 📦 Key Dependencies & Versions

- `react-native`: 0.80.0
- `react`: 19.1.0
- `mobx`: ^6.12.0
- `mobx-react-lite`: ^4.0.5
- `@react-native-firebase/app`: ^22.2.1
- `@react-native-firebase/crashlytics`: ^22.2.1
- `@react-native-firebase/messaging`: ^22.2.1
- `react-native-splash-screen`: ^3.3.0
- TypeScript: 5.0.4

---

## 🛠️ Setup & Installation

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

## 🎯 Usage

### MVVM Pattern
- **Models**: Data structures and business entities (`src/models/`)
- **ViewModels**: Business logic and state management (`src/viewmodels/`)
- **Views**: UI components and screens (`src/views/`)
- **Services**: External integrations and API calls (`src/services/`)

### Crashlytics
- Crashlytics is enabled by default
- To test, use the "Test Crash" button in the app UI
- Crashes will be reported to Firebase Console

### Push Notifications
- FCM token is generated and displayed in the app UI
- To test, send a push notification from the Firebase Console
- Foreground notifications show an in-app alert; background notifications appear in the system tray

### Localization
- Supports multiple languages (English, Swedish, German, French, Spanish, Finnish, Norwegian, Danish)
- Automatically detects device locale
- Language can be changed dynamically

---

## 📱 Essential Commands

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

## 🏛️ Project Structure

### Core Files
- `App.tsx` — Main app entry point with MVVM integration
- `src/viewmodels/` — Business logic and state management
- `src/models/` — Data structures and interfaces
- `src/services/api/` — External service integrations
- `src/components/common/` — Reusable UI components
- `src/views/screens/` — App screens and views

### Key Services
- `PushNotificationService.ts` — Firebase Cloud Messaging
- `CrashlyticsService.ts` — Firebase Crashlytics
- `LocalizationService.ts` — Multi-language support
- `DeviceService.ts` — Device information

### Configuration
- `android/app/src/main/AndroidManifest.xml` — Android permissions and config
- `ios/VentlaApp/Info.plist` — iOS permissions and config
- `src/constants/` — App-wide constants and configurations

---

## 🔧 Development

### Adding New Features
1. **Create a Model** in `src/models/`
2. **Create a Service** in `src/services/api/`
3. **Create a ViewModel** in `src/viewmodels/`
4. **Create a View** in `src/views/screens/`
5. **Wire up the components**

### State Management
- Use MobX for reactive state management
- ViewModels handle business logic
- Views observe ViewModels for automatic updates

---

## 🐛 Troubleshooting

- **No push notifications?**
  - Ensure correct Firebase config files are present
  - Check device internet connection
  - Test on a real device (not emulator/simulator)
- **Crashes not reported?**
  - Confirm Crashlytics is enabled in Firebase Console
  - Check for build errors or missing native setup
- **Language not changing?**
  - Check localization files in `src/assets/locales/`
  - Verify device locale settings

---

## 📚 Resources

- [React Native Firebase Docs](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [React Native Docs](https://reactnative.dev/)
- [MobX Documentation](https://mobx.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 📄 License

This project is licensed under the MIT License.

---

© 2024 VentlaApp
