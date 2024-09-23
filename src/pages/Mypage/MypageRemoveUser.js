import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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

const MypageRemoveUser = () => {
  const [confirmEmail, setConfirmEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("회원 탈퇴 클릭");
      console.log(accessToken);
      // 회원 탈퇴 요청 보내기
      const apiUrl = `http://3.34.54.187:8000/users/user_info/`;
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          password: confirmEmail
        }
      });
      console.log(response.data);
      // 응답 확인
      Alert.alert(response.data.message);

      // 회원 탈퇴 성공 시 처리

    } catch (error) {
      console.error('회원 탈퇴 요청 중 에러 발생:', error);
      // 에러 처리 로직 추가
      // 에러 객체의 response 속성이 존재하는지 확인하고 출력합니다.
      if (error.response) {
        if (error.response.data.detail === "Incorrect password") {
          Alert.alert("비밀번호 오류","비밀번호가 올바르지 않습니다.");
        }
        else {
          Alert.alert("회원 탈퇴 중 오류가 발생했습니다");

        }
        console.log(error.response.detail);
        console.log('에러 응답 데이터:', error.response.data);
        const errorMessage = error.response.data.detail;
        console.log('에러 메시지:', errorMessage);

        console.log('에러 응답 상태 코드:', error.response.status);
        console.log('에러 응답 헤더:', error.response.headers);
      }
      else {
        console.log('오류 응답 데이터:', error.response.data);
        setLoading(true);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('refresh_token');
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken);
        navigation.navigate('MainHome');


        // 2초 후에 setLoading(false) 호출
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 2000);

        clearTimeout(timeout);
        Alert.alert("회원 탈퇴가 완료되었습니다.", "이용해주셔서 감사합니다.");

      }



    }
  };


  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{
        height: heightPercentage(480), alignItems: "center",
      }}>
        {isLoading && (<LoadingModal />)}



        {/* 객체간 여백 */}
        <Blank height={15} />
        <MypageTitle title="기존 비밀번호" />
        <MypageInputBox placeholder="비밀번호를 입력해주세요" inputType="password" onChangeText={(text) => setConfirmEmail(text)} />

        {/* 객체간 여백 */}
        <Blank height={40} />
        <View style={{ width: widthPercentage(260) }}>
          <EtcTxt text={`※ 탈퇴 및 가입을 반복하시는 사용자는 재가입이 제한될 수 있습니다.
   탈퇴 후 사용자 데이터를 복원하실 수 없습니다.
   다시 가입할 경우, 이용 제한 기록이 초기화 되지 않습니다.

`} />
          <MypageWhiteBtn title="회원 탈퇴" onPress={() => setShowModal(true)} />
        </View>

        {/* 회원 탈퇴 확인 모달 */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text>정말로 회원 탈퇴를 하시겠습니까?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowModal(false); handleDeleteAccount(); }}>
                  <Text>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>








        {/* 객체간 여백 */}
        <Blank height={15} />


      </View>



    </View>
  );
};

export default MypageRemoveUser;
