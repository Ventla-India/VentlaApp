import { Alert } from 'react-native';

export class AlertUtil {
  static success(message: string, title: string = 'Success') {
    Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
  }

  static error(message: string, title: string = 'Error') {
    Alert.alert(title, message, [{ text: 'OK', style: 'destructive' }]);
  }

  static info(message: string, title: string = 'Info') {
    Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
  }

  static warning(message: string, title: string = 'Warning') {
    Alert.alert(title, message, [{ text: 'OK', style: 'default' }]);
  }

  static confirm(message: string, onConfirm: () => void, title: string = 'Confirm') {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: onConfirm },
    ]);
  }
} 