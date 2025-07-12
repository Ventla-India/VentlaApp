import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  locked: boolean;
  venue?: string;
  city?: string;
  about?: string;
  latitude?: number;
  longitude?: number;
}

interface EventListingScreenProps {
  yellowColor?: string;
  showCancel?: boolean;
}

const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Conference 2025',
    date: 'Jan 1 - Dec 1, 2025',
    location: 'Hotel Arts',
    venue: 'Hotel Arts',
    city: 'Barcelona',
    about: 'Welcome to the 2025 company kick-off in Barcelona',
    latitude: 41.390205,
    longitude: 2.197109,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80',
    locked: true,
  },
  {
    id: '2',
    title: 'Tech Expo',
    date: 'Mar 10 - Mar 12, 2025',
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=128&q=80',
    locked: false,
  },
  // Add more events as needed for scroll testing
  {
    id: '3',
    title: 'Design Summit',
    date: 'Apr 5 - Apr 7, 2025',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=128&q=80',
    locked: false,
  },
  {
    id: '4',
    title: 'Startup Meetup',
    date: 'May 15, 2025',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=128&q=80',
    locked: true,
  },
  {
    id: '5',
    title: 'AI Conference',
    date: 'Jun 20 - Jun 22, 2025',
    location: 'San Francisco',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=128&q=80',
    locked: false,
  },
  {
    id: '6',
    title: 'Startup Meetup',
    date: 'May 15, 2025',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=128&q=80',
    locked: true,
  },
  {
    id: '7',
    title: 'Startup Meetup',
    date: 'May 15, 2025',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=128&q=80',
    locked: true,
  },
];

const EventListingScreen: React.FC<EventListingScreenProps> = ({ yellowColor = '#E6B012' }) => {
  const [code, setCode] = useState('');
  const [showCancel, setShowCancel] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'EventListing'>>();

  const handleCodeChange = (text: string) => {
    setCode(text);
    if (text === '135') {
      setShowCancel(false);
    } else {
      setShowCancel(true);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetail', item)}>
      <View style={styles.eventRow}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
        {item.locked && (
          <Text style={styles.iconText}>{'\u1F512'}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: yellowColor }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Select an event</Text>
      <View style={styles.card}>
        {/* Join by code */}
        <Text style={styles.sectionTitle}>Join by code</Text>
        <View style={styles.codeRow}>
          <View style={styles.codeInputWrapper}>
            <Text style={styles.iconText}>{'\u1F512'}</Text>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter code"
              value={code}
              onChangeText={handleCodeChange}
              placeholderTextColor="#bbb"
            />
          </View>
          <TouchableOpacity style={[styles.codeButton, { backgroundColor: yellowColor }]}> 
            <Text style={styles.iconText}>{'\u2794'}</Text>
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        {/* Event List */}
        <Text style={styles.eventSectionTitle}>Select from list</Text>
        <View style={styles.eventListContainer}>
          <FlatList
            data={DUMMY_EVENTS}
            renderItem={renderEvent}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.eventList}
            contentContainerStyle={styles.eventListContent}
            bounces={false}
          />
        </View>
        {/* Cancel Button */}
        {showCancel && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1},
  title: { fontSize: 22, fontWeight: '500', color: '#222', marginTop: 64, marginBottom: 0, alignSelf: 'flex-start', marginLeft: 24 },
  card: {
    flex: 1,
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    paddingBottom: 2,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 10,
    alignSelf: 'center',
    alignItems: 'stretch',
    marginTop: 8,
    marginBottom: 22,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 3 },
  eventSectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', marginVertical: 4 },
  codeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  codeInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    marginRight: 12,
    height: 48,
  },
  codeIcon: { marginRight: 6 },
  codeInput: { flex: 1, fontSize: 16, color: '#222' },
  codeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  divider: { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { marginHorizontal: 12, color: '#888', fontWeight: 'bold', fontSize: 16 },
  eventListContainer: {
    flex: 1,
    minHeight: 0,
    marginBottom: 8,
  },
  eventList: { flexGrow: 0 },
  eventListContent: { paddingBottom: 8 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  eventDate: { fontSize: 13, color: '#888', marginTop: 2 },
  eventLocation: { fontSize: 13, color: '#888', marginTop: 2 },
  eventLockIcon: { marginLeft: 10 },
  cancelButton: {
    backgroundColor: '#222',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cancelButtonText: { color: '#E6B012', fontSize: 16, fontWeight: 'bold', letterSpacing: 1  },
  iconText: { fontSize: 20, color: '#222', marginLeft: 10, marginRight: 0, textAlignVertical: 'center' },
});

export default EventListingScreen; 