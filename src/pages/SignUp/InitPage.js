import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
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
          onPress={goToSignup}
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
