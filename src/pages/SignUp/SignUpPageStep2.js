import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../../baseURL';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignUpPageStep2 = () => {
  const [email, setEmail] = useState('');
  const [identify, setIdentify] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isIdentifyValid, setIsIdentifyValid] = useState(true);
  const [verificationRequested, setVerificationRequested] = useState(false);
  const [timer, setTimer] = useState(10); // 3분 타이머
  const navigation = useNavigation();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 저장된 데이터 불러와서 확인
    loadSavedData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 1초마다 타이머를 1초씩 감소시킴
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []); // 의존성 배열이 비어 있어 마운트 시 한 번만 실행

  useEffect(() => {
    // 타이머가 0에 도달하면 인증번호 요청 상태를 초기화
    if (timer === 0) {
      setVerificationRequested(false);
    }
  }, [timer]);


  ///////////데이터 불러오기

  const loadSavedData = async () => {
    try {
      // 저장된 데이터 불러오기
      const storedData = await AsyncStorage.getItem('signInData');

      if (storedData !== null) {
        // 불러온 데이터 확인
        const data = JSON.parse(storedData);
        console.log('Loaded Data:', data);

      }
    } catch (error) {
      console.error('Error loading page data:', error);
    }
  };


  /////////값 쿠키 저장
  const saveSignInPage2Data = async (email) => {
    try {
      const data = { email };
      await AsyncStorage.mergeItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 2 data:', error);
    }
  };
  //////////////////


  const handleInputChange = (text, inputType) => {
    if (inputType === 'email') {
      const isValidEmail = /^\S+@\S+\.\S+$/.test(text);
      setEmailValid(isValidEmail); // Update email validation status
      setEmail(text);
      setIsInputsFilled(isValidEmail && !verificationRequested); // Check for valid email and verification not requested
    } else if (inputType === 'identify') {
      setIdentify(text);
      // 정규식을 사용하여 숫자만 허용하는지 검사
      const isValid = /^\d+$/.test(text);
      setIsIdentifyValid(isValid);
      setIsInputsFilled(email !== '' && text !== '' && isValid && isEmailValid);
    }
  };




  const handleSendVerificationCode = async () => {

    // 이메일 중복 검사
    const checkEmailApiUrl = `${baseURL}/users/email_dupcheck/?email=${email}`;
    console.log(checkEmailApiUrl);
    try {
      const checkEmailResponse = await axios.get(checkEmailApiUrl);
      if (checkEmailResponse.data.message === '사용 가능한 이메일입니다.') {
        // 사용 가능한 이메일이라면 인증번호 발송
        sendVerificationCode();
      } else if(checkEmailResponse.data.message === '이미 사용 중인 이메일입니다.'){
        Alert.alert(
          '이메일 오류',
          checkEmailResponse.data.message,
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );
  

      } else{
        Alert.alert(
          '에러 발생',
          checkEmailResponse.data.message,
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );

      }
    } catch (error) {
      // 이메일 중복 검사 실패 시 처리
      Alert.alert(
        '네트워크 불안정',
        '네트워크가 불안정합니다. 다시 시도해주세요'
        ,
        [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      );
      console.log('Error checking email duplication:', error);
      // Alert.alert(
      //   '에러 발생',
      //   '다시 시도해주세요',
      //   [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      // );
    }
  };

  const sayError = async (message) => {
    // 중복된 이메일이라면 알림창 표시
    Alert.alert(
      message,
      [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
    );
  }

  const sendVerificationCode = async () => {
    const apiUrl = `${baseURL}/users/send_emailcode/`;


    try {
      const response = await axios.post(apiUrl, {
        email: email,
      });

      // 요청 성공 시 처리
      console.log('Success:', response.data);

      Alert.alert(
        '인증번호가 발송되었습니다',
        '메일함을 확인해주세요',
        [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      );

      setTimer(180); // 3분으로 타이머 초기화
      setVerificationRequested(true);
    } catch (error) {
      // 요청 실패 시 처리
      console.error('Error sending verification code:', error);
      Alert.alert(
        '에러 발생',
        '다시 시도해주세요',
        [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      );
    }
  };



  const handleClearVerificationCode = () => {
    // 입력된 인증번호를 지우고 상태를 초기화합니다.
    setIdentify('');
    setIsIdentifyValid(true);
    setIsInputsFilled(email !== '' && isEmailValid);
    setVerificationRequested(false);

    // 타이머를 다시 초기화합니다.
    setTimer(180);
  };


  const handleLogin = () => {
    console.log('code:', identify);
    // 인증번호가 요청되었다면 다음 단계로 이동
    if (verificationRequested) {
      const apiUrl = `${baseURL}/users/check_emailcode/`;
      axios.delete(apiUrl, {
        data: {
          email: email,
          code: identify,
        },
      })
        .then(response => {
          // 요청 성공 시 처리
          console.log('Success:', response.data);
          saveSignInPage2Data(email);
          navigation.navigate('SignUpPageStep3');
        })
        .catch(error => {
          Alert.alert(
            '인증번호가 확인되지 않았습니다',
            '다시 시도해주세요',
            [
              { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') },
              // 추가적인 버튼을 원한다면 아래와 같이 배열에 객체를 추가할 수 있습니다.
              // { text: '취소', onPress: () => console.log('취소 버튼이 눌렸습니다.') },
            ],
            { cancelable: false } // 뒤로가기 버튼으로 Alert를 취소할지 여부
          );
          // 요청 실패 시 처리
          console.error('Error:', error);
        });
      // 필요하다면 여기에 인증번호를 검증하는 로직을 추가할 수 있습니다.
    } else {
      // 아직 인증번호가 요청되지 않았다면 인증번호 발송 프로세스 시작
      handleSendVerificationCode();
    }
  };



  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar/> */}


      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>

        {/* 타이틀 뷰 (객체로 만들기) */}
        <TitleView step={"02 | 이메일 인증"} title={"인증번호를 입력해주세요"} />


        {/* 객체간 여백 */}
        <Blank height={25} />

        {/* InputBox 컴포넌트(이메일) */}
        <LoginInput title="이메일" placeholder="ex. abcd1234@gmail.com " onChangeText={(text) => handleInputChange(text, 'email')} />

        {/* 객체간 여백 */}
        <Blank height={10} />

        {/* InputBox 컴포넌트(인증번호) */}
        {verificationRequested && (
          <>
            <LoginInput title="인증번호" placeholder="인증번호 6자리를 입력해주세요" onChangeText={(text) => handleInputChange(text, 'identify')} />
            <View style={{ flexDirection: "row", }}>
              <View style={{ alignItems: 'center', marginTop: heightPercentage(10) }}>
                <Text style={{ color: colors.fontGray, fontSize: 14, fontWeight: 500 }}>
                  {`${Math.floor(timer / 60)}:${timer % 60}`}
                </Text>
              </View>
              <TouchableOpacity style={{ marginTop: heightPercentage(10), marginLeft: widthPercentage(30) }} onPress={handleClearVerificationCode}>
                <Text>인증번호 취소</Text>
              </TouchableOpacity>
            </View>
          </>
        )}



      </View>
      {/* 상태에 따라 다른 버튼을 렌더링합니다. */}
      {verificationRequested ? (
        <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!isInputsFilled} />
      ) : (
        <NxtBtn onPress={handleLogin} title="인증번호 발송" disabled={!isInputsFilled} />
      )}


    </View>
  );
};

export default SignUpPageStep2;
