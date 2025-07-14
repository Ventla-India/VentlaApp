import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { InformationService } from '../services/InformationService';
import { CategoryItem, InformationState } from '../Interfaces/CategoryItem';

export class InformationViewModel {
  private informationService: InformationService;

  constructor() {
    this.informationService = new InformationService();
  }

  useInformationState() {
    const [state, setState] = useState<InformationState>({
      customCategoriesData: [],
      loading: true,
      error: null,
    });

    const setLoading = useCallback((loading: boolean) => {
      setState(prev => ({ ...prev, loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
      setState(prev => ({ ...prev, error }));
    }, []);

    const setCustomCategoriesData = useCallback((data: CategoryItem[]) => {
      setState(prev => ({ ...prev, customCategoriesData: data }));
    }, []);

    const updateState = useCallback((updates: Partial<InformationState>) => {
      setState(prev => ({ ...prev, ...updates }));
    }, []);

    return {
      state,
      setLoading,
      setError,
      setCustomCategoriesData,
      updateState,
    };
  }

  async fetchCustomCategories(): Promise<CategoryItem[]> {
    try {
      const categories = await this.informationService.fetchCustomCategories();
      Alert.alert('Success', 'Categories saved to local database.');
      return categories;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }

  async getLocalData(): Promise<CategoryItem[]> {
    try {
      const localData = await this.informationService.getLocalData();
      if (localData.length > 0) {
        Alert.alert('Offline', 'Showing data from local database.');
        return localData;
      } else {
        Alert.alert('No data', 'No offline data available.');
        return [];
      }
    } catch (error) {
      console.error('Realm read failed:', error);
      Alert.alert('Error', 'Unable to load any data.');
      throw error;
    }
  }

  async loadData(): Promise<CategoryItem[]> {
    try {
      // Try to get local data first
      const localData = await this.informationService.getLocalData();

      if (localData.length > 0) {
        return localData;
      } else {
        // If no local data, fetch from API
        return await this.fetchCustomCategories();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Try to get offline data as fallback
      try {
        return await this.informationService.getLocalData();
      } catch (fallbackError) {
        console.error('Fallback data load failed:', fallbackError);
        return [];
      }
    }
  }

  getFolderData(categories: CategoryItem[]): CategoryItem[] {
    console.log('Total categories:', categories.length);
    if (categories.length > 0) {
      const folderData = categories.slice(0, 4); // Show more folders in grid layout
      console.log('Folder data:', folderData.length);
      return folderData;
    } else {
      return [];
    }
  }

  getTopLevelData(categories: CategoryItem[]): CategoryItem[] {
    if (categories.length > 0) {
      return categories;
    } else {
      return [];
    }
  }
} 