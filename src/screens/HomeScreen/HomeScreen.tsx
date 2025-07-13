import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { scale, verticalScale, moderateScale } from '../../utils/Responsive'
import MyBtn from '../../components/MyBtn'
import { Route_Names } from '../../navigation/StackNavigation'
import Header from '../../components/Header'

type DrawerParamList = {
    HomeScreen: undefined;
    Information: undefined;
    HomeDetails: undefined;
    Program: undefined;
    Profile: undefined;
    Messaging: undefined;
    Movies: undefined;
};

type RootStackParamList = {
    Drawer: undefined;
    HomeDetails: undefined;
    InformationDetail: undefined;
    ProgramDetail: undefined;
    MovieDetail: undefined;
};

const HomeScreen = () => {
    const navigation = useNavigation<CompositeNavigationProp<
        DrawerNavigationProp<DrawerParamList, 'HomeScreen'>,
        NativeStackNavigationProp<RootStackParamList>
    >>();

    const openDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="VentlaApp" showMenu={true} onMenuPress={openDrawer} />

            <View style={styles.content}>
                <Text style={styles.title}>Welcome to VentlaApp</Text>
                <Text style={styles.subtitle}>Your home screen content goes here</Text>

                <MyBtn title="Go to HomeAppliance"
                    onPress={() => navigation.navigate('HomeDetails' as keyof RootStackParamList)}
                    style={{ marginTop: verticalScale(20) }}
                />

                <View style={styles.featureContainer}>
                    <Text style={styles.featureTitle}>Available Features:</Text>
                    <Text style={styles.featureItem}>• Information</Text>
                    <Text style={styles.featureItem}>• Program</Text>
                    <Text style={styles.featureItem}>• Movies</Text>
                    <Text style={styles.featureItem}>• Messaging</Text>
                    <Text style={styles.featureItem}>• Profile</Text>
                </View>

                <Text style={styles.hint}>Tap the menu icon to explore!</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

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
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: verticalScale(12),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
        lineHeight: moderateScale(24),
        marginBottom: verticalScale(40),
    },
    featureContainer: {
        backgroundColor: '#fff',
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(30),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: moderateScale(3.84),
        elevation: 5,
    },
    featureTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: verticalScale(12),
    },
    featureItem: {
        fontSize: moderateScale(16),
        color: '#666',
        marginBottom: verticalScale(8),
        paddingLeft: scale(10),
    },
    hint: {
        fontSize: moderateScale(14),
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});