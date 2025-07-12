import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import MapView, { Marker } from 'react-native-maps';

interface EventDetailParams {
  id: string;
  title: string;
  date: string;
  location: string;
  venue: string;
  city: string;
  image: string;
  about: string;
  latitude: number;
  longitude: number;
}

type EventDetailRouteProp = RouteProp<{ EventDetail: EventDetailParams }, 'EventDetail'>;

const EventDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'EventDetail'>>();
  const route = useRoute<EventDetailRouteProp>();
  const {
    title,
    date,
    location,
    venue,
    city,
    image,
    about,
    latitude,
    longitude,
  } = route.params;

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.navigate('EventListing')}>
        <Text style={styles.backArrowText}>{'\u2039'}</Text>
      </TouchableOpacity>
      {/* Event Image */}
      <Image source={{ uri: image }} style={styles.eventImage} />
      {/* Title and Date */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.venue}>{venue}</Text>
        <Text style={styles.city}>{city}</Text>
        {/* Google Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            // scrollEnabled={false}
            // zoomEnabled={false}
            // pitchEnabled={false}
            // rotateEnabled={false}
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
        </View>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.about}>{about}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6B012' },
  backArrow: { position: 'absolute', top: 48, left: 16, zIndex: 2},
  backArrowText: { fontSize: 48, color: '#222' },
  eventImage: {
    width: 72,
    height: 72,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 72,
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', justifyContent: 'flex-start', paddingStart: 16 },
  date: { fontSize: 15, color: '#222', justifyContent: 'flex-start', paddingStart: 16, marginBottom: 12 },
  card: {
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 8,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginVertical: 4, marginHorizontal: 18 },
  venue: { fontSize: 15, fontWeight: 'bold', color: '#222', marginVertical: 4, marginHorizontal: 18 },
  city: { fontSize: 13, color: '#222', marginVertical: 4, marginHorizontal: 18 },
  mapContainer: { width: '100%', height: 200,overflow: 'hidden',marginVertical: 8 },
  map: { flex: 1 },
  about: { fontSize: 14, color: '#222',  marginVertical: 4, marginHorizontal: 18, lineHeight: 20, minHeight: 100, fontWeight: '500'},
  joinButton: {
    backgroundColor: '#222',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginVertical: 4, marginHorizontal: 18
  },
  joinButtonText: { color: '#E6B012', fontSize: 16, fontWeight: 'bold', letterSpacing: 1},
});

export default EventDetailScreen; 