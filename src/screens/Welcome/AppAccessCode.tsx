import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,  
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenericTextInput from '../../components/GenericTextInput';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';

const AccessCodeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top: Logo / Title */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/meetappgo_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Middle: Subtitle + Input */}
      <View style={styles.middleSection}>
        <Text style={styles.subtitle}>
          Use your organizer's link or QR code, or enter the app access code below.
        </Text>

        <View style={styles.inputWrapper}>
          <GenericTextInput
            placeholder="Enter your access code"
            placeholderTextColor="#9900cc"
            inputStyle={styles.input}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={moderateScale(24)} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccessCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B1FA2',
    paddingHorizontal: moderateScale(24),
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: verticalScale(30),
},
 logo: {
    height: verticalScale(60),
    width: scale(180),
  },
  middleSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(8),
  },
  
  subtitle: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#fff',
    textAlign: 'center',
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(10),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: verticalScale(40),
    width: scale(250),
    fontSize: moderateScale(14),
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(16),
    backgroundColor: '#fff',
    color: '#333',
  },
  searchButton: {
    marginLeft: scale(8),
    height: verticalScale(40),
    width: verticalScale(40),
    backgroundColor: '#FFCB57',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
