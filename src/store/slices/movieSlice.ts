import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../models/Movie';
import DatabaseService from '../../services/DatabaseService';
import { MovieData } from '../../models/Movie';

// Interface for Movie objects in Redux state (serializable)
export interface MovieStateItem {
  imdbId: string;
  name: string;
  posterUrl?: string;
  year?: string;
  certificate?: string;
  runtime?: string;
  genre: string[];
  ratingValue?: string;
  summaryText?: string;
  ratingCount?: string;
  director?: {
    name: string;
    nameId: string;
  };
  cast: Array<{
    name: string;
    nameId: string;
  }>;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to convert Realm Movie to MovieStateItem
const convertMovieToStateItem = (movie: Movie): MovieStateItem => ({
  imdbId: (movie as any).imdbId,
  name: (movie as any).name,
  posterUrl: (movie as any).posterUrl,
  year: (movie as any).year,
  certificate: (movie as any).certificate,
  runtime: (movie as any).runtime,
  genre: Array.isArray((movie as any).genre) ? Array.from((movie as any).genre) : [],
  ratingValue: (movie as any).ratingValue,
  summaryText: (movie as any).summaryText,
  ratingCount: (movie as any).ratingCount,
  director: (movie as any).director ? {
    name: (movie as any).director.name,
    nameId: (movie as any).director.nameId
  } : undefined,
  cast: Array.isArray((movie as any).cast) ? (movie as any).cast.map((castMember: any) => ({
    name: castMember.name,
    nameId: castMember.nameId
  })) : [],
  isFavorite: (movie as any).isFavorite,
  createdAt: (movie as any).createdAt ? (movie as any).createdAt.toISOString() : null,
  updatedAt: (movie as any).updatedAt ? (movie as any).updatedAt.toISOString() : null,
});

// Async thunks
export const loadMoviesFromJson = createAsyncThunk(
  'movies/loadFromJson',
  async (moviesData: MovieData[]) => {
    await DatabaseService.saveMovies(moviesData);
    const movies = await DatabaseService.getAllMovies();
    return movies.map(convertMovieToStateItem);
  }
);

export const loadMoviesFromDatabase = createAsyncThunk(
  'movies/loadFromDatabase',
  async () => {
    const movies = await DatabaseService.getAllMovies();
    return movies.map(convertMovieToStateItem);
  }
);

export const toggleMovieFavorite = createAsyncThunk(
  'movies/toggleFavorite',
  async (imdbId: string) => {
    await DatabaseService.toggleFavorite(imdbId);
    const movie = await DatabaseService.getMovieById(imdbId);
    return { imdbId, isFavorite: (movie as any)?.isFavorite || false };
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/delete',
  async (imdbId: string) => {
    await DatabaseService.deleteMovie(imdbId);
    return imdbId;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query: string) => {
    const movies = await DatabaseService.searchMovies(query);
    return { query, movies: movies.map(convertMovieToStateItem) };
  }
);

export const getFavoriteMovies = createAsyncThunk(
  'movies/getFavorites',
  async () => {
    const movies = await DatabaseService.getFavoriteMovies();
    return movies.map(convertMovieToStateItem);
  }
);

interface MovieState {
  movies: MovieStateItem[];
  filteredMovies: MovieStateItem[];
  favoriteMovies: MovieStateItem[];
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
  showFavoritesOnly: boolean;
}

const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  favoriteMovies: [],
  isLoading: false,
  isSearching: false,
  error: null,
  searchQuery: '',
  showFavoritesOnly: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.filteredMovies = state.showFavoritesOnly ? state.favoriteMovies : state.movies;
      }
    },
    toggleShowFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      if (state.showFavoritesOnly) {
        state.filteredMovies = state.favoriteMovies;
      } else {
        state.filteredMovies = state.searchQuery.trim() === '' ? state.movies : state.filteredMovies;
      }
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredMovies = state.showFavoritesOnly ? state.favoriteMovies : state.movies;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load movies from JSON
      .addCase(loadMoviesFromJson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMoviesFromJson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload;
        state.favoriteMovies = action.payload.filter(movie => movie.isFavorite);
      })
      .addCase(loadMoviesFromJson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load movies';
      })
      
      // Load movies from database
      .addCase(loadMoviesFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMoviesFromDatabase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload;
        state.favoriteMovies = action.payload.filter(movie => movie.isFavorite);
      })
      .addCase(loadMoviesFromDatabase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load movies';
      })
      
      // Toggle favorite
      .addCase(toggleMovieFavorite.fulfilled, (state, action) => {
        const { imdbId, isFavorite } = action.payload;
        const movie = state.movies.find(m => m.imdbId === imdbId);
        if (movie) {
          movie.isFavorite = isFavorite;
        }
        
        // Update filtered movies
        const filteredMovie = state.filteredMovies.find(m => m.imdbId === imdbId);
        if (filteredMovie) {
          filteredMovie.isFavorite = isFavorite;
        }
        
        // Update favorite movies list
        state.favoriteMovies = state.movies.filter(movie => movie.isFavorite);
        
        // Update filtered movies if showing favorites only
        if (state.showFavoritesOnly) {
          state.filteredMovies = state.favoriteMovies;
        }
      })
      
      // Delete movie
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const deletedImdbId = action.payload;
        state.movies = state.movies.filter(movie => movie.imdbId !== deletedImdbId);
        state.filteredMovies = state.filteredMovies.filter(movie => movie.imdbId !== deletedImdbId);
        state.favoriteMovies = state.favoriteMovies.filter(movie => movie.imdbId !== deletedImdbId);
      })
      
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isSearching = false;
        const { query, movies } = action.payload;
        if (query.trim() === '') {
          state.filteredMovies = state.showFavoritesOnly ? state.favoriteMovies : state.movies;
        } else {
          state.filteredMovies = movies;
        }
      })
      .addCase(searchMovies.rejected, (state) => {
        state.isSearching = false;
      })
      
      // Get favorite movies
      .addCase(getFavoriteMovies.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload;
        if (state.showFavoritesOnly) {
          state.filteredMovies = action.payload;
        }
      });
  },
});

export const { clearError, setSearchQuery, toggleShowFavoritesOnly, clearSearch } = movieSlice.actions;
export default movieSlice.reducer; 