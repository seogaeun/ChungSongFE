import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../../baseURL';

//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FindEmailStep1 = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [isRoomValid, setIsRoomValid] = useState(true);
  const navigation = useNavigation();

  /////////값 쿠키 저장 (이름, 호실)
  const saveFindEmail1Data = async (message) => {
    try {
      const data = { message };
      await AsyncStorage.mergeItem('FindEmailData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  //////////////////


  const handleLogin = async () => {
    axios.get(`${baseURL}/users/user_matching/`, {
      params: {
        username: username,
        room: room
      }
    })
    .then(response => {
      // 성공적으로 응답을 받았을 때 처리
      console.log('응답 본문:', response.data);
      const data = response.data;
  
      // 응답 데이터 처리
      console.log(data.message);
      console.log(data.masked_email);
  
      // 이메일 데이터 저장
      saveFindEmail1Data(data.masked_email);
  
      // 응답 메시지에 따른 처리
      if (data.message !== "조회 성공") {
        Alert.alert(
          '이메일 찾기 실패',
          data.message,
        );
      } else {
        navigation.navigate('FindEmailStep2');
      }
    })
    .catch(error => {
      // 오류 발생 시 처리
      if (error.response) {
        // 서버에서 응답이 반환된 경우
        const errorMessage = error.response.data.message || '요청 처리 중 오류가 발생했습니다.';
        Alert.alert('오류 발생', errorMessage);
      } else {
        // 요청 자체가 실패한 경우 (네트워크 오류 등)
        console.error('오류 발생:', error.message);
        Alert.alert('오류 발생', '요청 처리 중 오류가 발생했습니다.');
      }
    });
  };
  

  const handleInputChange = (text, inputType) => {
    if (inputType === 'username') {
      setUsername(text);
    } else if (inputType === 'room') {
      setRoom(text);
      // 정규식을 사용하여 숫자만 허용하는지 검사
      const isValid = /^\d+$/.test(text);
      setIsRoomValid(isValid);
    }

    // 입력값이 모두 채워져 있는지 여부를 확인하여 상태 업데이트
    setIsInputsFilled(username !== '' && room !== '' && isRoomValid);
  };

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar/> */}



      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>



        {/* 객체간 여백 */}
        <Blank height={17} />

        {/* InputBox 컴포넌트(이름) */}
        <LoginInput title="이름" placeholder="이름을 입력해주세요" onChangeText={(text) => handleInputChange(text, 'username')} />


        {/* InputBox 컴포넌트(호실) */}
        <LoginInput title="호실" placeholder="호실을 입력해주세요" onChangeText={(text) => handleInputChange(text, 'room')} />

        {/* 객체간 여백 */}
        <Blank height={10} />




        {/* 버튼 모음 */}
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <EtcTxt text={`호를 제외한 숫자만 입력해주세요\nex ) 201 (O) , 201호 (X)`} />
          <View style={{ marginLeft: widthPercentage(100) }}></View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              paddingHorizontal: widthPercentage(10),
              height: heightPercentage(20),
              backgroundColor: !isInputsFilled ? colors.fontGray : colors.green,
            }}
            disabled={!isInputsFilled} // 버튼 비활성화 상태 설정

          >
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>확인</Text>
          </TouchableOpacity>
        </View>

      </View>



    </View>
  );
};

export default FindEmailStep1;
