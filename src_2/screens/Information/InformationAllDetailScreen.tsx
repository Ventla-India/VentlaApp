import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import COLORS from '../../constant/Color';

const InformationAllDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBackground}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.iconCircle}>
          <Text style={styles.infoIcon}>i</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Information about{'\n'}Quarterly Business plan</Text>
        <View style={styles.separator} />

        <Text style={styles.sectionLabel}>LOCATION</Text>
        <Text style={styles.locationText}>
          Conference hall - 2, Quark Atrium, Mohali <Text style={styles.emoji}>🧑‍💼</Text>
        </Text>
        <View style={styles.separator} />

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <View style={styles.separator} />

        <Text style={styles.sectionLabel}>LINKED SESSIONS</Text>
        <View style={styles.sessionBox}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View style={styles.sessionDetails}>
            <Text style={styles.sessionTitle}>Interview with Dr. Sheila Abbott</Text>
            <Text style={styles.sessionTime}>Thursday, Jul 25, 2024 3:30 PM - 4:30 PM</Text>
          </View>
        </View>

        <View style={styles.separator} />
        <Text style={styles.sectionLabel}>MEDIA</Text>
        <View style={styles.mediaRow}>
          <View style={styles.mediaItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80x60' }}
              style={styles.mediaImage}
            />
            <Text style={styles.mediaLabel}>Photo 1</Text>
          </View>
          <View style={styles.mediaItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80x60' }}
              style={styles.mediaImage}
            />
            <Text style={styles.mediaLabel}>Photo 2</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationAllDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT.BACKGROUND,
  },
  headerBackground: {
    backgroundColor: '#7B1FA2',
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(48),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(16),
    left: scale(16),
  },
  backIcon: {
    fontSize: moderateScale(20),
    color: '#fff',
  },
  iconCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: '#fff',
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: moderateScale(30),
    color: '#7B1FA2',
    fontWeight: 'bold',
  },
  content: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.LIGHT.TEXT,
    textAlign: 'left',
    marginBottom: verticalScale(12),
  },
  sectionLabel: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: COLORS.LIGHT.TEXT,
    marginBottom: verticalScale(4),
  },
  locationText: {
    fontSize: moderateScale(14),
    color: COLORS.LIGHT.TEXT,
    marginBottom: verticalScale(12),
  },
  emoji: {
    fontSize: moderateScale(14),
  },
  description: {
    fontSize: moderateScale(14),
    color: COLORS.LIGHT.TEXT,
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(12),
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: verticalScale(12),
  },
  sessionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: scale(12),
  },
  sessionDetails: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.LIGHT.TEXT,
  },
  sessionTime: {
    fontSize: moderateScale(12),
    color: '#777',
    marginTop: verticalScale(2),
  },
  mediaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: scale(12),
  },
  mediaItem: {
    alignItems: 'center',
    marginRight: scale(12),
  },
  mediaImage: {
    width: scale(80),
    height: verticalScale(60),
    borderRadius: moderateScale(6),
  },
  mediaLabel: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    color: COLORS.LIGHT.TEXT,
  },
});
