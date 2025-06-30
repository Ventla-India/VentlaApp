import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMovieViewModel } from '../../viewmodels/MovieViewModel';
import { MovieStateItem } from '../../store/slices/movieSlice';
import { COLORS } from '../../constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Toast from '../../components/common/Toast';
import useLocalization from '../../hooks/useLocalization';

const MovieListScreen: React.FC = () => {
  const { t } = useLocalization();
  const viewModel = useMovieViewModel();
  const [refreshing, setRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await viewModel.loadMoviesFromDatabase();
      if (viewModel.totalMoviesCount === 0) {
        // Load from JSON if database is empty
        const bulkData = require('../../../bulk_data.json');
        await viewModel.loadMoviesFromJson(bulkData);
        showToastMessage('Movies loaded successfully', 'success');
      }
    } catch (error) {
      showToastMessage('Failed to load movies', 'error');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await viewModel.loadMoviesFromDatabase();
      showToastMessage('Movies refreshed', 'success');
    } catch (error) {
      showToastMessage('Failed to refresh movies', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleToggleFavorite = async (imdbId: string) => {
    try {
      await viewModel.toggleFavorite(imdbId);
      const isFavorite = viewModel.isMovieFavorite(imdbId);
      showToastMessage(
        isFavorite ? 'Added to favorites' : 'Removed from favorites',
        'success'
      );
    } catch (error) {
      showToastMessage('Failed to update favorite status', 'error');
    }
  };

  const handleDeleteMovie = (movie: MovieStateItem) => {
    Alert.alert(
      'Delete Movie',
      `Are you sure you want to delete "${movie.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await viewModel.deleteMovie(movie.imdbId);
              showToastMessage('Movie deleted successfully', 'success');
            } catch (error) {
              showToastMessage('Failed to delete movie', 'error');
            }
          },
        },
      ]
    );
  };

  const handleSearch = async (query: string) => {
    viewModel.setSearchQuery(query);
    if (query.trim()) {
      await viewModel.searchMovies(query);
    }
  };

  const renderMovieItem = ({ item }: { item: MovieStateItem }) => (
    <View style={styles.movieItem}>
      <View style={styles.movieHeader}>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.movieYear}>
            {item.year || 'N/A'}{item.runtime ? ` • ${item.runtime}` : ''}
          </Text>
          {item.director && (
            <Text style={styles.movieDirector}>
              Director: {item.director.name}
            </Text>
          )}
        </View>
        <View style={styles.movieActions}>
          <TouchableOpacity
            style={[styles.actionButton, item.isFavorite && styles.favoriteButton]}
            onPress={() => handleToggleFavorite(item.imdbId)}
          >
            <Icon
              name={item.isFavorite ? 'favorite' : 'favorite-border'}
              size={28}
              color={item.isFavorite ? COLORS.ERROR : COLORS.PRIMARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteMovie(item)}
          >
            <Icon name="delete" size={28} color={COLORS.ERROR} />
          </TouchableOpacity>
        </View>
      </View>
      
      {item.summaryText && (
        <Text style={styles.movieSummary} numberOfLines={3}>
          {item.summaryText}
        </Text>
      )}
      
      {item.genre.length > 0 && (
        <View style={styles.genreContainer}>
          {item.genre.slice(0, 3).map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
          {item.genre.length > 3 && (
            <Text style={styles.moreGenres}>+{item.genre.length - 3} more</Text>
          )}
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="movie" size={64} color={COLORS.LIGHT.TEXT_SECONDARY} />
      <Text style={styles.emptyStateText}>
        {viewModel.isLoading ? 'Loading movies...' : 'No movies found'}
      </Text>
      {!viewModel.isLoading && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={22} color={COLORS.PRIMARY} style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor={COLORS.LIGHT.TEXT_SECONDARY}
          value={viewModel.searchQuery}
          onChangeText={handleSearch}
        />
        {viewModel.searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => viewModel.clearSearch()}>
            <Icon name="clear" size={20} color={COLORS.ERROR} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, viewModel.showFavoritesOnly && styles.activeFilterButton]}
          onPress={() => viewModel.toggleShowFavoritesOnly()}
        >
          <Icon
            name="favorite"
            size={16}
            color={viewModel.showFavoritesOnly ? '#FFFFFF' : COLORS.PRIMARY}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.filterButtonText, viewModel.showFavoritesOnly && styles.activeFilterButtonText]}>
            Favorites ({viewModel.favoriteMoviesCount})
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Showing {viewModel.movies.length} of {viewModel.totalMoviesCount} movies
        </Text>
      </View>
    </View>
  );

  if (viewModel.isLoading && viewModel.totalMoviesCount === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={viewModel.movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.imdbId}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onHide={() => setShowToast(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT.BACKGROUND,
  },
  listContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.SURFACE,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.LIGHT.TEXT,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  statsContainer: {
    marginBottom: 8,
  },
  statsText: {
    fontSize: 12,
    color: COLORS.LIGHT.TEXT_SECONDARY,
  },
  movieItem: {
    backgroundColor: COLORS.LIGHT.SURFACE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  movieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  movieInfo: {
    flex: 1,
    marginRight: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.LIGHT.TEXT,
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 14,
    color: COLORS.LIGHT.TEXT_SECONDARY,
    marginBottom: 2,
  },
  movieDirector: {
    fontSize: 14,
    color: COLORS.LIGHT.TEXT_SECONDARY,
  },
  movieActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    borderRadius: 20,
  },
  movieSummary: {
    fontSize: 14,
    color: COLORS.LIGHT.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  genreTag: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  moreGenres: {
    fontSize: 12,
    color: COLORS.LIGHT.TEXT_SECONDARY,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.LIGHT.TEXT_SECONDARY,
    marginTop: 16,
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MovieListScreen; 