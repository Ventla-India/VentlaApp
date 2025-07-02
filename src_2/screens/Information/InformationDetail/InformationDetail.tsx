import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';
import { moderateScale } from '../../../utils/Responsive';

const InformationDetail = () => {

  type DrawerParamList = {
    Information: undefined;
    InformationDetail: undefined;
  };
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Information'>>();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  const renderItem = ({ item }: { item: { id: number; name: string } }) => {
    return <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>;
  };

  return (
    <SafeAreaView>
      <Header title="VentlaApp" showMenu={false} onMenuPress={openDrawer} showBack={true} />
      <FlatList data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  )
}

export default InformationDetail

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: moderateScale(10),
  },
  item: {
    padding: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: 'red',
  },
});