import { useState, useCallback } from 'react';
import { CategoryItem, InformationFolderState } from '../Interfaces/CategoryItem';
import { InformationFolderService } from '../services/InformationFolderService';

export class InformationFolderViewModel {
  private informationFolderService: InformationFolderService;

  constructor() {
    this.informationFolderService = new InformationFolderService();
  }

  useInformationFolderState() {
    const [state, setState] = useState<InformationFolderState>({
      folders: [],
      loading: true,
      error: null,
    });

    const setLoading = useCallback((loading: boolean) => {
      setState(prev => ({ ...prev, loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
      setState(prev => ({ ...prev, error }));
    }, []);

    const setFolders = useCallback((folders: CategoryItem[]) => {
      setState(prev => ({ ...prev, folders }));
    }, []);

    const updateState = useCallback((updates: Partial<InformationFolderState>) => {
      setState(prev => ({ ...prev, ...updates }));
    }, []);

    return {
      state,
      setLoading,
      setError,
      setFolders,
      updateState,
    };
  }

  async loadFolders(): Promise<CategoryItem[]> {
    try {
      const folders = await this.informationFolderService.getAllFolders();
      return folders;
    } catch (error) {
      console.error('Error loading folders:', error);
      throw error;
    }
  }

  async saveFolders(folders: CategoryItem[]): Promise<void> {
    try {
      await this.informationFolderService.saveFolders(folders);
    } catch (error) {
      console.error('Error saving folders:', error);
      throw error;
    }
  }
} 