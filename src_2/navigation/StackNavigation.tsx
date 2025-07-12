import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Information from '../screens/Information/Information';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HomeDetails from '../screens/HomeScreen/HomeDetail/HomeDetails';
import ProgramDetail from '../screens/Program/ProgramDetail/ProgramDetail';
import InformationFolder from '../screens/Information/InformationFolder';
import InformationDetail from '../screens/Information/InformationDetail';
import InformationFolderList from '../screens/Information/InformationFolderList';
import InformationAllDetailScreen from '../screens/Information/InformationAllDetailScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={Route_Names.Information} >
      <Stack.Screen name={Route_Names.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Route_Names.Information} component={Information} />
      <Stack.Screen name={Route_Names.HomeDetails} component={HomeDetails} />
      <Stack.Screen name={Route_Names.InformationDetail} component={InformationDetail} />
      <Stack.Screen name={Route_Names.ProgramDetail} component={ProgramDetail} />
      <Stack.Screen name={Route_Names.InformationFolder} component={InformationFolder} />
      <Stack.Screen name={Route_Names.InformationFolderList} component={InformationFolderList} />
      <Stack.Screen name={Route_Names.InformationAllDetailScreen} component={InformationAllDetailScreen} />
    </Stack.Navigator>
  );
};
            
export default StackNavigation;

export const Route_Names = {
  Information: "Information",
  HomeScreen: "HomeScreen",
  HomeDetails: "HomeDetails",
  InformationDetail: "InformationDetail",
  ProgramDetail: "ProgramDetail",
  MovieDetail: "MovieDetail",
  InformationFolder: "InformationFolder",
  InformationFolderList: "InformationFolderList",
  InformationAllDetailScreen: "InformationAllDetailScreen",
}