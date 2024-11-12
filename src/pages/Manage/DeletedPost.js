import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Alert, RefreshControl, TouchableOpacity, Dimensions } from "react-native"; // Dimensions 추가
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WithLocalSvg } from "react-native-svg/css";
import DeletedPostBox from "../../components/deletedPostBox";
import DeleteButton from '../../components/deleteButton';
import DeleteSvg from '../../assets/images/delete.svg';

const windowWidth = Dimensions.get('window').width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function DeletedPost() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [nowDelete, setNotDelete] = useState(false);
  const scrollViewRef = useRef(null); // ScrollView 참조
  const scrollPosition = useRef(0); // 스크롤 위치 저장
  const [refreshing, setRefreshing] = useState(false); // Pull to refresh 상태
  const [showBlock, setShowBlock] = useState(false);

  // 삭제된 게시글 API 호출
  const callDeletedAPI = async (reset = false) => {
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true);

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/administrators/delete/`;
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

      if (reset) {
        setData(newData); // 리셋 시 데이터 초기화
      } else {
        setData(prevData => [...prevData, ...newData]);
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
      callDeletedAPI();
    }
  }, [nextPageUrl]);

  useFocusEffect(
    React.useCallback(() => {
      if (data.length === 0) {
        callDeletedAPI(); 
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

  // 스크롤 이벤트 처리
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    scrollPosition.current = contentOffset.y; 

    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (!isFetchingData && nextPageUrl && nextPageUrl !== 'null') {
        callDeletedAPI();
      }
    }
  };

  // 새로고침 함수
  const onRefresh = () => {
    setRefreshing(true);
    setNextPageUrl(null); 
    callDeletedAPI(true); 
  };

  // 게시글 삭제 확인
  const deletePostClick = (id) => {
    Alert.alert(
      '이 게시글을 영구 삭제하시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => handleCommentConfirmation(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleCommentConfirmation = async (id) => {
    try {
      console.log("아이디!" + id);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${baseURL}/administrators/delete/`, {
        data: {
          post_id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('DELETE 요청 성공:', response.data);
      Alert.alert('게시글을 영구 삭제하였습니다.');
      setNotDelete(true);
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      setNotDelete(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); 
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
    const day = dateObject.getDate().toString().padStart(2, '0'); 
    return `${month}/${day}`; 
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.listArea}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            {showBlock && (
              <View style={styles.newBlock}>
                <TouchableOpacity onPress={() => deletePostClick(item.post_id)}>
                  <WithLocalSvg asset={DeleteSvg} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity>
              <DeletedPostBox
                bulletinName={item.board}
                title={item.title}
                content={item.content}
                good={item.like_size}
                comment={item.comment_size}
                date={formatDateString(item.created_at)}
                name={item.author_name}
                images={item.images.length > 0 ? item.images[0].imgfile : null}
                item={item}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <DeleteButton onPress={() => setShowBlock(!showBlock)} />
    </View>
  );
}

const styles = StyleSheet.create({
  newBlock: {
    width: widthPercentage(15),
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
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
