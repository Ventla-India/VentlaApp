import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, Image, ImageStyle, ImageSourcePropType } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/Responsive';
import ImagePath from '../constant/ImagePath';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constant/Color';
import { HeaderProps } from './ComponentsInterface';

const Header: React.FC<HeaderProps> = ({
  title,
  showMenu = true,
  onMenuPress,
  style,
  showBack = false,
  titleStyle,
  titleAlign = 'center',
  backIconStyle,
  showRightIcon = false,
  rightIconSource,
  onRightIconPress,
  rightIconStyle,
  rightIconKey,
}) => {
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
          <Image source={ImagePath.backIcon} style={[styles.backIcon, backIconStyle]} resizeMode='contain' tintColor={COLORS.WHITE} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.headerTitle,
          titleStyle,
          styles.centeredTitle,
        ]}
      >
        {title}
      </Text>
      {showRightIcon && rightIconSource && (
        <TouchableOpacity
          key={rightIconKey}
          onPress={onRightIconPress}
          style={styles.rightIconButton}
        >
          <Image source={ImagePath.refreshIcon} style={[styles.rightIcon, rightIconStyle]} resizeMode='contain' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
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
    marginTop: moderateScale(12)
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.LIGHT.BACKGROUND,
    marginTop: moderateScale(8)
  },
  backButton: {
    padding: moderateScale(8),
    marginTop: moderateScale(12)
  },
  backIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
    tintColor: COLORS.LIGHT.TEXT,
    marginLeft: moderateScale(-16),

  },
  centeredTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 0,
  },
  rightIconButton: {
    position: 'absolute',
    right: scale(0),
    padding: moderateScale(8),
    zIndex: 1,
  },
  rightIcon: {
    width: moderateScale(28),
    height: moderateScale(28),
    tintColor: COLORS.LIGHT.BACKGROUND,
  },
}); 