import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Platform, ImageBackground } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../baseURL';


// 컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';

import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';

const SignUpPageStep6 = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigation = useNavigation();
  
  const handleLogin = async () => {
    let allData; // allData 변수를 더 넓은 스코프에서 선언
  
    try {
      const storedData = await AsyncStorage.getItem('signUpData');
  
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
  
    console.log('All Data2:', allData);
  
    try {
      console.log('All Data3:', allData);
  
      if (allData) {
        // 필요한 데이터 구성
        const formData = new FormData();
        formData.append('email', allData.email);
        formData.append('room_card', {
          uri: allData.room_card,
          type: 'image/jpeg', // 파일 타입에 따라 변경
          name: 'room_card.jpg', // 파일 이름에 따라 변경
        });
        formData.append('username', allData.username);
        formData.append('nickname', allData.nickname);
        formData.append('room', allData.room);
        formData.append('school', allData.school);
        formData.append('password', allData.password);
        formData.append('password_confirm', allData.password_confirm);
  
        // API 호출
        const response = await axios.post(`${baseURL}/users/signup/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // 서버 응답 확인
        console.log(response.data);
  
        navigation.navigate('SignUpResult');
      } else {
        // allData가 없는 경우에 대한 처리
        console.error('로그인을 위한 데이터를 불러오는 데 실패했습니다.');
        Alert.alert(
          '회원가입에 실패했습니다. \n다시 시도해주세요.',
          '데이터를 불러오지 못했습니다.',
          [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
        );
      }
    } catch (error) {
      // API 호출 실패 시 에러 처리
      console.error('API 호출에 문제가 있습니다:', error);
      Alert.alert(
        '회원가입에 실패했습니다. \n다시 시도해주세요.',
        error.message,
        [{ text: '확인', onPress: () => console.log('확인 버튼이 눌렸습니다.') }]
      );
    }
  };
  
  
  

  // 값 쿠키 저장
  const saveSignInPage6Data = async (room_card) => {
    try {
      const data = { room_card };
      await AsyncStorage.mergeItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 6 data:', error);
    }
  };


  // //회원가입을 위한 쿠키 불러오기
  // const loadAllData = async () => {

  // };



  const handleChoosePhoto = async () => {
    Alert.alert(
      "업로드 방법 선택",
      "호실 카드 업로드 방식을 선택해주세요",
      [
        {
          text: "카메라로 촬영하기",
          onPress: async () => {
            const result = await launchCamera({
              mediaType: 'photo',
              cameraType: 'back',
            });
            handlePhotoResult(result);
          }
        },
        {
          text: "앨범에서 선택하기",
          onPress: async () => {
            const result = await launchImageLibrary();
            handlePhotoResult(result);
          }
        },
      ],
      { cancelable: false }
    );
  };

  const handlePhotoResult = (result) => {
    if (result.didCancel) {
      return null;
    }
    const localUri = result.assets[0].uri;
    setSelectedPhoto("file://" + localUri.split("//").pop());

    // 선택한 사진 파일의 경로를 AsyncStorage에 저장
    saveSignInPage6Data("file://" + localUri.split("//").pop());
  };

  // 선택한 사진이 있을 때의 스타일
  const selectedPhotoStyle = selectedPhoto
    ? {
      height: heightPercentage(33),
      width: widthPercentage(37),
      resizeMode: 'contain',
    }
    : null;

  return (
    <View>
      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480) }}>
        <View style={{ paddingLeft: widthPercentage(17) }}>
          {/* 타이틀 뷰 (객체로 만들기) */}
          <TitleView step={"06 | 사생 인증"} title={"호실 카드 사진을 업로드해주세요"} />
        </View>

        {/* 객체간 여백 */}
        <Blank height={65} />

        {/* 카메라 버튼 */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: widthPercentage(240),
              height: heightPercentage(130),
              borderRadius: 13,
              borderColor: colors.green,
              borderWidth: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleChoosePhoto}
          >


            {selectedPhoto ? (
              <ImageBackground
                source={{ uri: selectedPhoto }}
                style={{
                  width: widthPercentage(100), // 화면의 가로 길이에 맞춤
                  aspectRatio: 1, // 가로 세로 비율 유지
                  resizeMode: 'contain', // 'contain'으로 설정하여 이미지를 가로 길이에 맞춤
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

              </ImageBackground>
            ) : (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require('../../assets/images/photo.png')}
                  style={{
                    height: heightPercentage(33),
                    width: widthPercentage(37),
                    resizeMode: 'contain',
                  }}
                />
                <Blank height={10} />
                <Text style={{ color: colors.green, fontSize: 12, fontWeight: 500, alignItems: "center" }}>파일 불러오기</Text>
              </View>
            )}







          </TouchableOpacity>
        </View>
      </View>

      <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!selectedPhoto} />

    </View>
  );
};

export default SignUpPageStep6;
