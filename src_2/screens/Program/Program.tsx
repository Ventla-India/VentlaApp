import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import Header from '../../components/Header';
import { Route_Names } from '../../navigation/StackNavigation';
import MyBtn from '../../components/MyBtn';

type DrawerParamList = {
  Home: undefined;
  Information: undefined;
  Program: undefined;
  Profile: undefined;
  Messaging: undefined;
  Movies: undefined;
};

type ProgramScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Program'>;

const Program = () => {
  const navigation = useNavigation<ProgramScreenNavigationProp>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <Header title="Program" showMenu={true} onMenuPress={openDrawer} />
      <View style={styles.content}>
        <Text style={styles.title}>Program Screen</Text>
        <Text style={styles.subtitle}>Program content will be implemented here</Text>
        <MyBtn title="Go to ProgramDetail" onPress={() => navigation.navigate(Route_Names.ProgramDetail as never)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: moderateScale(24),
  },
});

export default Program; 