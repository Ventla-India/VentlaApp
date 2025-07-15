import { createRealmService } from '../../../realM/RealmService';
import { CustomCategorySchemas } from '../../../realM/schemas/CustomCategorySchemas';
import { CategoryItem } from '../Interfaces/CategoryItem';

const realmService = createRealmService('CustomCategoryItem', CustomCategorySchemas);

export async function getFolderListItems(selectedItem?: CategoryItem | null): Promise<CategoryItem[]> {
  try {
    const allItems = realmService.getAll();
    const items = (allItems || []).map((item: any) => item as CategoryItem);

    if (!selectedItem?.Id) {
      return items;
    }

    // Only return items whose CategoryFolder.Id matches the selected folder's CategoryFolder.Id
    return items.filter((categoryItem: CategoryItem) =>
      categoryItem.CategoryFolder &&
      selectedItem.CategoryFolder &&
      categoryItem.CategoryFolder.Id === selectedItem.CategoryFolder.Id
    );
  } catch (error) {
    console.error('Realm read failed:', error);
    throw error;
  }
} 