import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '../../utils/Responsive';
import { CategoryItem } from '../../screens/Information/Interfaces/CategoryItem';
import COLORS from '../../constant/Color';

interface InfoItemCardProps {
  item: CategoryItem;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const InfoItemCard: React.FC<InfoItemCardProps> = ({ item, onPress, style, textStyle }) => (
  <TouchableOpacity
    style={[styles.infoCard, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.infoIconWrap}>
      <MaterialIcons name="info" size={moderateScale(24)} color="#fff" />
    </View>
    <Text style={[styles.infoText, textStyle]}>{item.Name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoIconWrap: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.App_Theme,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  infoText: {
    fontSize: moderateScale(16),
    color: '#333',
    fontWeight: '500',
  },
});

export default InfoItemCard; 