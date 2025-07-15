# Debugging Guide for Authentication Flow

## 🚀 Quick Start

### 1. **Enable Debug Logs**
The code now includes comprehensive logging. Run the app and check the console:

```bash
# Android
npx react-native log-android

# iOS  
npx react-native log-ios
```

### 2. **Expected Log Flow**
When you enter an email and click "NEXT", you should see:

```
🔐 [AuthViewModel] Starting account creation for: user@example.com
📱 [AuthViewModel] Device ID: android_1234567890_abc123
🌐 [AuthViewModel] Calling API...
🌐 [AuthService] Making API request to: https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail
📤 [AuthService] Request data: { appId: 2147, email: "user@example.com", phoneId: "android_1234567890_abc123" }
📥 [AuthService] API Response received: { success: true, username: "user123" }
✅ [AuthViewModel] Account created successfully!
💾 [AuthViewModel] User data stored
🏁 [AuthViewModel] Account creation process completed
```

## 🔍 Debugging Tools

### **1. React Native Debugger (Recommended)**
```bash
# Install
npm install -g react-native-debugger

# Run
react-native-debugger
```

### **2. Flipper (Facebook's Debugger)**
```bash
# Install Flipper desktop app
# Then install plugins for network, storage, etc.
```

### **3. Chrome DevTools**
```bash
# Enable remote debugging in your app
# Open Chrome DevTools
# Check Console tab for logs
```

## 🐛 Common Issues & Solutions

### **Issue 1: Network Error**
```
💥 [AuthService] Exception in createAccountConfirmedEmail: Network request failed
```

**Solutions:**
- Check internet connection
- Verify API endpoint is accessible
- Check if app has network permissions

### **Issue 2: API Response Error**
```
❌ [AuthViewModel] Account creation failed: Invalid email format
```

**Solutions:**
- Verify email format
- Check if app ID 2147 is valid
- Test API endpoint manually

### **Issue 3: Storage Error**
```
💥 [AuthViewModel] Exception caught: Storage operation failed
```

**Solutions:**
- Check storage permissions
- Verify storage implementation

## 🧪 Testing Steps

### **Step 1: Test API Endpoint**
```bash
curl -X POST https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail \
  -H "Content-Type: application/json" \
  -d '{
    "appId": 2147,
    "email": "test@example.com"
  }'
```

### **Step 2: Test Device ID Generation**
```typescript
// Add this to test device ID generation
console.log('Device ID:', await DeviceService.getDeviceUniqueId());
```

### **Step 3: Test Storage Operations**
```typescript
// Add this to test storage
await StorageService.getInstance().setString('TEST', 'value');
const result = await StorageService.getInstance().getString('TEST');
console.log('Storage test:', result);
```

## 📱 Debugging on Device

### **Android Debugging:**
1. Enable Developer Options
2. Enable USB Debugging
3. Run: `adb devices`
4. Run: `npx react-native log-android`

### **iOS Debugging:**
1. Open Xcode
2. Connect device
3. Run app from Xcode
4. Check Console tab

## 🔧 Advanced Debugging

### **Add Breakpoints:**
```typescript
// Add debugger statement for breakpoints
debugger;
console.log('Breakpoint hit');
```

### **Network Debugging:**
```typescript
// Add network request logging
console.log('Request URL:', url);
console.log('Request Headers:', headers);
console.log('Request Body:', body);
```

### **State Debugging:**
```typescript
// Log state changes
useEffect(() => {
  console.log('Auth state changed:', authState);
}, [authState]);
```

## 📊 Debug Output Examples

### **Successful Flow:**
```
🔐 [AuthViewModel] Starting account creation for: test@example.com
📱 [AuthViewModel] Device ID: android_1703123456789_abc123def456
🌐 [AuthViewModel] Calling API...
🌐 [AuthService] Making API request to: https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail
📤 [AuthService] Request data: { appId: 2147, email: "test@example.com", phoneId: "android_1703123456789_abc123def456" }
📥 [AuthService] API Response received: { success: true, username: "testuser123" }
✅ [AuthViewModel] Account created successfully!
💾 [AuthViewModel] User data stored
🏁 [AuthViewModel] Account creation process completed
```

### **Error Flow:**
```
🔐 [AuthViewModel] Starting account creation for: invalid-email
📱 [AuthViewModel] Device ID: android_1703123456789_abc123def456
🌐 [AuthViewModel] Calling API...
🌐 [AuthService] Making API request to: https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail
📤 [AuthService] Request data: { appId: 2147, email: "invalid-email", phoneId: "android_1703123456789_abc123def456" }
📥 [AuthService] API Response received: { success: false, error: "Invalid email format" }
❌ [AuthViewModel] Account creation failed: Invalid email format
🏁 [AuthViewModel] Account creation process completed
```

## 🎯 Quick Debug Commands

```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clean and rebuild Android
cd android && ./gradlew clean && cd ..

# Clean and rebuild iOS
cd ios && xcodebuild clean && cd ..

# Check device logs
adb logcat | grep -E "(ReactNativeJS|AuthViewModel|AuthService)"

# Test API endpoint
curl -X POST https://manage-dev.ventla.io/Client/CreateAccountConfirmedEmail -H "Content-Type: application/json" -d '{"appId": 2147, "email": "test@example.com"}'
``` 