import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import { baseURL } from '../../../baseURL';

const FindPwdStep2 = () => {

  const [useEmail, setEmail] = useState('');
  const [identify, setIdentify] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [verificationRequested, setVerificationRequested] = useState(false);

  const [timer, setTimer] = useState(0); // 초기 타이머 값은 3분(180초)
  const [verificationCode, setVerificationCode] = useState(''); // 인증번호 입력 상태
  const navigation = useNavigation();


  ///////////데이터 불러오기

  const loadSavedData = async () => {
    try {
      // 저장된 데이터 불러오기
      const storedData = await AsyncStorage.getItem('FindPWDData');

      if (storedData !== null) {
        // 불러온 데이터 확인
        const data = JSON.parse(storedData);
        console.log('Loaded Data:', data);
        setEmail(data.email);
        console.log("your" + data.email); // 여기서 확인하도록 변경
        return data; // Promise에서 데이터 반환
      }
    } catch (error) {
      console.error('Error loading page data:', error);
    }
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
        setTimer(180); // 3분으로 타이머 초기화
        setVerificationRequested(true);
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



  // 시작할때 초기 세팅 함수
  useEffect(() => {
    // 컴포넌트가 마운트될 때 저장된 데이터 불러와서 확인
    loadSavedData().then((data) => {
      setEmail(data.email);
      console.log("your" + data.email);
      // loadSavedData가 완료된 후에 실행될 코드
      // handleSendVerificationCode(data.email);
      setTimer(180); // 3분으로 타이머 초기화

    });
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






  const handleLogin = () => {
    console.log(verificationCode);
    const apiUrl = `${baseURL}/users/check_emailcode/`;
    axios.delete(apiUrl, {
      data: {
        email: useEmail,
        code: verificationCode,
      },
    })
      .then(response => {
        // 요청 성공 시 처리
        console.log('Success:', response.data);
        navigation.navigate('NewPwdStep1');
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
  };

  const handleResendVerificationCode = () => {
    // 인증번호 재발송 로직 추가
    setVerificationCode(''); // 인증번호 입력 내용 초기화
    handleSendVerificationCode();
    setTimer(180); // 타이머 초기화
  };


  return (
    <View>
      {/* <TopBar /> */}

      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        <Blank height={10} />
        <TitleView title={`가입하신 이메일로 \n인증번호를 보내드렸습니다`} />

        <View style={{ marginTop: heightPercentage(26) }}>
          <Text style={{
            fontSize: 12, color: colors.black, fontWeight: 500, marginLeft: widthPercentage(1)
          }}>인증번호</Text>
          <View style={{
            flexDirection: "row", alignItems: "center", width: widthPercentage(265), borderBottomWidth: 1,
            borderColor: colors.underGray,
          }}>
            <TextInput
              style={{
                paddingTop: heightPercentage(10),
                paddingBottom: heightPercentage(10),
                marginRight: widthPercentage(15),
                color: colors.fontGray,
                width: widthPercentage(200),
                maxWidth: widthPercentage(200),
              }}
              placeholder={"인증번호를 입력해주세요"}
              value={verificationCode}
              onChangeText={(text) => setVerificationCode(text)}
            />
            <Text style={{ color: colors.fontGray, fontSize: 14, fontWeight: 500 }}>{`${Math.floor(timer / 60)}:${timer % 60}`}</Text>
          </View>
        </View>

        <Blank height={20} />

        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: widthPercentage(15) }}>
          <TouchableOpacity
            onPress={handleResendVerificationCode}
            style={{
              alignItems: "center", justifyContent: "center", backgroundColor: colors.Gray,
              borderRadius: 5, paddingHorizontal: heightPercentage(8), paddingVertical: widthPercentage(4)
            }}
          >
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>인증번호 재발송</Text>
          </TouchableOpacity>

          <View style={{ marginLeft: widthPercentage(6) }}></View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={!verificationCode.trim()} // 인증번호가 비어 있을 때 버튼 비활성화
            style={{
              alignItems: "center", justifyContent: "center", backgroundColor: colors.green,
              borderRadius: 5, paddingHorizontal: widthPercentage(10), paddingVertical: heightPercentage(4),
              opacity: verificationCode.trim() ? 1 : 0.5, // 인증번호가 있을 때만 버튼 활성화
            }}
          >
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FindPwdStep2;
