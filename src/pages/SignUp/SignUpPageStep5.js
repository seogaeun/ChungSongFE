import React, { useState, useEffect } from 'react';
import { View, Alert, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../../components/Blank';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../../baseURL';

import TitleView from '../../components/LoginProcess/LoginTitleView';
import LoginInput from '../../components/LoginProcess/LoginInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const SignUpPageStep5 = () => {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);
  const [nickname, setNickname] = useState('');
  const [character, setCharacter] = useState('');
  const navigation = useNavigation();

  /////////값 쿠키 저장 (캐릭터 추가시 여기에 넣기)
  const saveSignInPage5Data = async (nickname, profile_image) => {
    try {
      const data = { nickname, profile_image };
      await AsyncStorage.mergeItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 4 data:', error);
    }
  };
  //////////////////

  useEffect(() => {
    // This code will run whenever the 'character' state changes
    console.log('Character changed:', character);
  }, [character]);



  const handleLogin = async () => {
    console.log("클릭!");
    if (isNextButtonEnabled) {
      try {
        // 별명 중복 체크 API 호출
        const response = await fetchUniversityData(nickname);
        const responseData = response.data;
        const errorMessage = responseData.message;
        const check = nickname+" 별명 사용 가능";
  
        // 중복 체크 결과에 따른 처리
        if (errorMessage == check ) {
          // 별명 사용 가능한 경우
          console.log(character+1);
          saveSignInPage5Data(nickname, character+1);
          navigation.navigate('SignUpPageStep6');
        } else {
          // 별명 사용 불가능한 경우
          Alert.alert(
            '닉네임 오류',
            `${errorMessage}`,
            [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
          );
          
        }
      } catch (error) {
        console.error('Error checking nickname duplication:', error);
      }
    }
  };
  

  // 별명 중복 체크 API
  const fetchUniversityData = async (text) => {
    try {
      const apiUrl = `${baseURL}/users/signup/nkname_dupcheck/?nickname=${text}`;
      const response = await axios.get(apiUrl);

      // 서버에서 받아온 데이터를 반환
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
    }
  };



  const characters = [
    require('../../assets/images/character/CrBea.png'),
    require('../../assets/images/character/CrCat.jpeg'),
    require('../../assets/images/character/CrDog.jpeg'),
    require('../../assets/images/character/CrPan.png'),
    require('../../assets/images/character/CrRab.png'),
    require('../../assets/images/character/CrSqu.png'),
    require('../../assets/images/character/CrClo.png'),
    require('../../assets/images/character/CrRoc.jpeg'),
  ];

  const handleCharacterClick = (index) => {
    setCharacter(index);
    setSelectedCharacterIndex(index);
  };

  const isNextButtonEnabled = nickname && selectedCharacterIndex !== null;

  return (
    <View>
      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        {/* 타이틀 뷰 (객체로 만들기) */}
        <TitleView step={"05 | 별명, 캐릭터 설정"} title={"사용하실 별명을 입력해주세요"} />
        <Blank height={25} />

        {/* InputBox 컴포넌트(별명) */}
        <LoginInput
          title="별명"
          placeholder="별명 입력해주세요"
          onChangeText={setNickname}
        />
        <Blank height={10} />

        <Text style={{ fontSize: 12, color: colors.black, fontWeight: '500', marginLeft: widthPercentage(1) }}>
          캐릭터 선택
        </Text>

        <Blank height={8} />
        <View style={{ marginRight: widthPercentage(17) }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {characters.map((character, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCharacterClick(index)}
                style={{
                  height: heightPercentage(45),
                  width: widthPercentage(45),
                  padding: widthPercentage(5),
                  marginRight: (index + 1) % 4 !== 0 ? widthPercentage(17) : 0, // 줄 바꿈을 위한 스타일 설정
                  marginBottom: (index + 1) % 4 === 0 ? heightPercentage(12) : 0, // 줄 바꿈을 위한 스타일 설정
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: selectedCharacterIndex === index ? 2 : 0,
                  borderColor: colors.green,
                  borderRadius: 6,
                }}
              >
                <Image
                  source={character}
                  style={{
                    height: heightPercentage(40),
                    width: widthPercentage(40),
                    resizeMode: 'contain',
                    borderRadius: 6,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* 변경된 부분: 버튼 활성화 여부에 따라서 disabled 속성 추가 */}
      <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!isNextButtonEnabled} />
    </View>
  );
};

export default SignUpPageStep5;