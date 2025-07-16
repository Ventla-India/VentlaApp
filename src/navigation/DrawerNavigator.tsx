import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text } from 'react-native';
import { scale, moderateScale } from '../utils/Responsive';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Information from '../screens/Information/Information';
import Program from '../screens/Program/Program';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Information"
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#fff',
                    width: scale(280),
                },
                drawerActiveTintColor: '#007AFF',
                drawerInactiveTintColor: '#666',
                drawerLabelStyle: {
                    fontSize: moderateScale(16),
                    fontWeight: '500',
                },
                drawerItemStyle: {
                    paddingVertical: moderateScale(8),
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: moderateScale(size) }}>🏠</Text>
                    ),
                }}
            />
            <Drawer.Screen
                name="Information"
                component={Information}
                options={{
                    drawerLabel: 'Information',
                    drawerIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: moderateScale(size) }}>ℹ️</Text>
                    ),
                }}
            />
            <Drawer.Screen
                name="Program"
                component={Program}
                options={{
                    drawerLabel: 'Program',
                    drawerIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: moderateScale(size) }}>📅</Text>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;