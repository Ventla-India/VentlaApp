import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/Responsive';
import ImagePath from '../constant/imagePath/ImagePath';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showMenu = true, onMenuPress, style, showBack = false }) => {

  const navigation = useNavigation();
  return (
    <View style={[styles.header, style]}>
      {showMenu && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      )}
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/backTwo.png')} style={styles.backIcon} resizeMode='contain' />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: '#641975',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
  },
  menuButton: {
    padding: moderateScale(8),
    marginRight: scale(16),
  },
  menuIcon: {
    fontSize: moderateScale(24),
    color: '#fff',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: scale(16),
  },
  backIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
}); 