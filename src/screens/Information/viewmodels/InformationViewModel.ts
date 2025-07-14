import { useState, useCallback } from 'react';
import {
  fetchCustomCategories,
  getLocalData,
  saveToLocal,
} from '../services/InformationService';
import { CategoryItem, InformationState } from '../Interfaces/CategoryItem';

export function useInformationViewModel() {
  const [state, setState] = useState<InformationState>({
    customCategoriesData: [],
    loading: true,
    error: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState((prev: InformationState) => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev: InformationState) => ({ ...prev, error }));
  }, []);

  const setCustomCategoriesData = useCallback((data: CategoryItem[]) => {
    setState((prev: InformationState) => ({ ...prev, customCategoriesData: data }));
  }, []);

  const updateState = useCallback((updates: Partial<InformationState>) => {
    setState((prev: InformationState) => ({ ...prev, ...updates }));
  }, []);

  // Use the new functional service methods
  const fetchCategories = async () => {
    try {
      const categories = await fetchCustomCategories();
      return categories;
    } catch (error) {
      throw error;
    }
  };

  const getLocal = async () => {
    try {
      const localData = await getLocalData();
      return localData;
    } catch (error) {
      throw error;
    }
  };

  const loadData = async () => {
    try {
      const localData = await getLocalData();
      if (localData.length > 0) {
        return localData;
      } else {
        return await fetchCustomCategories();
      }
    } catch (error) {
      try {
        return await getLocalData();
      } catch {
        return [];
      }
    }
  };

  const getFolderData = (categories: CategoryItem[]) => categories.slice(0, 4);
  const getTopLevelData = (categories: CategoryItem[]) => categories;

  return {
    state,
    setLoading,
    setError,
    setCustomCategoriesData,
    updateState,
    fetchCustomCategories: fetchCategories,
    getLocalData: getLocal,
    loadData,
    getFolderData,
    getTopLevelData,
    saveToLocal,
  };
} 