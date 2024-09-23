// DeletedPost.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WithLocalSvg } from "react-native-svg/css";
import TopBar2 from '../../components/TopBar2';
import DeletedPostBox from "../../components/deletedPostBox";
import DeleteButton from '../../components/deleteButton';
import DeleteSvg from '../../assets/images/delete.svg';
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function DeletedPost() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [nowDelete, setNotDelete] = useState(false);
  const scrollViewRef = React.useRef(null);


  const callDeletedAPI = async () => {
    // 이미 데이터를 가져오는 중이라면 함수를 실행하지 않음
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); // 데이터를 가져오는 중이라고 표시

    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/administrators/delete/`;
      if (nextPageUrl && nextPageUrl !== 'null') {
        apiUrl = nextPageUrl;
      }
      const response = await axios.get(apiUrl,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'

          },
          // 추가적인 Request Body 필요시 여기에 추가
        });
      console.log("데이터를 받아왔습니다");
      const data = response.data.results;
      console.log("그다음 데이터 링크", data)
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
      callDeletedAPI(nextPageUrl);
    }
  }, [nextPageUrl]);


  useFocusEffect(
    React.useCallback(() => {
      setData([]);
      console.log("FocusEffect 발동!");
      //console.log(postData);
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
      callDeletedAPI();
      setNotDelete(false);

    }, [nowDelete])
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      // 스크롤이 페이지 하단에 도달하면 다음 페이지 데이터를 불러옴
      if (nextPageUrl && nextPageUrl !== 'null') {
        //console.log('페이지네이션');
        callDeletedAPI(nextPageUrl);
      }
    }
  };

  const [showBlock, setShowBlock] = useState(false);
  const [items, setItems] = useState([]);

  const handleButtonClick = () => {
    // 버튼 클릭 시 상태 변경
    setShowBlock(!showBlock);
  };

  const deletePostClick = (id) => {
    // 댓글 상자 클릭 시 알림 창 표시
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
      console.log("아이디!"+id);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${baseURL}/administrators/delete/`, {
        data: {
          post_id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log('DELETE 요청 성공:', response.data);
      Alert.alert('게시글을 영구 삭제하였습니다.');
      setNotDelete(true);
      // 여기에서 필요한 작업을 수행하세요.
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      // 여기에서 오류 발생 시 처리를 수행하세요.
      setNotDelete(false)
    }
  };

  // 더미 데이터로 items 초기화
  const initialItems = [
    { bulletin: "자유게시판", title: "삭제된 글 1", content: "내용 1" },
    { title: "삭제된 글 2", content: "내용 2" },
    // ... 더 많은 아이템들 ...
  ];

  // 컴포넌트가 마운트될 때 초기 데이터 설정
  useState(() => {
    setItems(initialItems);
  }, []);

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); // 문자열을 Date 객체로 변환
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = dateObject.getDate().toString().padStart(2, '0'); // 일
    return `${month}/${day}`; // 월과 일을 조합한 결과
  };


  return (
    <View style={styles.container}>

      <ScrollView ref={scrollViewRef}
        contentContainerStyle={styles.listArea} scrollEventThrottle={16} onScroll={handleScroll}>

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

      <DeleteButton onPress={handleButtonClick} />
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