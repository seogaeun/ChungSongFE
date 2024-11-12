import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { baseURL } from '../../../baseURL';


import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import { useNavigation } from '@react-navigation/native';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoChecked, setIsAutoChecked] = useState(false);

  const navigation = useNavigation();

  const toggleCheckbox = () => {
    setIsAutoChecked(!isAutoChecked);
  };



  const handleFind = () => {
    navigation.navigate('FindPage');

  }

  const handleLogin = () => {
    console.log("버튼 클릭");
    const requestData = {
      email: username,
      password: password
    };
    console.log(requestData);
    console.log(`${baseURL}/users/login/`);

    // API 호출
    axios.post(`${baseURL}/users/login/`, requestData)
      .then(response => {
        if (response.data && response.data.message === "login success" && response.data.access_token) {
          // 토큰 저장
          AsyncStorage.setItem('accessToken', response.data.access_token)
            .then(() => {
              // 로그인 성공 시 MainHome으로 이동
              navigation.navigate('MainHome');
            })
            .catch(error => {
              console.error('토큰 저장에 실패했습니다:', error);
              Alert.alert('알림', '로그인에 실패했습니다. 다시 시도해주세요.');
            });
        } else if (response.data && response.data.message === "회원님은 현재 인증대기 상태입니다.") {
          Alert.alert('관리자 계정 확인 대기 중', '회원님은 현재 인증대기 상태입니다\n 관리자 인증 완료 후 로그인이 가능합니다. \n 계정 인증은 최대 24시간이 소요됩니다');
        } else {
          console.log(response.data.message);
          Alert.alert('알림', '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
        }
      })
      .catch(error => {
        if (error.response) {
          // 서버에서 응답이 반환된 경우
          console.log('오류 응답 데이터:', error.response.data);
          const errorMessage = error.response.data.message || '요청 처리 중 오류가 발생했습니다.';
          Alert.alert('오류 발생', errorMessage);
        } else {
          // 요청 자체가 실패한 경우 (네트워크 오류 등)
          console.error('오류 발생:', error.message);
          Alert.alert('오류 발생', '요청 처리 중 오류가 발생했습니다.');
        }
      });
  };



  return (
    <View>
      {/* <TopBar /> */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        <Blank height={17} />

        {/* LoginInput component for username */}
        <LoginInput
          title="이메일"
          placeholder="이메일을 입력해주세요"
          onChangeText={setUsername}
        />

        {/* LoginInput component for password */}
        <LoginInput
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          inputType="password"
          onChangeText={setPassword}
        />

        <Blank height={10} />

        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: widthPercentage(15) }}>

          <TouchableOpacity onPress={handleFind} style={{ alignItems: "center", justifyContent: "center", backgroundColor: colors.Gray, borderRadius: 5, paddingHorizontal: heightPercentage(8), paddingVertical: widthPercentage(4) }}>
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>이메일/비밀번호 찾기</Text>
          </TouchableOpacity>

          <View style={{ marginLeft: widthPercentage(6) }}></View>

          <TouchableOpacity onPress={handleLogin} style={{ alignItems: "center", justifyContent: "center", backgroundColor: colors.green, borderRadius: 5, paddingHorizontal: widthPercentage(10), paddingVertical: heightPercentage(4) }}>
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
