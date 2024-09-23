import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import { useNavigation } from '@react-navigation/native';

//컴포넌트 모음
import Blank from '../../components/Blank';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';


const MypageEditHo = () => {
  const [newRoom, setNewRoom] = useState('');
  const [isIdentifyValid, setIsIdentifyValid] = useState(true);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [userRoom, setUserRoom] = useState('');


  useEffect(() => {
    // AsyncStorage에서 userData 가져오기
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        //        console.log("데이터"+userDataString);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          //console.log("유저 데이터");

          if (userData.room) {
            setUserRoom(userData.room);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // 컴포넌트가 마운트될 때 userData를 AsyncStorage에서 가져옴
  }, []);


  useEffect(() => {
    const isNumber = /^[0-9]+$/.test(newRoom);
    setIsIdentifyValid(isNumber);
    setButtonDisabled(!isNumber);
  }, [newRoom, isButtonDisabled]);

  const navigation = useNavigation();

  const handleButtonPress = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      //console.log("new_Room" + newRoom);
      // POST 요청 보내기
      const response = await axios.post(
        `${baseURL}/administrators/room_request/`,
        { new_room: parseInt(newRoom) },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 응답에서 room_request_id 확인
      const { room_request_id } = response.data;

      if (room_request_id) {
        // room_request_id가 존재하면 성공 알림창
        Alert.alert('성공', '호실 변동 신청이 완료되었습니다');
        navigation.navigate('MypageMain');
      } else {
        // room_request_id가 없으면 실패 알림창
        Alert.alert('오류', '오류가 발생했습니다');
      }
    } catch (error) {
      console.error('Error handling button press:', error.message);
      Alert.alert('기존 호수와 동일', '잘못된 호수입니다. 다시 시도해보세요');
    }
  };


  return (
    <View>
      <View style={{
        height: heightPercentage(480),
        alignItems: "center",
      }}>
        <Blank height={15} />
        <MypageTitle title="기존 호수" />
        <MypageInputBox values={userRoom.toString()} editables={false} />
        <Blank height={17} />
        <MypageTitle title="변동된 호수" />
        <MypageInputBox
          placeholder="변동된 호수를 입력해주세요"
          value={newRoom}
          onChangeText={(text) => setNewRoom(text)}
        />
        <Blank height={5} />
        <View style={{ width: widthPercentage(260) }}>
          <EtcTxt text={`호를 제외한 숫자만 입력해주세요 ex ) 201 (O) , 201호 (X)`} />
        </View>
        <Blank height={5} />
        <View style={{ width: widthPercentage(265), flexDirection: "row", justifyContent: 'flex-end' }}>
          <MypageBlueBtn
            title="신청하기"
            onPress={handleButtonPress}
            isButtonDisabled={isButtonDisabled}
          />
        </View>
        <Blank height={15} />
      </View>
    </View>
  );
};

export default MypageEditHo;
