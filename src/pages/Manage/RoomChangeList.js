import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import RoomChangeBlock from "../../components/roomChangeBlock";
import TopBar from '../../components/TopBar2';
import { TouchableOpacity } from "react-native-gesture-handler";
import Confirm from './Confirm';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function RoomChangeList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isComplete, setIsComplete] = useState(false);


  const reLoadFunction = async () => {
    setData([]);
    callRoomChangeApi();
  };

  const callRoomChangeApi = async () => {

    // 이미 데이터를 가져오는 중이라면 함수를 실행하지 않음
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); // 데이터를 가져오는 중이라고 표시

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/administrators/room_request/`;

      if (nextPageUrl && nextPageUrl !== 'null') {
        apiUrl = nextPageUrl;
      }
      const response = await axios.get(apiUrl,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'

            // 추가적인 헤더 필요시 여기에 추가
          },
          // 추가적인 Request Body 필요시 여기에 추가
        });
      console.log("데이터를 받아왔습니다");
      const data = response.data.results;
      console.log("그다음 데이터 링크",data)
      setNextPageUrl(response.data.links.next);
      if (data.length > 0) {
        //console.log("추가");
        setData(prevData => [...prevData, ...data]);
        //console.log(postData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false); // 데이터를 가져오는 중이라고 표시

    }
  };

  useEffect(() => {
    if (nextPageUrl && nextPageUrl !== 'null') {
      callRoomChangeApi(nextPageUrl);
    }
  }, [nextPageUrl]);  


  useFocusEffect(
    React.useCallback(() => {
      reLoadFunction();
    }, [])
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      // 스크롤이 페이지 하단에 도달하면 다음 페이지 데이터를 불러옴
      if (nextPageUrl && nextPageUrl !== 'null') {
        //console.log('페이지네이션');
        callRoomChangeApi(nextPageUrl);
      }
    }
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); // 문자열을 Date 객체로 변환
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = dateObject.getDate().toString().padStart(2, '0'); // 일
    return `${month}/${day}`; // 월과 일을 조합한 결과
  };


  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
        <View>
          {data.map((item, index) => (
              <RoomChangeBlock
                room_request_id={item.room_request_id}
                name={item.username}
                nickname={item.nickname}
                preRoom={item.pre_room}
                nextRoom={item.new_room}
                date={formatDateString(item.created_at)}
                status={item.status}
                reLoadFunction={reLoadFunction}
              />
          ))}


        </View>

      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    width: "100%",
    height: widthPercentage(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",

    //flex: 1,
  },
  bulletin: {
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 17,
    fontWeight: "700",
    color: "#232323",
  },
  backBotton: {
    width: widthPercentage(8),
    height: widthPercentage(8),
    position: "absolute",
    left: 2,
    //backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  backBottonIcon: {
    width: widthPercentage(3),
    height: widthPercentage(5.5),
  },


})