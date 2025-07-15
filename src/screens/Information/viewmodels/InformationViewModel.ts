import { useState, useCallback } from 'react';
import {
  fetchCustomCategories,
  getLocalData,
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

      console.log(categories, '========>>>>>>')
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

  const getFolderData = (categories: CategoryItem[]) => {
    const seen = new Set<number>();
    return categories.filter(item => {
      if (item.CategoryFolder && typeof item.CategoryFolder.Id === 'number') {
        if (!seen.has(item.CategoryFolder.Id)) {
          seen.add(item.CategoryFolder.Id);
          return true;
        }
        return false;
      }
      return false;
    });
  };

  const getTopLevelData = (categories: CategoryItem[]) => {
    return categories.filter(item => item.CategoryFolder === null);
  };

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
    getTopLevelData
  };
} 