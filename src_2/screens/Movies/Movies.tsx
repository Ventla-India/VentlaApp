import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import MyBtn from '../../components/MyBtn';
import { Route_Names } from '../../navigation/StackNavigation';

type DrawerParamList = {
  Home: undefined;
  Information: undefined;
  Program: undefined;
  Movies: undefined;
};

type MoviesScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Movies'>;

const Movies = () => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Movies" showMenu={true} onMenuPress={openDrawer} />
      <View style={styles.content}>
        <Text style={styles.title}>Movies Screen</Text>
        <Text style={styles.subtitle}>Movies content will be implemented here</Text>
        <MyBtn title="Go to MovieDetail" onPress={() => navigation.navigate(Route_Names.MovieDetail as never)} />
      </View>
    </SafeAreaView>
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

export default Movies; 