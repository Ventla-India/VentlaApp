import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/Responsive';

interface GenericTextInputProps extends TextInputProps {
  error?: string;
  containerStyle?: any;
  inputStyle?: any;
}

const GenericTextInput: React.FC<GenericTextInputProps> = ({
  error,
  containerStyle,
  inputStyle,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    <TextInput
      style={[styles.input, inputStyle, error ? styles.inputError : null]}
      placeholderTextColor="#888"
      {...props}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    height: verticalScale(40),
    fontSize: moderateScale(14),
    color: '#222',
    backgroundColor: '#fff',
     fontWeight: '200',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  error: {
    marginTop: verticalScale(4),
    color: '#e74c3c',
    fontSize: moderateScale(12),
  },
});

export default GenericTextInput;
