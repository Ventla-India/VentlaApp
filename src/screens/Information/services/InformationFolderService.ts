import GenericRealmService from "../../../realM/RealmService";
import { CustomCategorySchemas } from "../../../realM/schemas/CustomCategorySchemas";
import { CategoryItem } from "../Interfaces/CategoryItem";

export class InformationFolderService {
  private realmService: GenericRealmService<any>;

  constructor() {
    this.realmService = new GenericRealmService('CustomCategoryItem', CustomCategorySchemas);
  }

  async getAllFolders(): Promise<CategoryItem[]> {
    try {
      const items = this.realmService.getAll();
      return items;
    } catch (error) {
      console.error('Realm error:', error);
      throw error;
    }
  }

  async saveFolders(folders: CategoryItem[]): Promise<void> {
    try {
      this.realmService.deleteAll();
      this.realmService.addBulk(folders);
    } catch (error) {
      console.error('Failed to save folders:', error);
      throw error;
    }
  }
} 