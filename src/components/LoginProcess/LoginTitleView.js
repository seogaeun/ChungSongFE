// TitleView.js

import React from 'react';
import { View, Text } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

const TitleView = ({ step, title }) => {
  return (
    <View style={{ paddingTop: heightPercentage(10), paddingRight: widthPercentage(17), paddingBottom: heightPercentage(10) }}>
      <Text style={{
        fontSize: fontPercentage(10), color: colors.fontGray, fontWeight: 400, marginBottom: heightPercentage(11),
      }}>{step}</Text>
      <Text style={{ fontSize: fontPercentage(20), color: colors.black, fontWeight: 700, }}>{title}</Text>
    </View>
  );
};

export default TitleView;
