// src/utils/ResponsiveSize.tsx
//피그마 디자인을 그대로 갖고오기 위한(반응형 디자인을 위한) 유틸리티 파일 입니다

import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
  } from 'react-native-responsive-dimensions';
  
  const FIGMA_WINDOW_WIDTH = 294;
  const FIGMA_WINDOW_HEIGHT = 600;
  
  export function widthPercentage(width: number): number {
    const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
    return responsiveScreenWidth(percentage);
  }
  
  export function heightPercentage(height: number): number {
    const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
    return responsiveScreenHeight(percentage);
  }
  
  export function fontPercentage(size: number): number {
    const percentage = size * 0.135;
    return responsiveScreenFontSize(percentage);
  }
  