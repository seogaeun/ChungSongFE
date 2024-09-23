import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';
import OnOffSwitch from '../OnandOff'; // OnOffSwitch 컴포넌트를 가져옵니다.

const MypageWhiteTurnBox = ({ title, buttons }) => {
  const handleButtonPress = (page) => {
    console.log('Navigating to:', page);
  };

  return (
    <View>
      <Text style={{ marginLeft: widthPercentage(10), color: colors.black, fontSize: 12, fontWeight: '700' }}>
        {title}
      </Text>

      <Blank height={6} />

      <View style={{
        width: widthPercentage(265),
        borderRadius: 10,
        borderWidth: 0.5,
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
        paddingStart:widthPercentage(15),
        paddingEnd: widthPercentage(10),
      }}>
        {buttons.map((button, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: widthPercentage(5) }}>
            <Text style={{ color: colors.black, fontSize: 12, fontWeight: '400' }}>{button.key}</Text>
            {/* 스위치 추가 */}
            <OnOffSwitch value={button.value === '페이지 1'} />


          </View>
        ))}
      </View>
    </View>
  );
};

export default MypageWhiteTurnBox;
