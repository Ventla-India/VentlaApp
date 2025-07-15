import { createRealmService, realmToPlainObject } from "../../../realM/RealmService";
import { CustomCategorySchemas } from "../../../realM/schemas/CustomCategorySchemas";
import { CategoryItem } from "../Interfaces/CategoryItem";

export function InformationFolderService() {
  const realmService = createRealmService('CustomCategoryItem', CustomCategorySchemas);

  async function getAllFolders(): Promise<CategoryItem[]> {
    try {
      const realmResults = realmService.getAll();
      const schema = CustomCategorySchemas.find(s => s.name === 'CustomCategoryItem');
      const filtered = realmResults
        .map((obj: any) => realmToPlainObject(obj, schema))
        .filter((item: CategoryItem) => item.CategoryFolder != null);
      // Remove duplicates based on CategoryFolder.Id
      const seen = new Set<number | string>();
      const unique = filtered.filter((item: CategoryItem) => {
        const id = item.CategoryFolder?.Id;
        if (id == null) return false;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      return unique;
    } catch (error) {
      console.error('Realm read failed:', error);
      throw error;
    }
  }

  return {
    getAllFolders
  };
} 