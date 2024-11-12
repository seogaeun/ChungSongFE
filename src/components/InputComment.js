// InputComment.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가
import axios from 'axios';
import baseURL from '../../baseURL';
import SendSvg from '../assets/images/send.svg';
import CheckBox from './anonymousCheck';
import CommentBox from './commentBox';
import { WithLocalSvg } from 'react-native-svg/css';

import { heightPercentage, widthPercentage } from '../utils/ResponsiveSize';

export default function InputComment({ board_id, post_id, anon_status, onCommentSubmit, textInputRef, isReplyMode, reloadFunction, upperId,onSuccess }) {
  const [commentContent, setCommentContent] = useState("");
  const [isSelected, setIsSelected] = useState(false); // 1. isSelected 상태 정의



  //댓글 작성 post api
  const registComment = async () => {
    console.log("일반 댓글 모드");
    console.log(commentContent, isSelected);
    try {

      const accessToken = await AsyncStorage.getItem('accessToken');

      //댓글 등록 API
      const apiUrl = `http://3.34.54.187:8000/boards/${board_id}/posts/${post_id}/comments/`;
      console.log(apiUrl);
      const requestBody = {
        content: commentContent,
        anon_status: isSelected,
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // 응답 확인
      console.log('게시글 작성 응답:', response.data);
      console.log(response.data);
      Keyboard.dismiss();
      reloadFunction();

      console.log("response 메시지 " + response.data.message);
      if (response.data.comment_id !== undefined && response.data.comment_id !== null) {
        // Alert 창 표시
        onSuccess(true); // 여기서 onSuccess 호출
        Alert.alert('작성 완료', '댓글 작성이 완료되었습니다.');

      }
      else {
        // Alert 창 표시
        onSuccess(false); // 여기서 onSuccess 호출
        Alert.alert('작성 실패', response.data.message);

      }





    } catch (error) {
      console.error('게시글 작성 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };


  //대댓글 작성 post api
  const onSecondCommentSubmit = async () => {
    console.log("대댓글 모드");
    console.log(commentContent, isSelected);
    try {

      const accessToken = await AsyncStorage.getItem('accessToken');

      //댓글 등록 API
      const apiUrl = `http://3.34.54.187:8000/boards/${board_id}/posts/${post_id}/comments/`;
      console.log(apiUrl);
      const requestBody = {
        content: commentContent,
        anon_status: isSelected,
        up_comment_id: upperId, // upperId를 요청에 포함

      };
      console.log("댓글 등록 바디 ");
      console.log(requestBody);
      console.log("============");
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // 응답 확인
      console.log('게시글 작성 응답:', response.data);
      console.log(response.data);
      Keyboard.dismiss();
      reloadFunction();


      console.log(response.data.message);
      if (response.data.comment_id !== undefined && response.data.comment_id !== null) {
        // Alert 창 표시
        onSuccess(true); // 여기서 onSuccess 호출
        Alert.alert('작성 완료', '댓글 작성이 완료되었습니다.');

      }
      else {
        // Alert 창 표시
        onSuccess(false); // 여기서 onSuccess 호출
        Alert.alert('작성 실패', response.data.message);

      }


    } catch (error) {
      console.error('게시글 작성 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };


  //익명 여부 선택하는 체크박스 함수
  const handleCheckBox = () => {
    setIsSelected(!isSelected); // 3. 상태 변경 함수
    console.log(!isSelected);
  };
  //const [isReplyMode, setIsReplyMode] = useState(false);

  // const onSecondCommentSubmit = () => {

  // }


  //댓글 전송 버튼 클릭시 데이터 정리 함수
  const handleSendComment = () => {
    console.log("전송 버튼 클릭")
    anon_status(!isSelected);
    if (commentContent.trim() !== "") {
      if (isReplyMode) {
        // 대댓글 모드일 때, 부모 컴포넌트로 대댓글 내용 전달
        onSecondCommentSubmit(commentContent);
      } else {
        // 일반 댓글 모드일 때, 부모 컴포넌트로 댓글 내용 전달
        //onCommentSubmit(commentContent);
        registComment(commentContent);
      }

      // 입력 필드 초기화
      setCommentContent("");
    }
  };

  // useEffect(() => {
  //   // textInputRef가 변경되고, commentSvg를 눌렀을 때만 상태 변경
  //   if (textInputRef.current !== null) {
  //     onCommentPress(true);
  //   }
  // }, [textInputRef, onCommentPress]);

  return (
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={500}

    >
      <View style={styles.container}>
        <CheckBox onCheckBoxChange={handleCheckBox} />
        <TextInput
          style={styles.text}
          placeholder={isReplyMode ? '대댓글을 입력해주세요.' : '댓글을 입력하세요'}
          placeholderTextColor="#acacac"
          multiline
          value={commentContent}
          onChangeText={(text) => setCommentContent(text)}
          ref={textInputRef}
        />
        <TouchableOpacity onPress={handleSendComment}>
          <View style={styles.sendIcon}>
            <WithLocalSvg asset={SendSvg} />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: widthPercentage(280),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#68b901',
    borderRadius: 30,
    paddingLeft: 12,
    paddingRight: 15,
  },
  text: {
    flex: 1,
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sendIcon: {
    width: widthPercentage(20),
    height: heightPercentage(20),
  },
});
