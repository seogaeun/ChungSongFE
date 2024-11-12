import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Svg } from 'react-native-svg';
import { WithLocalSvg } from 'react-native-svg/css';

import LoginPage from '../LogIn/LoginPage';
import SignUpPageStep1 from './SignUpPageStep1';
import Logo from './../../assets/images/logoInit.svg';

const InitPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

    // 회원가입 알림창 표시
    const showSignupAlert = () => {
      Alert.alert(
        "회원가입 안내", // 제목
        "회원가입은 남도학숙 재사생만 가능합니다.\n회원가입 과정에서 남도학숙 카드를 \n사진으로 등록해야 하며, \n이를 인증 과정에서 사용합니다.\n\n회원가입 후 관리자 확인에는 \n최대 24시간이 소요되며, \n관리자 승인이 완료되어야만 로그인이 가능합니다.", // 내용 수정
        [
          {
            text: "취소", // 취소 버튼
            onPress: () => console.log("회원가입 취소됨"), // 취소를 누르면 아무 동작 없이 종료
            style: "cancel",
          },
          {
            text: "확인", // 확인 버튼
            onPress: () => goToSignup(), // 확인을 누르면 회원가입 페이지로 이동
          },
        ]
      );
    };


  const goToLogin = () => {
    navigation.navigate('LoginPage');
  };

  const goToSignup = () => {
    navigation.navigate('SignUpCheckPolicy');
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPercentage(132),
      }}>
        <View>
          <WithLocalSvg asset={Logo} style={{
            width: widthPercentage(96),
            height: heightPercentage(121),
            marginBottom: heightPercentage(58),
          }}
          resizeMode="contain"
          ></WithLocalSvg>
        </View>


        {/* <Image
          style={{
            width: widthPercentage(96),
            height: heightPercentage(121),
            marginBottom: heightPercentage(58),
          }}
          source={require('./../../assets/images/logo.png')} // 이미지 파일의 경로
        /> */}

        <TouchableOpacity
          onPress={goToLogin}
          style={{
            width: widthPercentage(158),
            height: heightPercentage(34),
            backgroundColor: colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5, // Optional: Add border radius for a rounded look
            marginBottom: 10, // Optional: Add margin bottom for spacing
          }}
        >
          <Text style={{ color: 'white', fontSize: fontPercentage(12) }}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={showSignupAlert}
          style={{
            width: widthPercentage(158),
            height: heightPercentage(34),
            backgroundColor: colors.Gray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5, // Optional: Add border radius for a rounded look
          }}
        >
          <Text style={{ color: 'white', fontSize: fontPercentage(12) }}>회원가입</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default InitPage;
