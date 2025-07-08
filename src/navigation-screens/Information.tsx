import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example API endpoint

const InformationScreen = () => {
  const [data, setData] = useState([]);  // State to store the data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track errors

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data); // Set the data from the API
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set error message if something goes wrong
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []); // Empty dependency array to call it once when component mounts

  // Handle loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data} // Data to render
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15, padding: 10, borderWidth: 1, borderRadius: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default InformationScreen;
