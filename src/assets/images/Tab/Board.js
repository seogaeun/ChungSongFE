import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const BoardSvg = ({ width = 18, height = 19, focused }) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect x={0.642857} y={0.642857} width={width - 1.7143} height={height - 1.7143} rx={width / 6.5} stroke={focused ? '#666' : '#D9D9D9'} strokeWidth={width / 14}  />
    <Path d={`M${width / 9.6} ${height / 9.8}C${width / 9.6} ${height / 10.2} ${width / 8.6} ${height / 11} ${width / 7.5} ${height / 11}H${width - width / 7.5}C${width - width / 8.6} ${height / 11} ${width - width / 9.6} ${height / 10.2} ${width - width / 9.6} ${height / 9.8}Z`} fill={focused ? '#666' : '#D9D9D9'} />
    <Path d={`M${width / 9.6} ${height / 6.5}C${width / 9.6} ${height / 6.8} ${width / 8.6} ${height / 7.2} ${width / 7.5} ${height / 7.2}H${width - width / 7.5}C${width - width / 8.6} ${height / 7.2} ${width - width / 9.6} ${height / 6.8} ${width - width / 9.6} ${height / 6.5}Z`} fill={focused ? '#666' : '#D9D9D9'} />
    <Path d={`M${width / 9.6} ${height / 4.9}C${width / 9.6} ${height / 5.2} ${width / 8.6} ${height / 5.6} ${width / 7.5} ${height / 5.6}H${width - width / 7.5}C${width - width / 8.6} ${height / 5.6} ${width - width / 9.6} ${height / 5.2} ${width - width / 9.6} ${height / 4.9}Z`} fill={focused ? '#666' : '#D9D9D9'} />
    <Path d={`M${width / 10.3} ${height / 3.4}C${width / 10.3} ${height / 3} ${width / 9.5} ${height / 2.7} ${width / 8.7} ${height / 2.7}H${width - width / 8.7}C${width - width / 9.5} ${height / 2.7} ${width - width / 10.3} ${height / 3} ${width - width / 10.3} ${height / 3.4}V${height - height / 4}C${width - width / 10.3} ${height - height / 4.9} ${width - width / 9.5} ${height - height / 4.3} ${width - width / 8.7} ${height - height / 3.8}C${width - width / 8} ${height - height / 3.4} ${width - width / 7} ${height - height / 3.4} ${width - width / 6.2} ${height - height / 3.8}C${width - width / 5.5} ${height - height / 4.3} ${width - width / 4.7} ${height - height / 4.9} ${width - width / 4.7} ${height - height / 4}V${height / 3.4}Z`} fill={focused ? '#666' : '#D9D9D9'} />
  </Svg>
);

export default BoardSvg;
