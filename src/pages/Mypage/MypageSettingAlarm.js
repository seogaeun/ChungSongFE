import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import MypageWhiteTurnBox from '../../components/Mypage/MypageWhiteTurnBox';

const MypageMain = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(widthPercentage(158));
    console.log(heightPercentage(34));
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
      <View style={{ height: heightPercentage(480), alignItems: "center",  
 }}>

        {/* 객체간 여백 */}
        <Blank height={10} />

        <View style={{
          width: widthPercentage(265),
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#D9D9D9',
          backgroundColor: '#FFF',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2, // For Android
          paddingLeft: widthPercentage(15),
          paddingTop: heightPercentage(10),
          paddingBottom: heightPercentage(10),
          flexDirection: "row",
          alignItems:"center"

        }}>

          <Image
            source={require('../../assets/images/User.png')} // 이미지 파일 경로
            style={{
              width: widthPercentage(28), // 이미지의 너비
              height: heightPercentage(28), // 이미지의 높이
              resizeMode: 'contain', // 이미지의 가로세로 비율을 유지하며 중앙에 맞춤
            }}
          />



          <View style={{
            marginLeft: widthPercentage(10)
          }}
          >
            <Text style={{ marginLeft: widthPercentage(5), color: colors.black, fontSize: 12, fontWeight: '600' }}>
              {userName}
            </Text>
            {/* 객체간 여백 */}
            <Blank height={1} />
            <Text style={{ marginLeft: widthPercentage(5), color: colors.fontGray, fontSize: 10, fontWeight: '600' }}>
              남도학숙 은평관 {userHo}호
            </Text>


          </View>



        </View>



        {/* 객체간 여백 */}
        <Blank height={15} />

        <MypageWhiteTurnBox title={"게시판 알림"} buttons={myPostAlarm} />

        {/* 객체간 여백 */}
        <Blank height={20} />

        <MypageWhiteTurnBox title={"공지 알림"} buttons={announce} />

        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageMain;
