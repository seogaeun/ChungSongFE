import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import LoadingModal from "../../components/LoadingModal";

import TopBar2 from '../../components/TopBar2';
import ListBox from '../../components/listBox';
import WriteButton from "../../components/writeButton";

export default function BulletinList() {
  const [bulletins, setBulletins] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bulletinName, setBulletinName] = useState("홍보게시판");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [schoolBoardID, setSchoolBoardID] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [isManage, setIsManage] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 첫 로드 여부를 저장

  useEffect(() => {
    const manageData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const { user_id } = JSON.parse(userData);
        const manager = user_id === '7e81bee9-40f3-41aa-a9e4-dc7d7296965b';
        setIsManage(manager);
      } catch (error) {
        console.log(error);
      }
    };
    manageData();
  }, []);

  // 데이터 로딩 함수
  const fetchData = async (restoreData = false) => {
    if (isFetchingData) return;
    setIsFetchingData(true);

    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}${route.params?.path}`;

      if (nextPageUrl && !restoreData) {
        apiUrl = nextPageUrl;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      const data = response.data.results;
      setNextPageUrl(response.data.links.next);

      if (data.length > 0) {
        setBulletins(prevBulletins => restoreData ? data : [...prevBulletins, ...data]);
      }

      setLoading(false);

      // 데이터를 불러온 후에 AsyncStorage에 저장
      await AsyncStorage.setItem('bulletinData', JSON.stringify({ bulletins: [...bulletins, ...data], nextPageUrl }));

    } catch (error) {
      setLoading(false);
      console.error("API 호출 중 에러 발생:", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  // 이전 상태를 AsyncStorage에서 불러오는 함수
  const loadPreviousData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('bulletinData');
      const savedScrollPos = await AsyncStorage.getItem('scrollPosition');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setBulletins(parsedData.bulletins);
        setNextPageUrl(parsedData.nextPageUrl);
        if (savedScrollPos) {
          setScrollPosition(Number(savedScrollPos));
        }
      } else {
        // AsyncStorage에 데이터가 없을 경우 API를 통해 데이터 가져오기
        await fetchData(true);
      }
    } catch (error) {
      console.error("이전 데이터를 불러오지 못했습니다:", error);
    } finally {
      setIsInitialLoad(false); // 첫 로드 완료
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isInitialLoad) {
        loadPreviousData(); // 첫 로딩 때만 이전 데이터 불러오기
      }

      return () => {
        if (scrollViewRef.current) {
          AsyncStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
        }
      };
    }, [isInitialLoad])
  );

  const handleScroll = (event) => {
    if (event.nativeEvent) {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      setScrollPosition(contentOffset.y);

      const paddingToBottom = 50;
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
        if (nextPageUrl) {
          fetchData();
        }
      }
    }
  };

  const handleListBoxClick = (bulletinName, bulletin) => {
    navigation.navigate('BulletinContent', { bulletinName, bulletin });
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingModal />}
      <TopBar2 BulletinName={bulletinName} />
      <ScrollView 
        ref={scrollViewRef} 
        scrollEventThrottle={16} 
        contentContainerStyle={styles.listArea} 
        onScroll={handleScroll}
        onLayout={() => {
          if (scrollViewRef.current && scrollPosition) {
            scrollViewRef.current.scrollTo({ y: scrollPosition, animated: false });
          }
        }}
      >
        {bulletins.map((bulletin, index) => (
          <TouchableOpacity key={index} onPress={() => handleListBoxClick(bulletinName, bulletin)}>
            <ListBox
              info={bulletin}
              post_id={bulletin.post_id}
              board_id={bulletin.board_id}
              title={bulletin.title}
              content={bulletin.content}
              good={bulletin.like_size}
              comment={bulletin.comment_size}
              date={bulletin.created_at}
              name={bulletin.author_name}
              images={bulletin.images.length > 0 ? bulletin.images[0].imgfile : null}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {(bulletinName === "공지사항" && isManage === false) || bulletinName === "웅성웅성" ? null : <WriteButton board_id={bulletinName === "학교별 게시판" ? schoolBoardID : bulletins[0]?.board_id} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  listArea: {
    paddingLeft: 7,
    paddingRight: 7,
  },
});
