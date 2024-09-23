import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import { useNavigation } from '@react-navigation/native';



//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import MypageWhiteTurnBox from '../../components/Mypage/MypageWhiteTurnBox';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';


const MypageEditPwdStep3 = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!isFieldsFilled() || !arePasswordsEqual());
  }, [newPassword, confirmPassword]);

  const isFieldsFilled = () => {
    return newPassword.trim().length >= 10 && confirmPassword.trim().length >= 10;
  };

  const arePasswordsEqual = () => {
    return newPassword === confirmPassword;
  };


  const navigation = useNavigation();

  const handleChangePassword = async () => {
    try {
      // 이전에 저장한 changePwd 쿠키 정보 가져오기
      const changePwdString = await AsyncStorage.getItem('changePwd');
      if (changePwdString) {
        const changePwdData = JSON.parse(changePwdString);
        // console.log(changePwdData);
        // API 호출
        const response = await fetch(`${baseURL}/users/user_info/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // 기타 필요한 헤더 정보 추가
          },
          body: JSON.stringify({
            username: changePwdData.name,
            room: changePwdData.room,
            email: changePwdData.email,
            password:newPassword,
            password_confirm:confirmPassword
            
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          // API 호출 성공 시
          console.log(responseData);
          Alert.alert('변경 성공', responseData.message);

          // changePwd 쿠키 삭제
          await AsyncStorage.removeItem('changePwd');
          navigation.navigate('MypageMain');
        } else {
          // API 호출 실패 시
          Alert.alert('변경 실패', responseData.message[0]);
          console.log(responseData.message[0]);
        }
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };
  

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{
        height: heightPercentage(480), alignItems: "center", 
      }}>


        {/* 객체간 여백 */}
        <Blank height={15} />
        <MypageTitle title="새 비밀번호" />
        <MypageInputBox placeholder="새 비밀번호를 입력해주세요" inputType="password"         onChangeText={(text) => setNewPassword(text)}
/>

        {/* 객체간 여백 */}
        <Blank height={10} />
        <MypageTitle title="비밀번호 확인" />
        <MypageInputBox placeholder="새 비밀번호를 입력해주세요" inputType="password"         onChangeText={(text) => setConfirmPassword(text)}
/>





        {/* 객체간 여백 */}
        <Blank height={10} />

        {/* 객체간 여백 */}
        <View style={{ width: widthPercentage(260) }}>
          <EtcTxt text={`*최소 10자 이상, 영문, 숫자, 특수문자를\n  모두 포함해주세요`} />
        </View>


        <View style={{ width: widthPercentage(265), flexDirection: "row", justifyContent: 'flex-end' }}>
          <View style={{ marginLeft: widthPercentage(10) }} />
          <MypageBlueBtn title="변경하기" isButtonDisabled={isButtonDisabled} onPress={handleChangePassword}/>


        </View>






        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageEditPwdStep3;
