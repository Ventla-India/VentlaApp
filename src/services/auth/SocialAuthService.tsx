// SocialAuthService.tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential, OAuthProvider, signInWithRedirect } from '@react-native-firebase/auth';
import { AlertUtil } from '../../utility/alert';

// --- GOOGLE SIGN-IN SETUP ---

// TODO: Replace with your actual webClientId (client_type: 3 from google-services.json)
GoogleSignin.configure({
  webClientId: '897458155927-hmjtl31gnrit4v21ocd21r7294232ml3.apps.googleusercontent.com',
});

// Google sign-in function
export async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResult = await GoogleSignin.signIn();

  const idToken = signInResult.data?.idToken;
  if (!idToken) {
    throw new Error('No ID token found');
  }
  AlertUtil.info( idToken+"");
  const googleCredential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(getAuth(), googleCredential);
}

// --- MICROSOFT SIGN-IN SETUP ---

// Microsoft sign-in function skeleton
export async function onMicrosoftButtonPress() {
  // Generate the provider object
  const provider = new OAuthProvider('microsoft.com');
  // Optionally add scopes
  provider.addScope('offline_access');
  // Optionally add custom parameters
  provider.setCustomParameters({
    prompt: 'consent',
    // tenant: 'tenant_name_or_id', // Uncomment and set if needed
  });

  // Sign-in the user with the provider
  return signInWithRedirect(getAuth(), provider);
}
