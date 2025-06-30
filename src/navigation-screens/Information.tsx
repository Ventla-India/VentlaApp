import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InformationScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* FOLDERS */}
        <Text style={styles.sectionTitle}>FOLDERS</Text>
        <View style={styles.folderRow}>
          <View style={styles.folderCard}>
            <View style={styles.folderIcon}>
              <Icon name="folder" size={36} color="#fff" />
            </View>
            <Text style={styles.folderLabel}>Speaker</Text>
            <Icon name="information" size={20} color="#800080" style={styles.cornerIcon} />
          </View>

          <View style={styles.folderCard}>
            <View style={styles.folderIcon}>
              <Icon name="folder" size={36} color="#fff" />
            </View>
            <Text style={styles.folderLabel}>Speakers</Text>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
              style={styles.cornerAvatar}
            />
          </View>
        </View>

        {/* TOP LEVEL */}
        <Text style={styles.sectionTitle}>TOP LEVEL</Text>

        <View style={styles.card}>
          <Icon name="information" size={22} color="#800080" />
          <Text style={styles.cardText}>asd</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardText, { color: '#800080', fontWeight: 'bold' }]}>
            ventla
          </Text>
          <Text style={styles.cardText}>Sponsor name</Text>
        </View>

        <View style={styles.card}>
          <Icon name="information" size={22} color="#800080" />
          <Text style={styles.cardText}>Amrinder Singh</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/zTTU9Wm.jpg' }}
            style={styles.inlineImage}
          />
          <Text style={styles.cardText}>Sponsor type Information</Text>
        </View>

        <View style={styles.card}>
          <Icon name="information" size={22} color="#800080" />
          <Text style={styles.cardText}>Information about Quarterly Business plan</Text>
        </View>

        {/* Optional image footer */}
        <Image
          source={{ uri: 'https://www.earthday.org/wp-content/uploads/2021/04/2021-Earth-Day-banner.jpg' }}
          style={styles.footerImage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#800080',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f7',
    paddingBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  folderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  folderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    padding: 16,
    elevation: 2,
    position: 'relative',
  },
  folderIcon: {
    backgroundColor: '#800080',
    borderRadius: 50,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  folderLabel: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  cornerIcon: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  cornerAvatar: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flexShrink: 1,
  },
  inlineImage: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  footerImage: {
    width: '100%',
    height: 150,
    marginTop: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
