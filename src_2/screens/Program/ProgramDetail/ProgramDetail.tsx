import { View, Text, SafeAreaView  } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const ProgramDetail = () => {
  type DrawerParamList = {
    Program: undefined;
    ProgramDetail: undefined;
  };
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Program'>>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView>
      <Header title="VentlaApp" showMenu={false} onMenuPress={openDrawer} showBack={true} />
      <Text>ProgramDetail</Text>
    </SafeAreaView>
  )
}

export default ProgramDetail