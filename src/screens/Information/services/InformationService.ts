import { userDetail } from '../../../api/helper';
import GenericRealmService from '../../../realM/RealmService';
import { CustomCategorySchemas } from '../../../realM/schemas/CustomCategorySchemas';
import { CategoryItem, ApiResponse } from '../Interfaces/CategoryItem';

export class InformationService {
  private realmService: GenericRealmService<any>;

  constructor() {
    this.realmService = new GenericRealmService('CustomCategoryItem', CustomCategorySchemas);
  }

  async fetchCustomCategories(): Promise<CategoryItem[]> {
    const authToken = 'MzimX%2fZzu8qMs5QJQUrAWGDK%2fteOosomAW9inoG4rBoG8ggA3QhvPOtBoySSCnwFsvO7sq3mORQ%3d';

    try {
      const response: ApiResponse = await userDetail(authToken);
      const customCategories = response.data?.CustomCategoryItems || [];

      // Map CustomCategoryMedias and CustomCategoryLinks to arrays of strings
      const customCategoriesForRealm = customCategories.map((category: any) => ({
        ...category,
        CustomCategoryMedias: (category.CustomCategoryMedias || []).map((m: any) =>
          typeof m === 'string' ? m : JSON.stringify(m)
        ),
        CustomCategoryLinks: (category.CustomCategoryLinks || []).map((l: any) =>
          typeof l === 'string' ? l : JSON.stringify(l)
        ),
      }));

      // Clear existing data and add new data using RealmService
      this.realmService.deleteAll();
      this.realmService.addBulk(customCategoriesForRealm);

      // Get all data using RealmService
      return this.realmService.getAll();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }

  async getLocalData(): Promise<CategoryItem[]> {
    try {
      return this.realmService.getAll();
    } catch (error) {
      console.error('Realm read failed:', error);
      throw error;
    }
  }

  async saveToLocal(categories: CategoryItem[]): Promise<void> {
    try {
      this.realmService.deleteAll();
      this.realmService.addBulk(categories);
    } catch (error) {
      console.error('Failed to save to local:', error);
      throw error;
    }
  }
} 