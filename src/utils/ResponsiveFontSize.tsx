import { PixelRatio, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 294; // 375는 디자인을 만들 때 사용한 화면의 가로 크기

export const fontPercentage = (fontSize: number) => {
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

