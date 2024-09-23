import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import MyAlarmInfo from '../../components/MainView/MyAlarmInfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { baseURL } from '../../../baseURL';
import LoadingModal from '../../components/LoadingModal';


const AlarmPage = () => {
  const [alarmData, setAlarmData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    callHotPostsApi();
  }, []);



  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      // 스크롤이 페이지 하단에 도달하면 다음 페이지 데이터를 불러옴
      console.log("페이지네이션!")
      if (nextPageUrl && nextPageUrl !== 'null') {
        //console.log('페이지네이션');
        callHotPostsApi(nextPageUrl);
      }
    }
  };



  const callHotPostsApi = async () => {

    // 이미 데이터를 가져오는 중이라면 함수를 실행하지 않음
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); // 데이터를 가져오는 중이라고 표시

    try {
      setLoading(true);
      // AsyncStorage에서 accessToken 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(`${baseURL}/users/my_notices/`);

      let apiUrl = `${baseURL}/users/my_notices/`;

      if (nextPageUrl && nextPageUrl !== 'null') {
        apiUrl = nextPageUrl;
      }

      if (accessToken) {
        // API 호출
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = response.data.results;
        console.log('알림게시글:', response.data.results);

        setNextPageUrl(response.data.links.next);
        if (data.length > 0) {
          //console.log("추가");
          setAlarmData(prevData => [...prevData, ...data]);
          //console.log(postData);
        }




        // 여기에서 응답 데이터를 처리하면 됩니다.
      } else {
        // accessToken이 없을 때의 처리
        console.log('accessToken이 없습니다.');
      }
      setLoading(false);

    } catch (error) {
      console.error('Error calling hot posts API:', error.message);
      setLoading(false);
    } finally {
      setIsFetchingData(false); // 데이터를 가져오는 중이라고 표시

    }
  };


  useEffect(() => {
    if (nextPageUrl && nextPageUrl !== 'null') {
      callHotPostsApi(nextPageUrl);
    }
  }, [nextPageUrl]);



  // ListBox 클릭 시 BulletinContent로 이동하면서 bulletinName 전달
  const handleListBoxClick = (board_id, post_id, category) => {
    if (category !== "정지") {
      navigation.navigate('BulletinContent', {
        board_id,
        post_id,

      });
    }
  };


  return (
    <View style={{ overflow: 'scroll' }}>
      {isLoading && (
        <LoadingModal></LoadingModal>
      )}

      {/* 상단바 */}
      {/* <TopBar /> */}

      <ScrollView onScroll={handleScroll}>

        {alarmData.map((alarm, index) => (
          <MyAlarmInfo
            onPress={() => handleListBoxClick(alarm.board_id, alarm.post_id, alarm.category)}
            key={index}
            type={alarm.category}
            date={alarm.created_at}
            who="익명"
            fontColor={colors.green}
            category={alarm.notice_title}
            subtitle={`${alarm.message}: ${alarm.content}`}
          />
        ))}


      </ScrollView>


      {/* 메인 화면단 */}




    </View>
  );
};

export default AlarmPage;
