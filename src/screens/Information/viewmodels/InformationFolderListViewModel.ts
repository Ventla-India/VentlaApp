import { useState, useCallback } from 'react';
import { InformationFolderListService } from '../services/InformationFolderListService';
import { CategoryItem, InformationFolderListState } from '../Interfaces/CategoryItem';

export class InformationFolderListViewModel {
  private informationFolderListService: InformationFolderListService;

  constructor() {
    this.informationFolderListService = new InformationFolderListService();
  }

  useInformationFolderListState() {
    const [state, setState] = useState<InformationFolderListState>({
      folderItems: [],
      loading: true,
      error: null,
      selectedItem: null,
    });

    const setLoading = useCallback((loading: boolean) => {
      setState(prev => ({ ...prev, loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
      setState(prev => ({ ...prev, error }));
    }, []);

    const setFolderItems = useCallback((folderItems: CategoryItem[]) => {
      setState(prev => ({ ...prev, folderItems }));
    }, []);

    const setSelectedItem = useCallback((selectedItem: CategoryItem | null) => {
      setState(prev => ({ ...prev, selectedItem }));
    }, []);

    const updateState = useCallback((updates: Partial<InformationFolderListState>) => {
      setState(prev => ({ ...prev, ...updates }));
    }, []);

    return {
      state,
      setLoading,
      setError,
      setFolderItems,
      setSelectedItem,
      updateState,
    };
  }

  async loadFilteredItems(selectedItem: CategoryItem | null): Promise<CategoryItem[]> {
    try {
      const filteredItems = await this.informationFolderListService.getFilteredItems(selectedItem);
      return filteredItems;
    } catch (error) {
      console.error('Error loading filtered items:', error);
      throw error;
    }
  }

  async getAllItems(): Promise<CategoryItem[]> {
    try {
      const allItems = await this.informationFolderListService.getAllItems();
      return allItems;
    } catch (error) {
      console.error('Error loading all items:', error);
      throw error;
    }
  }
} 