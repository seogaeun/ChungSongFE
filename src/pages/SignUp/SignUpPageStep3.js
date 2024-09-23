import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpPageStep3 = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState(''); // 추가된 부분
  const navigation = useNavigation();


  /////////값 쿠키 저장
  const saveSignInPage3Data = async (password,password_confirm) => {
    try {
      const data = { password,password_confirm };
      await AsyncStorage.mergeItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 3 data:', error);
    }
  };
  //////////////////


  const handleInputChange = (text, inputType) => {
    // 비밀번호가 조건을 만족하는지 확인
    const isPasswordValid =
      text.length >= 10 &&
      /\d/.test(text) &&
      /[a-zA-Z]/.test(text) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(text);

    // 입력된 값에 따라 상태 업데이트
    if (inputType === 'password') {
      setPassword(text);
    } else if (inputType === 'confirmPassword') {
      setConfirmPassword(text);
    }

    // 두 비밀번호에 대한 조건을 동시에 확인하여 상태 업데이트
    setIsInputsFilled(
      isPasswordValid &&
      confirmPassword.length >= 9
    );
  };




  const handleLogin = () => {
    // 여기에 API 전송 및 검증 추가
    // 비밀번호와 확인 비밀번호가 일치하는지 확인
    const passwordsMatch = password === confirmPassword;

    // 비밀번호가 일치 여부에 따라 메시지 설정
    if (passwordsMatch) {
      saveSignInPage3Data(password,confirmPassword);
      navigation.navigate('SignUpPageStep4');
    } else {
      setPasswordMatchMessage('비밀번호가 서로 다릅니다');
    }

  };

  return (
    <View>
      {/* 상단바 */}
      {/* <TopBar /> */}

      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        {/* 타이틀 뷰 (객체로 만들기) */}
        <TitleView step={"03 | 비밀번호 설정"} title={"비밀번호를 입력해주세요"} />

        {/* 객체간 여백 */}
        <Blank height={25} />

        {/* InputBox 컴포넌트(비밀번호) */}
        <LoginInput
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          inputType={`password`}
          onChangeText={(text) => {
            handleInputChange(text, 'password');
            // 추가된 부분: 타이핑이 끝날 때마다 확인
          }}
        />


        {/* 객체간 여백 */}
        <Blank height={10} />

        {/* InputBox 컴포넌트(비밀번호 확인) */}
        <LoginInput
          title="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          inputType={`password`}
          onChangeText={(text) => {
            handleInputChange(text, 'confirmPassword');
          }}
        />


        {/* 객체간 여백 */}
        <Blank height={10} />

        <EtcTxt text={`※ 최소 10자 이상, 영문, 숫자, 특수문자를 모두 포함해주세요`} />
        <Text style={{ color: passwordMatchMessage === '비밀번호가 일치합니다' ? 'green' : 'red' }}>
          {passwordMatchMessage}
        </Text>
      </View>

      <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!isInputsFilled} />
    </View>
  );
};

export default SignUpPageStep3;
