import React, { useState, useEffect } from 'react';
import { View,Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


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


const MypageEditPwdStep2 = ({navigation}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  useEffect(() => {
    // 입력 필드에 변화가 있을 때마다 버튼의 활성화 여부를 업데이트
    setIsButtonDisabled(!isFieldsFilled() || !isRoomValid() || !isEmailValid());
  }, [name, room, email]);

  const isFieldsFilled = () => {
    return name.trim() !== '' && room.trim() !== '' && email.trim() !== '';
  };

  const isRoomValid = () => {
    const roomNumberRegex = /^\d+$/;
    return roomNumberRegex.test(room.trim());
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };


  const handleConfirm = async () => {
    console.log("버튼 클릭...!")
    // "changePwd" 쿠키에 값 저장
    await AsyncStorage.setItem('changePwd', JSON.stringify({ name, room, email }));

    // MypageEditPwdStep3로 이동
    navigation.navigate('MypageEditPwdStep3');
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
        <MypageTitle title="이름" />
        <MypageInputBox placeholder="이름을 입력하세요" onChangeText={(text) => setName(text)} />


        {/* 객체간 여백 */}
        <Blank height={17} />

        <MypageTitle title="호실" />

        <MypageInputBox placeholder="호실를 입력해주세요" onChangeText={(text) => setRoom(text)} />
        {/* 객체간 여백 */}
        <Blank height={5} />
        <View style={{ width: widthPercentage(260) }}>
          <EtcTxt text={`호를 제외한 숫자만 입력해주세요 \nex ) 201 (O) , 201호 (X)`} />
        </View>



        {/* 객체간 여백 */}
        <Blank height={5} />

        <MypageTitle title="이메일" />

        <MypageInputBox placeholder="이메일을 입력해주세요" onChangeText={(text) => setEmail(text)} />

        {/* 객체간 여백 */}
        <Blank height={10} />


        <View style={{ width: widthPercentage(265), flexDirection: "row", justifyContent: 'flex-end' }}>

          <MypageBlueBtn title="확인" isButtonDisabled={isButtonDisabled} onPress={handleConfirm}/>


        </View>






        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageEditPwdStep2;
