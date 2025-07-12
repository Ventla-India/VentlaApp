import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking, Image, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from './index';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { onGoogleButtonPress } from '../services/auth/SocialAuthService';
import { Utils } from '@react-native-firebase/app';
import { AlertUtil } from '../utility/alert';

const MICROSOFT_ICON = { uri: 'https://img.icons8.com/color/48/000000/microsoft.png' };
const GOOGLE_ICON = { uri: 'https://img.icons8.com/color/48/000000/google-logo.png' };

type AuthNextScreenRouteProp = RouteProp<RootStackParamList, 'AuthNext'>;

const AuthNextScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const route = useRoute<AuthNextScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AuthNext'>>();
  const email = route.params.email;
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (value: string, idx: number) => {
    const newCode = [...code];
    const digit = value.replace(/[^0-9]/g, '').slice(0, 1);
    newCode[idx] = digit;
    setCode(newCode);
    
    // Auto-focus next input if a digit was entered
    if (digit && idx < 3) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const canProceed = code.every((digit) => digit.length === 1);

  // Handling google sign-in heree.
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
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrowText}>{'\u2039'}</Text>
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Verify your email</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Enter verification code</Text>
          <View style={styles.codeRow}>
            {code.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={(ref) => {
                  inputRefs.current[idx] = ref;
                }}
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
          <TouchableOpacity onPress={() => {navigation.goBack() }}>
            <Text style={styles.link}>Didn't receive the code? <Text style={styles.linkUnderline}>Try again</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, canProceed ? styles.buttonActive : styles.buttonDisabled]}
            disabled={!canProceed}
            onPress={() => navigation.getParent()?.navigate('EventListing')}
          >
            <Text style={[styles.buttonText, canProceed ? styles.buttonTextActive : styles.buttonTextDisabled]}>NEXT</Text>
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
          <Text style={styles.helpTextBold}>Need help?</Text> <Text style={styles.linkUnderline} onPress={() => Linking.openURL('mailto:support@ventla.io')}>Contact support</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6B012' },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 40 },
  backArrow: { position: 'absolute', top: 48, left: 24, zIndex: 2 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#222', marginTop: 196, marginHorizontal: 20, alignSelf: 'flex-start', marginBottom: 10 },
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
  label: { fontSize: 16, marginBottom: 12, fontWeight: '600', color: '#222', alignSelf: 'flex-start' },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between',  marginBottom: 12, marginTop: 16 },
  codeInput: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    fontSize: 24,
    backgroundColor: '#fafafa',
    textAlign: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: { fontSize: 14, color: '#666', textAlign: 'center', width: '100%', marginBottom: 8, marginTop: 4, fontWeight: '500' },
  link: { fontSize: 14, color: '#666', textAlign: 'center', width: '100%', marginBottom: 8, marginTop: 4, fontWeight: '500'  },
  linkUnderline: { color: '#1976D2', textDecorationLine: 'underline', fontWeight: 'bold' },
  button: {
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1},
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    marginVertical: 14,
    alignSelf: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  dividerText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    minWidth: 90,
    lineHeight: 22,
  },
  altButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // <-- Add this line
    backgroundColor: '#fff',
    borderRadius: 26,
    paddingVertical: 12,
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
  icon: { width: 24, height: 28, marginRight: 16 },
  altButtonText: { fontSize: 16, fontWeight: '500', color: '#222' },
  helpText: { fontSize: 16, color: '#444', marginTop: 32, marginBottom: 16, textAlign: 'center' },
  backArrowText: { fontSize: 42, color: '#000' },
  buttonActive: { backgroundColor: '#222' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonTextActive: { color: '#E6B012' },
  buttonTextDisabled: { color: '#888' },
  helpTextBold: { color: '#222', fontWeight: 'bold' },
});

export default AuthNextScreen;