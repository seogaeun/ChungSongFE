import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

//컴포넌트 모음
import Blank from '../../components/Blank';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const FindEmailStep2 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
    ///////////데이터 불러오기

    const loadSavedData = async () => {
      try {
        // 저장된 데이터 불러오기
        const storedData = await AsyncStorage.getItem('FindEmailData');
  
        if (storedData !== null) {
          // 불러온 데이터 확인
          const data = JSON.parse(storedData);
          console.log('Loaded Data:', data);
          setEmail(data.message);
  
        }
      } catch (error) {
        console.error('Error loading page data:', error);
      }
    };

  useEffect(() => {
    // 타이머가 0에 도달하면 인증번호 요청 상태를 초기화
    loadSavedData();
  });

  const handleLogin = () => {
    navigation.navigate('LoginPage');
  };

  const handleFindPwd = () => {
    navigation.navigate('FindPwdStep1');

  };

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar/> */}


      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>



        {/* 객체간 여백 */}
        <Blank height={17} />
        <View style={{justifyContent:"center",alignContent:"center", borderRadius:10, borderWidth:2, borderColor:colors.Gray,width:widthPercentage(265),height:heightPercentage(40)}}>
          <Text style={{color:colors.black,textAlign:"center",fontSize:14,fontWeight:500}}>{email}</Text>

        </View>

        

        {/* 객체간 여백 */}
        <Blank height={10} />
        <View style={{alignItems:"center"}}>
        <EtcTxt text={`해당 회원정보로 가입하신 이메일입니다.`} />
        </View>

        <Blank height={10} />

        {/* 버튼 모음 */}
        <View style={{flexDirection:"row", justifyContent:"flex-end",paddingHorizontal:widthPercentage(15)}}>
          <TouchableOpacity onPress={handleFindPwd} style={{alignItems:"center",justifyContent:"center",backgroundColor:colors.Gray,borderRadius:5,paddingHorizontal:heightPercentage(8),paddingVertical:widthPercentage(4)}}>
            <Text style={{color:colors.fontWhite,textAlign:"center",fontSize:9,fontWeight:500}}>비밀번호 찾기</Text>
          </TouchableOpacity>

          <View style={{marginLeft:widthPercentage(6)}}></View>


          <TouchableOpacity onPress={handleLogin} style={{alignItems:"center",justifyContent:"center",backgroundColor:colors.green,borderRadius:5,paddingHorizontal:widthPercentage(10),paddingVertical:heightPercentage(4)}}>
            <Text style={{color:colors.fontWhite,textAlign:"center",fontSize:9,fontWeight:500}}>로그인</Text>
          </TouchableOpacity>
        </View>

      </View>



    </View>
  );
};

export default FindEmailStep2;
