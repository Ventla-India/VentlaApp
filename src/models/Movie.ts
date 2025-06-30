import Realm from 'realm';

export class Movie extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Movie',
    primaryKey: 'imdbId',
    properties: {
      imdbId: 'string',
      name: 'string',
      posterUrl: 'string?',
      year: 'string?',
      certificate: 'string?',
      runtime: 'string?',
      genre: 'string[]',
      ratingValue: 'string?',
      summaryText: 'string?',
      ratingCount: 'string?',
      director: 'Director?',
      cast: 'Cast[]',
      isFavorite: { type: 'bool', default: false },
      createdAt: { type: 'date', default: new Date() },
      updatedAt: { type: 'date', default: new Date() }
    }
  };
}

export class Director extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Director',
    properties: {
      name: 'string',
      nameId: 'string'
    }
  };
}

export class Cast extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Cast',
    properties: {
      name: 'string',
      nameId: 'string'
    }
  };
}

export interface MovieData {
  ImdbId: string;
  _id: string;
  name: string;
  poster_url: string;
  year: string;
  certificate: string;
  runtime: string;
  genre: string[];
  ratingValue: string;
  summary_text: string;
  ratingCount: string;
  director: {
    name: string;
    name_id: string;
  };
  cast: Array<{
    name: string;
    name_id: string;
  }>;
} 