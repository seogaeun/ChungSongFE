import React, { useState } from 'react';
import { View, Alert, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


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
import MypageWhiteBtn from '../../components/Mypage/MypageWhiteBtn';
import LoadingModal from '../../components/LoadingModal';

const MypageLogout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      '로그아웃',
      '정말로 로그아웃을 하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          
          onPress: async () => {
            setLoading(true);
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('refresh_token');
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log(accessToken);

            // 2초 후에 setLoading(false) 호출
            const timeout = setTimeout(() => {
              setLoading(false);
            }, 2000);

            clearTimeout(timeout);
          },
        },
      ],
    );
  };




  const myPostAlarm = [
    { key: '배달 게시판 알림', value: '페이지 1' },
    { key: '댓글 알림', value: '페이지 2' },
  ];

  const announce = [
    { key: '공지 글 알림', value: '페이지 1' },
  ];





  const userName = "김청송"
  const userHo = "210"


  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{
        height: heightPercentage(480), alignItems: "center",
      }}>
        {isLoading && (<LoadingModal/>)}

        {/* 객체간 여백 */}
        <Blank height={15} />

        <MypageWhiteBtn title="로그아웃" onPress={handleLogout} />

        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageLogout;
