import React, { useState, useEffect, useRef,useCallback } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import LoadingModal from "../../components/LoadingModal";
import TopBar2 from '../../components/TopBar2';
import ListBox from '../../components/listBox';
import WriteButton from "../../components/writeButton";

export default function BulletinList() {
  const [bulletins, setBulletins] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [bulletinName, setBulletinName] = useState("홍보게시판");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [schoolBoardID, setSchoolBoardID] = useState('');
  const [isloading, setLoading] = useState(false);
  const [isManage, setIsManage] = useState('');
  const scrollViewRef = useRef(null); 
  const scrollPosition = useRef(0); 
  const [dataLoaded, setDataLoaded] = useState(false); 
  const [refreshing, setRefreshing] = useState(false); 

  useFocusEffect(
    React.useCallback(() => {
      const checkRefreshStatus = async () => {
        const shouldRefresh = await AsyncStorage.getItem('shouldRefreshBulletinList');
        console.log(shouldRefresh)
        if (shouldRefresh === 'true') {
          fetchData(); // 데이터 새로고침
          await AsyncStorage.removeItem('shouldRefreshBulletinList'); // 상태 초기화
        }
      };

      checkRefreshStatus();

      return () => {
        // Clean-up 작업 (필요 시)
      };
    }, [])
  );
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

  const fetchUserInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${baseURL}/users/user_info/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setSchoolBoardID(data.school_board_id);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setBulletinName(route.params.bulletinName);
    fetchUserInfo();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (!dataLoaded) {
        fetchUserInfo();
        fetchData();
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
    }, [dataLoaded])
  );

  useEffect(() => {
    if (nextPageUrl && nextPageUrl !== 'null') {
      fetchData();
    }
  }, [nextPageUrl]);




  const fetchData = async (reset = false) => {
    if (isFetchingData) {
      return;
    }

    setIsFetchingData(true);

    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}${route.params?.path}`;
      console.log("api url!!"+apiUrl)
      if (!reset && nextPageUrl && nextPageUrl !== 'null') {
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

      if (reset) {
        setBulletins(data); // 리셋 시 데이터를 초기화하고 새 데이터를 설정
      } else {
        setBulletins(prevBulletins => [...prevBulletins, ...data]);
      }

      setDataLoaded(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("API 호출 중 에러 발생!!:", error);
    } finally {
      setIsFetchingData(false);
      setRefreshing(false); 
    }
  };

  // 새로고침 함수
  const onRefresh = () => {
    setRefreshing(true);
    setNextPageUrl(null); 
    fetchData(true); 
  };

  
  useFocusEffect(
    useCallback(() => {
      const checkRefreshStatus = async () => {
        const shouldRefresh = await AsyncStorage.getItem('shouldRefreshBulletinList');
        console.log("shouldRefresh:", shouldRefresh); // 여기서 값을 확인
        if (shouldRefresh === 'true') {
          console.log("데이터 새로고침 시작");
          onRefresh(); // 데이터를 새로고침
          await AsyncStorage.removeItem('shouldRefreshBulletinList'); // 플래그 초기화
        }
      };
  
      checkRefreshStatus();
  
      // 화면이 포커스 해제되었을 때의 정리 작업(필요 시)
      return () => {
        // 여기에 정리 코드 추가 가능 (필요 없으면 비워도 됨)
      };
    }, []) // useCallback을 사용해서 메모이제이션
  );
  

  // 스크롤 이벤트 핸들러
  const handleScroll = (event) => {
    if (event.nativeEvent) {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      scrollPosition.current = contentOffset.y; 

      const paddingToBottom = 20; // 스크롤이 바닥에 얼마나 가까워질 때 더 많은 데이터를 불러올지 결정
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
        // 데이터가 이미 로딩 중이 아니고, 다음 페이지 URL이 있는 경우에만 데이터 로드
        if (!isFetchingData && nextPageUrl && nextPageUrl !== 'null') {
          fetchData();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {isloading && (
        <LoadingModal></LoadingModal>
      )}      
      <TopBar2 BulletinName={bulletinName} />
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listArea}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {bulletins.map((bulletin, index) => (
          <TouchableOpacity key={index}>
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
