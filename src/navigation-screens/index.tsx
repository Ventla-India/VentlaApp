import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Messaging from './Messaging';
import Profile from './Profile';
import Information from './Information';
import WebViewScreen from './WebView';
import PDFSCREEN from './PDFSCREEN';
import AuthScreen from './AuthScreen';
import AuthNextScreen from './AuthNextScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: any };
  AuthNext: { email: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: true,
          title: 'Product Detail',
        }}
      />
      <Stack.Screen
        name="AuthNext"
        component={AuthNextScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="AuthNext" component={AuthNextScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeStack}
        />
        <Drawer.Screen name="Messaging" component={Messaging} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Information" component={Information} />
        <Drawer.Screen name="Webview" component={WebViewScreen} />
        <Drawer.Screen name="PDF" component={PDFSCREEN} />
        <Drawer.Screen name="Auth" component={AuthStackNavigator}   options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}