import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const MovieDetail = () => {
  type DrawerParamList = {
    Movies: undefined;
    MovieDetail: undefined;
  };
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Movies'>>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
    return (
    <SafeAreaView>
      <Header title="VentlaApp" showMenu={false} onMenuPress={openDrawer} showBack={true} />
      <Text>MovieDetail</Text>
    </SafeAreaView>
  )
}

export default MovieDetail