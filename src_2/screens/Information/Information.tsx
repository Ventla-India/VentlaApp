import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
  } from 'react-native';
  import React, { useEffect, useState, useCallback } from 'react';
  import { userDetail } from '../../api/helper';
  import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { getRealm } from '../../realM/RealM';
  import Header from '../../components/Header';
  import { useNavigation, DrawerActions } from '@react-navigation/native';
  import { Route_Names } from '../../navigation/StackNavigation';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import FolderCard from '../../components/foldercard';
  import COLORS from '../../constant/Color';
  import TextPath from '../../constant/TextPath';
  import GenericFlatList from '../../../src/components/GenericFlatList';
  
  interface CategoryItem {
    Id?: string | number;
    Name?: string;
    [key: string]: any;
  }
  
  const { width, height } = Dimensions.get('window');
  
  const Information = () => {
    const [usersData, setUsersData] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
    const fetchUserDetail = async () => {
      const authToken =
        'MzimX%2fZzu8qMs5QJQUrAWGDK%2fteOosomAW9inoG4rBoG8ggA3QhvPOtBoySSCnwFsvO7sq3mORQ%3d';
  
      try {
        const response = await userDetail(authToken);
        const users = response.data?.CustomCategoryItems || [];
  
        const realm = await getRealm();
        realm.write(() => {
          const existing = realm.objects('CustomCategoryItem');
          realm.delete(existing);
  
          users.forEach((user: any) => {
            realm.create('CustomCategoryItem', {
              Id: user.Id,
              Name: user.Name,
              Description: user.Description ?? '',
              Created: user.Created ?? '',
              Modified: user.Modified ?? '',
              IconUrl: user.IconUrl ?? '',
              FeaturedImageUrl: user.FeaturedImageUrl ?? '',
              FeaturedOrginalImageUrl: user.FeaturedOrginalImageUrl ?? '',
              Address: user.Address ?? '',
              City: user.City ?? '',
              Latitude: user.Latitude ?? 0,
              Longitude: user.Longitude ?? 0,
              SortOrder: user.SortOrder ?? 0,
              ContentType: user.ContentType ?? '',
              ContentUrl: user.ContentUrl ?? '',
              IsFullImage: user.IsFullImage ?? false,
              JobTitle: user.JobTitle ?? '',
              Group: user.Group ?? '',
              ShowFeatureImageBelowTitle: user.ShowFeatureImageBelowTitle ?? false,
              CategoryFolder: user.CategoryFolder != null ? `${user.CategoryFolder}` : null,
              VirtualMeetingLink: user.VirtualMeetingLink ?? '',
              VirtualMeetingType: user.VirtualMeetingType ?? '',
              VirtualMeetingCode: user.VirtualMeetingCode ?? '',
              VirtualMeetingUrl: user.VirtualMeetingUrl ?? '',
              HideEndTimeDuration: user.HideEndTimeDuration ?? false,
              HasExternalZoomLink: user.HasExternalZoomLink ?? false,
              VirtualMeetingDetails: user.VirtualMeetingDetails ?? '',
              HasLinks: user.HasLinks ?? false,
              HasMedia: user.HasMedia ?? false,
              LinkedParticipantsIds: user.LinkedParticipantsIds ?? [],
              LinkedPrograms: (user.LinkedPrograms || []).map((lp: any) => ({
                Name: lp?.Name ?? '',
                Modified: lp?.Modified ?? '',
                Longitude: typeof lp?.Longitude === 'number' ? lp.Longitude : 0,
              })),
              ParticipantGroups: user.ParticipantGroups ?? [],
              CustomCategoryMedias: (user.CustomCategoryMedias || []).map((m: any) =>
                JSON.stringify(m)
              ),
              CustomCategoryLinks: (user.CustomCategoryLinks || []).map((l: any) =>
                JSON.stringify(l)
              ),
            });
          });
        });
  
        const allUsers = realm.objects('CustomCategoryItem');
        setUsersData([...allUsers]);
        Alert.alert('Success', 'Users saved to local database.');
      } catch (error) {
        console.error('API error:', error);
        try {
          const realm = await getRealm();
          const offlineData = realm.objects('CustomCategoryItem');
          if (offlineData.length > 0) {
            setUsersData([...offlineData]);
            Alert.alert('Offline', 'Showing data from local database.');
          } else {
            Alert.alert('No data', 'No offline data available.');
          }
        } catch (err) {
          console.error('Realm read failed:', err);
          Alert.alert('Error', 'Unable to load any data.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    const fetchUserDetailOnce = useCallback(async () => {
      try {
        const realm = await getRealm();
        const localData = realm.objects('CustomCategoryItem');
  
        if (localData.length > 0) {
          setUsersData([...localData]);
          setLoading(false);
        } else {
          await fetchUserDetail();
        }
      } catch (e) {
        console.error('Error loading local data:', e);
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchUserDetailOnce();
    }, [fetchUserDetailOnce]);
  
    const renderFolder = ({ item }: { item: CategoryItem }) => (
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
    );
  
    const renderItem = ({ item }: { item: CategoryItem }) => (
      <TouchableOpacity
        style={styles.infoCard}
        onPress={() => navigation.navigate(Route_Names.InformationAllDetailScreen, { item })}
      >
        <View style={styles.infoIconWrap}>
          <MaterialIcons name="info" size={moderateScale(24)} color="#fff" />
        </View>
        <Text style={styles.infoText}>{item.Name || 'Unnamed Category'}</Text>
      </TouchableOpacity>
    );
  
    const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    };
    const goToInformationFolder = () => {
      navigation.navigate(Route_Names.InformationFolder);
    };
  
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
  
          <FlatList
            data={usersData.slice(0, 2)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.Id?.toString() || ''}
            renderItem={renderFolder}
            contentContainerStyle={styles.folderList}
          />
  
          <View style={styles.foldersHeader}>
            <Text style={styles.sectionTitle}>TOP LEVEL</Text>
          </View>
  
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <GenericFlatList
              data={usersData}
              keyExtractor={(item: CategoryItem) => item.Id?.toString() || ''}
              renderItem={renderItem}
              ListEmptyComponent={<Text style={styles.emptyText}>No usersData found.</Text>}
              loading={loading}
              contentContainerStyle={styles.infoList}
            />
          )}
  
          <View style={styles.bannerWrap}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.bannerImg}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default Information;
  

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
    folderCard: {
        width: width * 0.45,
        height: height * 0.2,
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        marginRight: scale(12),
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
