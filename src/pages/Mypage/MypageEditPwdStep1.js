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
import MypageWhiteTurnBox from '../../components/Mypage/MypageWhiteTurnBox';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MypageEditPwdStep1 = ({ onChangeText }) => {
  const [useremail, setUserEmail] = useState('');

  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation = useNavigation();




  useEffect(() => {
    // 비밀번호 길이가 10자 이상이면 버튼 활성화
    setIsButtonDisabled(password.length < 10);
  }, [password]);

  const handleButtonClick = () => {
    // 'FindPwdStep1'로 화면 이동
    navigation.navigate('FindPwdStep1');
  };

  const myPostAlarm = [
    { key: '배달 게시판 알림', value: '페이지 1' },
    { key: '댓글 알림', value: '페이지 2' },
  ];

  const announce = [
    { key: '공지 글 알림', value: '페이지 1' },
  ];



  const fetchData = async () => {
    try {
      // console.log("버튼 클릭");

      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.email) {
          setUserEmail(userData.email);
        }
      }

      // 나머지 코드...
    } catch (error) {
      console.error('사용자 데이터를 가져오는 동안 오류 발생:', error);
    }
  };

  const checkPWD = () => {
    fetchData();
    // console.log("버튼 클릭");
    const requestData = {
      email: useremail,
      password: password
    };
    // console.log(requestData);

    // API 호출
    axios.post(`${baseURL}/users/login/`, requestData)
      .then(response => {
        if (response.data && response.data.message === "login success" && response.data.access_token) {
          // 토큰 저장
          AsyncStorage.setItem('accessToken', response.data.access_token)
            .then(() => {
              navigation.navigate('MypageEditPwdStep2');
            })
            .catch(error => {
              console.error('토큰 저장에 실패했습니다:', error);
              Alert.alert('알림', '비밀번호 확인에 실패했습니다. 다시 시도해주세요');
            });
        } else {
          Alert.alert('알림', '비밀번호 확인에 실패했습니다. 다시 시도해주세요');
        }
      })
      .catch(error => {
        Alert.alert('알림', '비밀번호 확인에 실패했습니다. 다시 시도해주세요');
        console.error('API 호출에 문제가 있습니다:', error);


      });
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
        <MypageTitle title="기존 비밀번호" />
        <MypageInputBox onChangeText={(text) => setPassword(text)}
          placeholder="비밀번호를 입력해주세요" inputType="password" />





        {/* 객체간 여백 */}
        <Blank height={10} />


        <View style={{ width: widthPercentage(265), flexDirection: "row", justifyContent: 'flex-end' }}>
          {/* <TouchableOpacity onPress={handleButtonClick} style={{alignItems:"center",justifyContent:"center",backgroundColor:colors.blue,borderRadius:5,paddingHorizontal:heightPercentage(8),paddingVertical:widthPercentage(4)}}>
            <Text style={{color:colors.fontWhite,textAlign:"center",fontSize:9,fontWeight:500}}>비밀번호 찾기</Text>
          </TouchableOpacity> */}

          <View style={{ marginLeft: widthPercentage(10) }} />
          <MypageBlueBtn title="다음으로" isButtonDisabled={isButtonDisabled} onPress={checkPWD} />


        </View>






        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageEditPwdStep1;
