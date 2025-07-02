// utils/responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };