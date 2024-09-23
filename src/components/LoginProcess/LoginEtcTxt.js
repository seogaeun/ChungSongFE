// EtcTxt.js

import React from 'react';
import { Text } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

const EtcTxt = ({ text }) => {
  return (
    <Text style={{
      fontSize: fontPercentage(11), color: colors.fontGray, fontWeight: 400,
      paddingBottom: heightPercentage(11),
      marginLeft: widthPercentage(1),
    }}>
      {text}
    </Text>
  );
};

export default EtcTxt;
