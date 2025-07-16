import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { moderateScale, scale, SCREEN_HEIGHT, SCREEN_WIDTH, verticalScale } from '../../utils/Responsive';
import COLORS from '../../constant/Color';
import WrapperContainer from '../../components/WrapperContainer';
import Carousel from "react-native-reanimated-carousel";
import Header from '../../components/Header';
import CommanIcon from '../../components/CommanIcon/CommanIcon';

const InformationDetailItemsScreen = () => {
  const ref = useRef(null);

  const [sessionData] = useState([
    { icon: 'calendar', title: 'Sessions', time: 'Friday, Apr 5, 2024 7:00 AM - 8:00 AM' },
    { icon: 'store', title: 'Vendors Room Open', time: 'Friday, Apr 5, 2024 9:15 AM - 10:15 AM' },
    { icon: 'account-check', title: 'Registration: OPEN FOR ALL', time: 'Friday, Apr 5, 2024 9:45 AM - 5:45 PM' },
    { icon: 'camera', title: 'Photo Ops: IMPALA', time: 'Friday, Apr 5, 2024 10:00 AM - 3:00 PM' },
    { icon: 'alarm', title: 'Test Reminder', time: 'Friday, Apr 5, 2024 1:05 PM - 2:05 PM' },
  ]);

  const [mediaItems] = useState([
    { title: 'scaf', image: require('../../assets/images/media.png') },
    { title: 'safafaf as', image: require('../../assets/images/media.png') },
    { title: 'wdwdwd w', image: require('../../assets/images/media.png') },
    { title: 'wqdwvd w', image: require('../../assets/images/media.png') },
  ]);

  const [participants] = useState([
    { name: 'A B' },
    { name: 'Abraham Cratch' },
    { name: 'Adelle Schantini' },
  ]);

  const sessionColors = ['#FFB300', '#1E88E5', '#43A047', '#E53935', '#8E24AA'];

  const data = [1, 2, 3]; // dummy data for single carousel item

  const renderItem = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.App_Theme }}>
      <Header showMenu={false} showBack={true} />

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.whiteBox}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>V</Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              {/* Top Title & Description */}
              <TouchableOpacity style={styles.UpperTitle}>
                <Text style={styles.eventTitle}>Ventla India 🔗</Text>
              </TouchableOpacity>

              <View style={styles.line} />
              <Text style={styles.description}>
                fewfewfwqfewqfe <Text style={styles.italic}>eewfrewrwererwerwerwerwrer eerreww</Text>
              </Text>

              {/* Sessions */}
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

              {/* Participants */}
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>LINKED PARTICIPANTS</Text>
              {participants.map((p, index) => (
                <View key={index} style={styles.participantRow}>
                  <CommanIcon
                    imageSource={p.image}
                    initials={
                      !p.image && p.name
                        ? p.name
                          .split(' ')
                          .map(word => word[0])
                          .join('')
                          .toUpperCase()
                        : undefined
                    }
                    style={styles.participantIcon}
                    textStyle={styles.participantInitials}
                  />
                  <Text style={styles.participantName}>{p.name}</Text>
                </View>
              ))}

              {/* Media */}
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
                      <Image source={item.image} style={styles.mediaImage} resizeMode="cover" />
                    </View>
                    <Text style={styles.mediaTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
  return (
    <WrapperContainer>
      <Carousel
        ref={ref}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        data={data}
        renderItem={renderItem}
        loop={false}
      />
    </WrapperContainer>
  );
};
export default InformationDetailItemsScreen;
// Update styles for better appearance
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.App_Theme,
    paddingTop: moderateScale(10),
  },
  whiteBox: {
    marginTop: moderateScale(30),
    backgroundColor: COLORS.WHITE,
    borderTopRightRadius: moderateScale(24),
    borderTopLeftRadius: moderateScale(24),
    overflow: 'visible',
    paddingBottom: moderateScale(24),
  },
  contentContainer: {
    paddingHorizontal: scale(26),
    paddingBottom: verticalScale(16),
    flexGrow: 1,
    paddingVertical: moderateScale(40),
  },
  logoWrapper: {
    position: 'absolute',
    top: -verticalScale(36),
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: COLORS.WHITE,
    padding: moderateScale(6),
    borderRadius: moderateScale(100),
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoCircle: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: COLORS.App_Theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(28),
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
    marginVertical: moderateScale(10),
    textAlign: 'center',
  },
  italic: {
    fontStyle: 'italic',
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
    marginBottom: moderateScale(20),
    paddingVertical: moderateScale(8),
  },
  line: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: moderateScale(8),
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
  scrollWrapper: {
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(20),
  },


});
