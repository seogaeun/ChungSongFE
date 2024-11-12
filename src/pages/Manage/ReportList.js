import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ReportBlock from "../../components/reportBlock";
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ReportList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null); // ScrollView 참조
  const scrollPosition = useRef(0); // 스크롤 위치 저장

  const callReportUserApi = async (reset = false) => {
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); 

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/complains/`;
      if (!reset && nextPageUrl && nextPageUrl !== 'null') {
        apiUrl = nextPageUrl;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("데이터를 받아왔습니다");
      const newData = response.data.results;
      setNextPageUrl(response.data.links.next);

      if (newData.length > 0) {
        if (reset) {
          setData(newData); // 리셋 시 데이터를 초기화하고 새 데이터를 설정
        } else {
          setData(prevData => [...prevData, ...newData]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false); 
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    if (nextPageUrl && nextPageUrl !== 'null') {
      callReportUserApi();
    }
  }, [nextPageUrl]);

  useFocusEffect(
    React.useCallback(() => {
      if (data.length === 0) {
        callReportUserApi(); 
      } else {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: scrollPosition.current, animated: false });
        }
      }

      return () => {
        if (scrollViewRef.current) {
          scrollPosition.current = scrollPosition.current;
        }
      };
    }, [data])
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    scrollPosition.current = contentOffset.y; 

    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (!isFetchingData && nextPageUrl && nextPageUrl !== 'null') {
        callReportUserApi();
      }
    }
  };

  // 새로고침 함수
  const onRefresh = () => {
    setRefreshing(true);
    setNextPageUrl(null); 
    callReportUserApi(true); 
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); 
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
    const day = dateObject.getDate().toString().padStart(2, '0'); 
    return `${month}/${day}`; 
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
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Pull to refresh 추가
        }
      >
        <View>
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
  },
});
