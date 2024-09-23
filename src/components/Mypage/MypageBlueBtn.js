import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { widthPercentage, heightPercentage,fontPercentage } from '../../utils/ResponsiveSize';

const MypageBlueBtn = ({ title, onPress, isButtonDisabled=false  }) => {
  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: isButtonDisabled ? '#999999':colors.blue, 
        borderRadius: 5, 
        paddingHorizontal: widthPercentage(10), 
        paddingVertical: heightPercentage(4) 
      }}
      onPress={onPress}
      disabled={isButtonDisabled} // 버튼의 활성화 또는 비활성화를 설정

    >
      <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: fontPercentage(11), fontWeight: 500 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MypageBlueBtn;
