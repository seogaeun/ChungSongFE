import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import { ScrollView } from 'react-native';



const SignUpPageStep1 = () => {
  const [username, setUsername] = useState('');
  const [ho, setHo] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [isHoValid, setIsHoValid] = useState(true);
  const navigation = useNavigation();


  const handleInputChange = (text, inputType) => {
    if (inputType === 'username') {
      setUsername(text);
    } else if (inputType === 'ho') {
      setHo(text);
      // 정규식을 사용하여 숫자만 허용하는지 검사
      const isValid = /^\d+$/.test(text);
      setIsHoValid(isValid);
    }

    // 입력값이 모두 채워져 있는지 여부를 확인하여 상태 업데이트
    setIsInputsFilled(username !== '' && ho !== '' && isHoValid);
  };


  const handleLogin = () => {
    saveSignInPage1Data(username, ho);
    navigation.navigate('SignUpPageStep2');
  };




  /////////값 쿠키 저장
  const saveSignInPage1Data = async (username, room) => {
    try {
      const data = { username, room };
      await AsyncStorage.setItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 1 data:', error);
    }
  };
  //////////////////

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar/> */}


      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>

        {/* 타이틀 뷰 (객체로 만들기) */}
        <TitleView step={"01 | 회원 정보 입력"} title={"이름과 호실을 입력해주세요"} />


        {/* 객체간 여백 */}
        <Blank height={25} />

        {/* InputBox 컴포넌트(이름) */}
        <LoginInput
          title="이름"
          placeholder="이름을 입력해주세요"
          onChangeText={(text) => handleInputChange(text, 'username')}
        />


        {/* 객체간 여백 */}
        <Blank height={10} />

        {/* InputBox 컴포넌트(호실) */}
        <LoginInput
          title="호실"
          placeholder="호실을 입력해주세요"
          onChangeText={(text) => handleInputChange(text, 'ho')}
        />

        {/* 객체간 여백 */}
        <Blank height={10} />

        <EtcTxt text={`호를 제외한 숫자만 입력해주세요\nex ) 201 (O) , 201호 (X)`} />


      </View>
      <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!isInputsFilled} />


    </View>
  );
};

export default SignUpPageStep1;
