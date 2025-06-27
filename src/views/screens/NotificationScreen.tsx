import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import NotificationViewModel from '../../viewmodels/NotificationViewModel';

const NotificationScreen: React.FC = observer(() => {
  const { notifications, isLoading, error } = NotificationViewModel;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications ({notifications.length})</Text>
      
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationBody}>{item.body}</Text>
              <Text style={styles.notificationTime}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No notifications</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});

export default NotificationScreen; 