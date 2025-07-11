import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  loadDialoguesFromJson,
  loadDialoguesFromDatabase,
  toggleDialogueFavorite,
  deleteDialogue,
  searchDialogues,
  getFavoriteDialogues,
  setSearchQuery,
  toggleShowFavoritesOnly,
  clearSearch,
  clearError,
  DialogueStateItem
} from '../store/slices/dialogueSlice';
import { DialogueData } from '../models/Dialogue';

export class DialogueViewModel {
  private dispatch: any;
  private dialoguesState: any;

  constructor(dispatch: any, dialoguesState: any) {
    this.dispatch = dispatch;
    this.dialoguesState = dialoguesState;
  }

  // Getters for state
  get dialogues(): DialogueStateItem[] {
    return this.dialoguesState.filteredDialogues;
  }

  get allDialogues(): DialogueStateItem[] {
    return this.dialoguesState.dialogues;
  }

  get favoriteDialogues(): DialogueStateItem[] {
    return this.dialoguesState.favoriteDialogues;
  }

  get isLoading(): boolean {
    return this.dialoguesState.isLoading;
  }

  get isSearching(): boolean {
    return this.dialoguesState.isSearching;
  }

  get error(): string | null {
    return this.dialoguesState.error;
  }

  get searchQuery(): string {
    return this.dialoguesState.searchQuery;
  }

  get showFavoritesOnly(): boolean {
    return this.dialoguesState.showFavoritesOnly;
  }

  get totalDialoguesCount(): number {
    return this.dialoguesState.dialogues.length;
  }

  get favoriteDialoguesCount(): number {
    return this.dialoguesState.favoriteDialogues.length;
  }

  // Actions
  async loadDialoguesFromJson(dialoguesData: DialogueData[]): Promise<void> {
    try {
      await this.dispatch(loadDialoguesFromJson(dialoguesData)).unwrap();
    } catch (error) {
      console.error('Failed to load dialogues from JSON:', error);
      throw error;
    }
  }

  async loadDialoguesFromDatabase(): Promise<void> {
    try {
      await this.dispatch(loadDialoguesFromDatabase()).unwrap();
    } catch (error) {
      console.error('Failed to load dialogues from database:', error);
      throw error;
    }
  }

  async toggleFavorite(imdbId: string): Promise<void> {
    try {
      await this.dispatch(toggleDialogueFavorite(imdbId)).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      throw error;
    }
  }

  async deleteDialogue(imdbId: string): Promise<void> {
    try {
      await this.dispatch(deleteDialogue(imdbId)).unwrap();
    } catch (error) {
      console.error('Failed to delete dialogue:', error);
      throw error;
    }
  }

  async searchDialogues(query: string): Promise<void> {
    try {
      await this.dispatch(searchDialogues(query)).unwrap();
    } catch (error) {
      console.error('Failed to search dialogues:', error);
      throw error;
    }
  }

  async getFavoriteDialogues(): Promise<void> {
    try {
      await this.dispatch(getFavoriteDialogues()).unwrap();
    } catch (error) {
      console.error('Failed to get favorite dialogues:', error);
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
  getDialogueById(imdbId: string): DialogueStateItem | undefined {
    return this.dialoguesState.dialogues.find((dialogue: DialogueStateItem) => dialogue.imdbId === imdbId);
  }

  isDialogueFavorite(imdbId: string): boolean {
    const dialogue = this.getDialogueById(imdbId);
    return dialogue?.isFavorite || false;
  }

  getDialoguesByGenre(genre: string): DialogueStateItem[] {
    return this.dialoguesState.dialogues.filter((dialogue: DialogueStateItem) => 
      dialogue.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
  }

  getDialoguesByYear(year: string): DialogueStateItem[] {
    return this.dialoguesState.dialogues.filter((dialogue: DialogueStateItem) => 
      dialogue.year === year
    );
  }

  getAvailableGenres(): string[] {
    const genres = new Set<string>();
    this.dialoguesState.dialogues.forEach((dialogue: DialogueStateItem) => {
      dialogue.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }

  getAvailableYears(): string[] {
    const years = new Set<string>();
    this.dialoguesState.dialogues.forEach((dialogue: DialogueStateItem) => {
      if (dialogue.year) {
        years.add(dialogue.year);
      }
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }
}

// Hook to use the DialogueViewModel
export const useDialogueViewModel = (): DialogueViewModel => {
  const dispatch = useAppDispatch();
  const dialoguesState = useAppSelector((state: any) => state.dialogues);
  return new DialogueViewModel(dispatch, dialoguesState);
}; 