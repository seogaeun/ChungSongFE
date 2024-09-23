import React from 'react';
import Svg, { Path } from 'react-native-svg';


const AlarmSvg = ({ width = 25, height = 25 }) => (
    <Svg width={width} height={height} viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13.5 6.1009C13.5 4.74806 12.9732 3.45063 12.0355 2.49402C11.0979 1.53742 9.82608 1 8.5 1C7.17392 1 5.90215 1.53742 4.96447 2.49402C4.02678 3.45063 3.5 4.74806 3.5 6.1009C3.5 12.052 1 13.7523 1 13.7523H16C16 13.7523 13.5 12.052 13.5 6.1009Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M9.94193 17.1529C9.79542 17.4105 9.58513 17.6244 9.33211 17.7731C9.0791 17.9217 8.79224 18 8.50026 18C8.20828 18 7.92142 17.9217 7.6684 17.7731C7.41539 17.6244 7.2051 17.4105 7.05859 17.1529" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
);

export default AlarmSvg;



