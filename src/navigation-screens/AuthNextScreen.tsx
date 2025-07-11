import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking, Image, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from './index';
import { onGoogleButtonPress } from '../services/auth/SocialAuthService';
import { Utils } from '@react-native-firebase/app';
import { AlertUtil } from '../utility/alert';

const MICROSOFT_ICON = { uri: 'https://img.icons8.com/color/48/000000/microsoft.png' };
const GOOGLE_ICON = { uri: 'https://img.icons8.com/color/48/000000/google-logo.png' };

type AuthNextScreenRouteProp = RouteProp<RootStackParamList, 'AuthNext'>;

const AuthNextScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const route = useRoute<AuthNextScreenRouteProp>();
  const navigation = useNavigation();
  const email = route.params.email;

  const handleCodeChange = (value: string, idx: number) => {
    const newCode = [...code];
    newCode[idx] = value.replace(/[^0-9]/g, '').slice(0, 1);
    setCode(newCode);
  };

  const canProceed = code.every((digit) => digit.length === 1);

  // Google sign-in handler (for later use)
  const handleGoogleSignIn = async () => {
    try {
      await onGoogleButtonPress();
      AlertUtil.success('Success', 'Signed in with Google!');
    } catch (error: any) {
      AlertUtil.error('Google Sign-In Error', error?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      {/* DEBUG: Move Google Button to top for touch test */}
      {/* <TouchableOpacity style={styles.altButton} onPress={handleGoogleSignIn}>
        <Image source={GOOGLE_ICON} style={styles.icon} />
        <Text style={styles.altButtonText}>Verify with Google</Text>
      </TouchableOpacity> */}
      {/* Black Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 36, color: '#000' }}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Verify your email</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Enter verification code</Text>
        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              style={styles.codeInput}
              value={digit}
              onChangeText={(val) => handleCodeChange(val, idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        <Text style={styles.infoText} numberOfLines={2} ellipsizeMode="tail">Code sent to: {email}</Text>
        <TouchableOpacity onPress={() => { /* resend code logic */ }}>
          <Text style={styles.link}>Didn’t receive the code? <Text style={styles.linkUnderline}>Try again</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: canProceed ? '#222' : '#ccc' }]}
          disabled={!canProceed}
          onPress={() => { /* verify code logic */ }}
        >
          <Text style={[styles.buttonText, { color: canProceed ? '#E6B012' : '#888' }]}>NEXT</Text>
        </TouchableOpacity>
      </View>
      {/* Divider with text */}
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Other ways{`\n`}to verify</Text>
        <View style={styles.divider} />
      </View>
      {/* Microsoft Button */}
      <TouchableOpacity style={styles.altButton}>
        <Image source={MICROSOFT_ICON} style={styles.icon} />
        <Text style={styles.altButtonText}>Verify with Microsoft</Text>
      </TouchableOpacity>
      {/* Google Button (original position, keep for reference) */}
      
      <TouchableOpacity style={styles.altButton} onPress={handleGoogleSignIn}>
        <Image source={GOOGLE_ICON} style={styles.icon} />
        <Text style={styles.altButtonText}>Verify with Google</Text>
      </TouchableOpacity>
     
      <Text style={styles.helpText}>
        <Text style={{ color: '#222', fontWeight: 'bold' }}>Need help?</Text> <Text style={styles.linkUnderline} onPress={() => Linking.openURL('mailto:support@ventla.io')}>Contact support</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6B012', alignItems: 'center', justifyContent: 'flex-start' },
  backArrow: { position: 'absolute', top: 48, left: 24, zIndex: 2 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#222', marginTop: 100, marginBottom: 24, alignSelf: 'center' },
  card: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 7,
    alignItems: 'center',
    marginBottom: 24,
  },
  label: { fontSize: 18, marginBottom: 12, fontWeight: '600', color: '#222', alignSelf: 'center' },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 16 },
  codeInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    fontSize: 28,
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: { fontSize: 16, color: '#666', textAlign: 'center', width: '100%', marginBottom: 8, marginTop: 4 },
  link: { color: '#444', fontSize: 15 },
  linkUnderline: { color: '#1976D2', textDecorationLine: 'underline', fontWeight: 'bold' },
  button: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: { fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    marginVertical: 18,
    alignSelf: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 8,
  },
  dividerText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    minWidth: 90,
    lineHeight: 22,
  },
  altButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: '92%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'red',
  },
  icon: { width: 28, height: 28, marginRight: 16 },
  altButtonText: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  helpText: { fontSize: 16, color: '#444', marginTop: 32, marginBottom: 16, textAlign: 'center' },
});

export default AuthNextScreen;