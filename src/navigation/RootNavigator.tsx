import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation, { Route_Names } from './StackNavigation';
import HomeDetails from '../screens/HomeScreen/HomeDetail/HomeDetails';
import ProgramDetail from '../screens/Program/ProgramDetail/ProgramDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InformationFolder from '../screens/Information/InformationFolder';
import InformationDetail from '../screens/Information/InformationDetail';
import InformationFolderList from '../screens/Information/InformationFolderList';

const RootNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name={Route_Names.HomeDetails} component={HomeDetails} />
        <Stack.Screen name={Route_Names.InformationDetail} component={InformationDetail} />
        <Stack.Screen name={Route_Names.ProgramDetail} component={ProgramDetail} />
        <Stack.Screen name={Route_Names.InformationFolder} component={InformationFolder} />
        <Stack.Screen name={Route_Names.InformationFolderList} component={InformationFolderList} />
        </Stack.Navigator>
    </NavigationContainer>
  );        
};

export default RootNavigator;