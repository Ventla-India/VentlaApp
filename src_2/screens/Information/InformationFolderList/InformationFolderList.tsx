import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import GenericFlatList from '../../../../src/components/GenericFlatList';
import { getRealm } from '../../../realM/RealM';
import { moderateScale, scale } from '../../../utils/Responsive';
import { COLORS } from '../../../../src/constants';

interface CategoryItem {
  Id?: string | number;
  Name?: string;
  CategoryFolder?: string | number;
  [key: string]: any;
}

type RouteParams = {
  item: CategoryItem;
};

const InformationFolderList = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { item } = (route.params as RouteParams) || {};
  const [folderItems, setFolderItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFolderItems();
  }, []);

  const fetchFolderItems = async () => {
    try {
      const realm = await getRealm();
      const allItems = realm.objects<CategoryItem>('CustomCategoryItem');
      if (allItems?.length > 0) {
        let filteredItems: CategoryItem[] = [];
        if (item?.Id != null) {
          filteredItems = Array.from(
            allItems.filtered('CategoryFolder != null && CategoryFolder != "" && CategoryFolder == $0', String(item.Id))
          );
        }
        if (!filteredItems.length) {
          filteredItems = Array.from(
            allItems.filtered('!CategoryFolder || CategoryFolder == null || CategoryFolder == ""')
          );
        }
        setFolderItems(filteredItems);
      } else {
        setFolderItems([]);
      }
    } catch (error) {
      console.error('Realm read failed:', error);
      setFolderItems([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = () => (
    <View style={styles.infoCard}>
      <Text style={styles.infoText}>{item?.Name || 'Unnamed Category'}</Text>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        showMenu={false}
        showBack={true}
        backIconStyle={styles.backIcon}
      />

      <Text style={styles.sectionTitle}>{item?.Name || 'Unnamed Category'}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#7B1FA2" style={{ marginTop: 32 }} />
      ) : (
        <GenericFlatList
        data={folderItems}
        renderItem={renderItem}
        keyExtractor={(dataItem: CategoryItem) => dataItem.Id?.toString() || ''}
        loading={loading}
        contentContainerStyle={styles.infoList}
      />
      
      )}
    </SafeAreaView>
  );
};

export default InformationFolderList;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.LIGHT.BACKGROUND },
    sectionTitle: {
        marginTop: moderateScale(24),
        marginBottom: moderateScale(16),
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: COLORS.LIGHT.TEXT,
        textAlign: 'center',
    },
    infoList: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(16),
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.LIGHT.BACKGROUND,
        borderRadius: moderateScale(10),
        padding: moderateScale(12),
        marginBottom: moderateScale(8),
        elevation: 1,
        shadowColor: COLORS.LIGHT.TEXT,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 2,
    },
    infoText: {
        fontSize: moderateScale(15),
        color: COLORS.LIGHT.TEXT,
        flex: 1,
        flexWrap: 'wrap',
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.LIGHT.TEXT,
        fontSize: moderateScale(15),
        marginVertical: moderateScale(20),
    },
    backIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        marginRight: scale(20),
        tintColor: COLORS.LIGHT.BACKGROUND,
    },
});
