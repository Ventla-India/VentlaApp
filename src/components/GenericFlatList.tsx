import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

interface GenericFlatListProps {
  data: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
  keyExtractor: (item: any) => string;
  loading?: boolean;
  loadingMore?: boolean;
  hasMoreData?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement;
  contentContainerStyle?: any;
  style?: any;
}

const GenericFlatList: React.FC<GenericFlatListProps> = ({
  data,
  renderItem,
  keyExtractor,
  loading = false,
  loadingMore = false,
  hasMoreData = false,
  onEndReached,
  onEndReachedThreshold = 0.1,
  ListEmptyComponent,
  ListHeaderComponent,
  contentContainerStyle,
  style
}) => {
  const renderFooter = () => {
    if (!hasMoreData) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>No more data to load</Text>
        </View>
      );
    }

    if (loadingMore) {
      return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#2196f3" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading more...</Text>
        </View>
      );
    }

    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#2196f3" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading more...</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={{ marginTop: 10 }}>Loading data...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      contentContainerStyle={contentContainerStyle}
      style={style}
    />
  );
};

export default GenericFlatList; 