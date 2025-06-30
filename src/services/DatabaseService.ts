import Realm from 'realm';
import { Movie, Director, Cast, MovieData } from '../models/Movie';

class DatabaseService {
  private realm: Realm | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized && this.realm) {
      return;
    }

    try {
      this.realm = await Realm.open({
        schema: [Movie, Director, Cast],
        schemaVersion: 1,
      });
      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async close() {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
      this.isInitialized = false;
    }
  }

  private getRealm(): Realm {
    if (!this.realm || !this.isInitialized) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.realm;
  }

  async saveMovies(moviesData: MovieData[]): Promise<void> {
    const realm = this.getRealm();
    
    realm.write(() => {
      moviesData.forEach(movieData => {
        // Create director only if it exists
        let director = null;
        if (movieData.director && movieData.director.name && movieData.director.name_id) {
          director = realm.create('Director', {
            name: movieData.director.name,
            nameId: movieData.director.name_id
          }, Realm.UpdateMode.Modified);
        }

        // Create cast members, handle missing or invalid cast
        const castArray = Array.isArray(movieData.cast) ? movieData.cast : [];
        const cast = castArray.map(castMember => 
          realm.create('Cast', {
            name: castMember.name,
            nameId: castMember.name_id
          }, Realm.UpdateMode.Modified)
        );

        // Create or update movie
        realm.create('Movie', {
          imdbId: movieData.ImdbId,
          name: movieData.name,
          posterUrl: movieData.poster_url,
          year: movieData.year,
          certificate: movieData.certificate,
          runtime: movieData.runtime,
          genre: movieData.genre,
          ratingValue: movieData.ratingValue,
          summaryText: movieData.summary_text,
          ratingCount: movieData.ratingCount,
          director: director,
          cast: cast,
          updatedAt: new Date()
        }, Realm.UpdateMode.Modified);
      });
    });
  }

  async getAllMovies(): Promise<Movie[]> {
    const realm = this.getRealm();
    return Array.from(realm.objects<Movie>('Movie').sorted('name'));
  }

  async getFavoriteMovies(): Promise<Movie[]> {
    const realm = this.getRealm();
    return Array.from(realm.objects<Movie>('Movie').filtered('isFavorite == true').sorted('name'));
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const realm = this.getRealm();
    const lowercaseQuery = query.toLowerCase();
    return Array.from(
      realm.objects<Movie>('Movie')
        .filtered('name CONTAINS[c] $0 OR director.name CONTAINS[c] $0', lowercaseQuery)
        .sorted('name')
    );
  }

  async toggleFavorite(imdbId: string): Promise<void> {
    const realm = this.getRealm();
    const movie = realm.objectForPrimaryKey('Movie', imdbId) as Movie | null;
    
    if (movie) {
      realm.write(() => {
        (movie as any).isFavorite = !(movie as any).isFavorite;
        (movie as any).updatedAt = new Date();
      });
    }
  }

  async getMovieById(imdbId: string): Promise<Movie | null> {
    const realm = this.getRealm();
    return realm.objectForPrimaryKey('Movie', imdbId) as Movie | null;
  }

  async deleteMovie(imdbId: string): Promise<void> {
    const realm = this.getRealm();
    const movie = realm.objectForPrimaryKey('Movie', imdbId) as Movie | null;
    
    if (movie) {
      realm.write(() => {
        realm.delete(movie);
      });
    }
  }

  async clearAllMovies(): Promise<void> {
    const realm = this.getRealm();
    realm.write(() => {
      realm.deleteAll();
    });
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    const realm = this.getRealm();
    return Array.from(
      realm.objects<Movie>('Movie')
        .filtered('ANY genre CONTAINS[c] $0', genre)
        .sorted('name')
    );
  }

  async getMoviesByYear(year: string): Promise<Movie[]> {
    const realm = this.getRealm();
    return Array.from(
      realm.objects<Movie>('Movie')
        .filtered('year == $0', year)
        .sorted('name')
    );
  }

  getIsInitialized(): boolean {
    return this.isInitialized;
  }
}

export default new DatabaseService(); 