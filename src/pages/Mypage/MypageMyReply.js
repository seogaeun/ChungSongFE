import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import MyPostInfo from '../../components/Mypage/MyPostInfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import LoadingModal from '../../components/LoadingModal';

const MypageMyReply = () => {

  const [commentData, setCommentData] = useState([]);
  const [isloading, setLoading] = useState(false);


  const callMyCommentApi = async () => {
    try {
      setLoading(true);
      // AsyncStorage에서 accessToken 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (accessToken) {
        // API 호출
        const response = await axios.get(`${baseURL}/users/my_comments/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 응답 데이터 확인
        //console.log('댓글리스트업:', response.data.results);
        setCommentData(response.data.results);


        // 여기에서 응답 데이터를 처리하면 됩니다.
      } else {
        // accessToken이 없을 때의 처리
        console.log('accessToken이 없습니다.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error calling hot posts API:', error.message);
    }
  };

  useEffect(() => {
    callMyCommentApi();
  }, []);

  return (
    <View style={{ overflow: 'scroll' }}>
      {isloading && (
        <LoadingModal></LoadingModal>
      )}

      {/* 상단바 */}
      {/* <TopBar /> */}

      <ScrollView>
        {commentData.map((comment, index) => (

          <MyPostInfo
            key={index}
            post_id={comment.post_id}
            board_id={comment.board_id}
            goodCount={comment.like_size}
            commentCount={comment.comment_size}
            date={comment.created_at}
            who={comment.author_name}
            category={comment.board}
            title={comment.title}
            subtitle={comment.content}
          />
        ))}


      </ScrollView>


      {/* 메인 화면단 */}




    </View>
  );
};

export default MypageMyReply;
