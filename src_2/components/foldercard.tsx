import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '../utils/Responsive';

interface CategoryItem {
  Id?: string | number;
  Name?: string;
  [key: string]: any;
}

interface FolderCardProps {
  item: CategoryItem;
  styles: {
    folderCard: ViewStyle;
    folderIconWrap: ViewStyle;
    folderLabel: TextStyle;
    avatarRow: ViewStyle;
    avatar: ImageStyle;
  };
  onPress?: () => void; // Add onPress prop
}

const FolderCard: React.FC<FolderCardProps> = ({ item, styles, onPress }) => {
  const CardContent = (
    <View style={styles.folderCard}>
      <View style={styles.folderIconWrap}>
        <Icon name="folder" size={moderateScale(32)} color="#fff" />
      </View>
      <Text style={styles.folderLabel}>{item.Name}</Text>
      <View style={styles.avatarRow}>
        {[1, 2, 3].map((_, idx) => (
          <Image key={idx} source={require('../assets/images/profile.jpg')} style={styles.avatar} />
        ))}
      </View>
    </View>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {CardContent}
    </TouchableOpacity>
  ) : (
    CardContent
  );
};

export default FolderCard; 