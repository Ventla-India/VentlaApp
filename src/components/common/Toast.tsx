import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
  visible?: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({ visible = true, message, type = 'info', onHide }) => {
  if (!visible) return null;
  return (
    <Animated.View style={[styles.toast, styles[type]]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  success: {
    backgroundColor: '#4BB543',
  },
  error: {
    backgroundColor: '#FF3333',
  },
  warning: {
    backgroundColor: '#FF9500',
  },
  info: {
    backgroundColor: '#333',
  },
});

export default Toast; 