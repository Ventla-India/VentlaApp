import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale } from '../../utils/Responsive';
import { CommanIconProps } from '../ComponentsInterface';

const CommanIcon: React.FC<CommanIconProps> = ({
  iconName,
  iconColor = '#000',
  iconSize = 24,
  imageSource,
  initials,
  style,
  textStyle,
  backgroundColor = 'red', // fallback
}) => {
  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={[
          styles.image,
          { backgroundColor },
          style as ImageStyle
        ]}
        resizeMode="cover"
      />
    );
  }
  if (iconName) {
    return (
      <View style={[
        styles.iconBackground,
        { backgroundColor },
        style as ViewStyle
      ]}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </View>
    );
  }
  if (initials) {
    return (
      <View style={[
        styles.initialsContainer,
        { backgroundColor },
        style as ViewStyle
      ]}>
        <Text style={[styles.initialsText, textStyle]}>{initials}</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 20,
    backgroundColor: 'red',
  },
  iconBackground: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // fallback, will be overridden
  },
  initialsContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});

export default CommanIcon;
