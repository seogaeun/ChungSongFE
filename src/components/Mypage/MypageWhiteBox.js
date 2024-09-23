import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // react-navigation 라이브러리에서 useNavigation 함수를 가져옵니다.
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';

const MypageWhiteBox = ({ title, buttons }) => {
  const navigation = useNavigation(); // 네비게이션 객체를 가져옵니다.

  const handleButtonPress = (page,param) => {
    // 페이지 네비게이션을 수행합니다.
    console.log('Navigating to:', page);
    navigation.navigate(page,{param}); // 해당 페이지로 이동합니다.
  };

  return (
    <View>
      <Text style={{ marginLeft: widthPercentage(10), color: colors.black, fontSize: fontPercentage(10), fontWeight: '700' }}>
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
      }}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginLeft: widthPercentage(10),
              marginTop: index === 0 ? heightPercentage(9) : 0,
              marginBottom: heightPercentage(8),
            }}
            onPress={() => handleButtonPress(button.value,button.param)}
          >
            <Text style={{ marginLeft: widthPercentage(5), color: colors.black, fontSize: fontPercentage(13), fontWeight: '400' }}>
              {button.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MypageWhiteBox;
