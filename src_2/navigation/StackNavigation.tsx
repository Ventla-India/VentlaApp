import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Information from '../screens/Information/Information';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HomeDetails from '../screens/HomeScreen/HomeDetail/HomeDetails';
import InformationDetail from '../screens/Information/InformationDetail/InformationDetail';
import ProgramDetail from '../screens/Program/ProgramDetail/ProgramDetail';
import { Movie } from '../../src/models/Movie';
import MovieDetail from '../screens/Movies/MovieDetail/MovieDetail';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={Route_Names.HomeScreen} >
      <Stack.Screen name={Route_Names.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Route_Names.Information} component={Information} />
      <Stack.Screen name={Route_Names.HomeDetails} component={HomeDetails} />
      <Stack.Screen name={Route_Names.InformationDetail} component={InformationDetail} />
      <Stack.Screen name={Route_Names.ProgramDetail} component={ProgramDetail} />
      <Stack.Screen name={Route_Names.MovieDetail} component={MovieDetail} />
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
}