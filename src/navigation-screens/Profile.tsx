import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfile() {
  return (
    <View style={{ flex: 1 }}>
      {/* Top Purple Header */}
     

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={styles.plusOverlay}>
            <Icon name="plus" size={14} color="#000" />
          </View>
        </View>

        {/* General Info */}
        <Text style={styles.sectionTitle}>GENERAL</Text>
        <TextInput style={styles.input} placeholder="Amrinder" />
        <TextInput style={styles.input} placeholder="Singh" />
        <TextInput style={styles.input} placeholder="Company" />
        <TextInput style={styles.input} placeholder="Title" />
        <TextInput
          style={styles.input}
          placeholder="amrinder.d@ventla.io"
          keyboardType="email-address"
        />
        <TextInput style={styles.input} placeholder="Website" />
        <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" />

        {/* Social Media */}
        <Text style={styles.sectionTitle}>SOCIAL MEDIA</Text>
        <TextInput style={styles.input} placeholder="LinkedIn Profile Link" />

        {/* Policy Text */}
        <Text style={styles.policyText}>
          Your personal information is stored and processed according to the{' '}
          <Text style={styles.link}>privacy policy</Text>.
        </Text>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton}>
          <Icon name="check-circle" color="#fff" size={20} />
          <Text style={styles.updateButtonText}>UPDATE</Text>
        </TouchableOpacity>

        {/* Remove Account */}
        <Text style={styles.removeText}>
          Want to <Text style={styles.link}>remove your account?</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#800080',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkedinIcon: { width: 30, height: 30, resizeMode: 'contain' },

  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
  },
  plusOverlay: {
    position: 'absolute',
    bottom: 2,
    right: '35%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    color: '#111',
  },

  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  policyText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginVertical: 15,
  },

  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },

  updateButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 999,
    marginVertical: 10,
  },

  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },

  removeText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#444',
  },
});
