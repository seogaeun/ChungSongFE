// TopBar.js

import React from 'react';
import { View, SafeAreaView, Platform } from 'react-native';
import { widthPercentage, heightPercentage } from '../utils/ResponsiveSize';
import { colors } from '../constants/colors';

const TopBar = () => {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.Gray }}>
        <View style={{ width: widthPercentage(294), height: heightPercentage(32), backgroundColor: colors.Gray, marginBottom: heightPercentage(4) }} />
      </SafeAreaView>
    );
  } else {
    return <View style={{ width: widthPercentage(294), height: heightPercentage(32), backgroundColor: colors.Gray, marginBottom: heightPercentage(4) }} />;
  }
};

export default TopBar;
