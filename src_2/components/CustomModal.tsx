// components/CustomModal.tsx
import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomModal = ({ visible, onClose, children, style }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.modalContent, style]}>
          {children}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    maxHeight: verticalScale(500),
  },
  closeButton: {
    marginTop: verticalScale(10),
    alignSelf: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
