import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import FolderCard from '../../components/foldercard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { CustomCategorySchemas } from '../../realM/schemas/CustomCategorySchemas';
import GenericRealmService from '../../realM/RealmService';

interface CategoryItem {
    Id?: string | number;
    Name?: string;
    [key: string]: any;
}

const { width } = Dimensions.get('window');

const InformationFolder = () => {
    const [folders, setFolders] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    
    // Initialize RealmService with CustomCategorySchema
    const realmService = new GenericRealmService('CustomCategoryItem', CustomCategorySchemas);

    const loadFromRealm = useCallback(async () => {
        try {
            // Get all items using RealmService
            const items = realmService.getAll();
            setFolders(items);
        } catch (error) {
            console.error('Realm error:', error);
            setFolders([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFromRealm();
    }, [loadFromRealm]);

    const renderFolder = useCallback(
        ({ item }: { item: CategoryItem }) => (
            <FolderCard
                item={item}
                styles={styles}
            />
        ),
        []
    );

    return (
        <View style={styles.container}>
            <Header
                title="Folders"
                showMenu={false}
                showBack={true}
                titleStyle={styles.headerTitle}
                titleAlign="center"
                backIconStyle={styles.backIcon}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#7B1FA2" style={styles.loader} />
            ) : (
                <FlatList
                    data={folders}
                    renderItem={renderFolder}
                    keyExtractor={(item) => item.Id?.toString() || ''}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={8}
                    removeClippedSubviews={true}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No folders found.</Text>
                    }
                />
            )}
        </View>
    );
};

export default InformationFolder;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
    },
    backIcon: {
        marginLeft: scale(-16),
    },
    grid: {
        paddingHorizontal: scale(4),
        marginTop: verticalScale(16),
    },
    folderCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        margin: scale(6),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: moderateScale(12),
        minHeight: verticalScale(140),
        maxWidth: '48%',
    },
    folderIconWrap: {
        backgroundColor: '#F48FB1',
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(8),
    },
    folderLabel: {
        fontSize: moderateScale(14),
        color: '#222',
        fontWeight: '500',
        marginBottom: verticalScale(8),
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
        flexWrap: 'wrap',
    },
    avatar: {
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        marginRight: scale(4),
        borderWidth: 1,
        borderColor: '#fff',
    },
    moreCircle: {
        backgroundColor: '#F48FB1',
        borderRadius: moderateScale(14),
        width: moderateScale(28),
        height: moderateScale(28),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(2),
    },
    moreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(13),
    },
    loader: {
        marginTop: verticalScale(32),
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: moderateScale(15),
        marginVertical: verticalScale(20),
    },
});