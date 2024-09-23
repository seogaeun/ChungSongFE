import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeSvg = ({ width = 20, height = 19, fill = "#666666", focused }) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fillRule="evenodd" clipRule="evenodd" d="M19.3363 7.25735L9.66814 0L1.61579e-05 7.25735L0 19H7.06604V12.0246H11.7768V19H19.3363V7.25735Z" fill={focused ? '#666' : '#D9D9D9'} />
  </Svg>
);

export default HomeSvg;
