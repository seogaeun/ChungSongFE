// Blank.js

import React from 'react';
import { View } from 'react-native';
import { heightPercentage } from '../utils/ResponsiveSize';

const Blank = ({ height }) => {
  return <View style={{ height: heightPercentage(height) }} />;
};

export default Blank;
