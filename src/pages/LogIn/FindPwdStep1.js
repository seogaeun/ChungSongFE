import React, { useState } from 'react';
import { View, Alert, Text, TextInput, Image, TouchableOpacity } from 'react-native';
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


const FindPwdStep1  = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [isRoomValid, setIsRoomValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigation = useNavigation();

    /////////값 쿠키 저장
    const saveFindPwd1Data = async (username, room, email) => {
      try {
        const data = { username, room, email };
        await AsyncStorage.mergeItem('FindPWDData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving page 4 data:', error);
      }
    };
    //////////////////

  const handleInputChange = (text, inputType) => {
    if (inputType === 'username') {
      setUsername(text);
    } else if (inputType === 'room') {
      setRoom(text);
      // 정규식을 사용하여 숫자만 허용하는지 검사
      const isValid = /^\d+$/.test(text);
      setIsRoomValid(isValid);
    } else if (inputType === 'email'){
      setEmail(text);
      const isValidEmail = /^\S+@\S+\.\S+$/.test(text);
      setIsEmailValid(isValidEmail);
    }
  
    // 입력값이 모두 채워져 있는지 여부를 확인하여 상태 업데이트
    setIsInputsFilled(username !== '' && room !== '' && isRoomValid && email !== '' && isEmailValid);
  };


  const handleSendVerificationCode = (email) => {
    console.log(email)
    const apiUrl = `${baseURL}/users/send_emailcode/`;
    axios.post(apiUrl, {
      email: email,
    })
      .then(response => {
        // 요청 성공 시 처리
        console.log('Success!!!!:', response.data);
        console.log(email);
        navigation.navigate('FindPwdStep2');


      })
      .catch(error => {
        Alert.alert(
          '에러 발생',
          '다시 시도해주세요',
          [
            { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') },
          ],
          { cancelable: false }
        );
        console.error('Error:', error);
      });
  };
  

  const handleLogin = () => {
    const requestData = {
      username: username,
      room: room,
      email: email,
    };
    console.log(requestData);
    
    axios.post(`${baseURL}/users/user_matching/`, requestData)
      .then(response => {
        // 서버 응답 확인
        console.log(response.data.message);
  
        if (response.data.message === '사용자 정보 확인') {
          // 로그인 성공 시 추가 작업 수행
          // 예: 토큰 저장, 다음 화면으로 이동 등
          saveFindPwd1Data(username, room, email);
          handleSendVerificationCode(email);
        } else {
          // 조회 실패 시
          Alert.alert(
            '회원 정보 조회 실패',
            '회원 정보를 찾을 수 없습니다.',
            [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
          );
        }
      })
      .catch(error => {
        // API 호출 실패 시 에러 처리
        Alert.alert(
          '오류 발생',
          '회원 정보를 찾을 수 없습니다.',
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );

        console.error('API 호출에 문제가 있습니다:', error);
      });
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

        {/* 객체간 여백 */}
        <Blank height={20} />


        {/* InputBox 컴포넌트(호실) */}
        <LoginInput title="호실" placeholder="호실을 입력해주세요" onChangeText={(text) => handleInputChange(text, 'room')} />

        {/* 객체간 여백 */}
        <Blank height={10} />

        <EtcTxt text={`호를 제외한 숫자만 입력해주세요\nex ) 201 (O) , 201호 (X)`} />


        {/* 객체간 여백 */}
        <Blank height={10} />

        <LoginInput title="이메일" placeholder="이메일을 입력해주세요" onChangeText={(text) => handleInputChange(text, 'email')} />

        {/* 객체간 여백 */}
        <Blank height={10} />



        {/* 버튼 모음 */}
        <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
        <TouchableOpacity    onPress={handleLogin}     disabled={!isInputsFilled}  style={{alignItems:"center",justifyContent:"center", backgroundColor: !isInputsFilled ? colors.fontGray : colors.green,borderRadius:5,paddingHorizontal:widthPercentage(10),height:heightPercentage(20),marginRight:widthPercentage(15)}}>
            <Text style={{color:colors.fontWhite,textAlign:"center",fontSize:9,fontWeight:500}}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FindPwdStep1 ;
