import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import GenericFlatList from '../../../components/GenericFlatList';
import { CategoryItem, RouteParams } from '../Interfaces/CategoryItem';
import { useInformationFolderListViewModel } from '../viewmodels/InformationFolderListViewModel';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfoItemCard from '../../../components/InformationCom/InfoItemCard';

const InformationFolderListView: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const insets = useSafeAreaInsets();
  const { item } = (route.params as RouteParams) || {};

  const {
    state,
    setLoading,
    setFolderItems,
    setSelectedItem,
    updateState,
    loadFolderListItems,
  } = useInformationFolderListViewModel();

  useEffect(() => {
    // Fetch and set the items belonging to the selected folder when the screen mounts or the folder changes
    const fetchFolderItems = async () => {
      setLoading(true); // Start loading indicator
      try {
        // Get the items that belong to the selected folder
        const items = await loadFolderListItems(item);
        setFolderItems(items); // Update state with the filtered items
      } catch (error) {
        // Optionally handle error here
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchFolderItems();
  }, [loadFolderListItems, item, setLoading, setFolderItems]);

  const renderItem = useCallback(({ item: dataItem }: { item: CategoryItem }) => (
    <InfoItemCard item={dataItem} />
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
          contentContainerStyle={[
            styles.infoList,
            { paddingBottom: insets.bottom + 16 }
          ]}
          ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
        />
      )}
    </SafeAreaView>
  );
};



export default InformationFolderListView; 