// NxtBtn.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Keyboard, Text,TouchableOpacity } from "react-native";
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

const NxtBtn = ({ onPress, title, disabled }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: widthPercentage(264),
          height: heightPercentage(38),
          backgroundColor: disabled ? colors.fontGray : colors.green,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          bottom: heightPercentage(1.5) + keyboardOffset*0.75,
        }}
        disabled={disabled} // 버튼 비활성화 상태 설정
      >
        <Text style={{ color: 'white',fontSize:fontPercentage(14) }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default NxtBtn;
