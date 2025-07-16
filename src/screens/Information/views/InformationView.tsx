import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image  
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../../../components/Header';
import FolderCard from '../../../components/foldercard';
import GenericFlatList from '../../../components/GenericFlatList';
import { Route_Names } from '../../../navigation/StackNavigation';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { CategoryItem } from '../Interfaces/CategoryItem';
import { useInformationViewModel } from '../viewmodels/InformationViewModel';
import { styles } from '../styles';


const InformationView: React.FC = () => {
  const {
    state,
    setLoading,
    setCustomCategoriesData,
    loadData,
    getFolderData,
    getTopLevelData,
  } = useInformationViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchData();
  }, []); // Only run on mount

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await loadData();
      setCustomCategoriesData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderFolder = useCallback(({ item }: { item: CategoryItem }) => (
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
  ), [navigation]);

  const renderItem = useCallback(({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.infoCard}
      onPress={() => navigation.navigate(Route_Names.InformationDetailItemsScreen, { item })}
    >
      <View style={styles.infoIconWrap}>
        <MaterialIcons name="info" size={moderateScale(24)} color="#fff" />
      </View>
      <Text style={styles.infoText}>{item.Name}</Text>
    </TouchableOpacity>
  ), [navigation]);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const goToInformationFolder = useCallback(() => {
    navigation.navigate(Route_Names.InformationFolder);
  }, [navigation]);

  const folderData = getFolderData(state.customCategoriesData);
  const topLevelData = getTopLevelData(state.customCategoriesData);



  return (
    <View style={styles.container}>
      <Header title="VentlaApp" showMenu onMenuPress={openDrawer} showBack={false} />

      {state.loading ? (
        <View style={styles.centeredContent}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : folderData.length === 0 && topLevelData.length === 0 ? (
        <View style={styles.centeredContent}>
          <Text style={styles.emptyText}>No Data Found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* If folder data exists, show folders and top-level both */}
          {folderData.length > 0 ? (
            <>
              {/* Folder Section */}
              <View style={styles.foldersHeader}>
                <Text style={styles.sectionTitle}>FOLDERS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(8) }}>
                  <Text style={{ marginRight: scale(10) }}>
                    {`Showing Folders (${folderData.slice(0, 4).length} of ${folderData.length})`}

                  </Text>
                  <TouchableOpacity onPress={goToInformationFolder}>
                    <Text style={styles.viewAllLink}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <GenericFlatList
                data={folderData.slice(0, 4)}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
                renderItem={renderFolder}
                contentContainerStyle={[
                  styles.folderGrid,
                
                ]}
                hasMoreData={false}
                loadingMore={false}
              />

              {/* Top-Level Section (if available) */}
              {topLevelData.length > 0 && (
                <>
                  <View style={styles.foldersHeader}>
                    <Text style={styles.sectionTitle}>TOP LEVEL</Text>
                  </View>
                  <GenericFlatList
                    data={topLevelData}
                    keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
                    renderItem={renderItem}
                    contentContainerStyle={styles.infoList}
                  />
                </>
              )}
            </>
          ) : (
            // Show only top-level if no folderData exists
            topLevelData.length > 0 && (
              <>
                <View style={styles.foldersHeader}>
                  <Text style={styles.sectionTitle}>TOP LEVEL</Text>
                </View>
                <GenericFlatList
                  data={topLevelData}
                  keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
                  renderItem={renderItem}
                  contentContainerStyle={styles.infoList}
                />
              </>
            )
          )}

          <View style={styles.bannerWrap}>
            <Image
              source={require('../../../assets/images/profile.jpg')}
              style={styles.bannerImg}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

      )}
    </View>
  );


};



export default InformationView; 