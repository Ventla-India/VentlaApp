import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';

interface AuthScreenProps {
  backgroundColor?: string;
  logoSource?: any; // require('path/to/logo.png') or { uri: ... }
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  backgroundColor = '#E6B012', // default yellow
  logoSource = require('../assets/images/SplashIcons.imageset/LightLogo2x.png'), // fallback logo
}) => {
  const [email, setEmail] = useState('');
  const [approved, setApproved] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const canProceed = email.length > 0 && approved;

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Enter your email</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Enter your email address</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="suyash.s@ventla.io"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#bbb"
          />
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={approved}
            onValueChange={setApproved}
            style={styles.checkbox}
            tintColors={{ true: '#E6B012', false: '#ccc' }}
          />
          <Text style={styles.checkboxText}>
            I hereby approve that any personal information provided by me are stored and processed according to the{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://your-privacy-policy-url.com')}
            >
              privacy policy
            </Text>.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: canProceed ? '#222' : '#ccc' }]}
          disabled={!canProceed}
          onPress={() => navigation.navigate('AuthNext', { email })}
        >
          <Text style={[styles.buttonText, { color: canProceed ? '#E6B012' : '#888' }]}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6B012', alignItems: 'center', justifyContent: 'flex-start' },
  logoContainer: { alignItems: 'center', marginTop: 60, marginBottom: 16 },
  logo: { width: 140, height: 120 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#222', marginBottom: 24, alignSelf: 'center' },
  card: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 7,
    alignItems: 'stretch',
    marginBottom: 24,
  },
  label: { fontSize: 18, marginBottom: 12, fontWeight: '600', color: '#222' },
  inputWrapper: {
    backgroundColor: '#fafafa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 18,
    color: '#222',
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  checkbox: { marginRight: 8 },
  checkboxText: { flex: 1, fontSize: 15, color: '#444' },
  link: { color: '#1976D2', textDecorationLine: 'underline', fontWeight: 'bold' },
  button: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
});

export default AuthScreen;