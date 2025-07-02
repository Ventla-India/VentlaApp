import { View, Text, SafeAreaView, Alert, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';


type DrawerParamList = {
    HomeScreen: undefined;
    HomeDetails: undefined;
};

const HomeDetails = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'HomeScreen'>>();


    const openDrawer = () => {
        navigation.openDrawer();
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="VentlaApp" showMenu={false} onMenuPress={openDrawer} showBack={true} />
            <View style={styles.container}>
                <Text>HomeDetails</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});