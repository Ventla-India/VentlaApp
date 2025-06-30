import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '.'; 

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailProps {
  route: ProductDetailRouteProp;
}

const { width } = Dimensions.get('window');

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    // Disable drawer swipe gesture
    navigation.getParent()?.setOptions({ swipeEnabled: false, headerShown: false });

    return () => {
      // Re-enable drawer swipe gesture when leaving
      navigation.getParent()?.setOptions({ swipeEnabled: true, headerShown: true });
    };
  }, [navigation]);

  console.log('ProductDetail route params:', route.params);
  
  // Check if product exists in route params
  if (!route.params || !route.params.product) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Error: No product data received</Text>
          <Text style={styles.description}>
            The product details could not be loaded. Please go back and try again.
          </Text>
        </View>
      </View>
    );
  }

  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.poster_url }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View> */}
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Movie ID:</Text>
            <Text style={styles.value}>{product.id}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Release Year:</Text>
            <Text style={styles.value}>{product.year}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About this Movie</Text>
          <Text style={styles.description}>
            This is a detailed view of the movie "{product.name}" released in {product.year}. 
            Here you can see additional information about the movie, including cast, director, 
            genre, and other details that would be available in the full dataset.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{product.year}</Text>
            <Text style={styles.statLabel}>Release Year</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Runtime (min)</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8.5</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductDetail; 