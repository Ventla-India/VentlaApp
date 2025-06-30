import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const conversations = [
  { initials: 'RJ', name: 'Regina Jones', message: 'The class has open enrollment until th...', time: '4:51 PM' },
  { initials: 'AS', name: 'Adelle Schantini', message: 'Yes definitely!', time: '4:51 PM' },
  { initials: 'CM', name: 'Craig Marola', message: 'Thanks for the update.', time: '4:51 PM' },
  { initials: 'EG', name: 'Evangelina Gius', message: 'See you tomorrow.', time: '4:51 PM' },
];

export default function Messaging() {
  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>
      <View style={styles.messageBlock}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity><Text style={styles.tabActive}>DMs</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.tab}>EVENT CHAT</Text></TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* List */}
      <FlatList
        data={conversations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6200EE',
    paddingVertical: 15,
  },
  tab: { color: 'white', fontSize: 16, opacity: 0.7 },
  tabActive: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  divider: { height: 2, backgroundColor: 'white', marginBottom: 5, marginHorizontal: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  avatar: {
    backgroundColor: '#ddd',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontWeight: 'bold', color: '#333' },
  messageBlock: { flex: 1, marginLeft: 10 },
  name: { fontWeight: 'bold', fontSize: 14 },
  message: { color: '#666', fontSize: 13 },
  time: { color: '#666', fontSize: 12 },
});
