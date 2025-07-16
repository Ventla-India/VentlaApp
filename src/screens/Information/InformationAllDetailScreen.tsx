import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { moderateScale, scale, SCREEN_WIDTH, verticalScale } from '../../utils/Responsive';
import COLORS from '../../constant/Color';
import WrapperContainer from '../../components/WrapperContainer';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommanIcon from '../../components/CommanIcon/CommanIcon';

const InformationDetailItemsScreen = () => {
  const [sessionData, setSessionData] = useState([
    { icon: 'calendar', title: 'Sessions', time: 'Friday, Apr 5, 2024 7:00 AM - 8:00 AM' },
    { icon: 'store', title: 'Vendors Room Open', time: 'Friday, Apr 5, 2024 9:15 AM - 10:15 AM' },
    { icon: 'account-check', title: 'Registration: OPEN FOR ALL', time: 'Friday, Apr 5, 2024 9:45 AM - 5:45 PM' },
    { icon: 'camera', title: 'Photo Ops: IMPALA', time: 'Friday, Apr 5, 2024 10:00 AM - 3:00 PM' },
    { icon: 'alarm', title: 'Test Reminder', time: 'Friday, Apr 5, 2024 1:05 PM - 2:05 PM' },
  ]);

  const [mediaItems, setMediaItems] = useState([
    { title: 'scaf', image: require('../../assets/images/media.png') },
    { title: 'safafaf as', image: require('../../assets/images/media.png') },
    { title: 'wdwdwd w', image: require('../../assets/images/media.png') },
    { title: 'wdwdwd w', image: require('../../assets/images/media.png') },
    { title: 'wqdwvd w', image: require('../../assets/images/media.png') },
  ]);
  const [participants, setParticipants] = useState([
    { name: 'A B' },
    { name: 'Abraham Cratch' },
    { name: 'Adelle Schantini' },
  ]);

  const sessionColors = [
    '#FFB300', // Amber
    '#1E88E5', // Blue
    '#43A047', // Green
    '#E53935', // Red
    '#8E24AA', // Purple
  ];
  return (
    <WrapperContainer>
      <Header showMenu={false} showBack={true} title="Information Details" />
      <View style={styles.mainContainer}>
        <View style={styles.whiteBox}>

          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>V</Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.UpperTitle} >
              <Text style={styles.eventTitle}>Ventla India 🔗</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <Text style={styles.description}>
              fewfewfwqfewqfe <Text style={styles.italic}>eewfrewrwererwerwerwerwrer eerreww</Text>
            </Text>
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>LINKED SESSIONS</Text>
            {sessionData.map((item, index) => (
              <View key={index} style={styles.sessionRow}>
                <CommanIcon
                  iconName={item.icon}
                  iconColor="#fff"
                  iconSize={scale(22)}
                  backgroundColor={sessionColors[index % sessionColors.length]}
                  style={styles.sessionIcon}
                />
                <View style={styles.sessionTextWrapper}>
                  <Text style={styles.sessionTitle}>{item.title}</Text>
                  <Text style={styles.sessionTime}>{item.time}</Text>
                </View>
              </View>
            ))}
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>LINKED PARTICIPANTS</Text>
            {(Array.isArray(participants) ? participants : []).map((participantItem: { name: string, image?: any }, index: number) => (
              <View key={index} style={styles.participantRow}>
                <CommanIcon
                  imageSource={participantItem.image}
                  initials={(!participantItem.image && participantItem.name) ? participantItem.name.split(' ').map(word => word[0]).join('').toUpperCase() : undefined}
                  style={styles.participantIcon}
                  textStyle={styles.participantInitials}
                />
                <Text style={styles.participantName}>{participantItem.name}</Text>
              </View>
            ))}
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>MEDIA</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mediaScrollContainer}
            >
              {mediaItems.map((item, index) => (
                <View key={index} style={styles.mediaItem}>
                  <View style={styles.mediaImageBox}>
                    <Image
                      source={item.image}
                      style={styles.mediaImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.mediaTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </ScrollView>

          </ScrollView>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default InformationDetailItemsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.App_Theme,
  },
  whiteBox: {
    flex: 1,
    marginTop: moderateScale(80),
    backgroundColor: COLORS.WHITE,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    overflow: 'visible', // Ensures the logo is not clipped
  },
  contentContainer: {
    paddingHorizontal: scale(26),
    paddingBottom: verticalScale(16),
    flexGrow: 1,
    paddingVertical: moderateScale(40)
  },
  logoWrapper: {
    position: 'absolute',
    top: -verticalScale(32), // Adjusted based on logoCircle height
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: COLORS.WHITE,
    padding: moderateScale(5),
    borderRadius: moderateScale(100),
  },
  logoCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(42),
    backgroundColor: COLORS.App_Theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(13),
    marginVertical: moderateScale(10)
  },
  italic: {
    fontStyle: 'italic',
    color: COLORS.App_Theme,
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  sessionRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(12),
    alignItems: 'flex-start',
  },
  sessionIcon: {
    marginTop: verticalScale(4),
    marginRight: scale(8),
  },
  sessionTextWrapper: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  sessionTime: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  UpperTitle: {
    marginTop: moderateScale(40),
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: moderateScale(3),
    backgroundColor: '#f5f5f5',
    marginBottom: moderateScale(20)
  },
  line: {
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },

  participantIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.App_Theme,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },

  participantInitials: {
    color: COLORS.WHITE,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  participantName: {
    fontSize: moderateScale(14),
  },
  mediaScrollContainer: {
    paddingVertical: verticalScale(8),
  },

  mediaItem: {
    width: scale(80),
    marginRight: scale(12),
    alignItems: 'center',
  },

  mediaImageBox: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    backgroundColor: '#ccc',
    marginBottom: verticalScale(4),
  },

  mediaImage: {
    width: '100%',
    height: '100%',
  },

  mediaTitle: {
    fontSize: moderateScale(12),
    textAlign: 'center',
  },


});
