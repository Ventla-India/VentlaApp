import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import COLORS from '../../../constant/Color';
import { moderateScale, scale } from '../../../utils/Responsive';
import GenericFlatList from '../../../components/GenericFlatList';
import { CategoryItem, RouteParams } from '../Interfaces/CategoryItem';
import { useInformationFolderListViewModel } from '../viewmodels/InformationFolderListViewModel';

const InformationFolderListView: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { item } = (route.params as RouteParams) || {};

  const {
    state,
    setLoading,
    setFolderItems,
    setSelectedItem,
    updateState,
    loadFilteredItems,
    getAllItems,
  } = useInformationFolderListViewModel();

  useEffect(() => {
    // Fetch and set the items belonging to the selected folder when the screen mounts or the folder changes
    const fetchFolderItems = async () => {
      setLoading(true); // Start loading indicator
      try {
        // Get the items that belong to the selected folder
        const filteredItems = await loadFilteredItems(item);
        setFolderItems(filteredItems); // Update state with the filtered items
      } catch (error) {
        // Optionally handle error here
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchFolderItems();
  }, [loadFilteredItems, item, setLoading, setFolderItems]);

  const renderItem = useCallback(({ item: dataItem }: { item: CategoryItem }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoText}>{dataItem?.Name || ''}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        showMenu={false}
        showBack={true}
        backIconStyle={styles.backIcon}
      />

      <Text style={styles.sectionTitle}>{item?.Name || ''}</Text>

      {state.loading ? (
        <ActivityIndicator size="large" color="#7B1FA2" style={{ marginTop: 32 }} />
      ) : (
        <GenericFlatList
          data={state.folderItems}
          renderItem={renderItem}
          keyExtractor={(dataItem: CategoryItem) => dataItem.Id?.toString() || ''}
          loading={state.loading}
          contentContainerStyle={styles.infoList}
          ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT.BACKGROUND
  },
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

export default InformationFolderListView; 