import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';

interface LoadingSpinnerProps {
  visible?: boolean;
  message?: string;
  overlay?: boolean;
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  visible = true,
  message,
  overlay = false,
  size = 'large',
  color = '#E6B012'
}) => {
  if (!visible) return null;

  const spinner = (
    <View style={overlay ? styles.overlayContainer : styles.container}>
      <View style={overlay ? styles.overlayContent : styles.content}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );

  if (overlay) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        {spinner}
      </Modal>
    );
  }

  return spinner;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 120,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoadingSpinner; 