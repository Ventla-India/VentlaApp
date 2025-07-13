import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import GenericFlatList from '../GenericFlatList'; // adjust path as needed
import ImagePath from '../../constant/ImagePath';

const folders = [
  { title: 'Speaker', icon: 'folder' },
  {
    title: 'Speakers',
    icon: 'folder',
    avatar: ImagePath.informationIcon,
  },
  {
    title: 'Keynotes',
    icon: 'folder',
  },
  {
    title: 'VIPs',
    icon: 'folder',
    avatar: ImagePath.informationIcon,
  },
];

const FolderSection = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.folderCard}>
      <Icon name={item.icon} size={moderateScale(36)} color="#800080" />
      <Text style={styles.folderText}>{item.title}</Text>
      {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>FOLDERS</Text>
      <GenericFlatList
        data={folders}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContent}      
        loading={false}
        horizontal={true}
        ListEmptyComponent={<Text>No folders found</Text>}
        onEndReachedThreshold={0.5}
        // Add additional props as needed (pagination, loadingMore, etc.)
        style={{}}
        ListHeaderComponent={<View style={{ height: verticalScale(8) }} />}
      />
    </View>
  );
};

export default FolderSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(12),
    paddingTop: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  folderCard: {
    backgroundColor: '#fff',
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: verticalScale(12),
    padding: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(10),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  folderText: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  avatar: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(6),
  },
});
