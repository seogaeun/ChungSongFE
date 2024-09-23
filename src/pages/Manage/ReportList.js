import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Confrim from '../../components/confirmBlock';
import TopBar from '../../components/TopBar2';
import ReportBlock from "../../components/reportBlock";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ReportList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const callReportUserApi = async () => {
    // 이미 데이터를 가져오는 중이라면 함수를 실행하지 않음
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); // 데이터를 가져오는 중이라고 표시

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/complains/`;
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
      callReportUserApi(nextPageUrl);
    }
  }, [nextPageUrl]);  


  useFocusEffect(
    React.useCallback(() => {
      setData([]);
      //console.log("FocusEffect 발동!");
      //console.log(postData);
      callReportUserApi();

    }, [])
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      // 스크롤이 페이지 하단에 도달하면 다음 페이지 데이터를 불러옴
      if (nextPageUrl && nextPageUrl !== 'null') {
        //console.log('페이지네이션');
        callReportUserApi(nextPageUrl);
      }
    }
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); // 문자열을 Date 객체로 변환
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = dateObject.getDate().toString().padStart(2, '0'); // 일
    return `${month}/${day}`; // 월과 일을 조합한 결과
  };

  const reportedUserClick = (item) => {
    console.log(item.comped_user_id);
    navigation.navigate('Confirm', { comped_user_id: item.comped_user_id });
  };

  const reportUserClick = (item) => {
    console.log(item.comp_user_id);
    navigation.navigate('Confirm', { comp_user_id: item.comp_user_id });
  };


  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
        <View >
          {data.map((item, index) => (
            <ReportBlock
              key={index}

              tag={item.tag}
              date={formatDateString(item.created_at)}
              category={item.category}
              complainedUser={item.comped_user_name}
              status={item.status}
              complainedUserID={item.comped_user_id}
              postID={item.post_id}
              boardID={item.board_id}
              item={item}
              complain_id={item.complain_id}
              reportedUserClick={reportedUserClick}
              reportUserClick={reportUserClick}
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
    //justifyContent: "flex-start",
  },
  //   contentArea: {
  //     paddingTop: 10,
  //     paddingLeft: 15,
  //     paddingRight: 15,
  //     //backgroundColor: "gray",
  //   },
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