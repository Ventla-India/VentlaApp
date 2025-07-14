import { useState, useCallback } from 'react';
import { InformationFolderListService } from '../services/InformationFolderListService';
import { CategoryItem, InformationFolderListState } from '../Interfaces/CategoryItem';

const informationFolderListService = new InformationFolderListService();

export function useInformationFolderListViewModel() {
  const [state, setState] = useState<InformationFolderListState>({
    folderItems: [],
    loading: true,
    error: null,
    selectedItem: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev: InformationFolderListState) => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev: InformationFolderListState) => ({ ...prev, error }));
  }, []);

  const setFolderItems = useCallback((folderItems: CategoryItem[]) => {
    setState((prev: InformationFolderListState) => ({ ...prev, folderItems }));
  }, []);

  const setSelectedItem = useCallback((selectedItem: CategoryItem | null) => {
    setState((prev: InformationFolderListState) => ({ ...prev, selectedItem }));
  }, []);

  const updateState = useCallback((updates: Partial<InformationFolderListState>) => {
    setState((prev: InformationFolderListState) => ({ ...prev, ...updates }));
  }, []);

  const loadFilteredItems = async (selectedItem: CategoryItem | null) => {
    try {
      const filteredItems = await informationFolderListService.getFilteredItems(selectedItem);
      return filteredItems;
    } catch (error) {
      console.error('Error loading filtered items:', error);
      throw error;
    }
  };

  const getAllItems = async () => {
    try {
      const allItems = await informationFolderListService.getAllItems();
      return allItems;
    } catch (error) {
      console.error('Error loading all items:', error);
      throw error;
    }
  };

  return {
    state,
    setLoading,
    setError,
    setFolderItems,
    setSelectedItem,
    updateState,
    loadFilteredItems,
    getAllItems,
  };
} 