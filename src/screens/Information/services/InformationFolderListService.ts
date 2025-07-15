import { createRealmService } from '../../../realM/RealmService';
import { CustomCategorySchemas } from '../../../realM/schemas/CustomCategorySchemas';
import { CategoryItem } from '../Interfaces/CategoryItem';

export class InformationFolderListService {
  private realmService: ReturnType<typeof createRealmService>;

  constructor() {
    this.realmService = createRealmService('CustomCategoryItem', CustomCategorySchemas);
  }

  async getAllItems(): Promise<CategoryItem[]> {
    try {
      const allItems = this.realmService.getAll();
      // Map Realm objects to CategoryItem type
      return (allItems || []).map((item: any) => item as CategoryItem);
    } catch (error) {
      console.error('Realm read failed:', error);
      throw error;
    }
  }

  async getFilteredItems(selectedItem: CategoryItem | null): Promise<CategoryItem[]> {
    try {
      const allItems = await this.getAllItems();
      if (!allItems?.length || !selectedItem?.Id) {
        return [];
      }
      // Only return items whose CategoryFolder.Id matches the selected folder's CategoryFolder.Id
      const filteredItems = allItems.filter((categoryItem: CategoryItem) => {
        return (
          categoryItem.CategoryFolder &&
          selectedItem.CategoryFolder &&
          categoryItem.CategoryFolder.Id === selectedItem.CategoryFolder.Id
        );
      });
      return filteredItems;
    } catch (error) {
      console.error('Error filtering items:', error);
      throw error;
    }
  }
} 