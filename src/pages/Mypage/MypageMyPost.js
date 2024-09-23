import React, { useState, useEffect } from 'react'; 
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
//컴포넌트 모음
import MyPostInfo from '../../components/Mypage/MyPostInfo';
import LoadingModal from '../../components/LoadingModal';

const MypageMyPost = () => {
  const [postData, setPostData] = useState([]);
  // 스크롤 이벤트 핸들러
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const navigation = useNavigation();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isloading, setLoading] = useState(false);

  const callMyPostApi = async () => {
    // 이미 데이터를 가져오는 중이라면 함수를 실행하지 않음
    if (isFetchingData) {
      console.log("중복 호출 시도");
      return;
    }

    setIsFetchingData(true); // 데이터를 가져오는 중이라고 표시

  
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      let apiUrl = `${baseURL}/users/my_posts/`;
  
      if (nextPageUrl && nextPageUrl !== 'null') {
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
        //console.log("추가");
        setPostData(prevData => [...prevData, ...data]);
        //console.log(postData);
      }
  

      //console.log('게시글리스트업:', response.data.links);
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
      callMyPostApi(nextPageUrl);
    }
  }, [nextPageUrl]);  



  useFocusEffect(
    React.useCallback(() => {
      setPostData([]);
      //console.log("FocusEffect 발동!");
      //console.log(postData);
      callMyPostApi();

    }, [])
  );



  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom || contentSize.height === layoutMeasurement.height) {
      // 스크롤이 페이지 하단에 도달하면 다음 페이지 데이터를 불러옴
      if (nextPageUrl && nextPageUrl !== 'null') {
        //console.log('페이지네이션');
        callMyPostApi(nextPageUrl);
      }
    }
  };
  
  

  const handlePostInfoPress = (board,board_id,post_id) => {
    //console.log("버튼 클릭");
    // Navigate to BulletinContent screen with board_id and post_id
    navigation.navigate('BulletinContent', {
      board, board_id,post_id,
    });
  };

  return (
    <View >

      {/* 상단바 */}
      {/* <TopBar /> */}
      {isloading && (
        <LoadingModal></LoadingModal>
      )}      

      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>

        {postData.map((post, index) => (

          <MyPostInfo
            onPress={() => handlePostInfoPress(post.board, post.post_id, post.board_id)}
            key={index}
            post_id={post.post_id}
            board_id={post.board_id} 
            goodCount={post.like_size}
            postCount={post.post_size}
            date={post.created_at}
            who={post.author_name}
            category={post.board}
            title={post.title}
            subtitle={post.content}
          />
        ))}


      </ScrollView>


      {/* 메인 화면단 */}




    </View>
  );
};

export default MypageMyPost;
