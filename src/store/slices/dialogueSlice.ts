import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Dialogue } from '../../models/Dialogue';
import DatabaseService from '../../services/DatabaseService';
import { DialogueData } from '../../models/Dialogue';

// Interface for Dialogue objects in Redux state (serializable)
export interface DialogueStateItem {
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

// Helper function to convert Realm Dialogue to DialogueStateItem
const convertDialogueToStateItem = (dialogue: Dialogue): DialogueStateItem => ({
  imdbId: (dialogue as any).imdbId,
  name: (dialogue as any).name,
  posterUrl: (dialogue as any).posterUrl,
  year: (dialogue as any).year,
  certificate: (dialogue as any).certificate,
  runtime: (dialogue as any).runtime,
  genre: Array.isArray((dialogue as any).genre) ? Array.from((dialogue as any).genre) : [],
  ratingValue: (dialogue as any).ratingValue,
  summaryText: (dialogue as any).summaryText,
  ratingCount: (dialogue as any).ratingCount,
  director: (dialogue as any).director ? {
    name: (dialogue as any).director.name,
    nameId: (dialogue as any).director.nameId
  } : undefined,
  cast: Array.isArray((dialogue as any).cast) ? (dialogue as any).cast.map((castMember: any) => ({
    name: castMember.name,
    nameId: castMember.nameId
  })) : [],
  isFavorite: (dialogue as any).isFavorite,
  createdAt: (dialogue as any).createdAt ? (dialogue as any).createdAt.toISOString() : null,
  updatedAt: (dialogue as any).updatedAt ? (dialogue as any).updatedAt.toISOString() : null,
});

// Async thunks
export const loadDialoguesFromJson = createAsyncThunk(
  'dialogues/loadFromJson',
  async (dialoguesData: DialogueData[]) => {
    await DatabaseService.saveDialogues(dialoguesData);
    const dialogues = await DatabaseService.getAllDialogues();
    return dialogues.map(convertDialogueToStateItem);
  }
);

export const loadDialoguesFromDatabase = createAsyncThunk(
  'dialogues/loadFromDatabase',
  async () => {
    const dialogues = await DatabaseService.getAllDialogues();
    return dialogues.map(convertDialogueToStateItem);
  }
);

export const toggleDialogueFavorite = createAsyncThunk(
  'dialogues/toggleFavorite',
  async (imdbId: string) => {
    await DatabaseService.toggleFavorite(imdbId);
    const dialogue = await DatabaseService.getDialogueById(imdbId);
    return { imdbId, isFavorite: (dialogue as any)?.isFavorite || false };
  }
);

export const deleteDialogue = createAsyncThunk(
  'dialogues/delete',
  async (imdbId: string) => {
    await DatabaseService.deleteDialogue(imdbId);
    return imdbId;
  }
);

export const searchDialogues = createAsyncThunk(
  'dialogues/search',
  async (query: string) => {
    const dialogues = await DatabaseService.searchDialogues(query);
    return { query, dialogues: dialogues.map(convertDialogueToStateItem) };
  }
);

export const getFavoriteDialogues = createAsyncThunk(
  'dialogues/getFavorites',
  async () => {
    const dialogues = await DatabaseService.getFavoriteDialogues();
    return dialogues.map(convertDialogueToStateItem);
  }
);

interface DialogueState {
  dialogues: DialogueStateItem[];
  filteredDialogues: DialogueStateItem[];
  favoriteDialogues: DialogueStateItem[];
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
  showFavoritesOnly: boolean;
}

const initialState: DialogueState = {
  dialogues: [],
  filteredDialogues: [],
  favoriteDialogues: [],
  isLoading: false,
  isSearching: false,
  error: null,
  searchQuery: '',
  showFavoritesOnly: false,
};

const dialogueSlice = createSlice({
  name: 'dialogues',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.filteredDialogues = state.showFavoritesOnly ? state.favoriteDialogues : state.dialogues;
      }
    },
    toggleShowFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      if (state.showFavoritesOnly) {
        state.filteredDialogues = state.favoriteDialogues;
      } else {
        state.filteredDialogues = state.searchQuery.trim() === '' ? state.dialogues : state.filteredDialogues;
      }
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredDialogues = state.showFavoritesOnly ? state.favoriteDialogues : state.dialogues;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load dialogues from JSON
      .addCase(loadDialoguesFromJson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadDialoguesFromJson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dialogues = action.payload;
        state.filteredDialogues = action.payload;
        state.favoriteDialogues = action.payload.filter(dialogue => dialogue.isFavorite);
      })
      .addCase(loadDialoguesFromJson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load dialogues';
      })
      
      // Load dialogues from database
      .addCase(loadDialoguesFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadDialoguesFromDatabase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dialogues = action.payload;
        state.filteredDialogues = action.payload;
        state.favoriteDialogues = action.payload.filter(dialogue => dialogue.isFavorite);
      })
      .addCase(loadDialoguesFromDatabase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load dialogues';
      })
      
      // Toggle favorite
      .addCase(toggleDialogueFavorite.fulfilled, (state, action) => {
        const { imdbId, isFavorite } = action.payload;
        const dialogue = state.dialogues.find(d => d.imdbId === imdbId);
        if (dialogue) {
          dialogue.isFavorite = isFavorite;
        }
        
        // Update filtered dialogues
        const filteredDialogue = state.filteredDialogues.find(d => d.imdbId === imdbId);
        if (filteredDialogue) {
          filteredDialogue.isFavorite = isFavorite;
        }
        
        // Update favorite dialogues list
        state.favoriteDialogues = state.dialogues.filter(dialogue => dialogue.isFavorite);
        
        // Update filtered dialogues if showing favorites only
        if (state.showFavoritesOnly) {
          state.filteredDialogues = state.favoriteDialogues;
        }
      })
      
      // Delete dialogue
      .addCase(deleteDialogue.fulfilled, (state, action) => {
        const deletedImdbId = action.payload;
        state.dialogues = state.dialogues.filter(dialogue => dialogue.imdbId !== deletedImdbId);
        state.filteredDialogues = state.filteredDialogues.filter(dialogue => dialogue.imdbId !== deletedImdbId);
        state.favoriteDialogues = state.favoriteDialogues.filter(dialogue => dialogue.imdbId !== deletedImdbId);
      })
      
      // Search dialogues
      .addCase(searchDialogues.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchDialogues.fulfilled, (state, action) => {
        state.isSearching = false;
        const { query, dialogues } = action.payload;
        if (query.trim() === '') {
          state.filteredDialogues = state.showFavoritesOnly ? state.favoriteDialogues : state.dialogues;
        } else {
          state.filteredDialogues = dialogues;
        }
      })
      .addCase(searchDialogues.rejected, (state) => {
        state.isSearching = false;
      })
      
      // Get favorite dialogues
      .addCase(getFavoriteDialogues.fulfilled, (state, action) => {
        state.favoriteDialogues = action.payload;
        if (state.showFavoritesOnly) {
          state.filteredDialogues = action.payload;
        }
      });
  },
});

export const { clearError, setSearchQuery, toggleShowFavoritesOnly, clearSearch } = dialogueSlice.actions;
export default dialogueSlice.reducer; 