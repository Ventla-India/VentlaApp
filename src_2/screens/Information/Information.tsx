import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { scale, verticalScale, moderateScale } from '../../utils/Responsive';
import Header from '../../components/Header';
import { Route_Names } from '../../navigation/StackNavigation';
import { getCustomCategories } from '../../api/helper';

type DrawerParamList = {
    Home: undefined;
    Information: undefined;
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

type InformationScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, 'Information'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const Information = () => {
    const navigation = useNavigation<InformationScreenNavigationProp>();
    const openDrawer = () => {
        navigation.openDrawer();
    };

    const [information, setInformation] = useState<any[]>([]);

    useEffect(() => {
        getCustomCategories()
            .then((response) => {
                // Adjust this mapping based on actual API response structure
                const categories = response?.data || [];
                console.log(categories?.CustomCategoryItems, 'wfhbwffefwejf');
                setInformation(categories?.CustomCategoryItems || []);
            })
            .catch((error) => {
                console.error('Failed to fetch custom categories:', error);
            });
    }, []);

    const renderItem = ({ item }: { item: any }) => {
        return (
            <SafeAreaView style={styles.containerRender}>
                <TouchableOpacity style={styles.eventInfoContainer} onPress={() => navigation.navigate(Route_Names.InformationDetail as keyof RootStackParamList)} >
                    <Image
                        source={
                            item.IconUrl
                                ? { uri: item.IconUrl }
                                : require('../../assets/images/profile.jpg')
                        }
                        style={styles.bannerImage}
                    />
                    <Text style={styles.title}>{item?.Name}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Information"
                showMenu={true}
                onMenuPress={openDrawer} />

            <View style={styles.content}>
                <FlatList
                    ListHeaderComponent={() => {
                        return (
                            <View style={styles.flatListHeader} >
                                <Text style={styles.flatListHeaderText}>TOP LEVEL</Text>
                            </View>
                        )
                    }}
                    data={information}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.divider} />
                        )
                    }}

                    keyExtractor={(item) => item.Id.toString()}
                    initialNumToRender={20}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log('onEndReached');
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingHorizontal: moderateScale(16),
    },
    flatListHeader: {
        paddingVertical: moderateScale(16),
    },
    flatListHeaderText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#787878',
    },
    containerRender: {
        paddingHorizontal: moderateScale(4),
        width: '100%',
        flex: 1,

    },
    bannerImage: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
    },
    eventInfoContainer: {
        borderRadius: moderateScale(10),
        backgroundColor: '#fff',
        padding: moderateScale(16),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 7,
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        marginBottom: scale(8),
        color: '#000',

    },
    divider: {
        height: 0.1,
    },
});

export default Information