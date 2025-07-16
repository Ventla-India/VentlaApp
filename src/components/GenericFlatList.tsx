import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { GenericFlatListProps } from './ComponentsInterface';

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
  ListFooterComponent,
  contentContainerStyle,
  style,
  horizontal = false,
  pagingEnabled = false,
  showsHorizontalScrollIndicator = true,
  showsVerticalScrollIndicator = true,
  numColumns,
  viewabilityConfig,
  onViewableItemsChanged,
}) => {
  const renderFooter = () => {
    if (ListFooterComponent) return ListFooterComponent;
    if (!hasMoreData) {
      return null; // Don't show anything when there's no more data
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

  const getFooter = () => {
    if (ListFooterComponent) {
      // If it's a valid React element, return as is
      if (React.isValidElement(ListFooterComponent)) return ListFooterComponent;
      // If it's a component, wrap in a function
      return () => React.createElement(ListFooterComponent);
    }
    return renderFooter();
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
      ListFooterComponent={getFooter()}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      contentContainerStyle={contentContainerStyle}
      style={style}
      horizontal={horizontal}
      pagingEnabled={pagingEnabled}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      numColumns={numColumns}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default GenericFlatList; 