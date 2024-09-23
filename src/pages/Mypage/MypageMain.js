import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView} from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가
import { baseURL } from '../../../baseURL';

//컴포넌트 모음
import Blank from '../../components/Blank';
import MypageWhiteBox from '../../components/Mypage/MypageWhiteBox';
import UserIcon from '../../components/UserIcon';

const MypageMain = () => {
  const [userData, setUserData] = useState(null); // userData 상태 추가
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const editInfo = [
    { key: '가입 이메일 변경', value: 'MypageEditEmail' },
    { key: '비밀번호 변경', value: 'MypageEditPwdStep1' },
    { key: '호수 변동 신청', value: 'MypageEditHo' },
  ];

  const myPost = [
    { key: '내가 쓴 게시글', value: 'MypageMyPost' },
    { key: '내가 쓴 댓글', value: 'MypageMyReply' },
  ];

  const informUse = [
    // { key: '알림 설정', value: 'MypageSettingAlarm' }, //차후 업뎃시 사용
    { key: '문의하기', value: 'MypageAsk' },
    { key: '개인정보 처리방침', value: 'MypagePolicy' },
    { key: 'APP 정보', value: 'MypageAppInfo' },
  ];

  const etc = [
    // { key: '알림 설정', value: 'MypageSettingAlarm' }, //차후 업뎃시 사용
    { key: '회원 탈퇴', value: 'RemoveUser' },
  ];


  const logout = [
    // { key: '알림 설정', value: 'MypageSettingAlarm' }, //차후 업뎃시 사용
    { key: '로그아웃', value: 'Logout' },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        // JWT 토큰 가져오기 (AsyncStorage 또는 다른 방식 사용)
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken);
        const response = await fetch(`${baseURL}/users/user_info/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setUserData(data);

        // userData 값을 AsyncStorage에 저장
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        console.log("[userInfo진입 메인]");
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>

      {/* 상단바 */}
      {/* <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{
        height: heightPercentage(480), alignItems: "center",
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
          alignItems: "center"

        }}>
          {userData && (
            <View style={{
              width: widthPercentage(28), // 이미지의 너비
              height: heightPercentage(28), // 이미지의 높이
              resizeMode: 'contain', // 이미지의 가로세로 비율을 유지하며 중앙에 맞춤
            }}>
              <UserIcon index={Number(userData.profile_image)} />

        </View>

          )}
        <View style={{
          marginLeft: widthPercentage(10)
        }}
        >

          {userData && (
            <View>
              <Text style={{ marginLeft: widthPercentage(5), color: colors.black, fontSize: fontPercentage(12), fontWeight: '600' }}>
                {userData.username}
              </Text>
              {/* 객체간 여백 */}
              <Blank height={1} />
              <Text style={{ marginLeft: widthPercentage(5), color: colors.fontGray, fontSize: fontPercentage(9), fontWeight: '600' }}>
                남도학숙 은평관 {userData.room}호
              </Text>
            </View>
          )}


        </View>



      </View>



      {/* 객체간 여백 */}
      <Blank height={15} />

      {/* "가입 이메일 변경" 버튼에 onPress 이벤트 추가 */}
      {/* <TouchableOpacity onPress={handleEmailChange}> */}
      <MypageWhiteBox title={"회원정보 수정"} buttons={editInfo} />
      {/* </TouchableOpacity> */}

      {/* 객체간 여백 */}
      <Blank height={15} />

      <MypageWhiteBox title={"내가 쓴 글"} buttons={myPost} />

      {/* 객체간 여백 */}
      <Blank height={15} />


      <MypageWhiteBox title={"이용 안내"} buttons={informUse} />

      {/* 객체간 여백 */}
      <Blank height={15} />


      <MypageWhiteBox title={"기타"} buttons={etc} />

      {/* 객체간 여백 */}
      <Blank height={15} />


      <MypageWhiteBox title={"로그아웃"} buttons={logout} />


    </View>



    </ScrollView >
  );
};

export default MypageMain;
