import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';

// 컴포넌트
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';

const NewPwdStep1 = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInputsFilled, setIsInputsFilled] = useState(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState(''); // 추가된 부분
  const navigation = useNavigation();



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




  // const handleLogin = async () => {


  //   try {
  //     console.log('All Data3:', allData);

  //     if (allData) {
  //       // 필요한 데이터 구성
  //       const formData = new FormData();
  //       formData.append('email', allData.email);
  //       formData.append('room_card', {
  //         uri: allData.room_card,
  //         type: 'image/jpeg', // 파일 타입에 따라 변경
  //         name: 'room_card.jpg', // 파일 이름에 따라 변경
  //       });
  //       formData.append('username', allData.username);
  //       formData.append('nickname', allData.nickname);
  //       formData.append('room', allData.room);
  //       formData.append('school', allData.school);
  //       formData.append('password', allData.password);
  //       formData.append('password_confirm', allData.password_confirm);

  //       // API 호출
  //       const response = await axios.post(`${baseURL}/users/signup/`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       // 서버 응답 확인
  //       console.log(response.data);

  //       navigation.navigate('SignUpResult');
  //     } else {
  //       // allData가 없는 경우에 대한 처리
  //       console.error('로그인을 위한 데이터를 불러오는 데 실패했습니다.');
  //       Alert.alert(
  //         '회원가입에 실패했습니다. \n다시 시도해주세요.',
  //         '데이터를 불러오지 못했습니다.',
  //         [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
  //       );
  //     }
  //   } catch (error) {
  //     // API 호출 실패 시 에러 처리
  //     console.error('API 호출에 문제가 있습니다:', error);
  //     Alert.alert(
  //       '회원가입에 실패했습니다. \n다시 시도해주세요.',
  //       error.message,
  //       [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
  //     );
  //   }
  // };


  const handleConfirm = async () => {
    // 확인 버튼 클릭 시 로직 추가
    const passwordsMatch = password === confirmPassword;

    // 비밀번호가 일치 여부에 따라 메시지 설정
    if (passwordsMatch) {
      let allData; // allData 변수를 더 넓은 스코프에서 선언

      try {

        //기존 데이터 불러오기
        const storedData = await AsyncStorage.getItem('FindPWDData');

        if (storedData !== null) {
          allData = JSON.parse(storedData);
          console.log('All Data:', allData);
          // 여기서 allData를 사용하여 필요한 처리 수행
        }
      } catch (error) {
        // AsyncStorage에서 데이터를 불러오는 중 에러가 발생한 경우 처리
        console.error('데이터 불러오기 실패:', error);
        Alert.alert(
          '회원가입에 실패했습니다. 다시 시도해주세요.',
          error.message,
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );
        return; // 에러 발생 시 함수 종료
      }

      //바디 형식 제작

      try {
        console.log('All Data3:', allData);

        if (allData) {
          // 필요한 데이터 구성
          const userData = {
            username: allData.username,
            room: allData.room,
            email: allData.email,
            password: password,
            password_confirm: confirmPassword,
          };

          console.log(userData)
          // API 호출
          const response = await fetch(`${baseURL}/users/user_info/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              // 기타 필요한 헤더 정보 추가
            },
            body: JSON.stringify({
              username: allData.username,
              room: allData.room,
              email: allData.email,
              password: password,
              password_confirm: confirmPassword,
            }),
          });

          // 서버 응답 확인
          console.log(response.data);
          Alert.alert(
            '비밀번호를 변경했습니다',
            '다시 로그인해주세요',
            [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
          );
          navigation.navigate('SignUpResult');
        } else {
          // allData가 없는 경우에 대한 처리
          console.error('로그인을 위한 데이터를 불러오는 데 실패했습니다.');
          Alert.alert(
            '비밀번호 변경에 실패했습니다. \n다시 시도해주세요.',
            '데이터를 불러오지 못했습니다.',
            [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
          );
        }
      } catch (error) {
        // API 호출 실패 시 에러 처리
        console.error('[비밀번호 변경]API 호출에 문제가 있습니다:', error);
        Alert.alert(
          '비밀번호 변경에 실패했습니다. \n다시 시도해주세요.',
          error.message,
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );
      }
      navigation.navigate('LoginPage');
    } else {
      setPasswordMatchMessage('비밀번호가 서로 다릅니다');
    }

  };

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar/> */}


      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>

        <TitleView title={`새로운 비밀번호를 \n 입력해주세요`} />



        {/* 객체간 여백 */}
        <Blank height={17} />

        {/* 비밀번호 입력을 위한 InputBox */}
        <LoginInput
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          inputType="password"
          onChangeText={(text) => handleInputChange(text, 'password')}
        />

        <Blank height={17} />

        {/* 비밀번호 확인을 위한 InputBox */}
        <LoginInput
          title="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          inputType="password"
          onChangeText={(text) => handleInputChange(text, 'confirmPassword')}
        />
        {/* 객체간 여백 */}
        <Blank height={10} />


        {/* 버튼 모음 */}
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <EtcTxt text={`※ 최소 10자 이상, 영문,숫자,특수문자를 \n모두 포함해주세요`} />

          <View style={{ marginLeft: widthPercentage(80) }}></View>
          <TouchableOpacity onPress={handleConfirm}
            disabled={!isInputsFilled}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              paddingHorizontal: widthPercentage(10),
              height: heightPercentage(20),
              backgroundColor: !isInputsFilled ? colors.fontGray : colors.green,
            }}>
            <Text style={{ color: colors.fontWhite, textAlign: "center", fontSize: 9, fontWeight: 500 }}>확인</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: passwordMatchMessage === '비밀번호가 일치합니다' ? 'green' : 'red' }}>
          {passwordMatchMessage}
        </Text>





      </View>



    </View>
  );
};

export default NewPwdStep1;
