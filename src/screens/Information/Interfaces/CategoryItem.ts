export interface CategoryItem {
  Id?: string | number;
  Name?: string;
  CategoryFolder?: string | number;
  CustomCategoryMedias?: string[];
  CustomCategoryLinks?: string[];
  [key: string]: any;
}

export interface InformationState {
  customCategoriesData: CategoryItem[];
  loading: boolean;
  error: string | null;
}

export interface ApiResponse {
  data?: {
    CustomCategoryItems?: CategoryItem[];
  };
} 

export interface InformationFolderState {
  folders: CategoryItem[];
  loading: boolean;
  error: string | null;
} 


export interface InformationFolderListState {
  folderItems: CategoryItem[];
  loading: boolean;
  error: string | null;
  selectedItem: CategoryItem | null;
}

export interface RouteParams {
  item: CategoryItem;
} 