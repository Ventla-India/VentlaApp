import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
 
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import FolderCard from '../../../components/InformationCom/foldercard';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { CategoryItem } from '../Interfaces/CategoryItem';
import { useInformationFolderViewModel } from '../viewmodels/InformationFolderViewModel';
import { Route_Names } from '../../../navigation/StackNavigation';
import GenericFlatList from '../../../components/GenericFlatList';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InformationFolderView: React.FC = () => {
  const {
    state,
    setLoading,
    setFolders,
    loadFolders,
  } = useInformationFolderViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const loadFoldersCallback = useCallback(async () => {
    try {
      setLoading(true);
      const folders = await loadFolders();
      console.log(folders,'fvghfdsjhydfs');
      setFolders(folders);
    } catch (error) {
      console.error('Error loading folders:', error);
    } finally {
      setLoading(false);
    }
  }, [loadFolders, setLoading, setFolders]);

  useEffect(() => {
    loadFoldersCallback();
  }, [loadFoldersCallback]);

  const renderFolder = useCallback(
    ({ item }: { item: CategoryItem }) => (
      <FolderCard
        item={item}
        styles={{
          folderCard: styles.folderCard,
          folderIconWrap: styles.folderIconWrap,
          folderLabel: styles.folderLabel,
          avatarRow: {
            flexDirection: 'row',
            marginTop: moderateScale(15),
          },
          avatar: {
            width: moderateScale(24),
            height: moderateScale(24),
            borderRadius: moderateScale(12),
            marginRight: moderateScale(4),
            marginTop: moderateScale(4),
          },
        }}
        onPress={() => {
                navigation.navigate(Route_Names.InformationFolderList, {
                  item: item,
                });
              }}
              
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

      {state.loading ? (
        <ActivityIndicator size="large" color="#7B1FA2" style={styles.loader} />
      ) : (

        <GenericFlatList
          data={state.folders}
          renderItem={renderFolder}
          keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
          numColumns={2}
          contentContainerStyle={[
            styles.grid,
            { paddingBottom: insets.bottom + 16 }
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No folders found.</Text>}
        />
      )}
    </View>
  );
};



export default InformationFolderView; 