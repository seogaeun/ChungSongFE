// MypageWhiteBtn.js

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

const MypageWhiteBtn = ({ onPress, title }) => {
  return (
    <View style={{
    }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: widthPercentage(264),
          paddingTop: heightPercentage(12),
          paddingBottom: heightPercentage(12),
          backgroundColor: colors.fontWhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderColor: '#D9D9D9',
          backgroundColor: '#FFF',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2, // For Android

        }}
      >
        <Text style={{
          color: colors.swithchBlue, fontWeight: '600', fontSize:15,
        }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MypageWhiteBtn;
