import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, RefreshControl } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import ConfirmBlock from '../../components/confirmBlock';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ConfirmList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 상태

  const callManaUserApi = async (reset = false) => {
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true);

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/administrators/new_user/`;

      if (nextPageUrl && nextPageUrl !== 'null' && !reset) {
        apiUrl = nextPageUrl;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("데이터를 받아왔습니다");
      const data = response.data.results;
      setNextPageUrl(response.data.links.next);

      if (reset) {
        // 초기화 모드일 경우 기존 데이터 덮어쓰기
        setData(data);
      } else if (data.length > 0) {
        setData(prevData => [...prevData, ...data]);
      }

      await AsyncStorage.setItem('confirmListData', JSON.stringify({ data: reset ? data : [...data], nextPageUrl: response.data.links.next }));

    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false);
      if (isRefreshing) setIsRefreshing(false); // 새로고침 완료
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setNextPageUrl(null); // 다음 페이지 URL 초기화
    callManaUserApi(true); // 데이터 새로 고침
  };

  // 이전 상태를 AsyncStorage에서 불러오는 함수
  const loadPreviousData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('confirmListData');
      const savedScrollPos = await AsyncStorage.getItem('confirmListScrollPosition');

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData.data);
        setNextPageUrl(parsedData.nextPageUrl);
      }

      if (savedScrollPos) {
        setScrollPosition(Number(savedScrollPos));
      }
    } catch (error) {
      console.error("이전 데이터를 불러오지 못했습니다:", error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isInitialLoad) {
        loadPreviousData();
      }

      return () => {
        if (scrollViewRef.current) {
          AsyncStorage.setItem('confirmListScrollPosition', JSON.stringify(scrollPosition));
        }
      };
    }, [isInitialLoad])
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    setScrollPosition(contentOffset.y);

    const paddingToBottom = 10;

    // 스크롤이 하단에 도달하면 다음 페이지 데이터 불러오기
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      if (nextPageUrl && nextPageUrl !== 'null') {
        callManaUserApi();
      }
    }

    // 스크롤이 최상단에 도달하면 새로고침
    if (contentOffset.y <= 0 && !isFetchingData) {
      refreshData();
    }
  };

  const handleInfoInnerBoxClick = (item) => {
    console.log(item.user_id);
    navigation.navigate('Confirm', item);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />
        }
        onLayout={() => {
          if (scrollViewRef.current && scrollPosition) {
            scrollViewRef.current.scrollTo({ y: scrollPosition, animated: false });
          }
        }}
      >
        <View>
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleInfoInnerBoxClick(item)}>
              <ConfirmBlock
                userID={item.user_id}
                name={item.username}
                ID={item.nickname}
                room={item.room}
                univ={item.school}
                email={item.email}
                complained={item.complained}
                status={item.status}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
