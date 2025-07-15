# Authentication MVVM Implementation

This directory contains the MVVM (Model-View-ViewModel) implementation for the authentication flow, mapping the original Android authentication logic to React Native.

## Architecture Overview

### Original Android Flow
```csharp
// 1. User enters email and approves privacy policy
// 2. App calls RegistrationAPI.CreateAccountConfirmedEmail()
// 3. API returns username on success
// 4. App stores username and policy ID in AndroidSecureStorage
// 5. App navigates to RegistrationCodeActivity
```

### React Native MVVM Flow
```typescript
// 1. User enters email and approves privacy policy (View)
// 2. ViewModel calls AuthService.createAccountConfirmedEmail()
// 3. API returns username on success
// 4. ViewModel stores username and policy ID in StorageService
// 5. ViewModel triggers navigation to next screen
```

## Components

### Models (`src/models/Auth.ts`)
- **CreateAccountConfirmedEmailRequest**: API request structure
- **AutoCreateUsernamePasswordResponse**: API response structure
- **AuthState**: ViewModel state management
- **User**: User data model
- **AuthError**: Error handling model

### Services (`src/services/api/`)

#### AuthService (`AuthService.ts`)
- **Purpose**: Handles API calls to authentication endpoints
- **Maps to**: `RegistrationAPI.CreateAccountConfirmedEmail()` in Android
- **Key Methods**:
  - `createAccountConfirmedEmail()`: Creates account with confirmed email

#### StorageService (`StorageService.ts`)
- **Purpose**: Handles secure storage operations
- **Maps to**: `AndroidSecureStorage` in Android
- **Key Methods**:
  - `setString()`: Store key-value pairs
  - `getString()`: Retrieve stored values
  - `removeItem()`: Remove stored items

#### DeviceService (`DeviceService.ts`)
- **Purpose**: Handles device-specific operations
- **Maps to**: Device ID generation in Android
- **Key Methods**:
  - `generateDeviceId()`: Generate unique device identifier
  - `getDeviceUniqueId()`: Get or generate device ID

### ViewModel (`src/services/auth/AuthViewModel.ts`)
- **Purpose**: Business logic and state management
- **Maps to**: Business logic in Android Activity
- **Key Features**:
  - Orchestrates API calls and storage operations
  - Manages loading states and error handling
  - Provides React hooks for easy integration

### View (`src/navigation-screens/AuthScreen.tsx`)
- **Purpose**: UI presentation and user interaction
- **Maps to**: Android AuthActivity
- **Key Features**:
  - Email input and validation
  - Privacy policy checkbox
  - Loading states and error display
  - Navigation to next screen

### Components (`src/components/common/`)
- **LoadingSpinner**: Unified loading component with overlay and inline modes
- **Toast**: Toast notification component
- **BaseAppInitializer**: App initialization component

## Usage Example

```typescript
// In a React component
import { useAuthViewModel } from '../services/auth/AuthViewModel';

const MyComponent = () => {
  const { authState, createAccountConfirmedEmail, clearError } = useAuthViewModel();

  const handleSubmit = async (email: string) => {
    await createAccountConfirmedEmail(email);
  };

  return (
    <View>
      {/* Your UI components */}
      {authState.isLoading && <LoadingSpinner />}
      {authState.error && <ErrorMessage message={authState.error} />}
    </View>
  );
};
```

## API Endpoint Mapping

### Original Android
```csharp
POST https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail
{
  "appId": 622,
  "email": "user@example.com",
  "phoneId": "device_unique_id"
}
```

### React Native
```typescript
POST https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail
{
  "appId": 2147,
  "email": "user@example.com",
  "phoneId": "device_unique_id"
}
```

## Storage Keys Mapping

| Android Key | React Native Key | Purpose |
|-------------|------------------|---------|
| `MYUNIQUE_ID` | `StorageService.MYUNIQUE_ID` | Device unique identifier |
| `MYUSERNAME` | `StorageService.MYUSERNAME` | User's username |
| `POLICY_ID` | `StorageService.POLICY_ID` | Policy identifier |
| `USER_EMAIL` | `StorageService.USER_EMAIL` | User's email |

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: API call failures
2. **Validation Errors**: Invalid email format
3. **Storage Errors**: Failed storage operations
4. **Business Logic Errors**: API response errors

## Loading States

The implementation provides loading states similar to Android's `CustomAndHud.CustomAndHudDialog`:

- **Loading Overlay**: Modal with spinner and message
- **Button States**: Disabled during API calls
- **Error Display**: Alert dialogs for user feedback

## Future Enhancements

1. **Real Device ID**: Replace mock device ID with `react-native-device-info`
2. **Secure Storage**: Replace in-memory storage with `@react-native-async-storage/async-storage`
3. **Biometric Auth**: Add fingerprint/face ID support
4. **Token Management**: Add JWT token handling
5. **Offline Support**: Add offline authentication capabilities 