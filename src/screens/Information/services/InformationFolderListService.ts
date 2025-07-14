import GenericRealmService from '../../../realM/RealmService';
import { CustomCategorySchemas } from '../../../realM/schemas/CustomCategorySchemas';
import { CategoryItem } from '../Interfaces/CategoryItem';

export class InformationFolderListService {
  private realmService: GenericRealmService<any>;

  constructor() {
    this.realmService = new GenericRealmService('CustomCategoryItem', CustomCategorySchemas);
  }

  async getAllItems(): Promise<CategoryItem[]> {
    try {
      const allItems = this.realmService.getAll();
      return allItems || [];
    } catch (error) {
      console.error('Realm read failed:', error);
      throw error;
    }
  }

  async getFilteredItems(selectedItem: CategoryItem | null): Promise<CategoryItem[]> {
    try {
      const allItems = await this.getAllItems();
      
      if (!allItems?.length) {
        return [];
      }

      let filteredItems: CategoryItem[] = [];
      
      if (selectedItem?.Id != null) {
        // Filter items that have CategoryFolder matching the current item's Id
        filteredItems = allItems.filter((categoryItem: CategoryItem) => 
          categoryItem.CategoryFolder != null && 
          categoryItem.CategoryFolder !== "" && 
          String(categoryItem.CategoryFolder) === String(selectedItem.Id)
        );
      }
      
      if (!filteredItems.length) {
        // If no items found with CategoryFolder, show items without CategoryFolder
        filteredItems = allItems.filter((categoryItem: CategoryItem) => 
          !categoryItem.CategoryFolder || 
          categoryItem.CategoryFolder === null || 
          categoryItem.CategoryFolder === ""
        );
      }
      
      return filteredItems;
    } catch (error) {
      console.error('Error filtering items:', error);
      throw error;
    }
  }
} 