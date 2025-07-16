import { PropsWithChildren } from 'react';
import { ViewStyle, TextStyle, ImageStyle, ImageSourcePropType, StyleProp, GestureResponderEvent } from 'react-native';

export interface CommanIconProps {
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  imageSource?: ImageSourcePropType;
  initials?: string;
  style?: ViewStyle | ImageStyle;
  textStyle?: any;
  backgroundColor?: string;
}

export interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showBack?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  titleAlign?: 'left' | 'center';
  backIconStyle?: StyleProp<ImageStyle>;
  showRightIcon?: boolean;
  rightIconSource?: ImageSourcePropType;
  onRightIconPress?: () => void;
  rightIconStyle?: StyleProp<ImageStyle>;
  rightIconKey?: string;
}

export type WrapperContainerProps = PropsWithChildren<{
  style?: object;
  isSafeAreaView?: boolean;
  statusBarColor?: string;
  statusBarContentColor?: 'light-content' | 'dark-content';
  isLoading?: boolean;
}>;

export interface GenericFlatListProps {
  data: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
  keyExtractor: (item: any) => string;
  loading?: boolean;
  loadingMore?: boolean;
  hasMoreData?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement;
  contentContainerStyle?: any;
  style?: any;
  horizontal?: boolean;
  pagingEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  numColumns?: number;
  viewabilityConfig?: any;
  onViewableItemsChanged?: any;
}

export interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface FolderCardProps {
  item: any; // CategoryItem, but import would be circular, so use any or import if possible
  styles: {
    folderCard: ViewStyle;
    folderIconWrap: ViewStyle;
    folderLabel: TextStyle;
    avatarRow: ViewStyle;
    avatar: ImageStyle;
  };
  onPress?: () => void;
}

export interface MyBtnProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}
