import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, Image, ImageStyle } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/Responsive';
import ImagePath from '../constant/ImagePath';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constant/Color';

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showBack?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  titleAlign?: 'left' | 'center';
  backIconStyle?: StyleProp<ImageStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, showMenu = true, onMenuPress, style, showBack = false, titleStyle, titleAlign = 'left', backIconStyle }) => {

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
          <Image source={ImagePath.backIcon} style={[styles.backIcon, backIconStyle]} resizeMode='contain' />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.headerTitle,
          titleStyle,
          titleAlign === 'center' ? styles.centeredTitle : null,
          { textAlign: titleAlign },
        ]}
      >
        {title}
      </Text>
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
    backgroundColor: COLORS.App_Theme,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT.BORDER,
    shadowColor: COLORS.LIGHT.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
    position: 'relative',
  },
  menuButton: {
    padding: moderateScale(8),
    marginRight: scale(16),
  },
  menuIcon: {
    fontSize: moderateScale(24),
    color: COLORS.LIGHT.BACKGROUND,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.LIGHT.BACKGROUND,
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: scale(16),
  },
  backIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
    tintColor: COLORS.LIGHT.TEXT,
  },
  centeredTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 0,
  },
}); 