import React, { useState, useEffect } from 'react';
import { View, Text, Alert,TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'; // useRoute 추가
import { baseURL } from '../../../baseURL';


//컴포넌트 모음
import Blank from '../../components/Blank';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';


const MypageEditEmail = () => {
  const [userEmail, setUserEmail] = useState(''); //기존 이메일 값 State
  const [newEmail, setNewEmail] = useState(''); // 새로운 이메일 값 받는 State
  const [verificationCode, setVerificationCode] = useState(''); // 인증번호 값 받는 State
  const [isButtonDisabled, setButtonDisabled] = useState(true); //버튼 클릭 막게 만드는 State
  const [isEmailEdit,setEmailEdit] = useState(true);
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const navigation = useNavigation();

  

  useEffect(() => {
    // AsyncStorage에서 userData 가져오기
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.email) {
            setUserEmail(userData.email);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // 컴포넌트가 마운트될 때 userData를 AsyncStorage에서 가져옴
  }, []);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const isValid = /^\d+$/;


  //이메일 유효성 검사
  useEffect(() => {
    if(isEmailEdit){
      const isValidEmail = emailRegex.test(newEmail);
      setButtonDisabled(!isValidEmail);
    }
    else{
      const isValidCode = isValid.test(verificationCode);
      setButtonDisabled(!isValidCode);

    }

  }, [newEmail,verificationCode,isEmailEdit,isButtonDisabled]); // newEmail이 변경될 때마다 실행

  const handleClearVerificationCode = () => {
    // 입력된 인증번호를 지우고 상태를 초기화합니다.
    setNewEmail('');
    setVerificationCode('');
    setButtonDisabled(true);
    setEmailEdit(true);
  };

  const editEmail = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // PATCH users/user_info/ 엔드포인트에 요청을 보냅니다.
        const apiUrl = `${baseURL}/users/user_info/`;
        const response = await axios.patch(apiUrl, {
          username: userData.username,
          room: parseInt(userData.room),
          email: userData.email,
          new_email: newEmail,
        });

        // 요청이 성공하면 결과를 출력합니다.
        console.log('Edit Email Success:', response.data);

        // AsyncStorage에 업데이트된 이메일 정보를 저장합니다.
        await AsyncStorage.setItem('userData', JSON.stringify({ ...userData, email: newEmail }));
        navigation.navigate('MypageMain');

        // 사용자에게 결과를 알리기 위해 Alert를 사용합니다.
        Alert.alert(
          '이메일 변경 성공',
          '이메일이 성공적으로 변경되었습니다',
          [{ text: '확인', onPress: () => console.log("완료!") }]
        );
      }
    } catch (error) {
      // 요청이 실패하면 에러를 출력하고 사용자에게 알립니다.
      console.error('Edit Email Error:', error.message);
      Alert.alert(
        '이메일 변경 실패',
        '다시 시도해주세요',
        [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      );
    }
  };


  const handleSendVerificationCode = () => {
    const apiUrl = `${baseURL}/users/send_emailcode/`;
    axios.post(apiUrl, {
      email: newEmail,
    })
      .then(response => {
        // 요청 성공 시 처리
        console.log('Success:', response.data);

        Alert.alert(
          '인증번호가 발송되었습니다',
          '메일함을 확인해주세요',
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );
                //
        // setTimer(180); // 3분으로 타이머 초기화
        setIsVerificationRequested(true);
        setEmailEdit(false);
        // 인증번호 보내기 로직    
      })
      .catch(error => {
        Alert.alert(
          '에러 발생',
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


  const handleVerifyCode = () => {
    // 인증번호 확인 로직
    // 여기서 인증번호 유효성 검사 수행
    if (isVerificationRequested) {
      const apiUrl = `${baseURL}/users/check_emailcode/`;
      axios.delete(apiUrl, {
        data: {
          email: newEmail,
          code: verificationCode,
        },
      })

      .then(response => {
          // 요청 성공 시 처리
          console.log('Success:', response.data);
          editEmail();
          
        })
        .catch(error => {
          Alert.alert(
            '인증번호가 올바르지 않습니다',
            '다시 시도해주세요',
            [
              { text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') },
              // 추가적인 버튼을 원한다면 아래와 같이 배열에 객체를 추가할 수 있습니다.
              // { text: '취소', onPress: () => console.log('취소 버튼이 눌렸습니다.') },
            ],
            { cancelable: false } // 뒤로가기 버튼으로 Alert를 취소할지 여부
          );
          // 요청 실패 시 처리
          console.error('Error~~:', error);
        });
      // 필요하다면 여기에 인증번호를 검증하는 로직을 추가할 수 있습니다.
    } else {
      // 아직 인증번호가 요청되지 않았다면 인증번호 발송 프로세스 시작
      handleSendVerificationCode();
    }

  };




  return (
    <View style={{ height: heightPercentage(480), alignItems: 'center' }}>
      <Blank height={15} />
      <MypageTitle title="가입 이메일" />
      <MypageInputBox values={userEmail} editables={false} />
      <Blank height={15} />
      <MypageInputBox placeholder="변경하고자하는 이메일을 입력해주세요" onChangeText={setNewEmail} editables={isEmailEdit}/>
      <Blank height={6} />
      {isVerificationRequested && (
        <MypageInputBox placeholder="인증번호를 입력해주세요" onChangeText={setVerificationCode} />
      )}
      <Blank height={15} />
      <View style={{ width: widthPercentage(265), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <MypageBlueBtn
          title={isVerificationRequested ? '인증번호 확인' : '인증번호 보내기'}
          onPress={isVerificationRequested ? handleVerifyCode : handleSendVerificationCode}
          // disabled={isVerificationRequested ? !isVerificationCodeValid : !isEmailValid}
          isButtonDisabled={isButtonDisabled}
        />
      </View>
      <Blank height={15} />
    </View>
  );
};

export default MypageEditEmail;