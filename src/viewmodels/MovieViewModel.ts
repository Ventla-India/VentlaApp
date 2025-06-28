import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  loadMoviesFromJson,
  loadMoviesFromDatabase,
  toggleMovieFavorite,
  deleteMovie,
  searchMovies,
  getFavoriteMovies,
  setSearchQuery,
  toggleShowFavoritesOnly,
  clearSearch,
  clearError,
  MovieStateItem
} from '../store/slices/movieSlice';
import { MovieData } from '../models/Movie';

export class MovieViewModel {
  private dispatch: any;
  private moviesState: any;

  constructor(dispatch: any, moviesState: any) {
    this.dispatch = dispatch;
    this.moviesState = moviesState;
  }

  // Getters for state
  get movies(): MovieStateItem[] {
    return this.moviesState.filteredMovies;
  }

  get allMovies(): MovieStateItem[] {
    return this.moviesState.movies;
  }

  get favoriteMovies(): MovieStateItem[] {
    return this.moviesState.favoriteMovies;
  }

  get isLoading(): boolean {
    return this.moviesState.isLoading;
  }

  get isSearching(): boolean {
    return this.moviesState.isSearching;
  }

  get error(): string | null {
    return this.moviesState.error;
  }

  get searchQuery(): string {
    return this.moviesState.searchQuery;
  }

  get showFavoritesOnly(): boolean {
    return this.moviesState.showFavoritesOnly;
  }

  get totalMoviesCount(): number {
    return this.moviesState.movies.length;
  }

  get favoriteMoviesCount(): number {
    return this.moviesState.favoriteMovies.length;
  }

  // Actions
  async loadMoviesFromJson(moviesData: MovieData[]): Promise<void> {
    try {
      await this.dispatch(loadMoviesFromJson(moviesData)).unwrap();
    } catch (error) {
      console.error('Failed to load movies from JSON:', error);
      throw error;
    }
  }

  async loadMoviesFromDatabase(): Promise<void> {
    try {
      await this.dispatch(loadMoviesFromDatabase()).unwrap();
    } catch (error) {
      console.error('Failed to load movies from database:', error);
      throw error;
    }
  }

  async toggleFavorite(imdbId: string): Promise<void> {
    try {
      await this.dispatch(toggleMovieFavorite(imdbId)).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      throw error;
    }
  }

  async deleteMovie(imdbId: string): Promise<void> {
    try {
      await this.dispatch(deleteMovie(imdbId)).unwrap();
    } catch (error) {
      console.error('Failed to delete movie:', error);
      throw error;
    }
  }

  async searchMovies(query: string): Promise<void> {
    try {
      await this.dispatch(searchMovies(query)).unwrap();
    } catch (error) {
      console.error('Failed to search movies:', error);
      throw error;
    }
  }

  async getFavoriteMovies(): Promise<void> {
    try {
      await this.dispatch(getFavoriteMovies()).unwrap();
    } catch (error) {
      console.error('Failed to get favorite movies:', error);
      throw error;
    }
  }

  setSearchQuery(query: string): void {
    this.dispatch(setSearchQuery(query));
  }

  toggleShowFavoritesOnly(): void {
    this.dispatch(toggleShowFavoritesOnly());
  }

  clearSearch(): void {
    this.dispatch(clearSearch());
  }

  clearError(): void {
    this.dispatch(clearError());
  }

  // Helper methods
  getMovieById(imdbId: string): MovieStateItem | undefined {
    return this.moviesState.movies.find((movie: MovieStateItem) => movie.imdbId === imdbId);
  }

  isMovieFavorite(imdbId: string): boolean {
    const movie = this.getMovieById(imdbId);
    return movie?.isFavorite || false;
  }

  getMoviesByGenre(genre: string): MovieStateItem[] {
    return this.moviesState.movies.filter((movie: MovieStateItem) => 
      movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
  }

  getMoviesByYear(year: string): MovieStateItem[] {
    return this.moviesState.movies.filter((movie: MovieStateItem) => 
      movie.year === year
    );
  }

  getAvailableGenres(): string[] {
    const genres = new Set<string>();
    this.moviesState.movies.forEach((movie: MovieStateItem) => {
      movie.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }

  getAvailableYears(): string[] {
    const years = new Set<string>();
    this.moviesState.movies.forEach((movie: MovieStateItem) => {
      if (movie.year) {
        years.add(movie.year);
      }
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }
}

// Hook to use the MovieViewModel
export const useMovieViewModel = (): MovieViewModel => {
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state: any) => state.movies);
  return new MovieViewModel(dispatch, moviesState);
}; 