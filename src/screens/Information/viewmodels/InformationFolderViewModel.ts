import { useState, useCallback } from 'react';
import { CategoryItem, InformationFolderState } from '../Interfaces/CategoryItem';
import { InformationFolderService } from '../services/InformationFolderService';

const informationFolderService = new InformationFolderService();

export function useInformationFolderViewModel() {
  const [state, setState] = useState<InformationFolderState>({
    folders: [],
    loading: true,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev: InformationFolderState) => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev: InformationFolderState) => ({ ...prev, error }));
  }, []);

  const setFolders = useCallback((folders: CategoryItem[]) => {
    setState((prev: InformationFolderState) => ({ ...prev, folders }));
  }, []);

  const updateState = useCallback((updates: Partial<InformationFolderState>) => {
    setState((prev: InformationFolderState) => ({ ...prev, ...updates }));
  }, []);

  const loadFolders = async () => {
    try {
      const folders = await informationFolderService.getAllFolders();
      return folders;
    } catch (error) {
      console.error('Error loading folders:', error);
      throw error;
    }
  };

  

  return {
    state,
    setLoading,
    setError,
    setFolders,
    updateState,
    loadFolders,
  };
} 