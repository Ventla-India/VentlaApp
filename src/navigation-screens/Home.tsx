import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, Image } from 'react-native';
import data from '../assets/data.json';
import GenericFlatList from '../components/GenericFlatList';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '.'; // Adjust path as needed

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const BATCH_SIZE = 20;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(BATCH_SIZE);
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const getData = (startIndex: number, endIndex: number) => {
    return data.slice(startIndex, endIndex).map(item => ({
      id: item._id,
      name: item.name,
      year: item.year,
      poster_url: item.poster_url
    }));
  };

  const loadInitialData = () => {
    try {
      const initialData = getData(0, BATCH_SIZE);
      setProducts(initialData);
      setHasMoreData(data.length > BATCH_SIZE);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data ');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (loadingMore || !hasMoreData) return;

    setLoadingMore(true);
    
    try {
      const nextBatch = getData(currentIndex, currentIndex + BATCH_SIZE);
      setProducts(prevProducts => [...prevProducts, ...nextBatch]);
      setCurrentIndex(prevIndex => prevIndex + BATCH_SIZE);
      setHasMoreData(currentIndex + BATCH_SIZE < data.length);
    } catch (error) {
      console.error('Error loading more data:', error);
      Alert.alert('Error', 'Failed to load more data');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleDelete = (id: string) => {
    try {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      Alert.alert('Success', 'Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const handleItemPress = (item: any) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const renderItem = ({ item }: { item: any }) => (
    <ProductItem
      item={item}
      onDelete={handleDelete}
      onPress={handleItemPress}
    />
  );

  const ListHeaderComponent = () => (
    <View style={{ padding: 10, backgroundColor: '#e3f2fd', borderBottomWidth: 1, borderBottomColor: '#2196f3' }}>
      <Text style={{ color: '#1976d2', textAlign: 'center', fontWeight: 'bold' }}>
        Movies from data.json ({products.length} of {data.length} items)
      </Text>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>No data found.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <GenericFlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        loading={loading}
        loadingMore={loadingMore}
        hasMoreData={hasMoreData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Home;