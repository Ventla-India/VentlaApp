export interface CategoryFolder {
  Id: number;
  Name?: string;
  IconUrl?: string;
  IconUrlOriginal?: string;
  PinnedToMenu?: boolean;
  FontAwesomeIconId?: number;
  FontAwesomeIconCode?: string;
  FontAwesomeIconName?: string;
  ApplicationId?: number;
}

export interface LinkedProgram {
  Name?: string;
  Modified?: string;
  Longitude?: number;
}

export interface CategoryItem {
  HasLinks: boolean;
  HasMedia: boolean;
  Id: number;
  Name?: string;
  Description?: string;
  Modified?: string;
  Created?: string;
  CreatedBy?: string;
  IconUrl?: string;
  FeaturedImageUrl?: string;
  FeaturedOrginalImageUrl?: string;
  CustomCategoryMedias: string[];
  CustomCategoryLinks: string[];
  Address?: string;
  City?: string;
  Latitude: number;
  Longitude: number;
  SortOrder: number;
  ContentType?: string;
  ContentUrl?: string;
  Company?: string;
  IsFullImage: boolean;
  JobTitle?: string;
  Group?: string;
  ShowFeatureImageBelowTitle: boolean;
  CategoryFolder?: CategoryFolder;
  LinkedPrograms: LinkedProgram[];
  LinkedParticipantsIds: number[];
  ParticipantGroups: string[];
  VirtualMeetingLink?: string;
  VirtualMeetingType?: string;
  VirtualMeetingCode?: string;
  VirtualMeetingUrl?: string;
  HideEndTimeDuration: boolean;
  HasExternalZoomLink: boolean;
  VirtualMeetingDetails?: string;
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