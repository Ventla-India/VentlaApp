import COLORS from "../../constant/Color";
import { moderateScale, scale, verticalScale , SCREEN_WIDTH, SCREEN_HEIGHT} from "../../utils/Responsive";
import {
    StyleSheet,
  } from 'react-native';

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT.BACKGROUND
  },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#7B1FA2',
      paddingHorizontal: scale(16),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(12),
    },
    centeredContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(16),
    },
  
    folderIconWrapProfile: {
      backgroundColor: '#fff',
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(8),
    }, 
    backIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: scale(20),
    tintColor: COLORS.LIGHT.BACKGROUND,
  },
      grid: {
        paddingHorizontal: scale(4),
        marginTop: verticalScale(16),
      },
      
      
      loader: {
        marginTop: verticalScale(32),
      },
    headerTitle: {
      color: '#fff',
      fontSize: moderateScale(18),
      fontWeight: 'bold',
    },
   sectionTitle: {
    marginTop: moderateScale(24),
    marginBottom: moderateScale(16),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.LIGHT.TEXT,
    textAlign: 'center',
  },
 

    folderList: {
      paddingLeft: scale(12),
      paddingBottom: verticalScale(8),
    },
    folderGrid: {
      paddingHorizontal: scale(12),
      paddingBottom: verticalScale(8),
    },
  
    folderCard: {
      width: SCREEN_WIDTH * 0.45,
      height: SCREEN_HEIGHT * 0.2,
      backgroundColor: '#fff',
      borderRadius: moderateScale(12),
      marginBottom: verticalScale(8),
      marginHorizontal: scale(4),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      padding: moderateScale(12),
    },
    folderIconWrap: {
      backgroundColor: '#7B1FA2',
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(8),
    },
    folderLabel: {
      fontSize: moderateScale(14),
      color: '#222',
      fontWeight: '500',
    },
    infoList: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(16),
  },
    infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.BACKGROUND,
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    marginBottom: moderateScale(8),
    elevation: 1,
    shadowColor: COLORS.LIGHT.TEXT,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
    infoIconWrap: {
      backgroundColor: COLORS.App_Theme,
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: moderateScale(10),
    },
    infoText: {
    fontSize: moderateScale(15),
    color: COLORS.LIGHT.TEXT,
    flex: 1,
    flexWrap: 'wrap',
  },
    loadingText: {
      textAlign: 'center',
      marginVertical: verticalScale(20),
      color: '#888',
      fontSize: moderateScale(15),
    },
  emptyText: {
    textAlign: 'center',
    color: COLORS.LIGHT.TEXT,
    fontSize: moderateScale(15),
    marginVertical: moderateScale(20),
  },
    bannerWrap: {
      alignItems: 'center',
      marginTop: verticalScale(24),
      marginBottom: verticalScale(12),
    },
    bannerImg: {
      width: scale(220),
      height: verticalScale(60),
      borderRadius: moderateScale(10),
    },
    foldersHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: scale(16),
    },
    viewAllLink: {
      color: '#7B1FA2',
      fontSize: moderateScale(14),
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textDecorationColor: '#7B1FA2',
      textDecorationStyle: 'solid',
    },
  });
  