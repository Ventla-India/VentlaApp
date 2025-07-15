import { useState, useCallback } from 'react';
import { getFolderListItems } from '../services/InformationFolderListService';
import { CategoryItem, InformationFolderListState } from '../Interfaces/CategoryItem';

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

  const loadFolderListItems = async (selectedItem?: CategoryItem | null) => {
    try {
      const items = await getFolderListItems(selectedItem);
      return items;
    } catch (error) {
      console.error('Error loading items:', error);
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
    loadFolderListItems,
  };
} 