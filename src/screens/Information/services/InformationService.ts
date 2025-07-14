
import { createRealmService } from '../../../realM/RealmService';
import { CustomCategorySchemas } from '../../../realM/schemas/CustomCategorySchemas';
import { CategoryItem, ApiResponse } from '../Interfaces/CategoryItem';
import { userDetail } from '../../../api/helper';

const realmService = createRealmService('CustomCategoryItem', CustomCategorySchemas);

export async function fetchCustomCategories(): Promise<CategoryItem[]> {
  const authToken = 'MzimX%2fZzu8qMs5QJQUrAWGDK%2fteOosomAW9inoG4rBoG8ggA3QhvPOtBoySSCnwFsvO7sq3mORQ%3d';
  try {
    const response: ApiResponse = await userDetail(authToken);
    console.log(response, 'userDetailuserDetailuserDetailuserDetail')
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
    realmService.deleteAll();
    realmService.addBulk(customCategoriesForRealm);

    // Get all data using RealmService
    return realmService.getAll();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export async function getLocalData(): Promise<CategoryItem[]> {
  try {
    realmService.deleteAll();
    return realmService.getAll();
  } catch (error) {
    console.error('Realm read failed:', error);
    throw error;
  }
}

export async function saveToLocal(categories: CategoryItem[]): Promise<void> {
  try {
    realmService.deleteAll();
    // realmService.addBulk(categories);
  } catch (error) {
    console.error('Failed to save to local:', error);
    throw error;
  }
} 