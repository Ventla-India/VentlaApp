import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from '../../../components/Header';
import FolderCard from '../../../components/foldercard';
import GenericFlatList from '../../../components/GenericFlatList';
import { Route_Names } from '../../../navigation/StackNavigation';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import COLORS from '../../../constant/Color';
import TextPath from '../../../constant/TextPath';
import { CategoryItem } from '../Interfaces/CategoryItem';
import { InformationViewModel } from '../viewmodels/InformationViewModel';

const { width, height } = Dimensions.get('window');

const InformationView: React.FC = () => {
  const viewModel = new InformationViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { state, setLoading, setCustomCategoriesData } = viewModel.useInformationState();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await viewModel.loadData();
      setCustomCategoriesData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [viewModel, setLoading, setCustomCategoriesData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderFolder = useCallback(({ item }: { item: CategoryItem }) => (
    <FolderCard
      item={item}
      styles={{
        folderCard: styles.folderCard,
        folderIconWrap: styles.folderIconWrap,
        folderLabel: styles.folderLabel,
        avatarRow: {
          flexDirection: 'row',
          marginTop: moderateScale(38),
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
      onPress={() => navigation.navigate(Route_Names.InformationAllDetailScreen, { item })}
    >
      <View style={styles.infoIconWrap}>
        <MaterialIcons name="info" size={moderateScale(24)} color="#fff" />
      </View>
      <Text style={styles.infoText}>{item.Name || 'Unnamed Category'}</Text>
    </TouchableOpacity>
  ), [navigation]);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const goToInformationFolder = useCallback(() => {
    navigation.navigate(Route_Names.InformationFolder);
  }, [navigation]);

  const folderData = viewModel.getFolderData(state.customCategoriesData);
  const topLevelData = viewModel.getTopLevelData(state.customCategoriesData);

  return (
    <View style={styles.container}>
      <Header title="VentlaApp" showMenu onMenuPress={openDrawer} showBack={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.foldersHeader}>
          <Text style={styles.sectionTitle}>FOLDERS</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(8) }}>
            <Text style={{ marginRight: scale(10) }}>{TextPath.SHOWING_FOLDER}</Text>
            <TouchableOpacity onPress={goToInformationFolder}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <GenericFlatList
          data={folderData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
          renderItem={renderFolder}
          contentContainerStyle={styles.folderGrid}
          hasMoreData={false}
          loadingMore={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No folders available.</Text>}
       
        />

        <View style={styles.foldersHeader}>
          <Text style={styles.sectionTitle}>TOP LEVEL</Text>
        </View>

        {state.loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <GenericFlatList
            data={topLevelData}
            keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No Data Found.</Text>}
            loading={state.loading}
            contentContainerStyle={styles.infoList}
          />
        )}

        <View style={styles.bannerWrap}>
          <Image
            source={require('../../../assets/images/profile.jpg')}
            style={styles.bannerImg}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7B1FA2',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(18),
    paddingBottom: verticalScale(12),
  },
  folderIconWrapProfile: {
    backgroundColor: '#fff',
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  headerTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#888',
  },
  folderList: {
    paddingLeft: scale(12),
    paddingBottom: verticalScale(8),
  },
  folderGrid: {
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(8),
  },
 
  folderCard: {
    width: width * 0.45,
    height: height * 0.2,
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(8),
    marginHorizontal: scale(4),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: moderateScale(12),
  },
  folderIconWrap: {
    backgroundColor: '#7B1FA2',
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
  },
  infoList: {
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(16),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: verticalScale(8),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  infoIconWrap: {
    backgroundColor: COLORS.App_Theme,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  infoText: {
    fontSize: moderateScale(15),
    color: '#222',
    flex: 1,
    flexWrap: 'wrap',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: verticalScale(20),
    color: '#888',
    fontSize: moderateScale(15),
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: moderateScale(15),
    marginVertical: verticalScale(20),
  },
  bannerWrap: {
    alignItems: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(12),
  },
  bannerImg: {
    width: scale(220),
    height: verticalScale(60),
    borderRadius: moderateScale(10),
  },
  foldersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
  },
  viewAllLink: {
    color: '#7B1FA2',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#7B1FA2',
    textDecorationStyle: 'solid',
  },
});

export default InformationView; 