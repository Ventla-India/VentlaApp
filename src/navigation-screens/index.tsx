import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Messaging from './Messaging';
import Profile from './Profile';
import Information from './Information';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

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
    </Stack.Navigator>
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}