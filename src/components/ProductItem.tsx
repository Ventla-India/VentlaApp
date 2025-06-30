import React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

interface ProductItemProps {
  item: {
    id: string;
    name: string;
    year: string;
    poster_url: string;
  };
  onDelete: (id: string) => void;
  onPress: (item: any) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onDelete, onPress }) => {
  return (
    <TouchableOpacity 
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row' }}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.poster_url }} 
        style={{ 
          width: 80, 
          height: 120, 
          borderRadius: 8,
          marginRight: 16,
          backgroundColor: '#f0f0f0'
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{item.name}</Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 2 }}>ID: {item.id}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}>Year: {item.year}</Text>
        </View>
        <Button 
          title="Delete" 
          onPress={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }} 
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem; 