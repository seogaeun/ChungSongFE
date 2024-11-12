//BulleinContent.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Keyboard, Text, ScrollView, Dimensions, Image, Alert, KeyboardAvoidingView, Linking } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import { SheetProvider } from 'react-native-actions-sheet';

import InputComment from '../../components/InputComment';
import TopBar from '../../components/TopBar2';
import CommentBox from '../../components/commentBox';
import DeleteButton from '../../components/deleteButton';
import GoodSvg from '../../assets/images/good(green).svg';
import CommentSvg from '../../assets/images/comment(blue).svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReportModal from './ReportModal';
import SquareImage from '../../components/SquareImage';
import UserIcon from '../../components/UserIcon';
import { fontPercentage } from '../../utils/ResponsiveSize';
import { WithLocalSvg } from 'react-native-svg/css';
import Autolink from 'react-native-autolink';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;


export default function BulletinContent({ route, navigation }) {
  //  const { title, content, good, comment, date, name, bulletinName, post_id, board_id } = route.params;
  const { bulletinName, post_id, board_id, comp_post_id, noInput } = route.params;
  // console.log(noInput + ' 인풋값');

  const postID = comp_post_id ? comp_post_id : post_id;
  // console.log(receivedNoInput+' 인풋값');
  //console.log(post_id);

  // 댓글 목록을 저장할 상태
  const [comments, setComments] = useState([]);
  // 대댓글 목록을 저장할 상태
  const [secondComment, setSecondComment] = useState('');
  // 좋아요 상태를 저장할 상태
  //  const [liked, setLiked] = useState(false);
  // 댓글, 대댓글 상태를 저장할 상태
  const [isReplyMode, setIsReplyMode] = useState(false);
  // 모달 상태를 저장할 상태
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  // 신고 내역을 저장할 상태
  const [isReportContent, setIsReportContent] = useState('');


  // 익명 여부 값을 저장할 새로운 상태
  const [isSelected, setIsSelected] = useState(false);

  // 신고하기 or 삭제하기 여부를 저장할 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  //inputBar 상태 
  const [noInputState, setNoInputState] = useState(noInput || false);

  const [showBlock, setShowBlock] = useState(false);

  //상위 댓글 지정
  const [upperId, setUpperId] = useState('');
  const [boardId, setBoardId] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const commentReload = () => {
    fetchContentData();
    fetchComments();
    fetchData();

    //console.log(contentInfo);
  }


  // isSelected 변경을 처리하는 함수
  const handleCheckBoxChange = (value) => {
    setIsSelected(value);
    //console.log('isSelected:', value);
  };


  //두번째 댓글 추가
  const secondCommentAdd = (comment_id) => {
    // 여기에 두 번째 댓글을 추가하는 로직 작성
    setIsReplyMode(true);
    setUpperId(comment_id);
    //console.log(upperId);
    //console.log('두 번째 댓글 추가 함수 호출');
  };

  useEffect(() => {
    //console.log('upperId 변경:', upperId);
  }, [upperId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  //게시글 불러오기
  const fetchData = async () => {
    try {
      // JWT 토큰 가져오기 (AsyncStorage 또는 다른 방식 사용)
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${baseURL}/users/user_info/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      // userData 값을 AsyncStorage에 저장
      await AsyncStorage.setItem('userData', JSON.stringify(data));

      //console.log('API Response:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchContentData();
    fetchData();

    //console.log(contentInfo);
  }, []);

  useEffect(() => {
    //console.log("content", contentInfo);
  }, [contentInfo]);


  const handleReport = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      // //console.log("포스트 아이디" + post_id);
      // //console.log("카테고리" + isReportContent);
      // 게시글 신고 API 호출
      const apiUrl = `${baseURL}/complains/`;
      const data = {
        comp_post_id: post_id,
        category: isReportContent,
      };
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });


      // 응답 확인
      //console.log('신고 API 응답:', response.data);

      // 만약 정상적으로 처리되면 알림창 표시
      if (response.data.message === '신고가 접수되었습니다.') {
        Alert.alert('정상적으로 접수가 완료되었습니다. \n 검토까지는 최대 24시간이 소요됩니다. ');
        // isReportContent 값 초기화
        setIsReportContent('');
      } else {
        // 오류가 발생했을 때의 처리
        console.log(response.data.message);
        Alert.alert(response.data.message);
        // isReportContent 값 초기화
        setIsReportContent('');
      }
    } catch (error) {
      Alert.alert('이미 신고되었거나 신고할 수 없는 게시글입니다.');
      console.error('신고하기 요청 중 에러 발생:', error);
      setIsReportContent('');
      // 에러 처리 로직 추가
    }
  };



  // useEffect(() => {
  //   // isReportContent 값이 변경되면 처리 함수 호출
  //   if (isReportContent !== '') {
  //     handleReport();
  //   }
  // }, [isReportContent]);

  useEffect(() => {
    if (isReportContent !== '') {
      // Alert를 통해 사용자에게 iOS 스타일 확인 창 띄우기
      Alert.alert(
        isReportContent, // 제목
        "신고는 반대의견을 나타내는 기능이 아닙니다.\n신고 사유에 맞지 않는 신고를 했을 경우, 해당 신고는 처리되지 않습니다.", // 설명
        [
          {
            text: "취소", // 취소 버튼
            onPress: () => setIsReportContent(''), // 아무 동작 없이 종료
            style: "cancel",
          },
          {
            text: "확인", // 확인 버튼
            onPress: () => handleReport(), // handleReport 실행
          },
        ]
      );
    }
  }, [isReportContent]);



  // 삭제하기 함수
  const handleDelete = async () => {

    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 게시글 삭제 API 
      const apiUrl = `${baseURL}/boards/${board_id}/posts/${post_id}/`; // 수정된 부분
      //console.log(apiUrl);
      //console.log(apiUrl);
      const response = await axios.patch(apiUrl, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 응답 확인
      //console.log('Delete API 응답:', response.data);

      // 만약 삭제 성공이면 알림창 표시
      if (response.data.message === '게시글이 삭제되었습니다.') {
        await AsyncStorage.setItem('shouldRefreshBulletinList', 'true');
        console.log("shouldRefreshBulletinList 값 설정 완료");
        // 값이 제대로 저장되었는지 확인
        const storedValue = await AsyncStorage.getItem('shouldRefreshBulletinList');
        console.log("저장된 값 확인:", storedValue);

        Alert.alert('게시글이 삭제되었습니다.');
        // 이전 화면으로 이동하는 코드 작성
        navigation.goBack();
      } else {
        // 삭제 실패 시에 대한 처리 코드 작성
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error('게시글 삭제 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };





  //게시글 정보 저장
  const [contentInfo, setContentInfo] = useState([]);
  const createdDate = new Date(contentInfo.created_at);;


  const fetchContentData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userData = await AsyncStorage.getItem('userData');
      const { user_id } = JSON.parse(userData);

      const apiUrl = `${baseURL}/boards/${board_id}/posts/${post_id}/`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const postData = response.data;

      setContentInfo(postData);

      let showDeleteButton = postData.author_id === user_id;
      if (!showDeleteButton) {
        showDeleteButton = user_id === '7e81bee9-40f3-41aa-a9e4-dc7d7296965b';
      }
      setIsDeleteMode(showDeleteButton);

    } catch (error) {
      console.error('게시글 조회 중 에러 발생:', error);
      Alert.alert('게시글을 조회할 수 없습니다.');
      navigation.goBack();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      //console.log("재진입")
      fetchPostData();

      return () => {
        // Clean-up 작업
      };
    }, [])
  );

  //Content 생성
  const fetchPostData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${baseURL}/boards/${board_id}/posts/${postID}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const postData = response.data;

      // "error" 키가 존재하는 경우
      if (postData.error) {
        Alert.alert(postData.error); // 알림창 표시
        navigation.goBack(); // 이전 화면으로 돌아가기
        return;
      }

      setContentInfo(postData);

      const userData = await AsyncStorage.getItem('userData');
      const { user_id } = JSON.parse(userData);

      let showDeleteButton = postData.author_id === user_id;
      if (!showDeleteButton) {
        showDeleteButton = user_id === '7e81bee9-40f3-41aa-a9e4-dc7d7296965b';
      }
      setIsDeleteMode(showDeleteButton);

      if (board_id !== '1') {
        fetchComments();
      }


      // 댓글 데이터 조회
      fetchCommentData(); // 댓글 데이터를 가져오는 함수 호출

    } catch (error) {
      console.error('게시글 조회 중 에러 발생:', error);
      Alert.alert('게시글을 조회할 수 없습니다.');
      navigation.goBack();
    }
  };

  const fetchCommentData = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 댓글 조회 API 호출
      const apiUrl = `${baseURL}/boards/${board_id}/posts/${postID}/comments/`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const comment = response.data;
      // 여기에서 받아온 데이터(postData)를 사용하거나 처리하세요.
      console.log('게시글 데이터:', comment);
    } catch (error) {
      console.error('게시글 조회 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);




  // 댓글 등록 함수
  const handleCommentSubmit = (comment) => {
    // 새로운 댓글을 기존 댓글 목록에 추가
    setComments([...comments, comment]);
  };



  const bulletinGoodIconClick = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 좋아요 요청 보내기
      const apiUrl = `${baseURL}/boards/${board_id}/posts/${postID}/like/`;
      //console.log(apiUrl);
      const response = await axios.patch(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // 응답 확인
      //console.log('Like API 응답:', response.data);

      // 만약 다른 메시지면 Alert 창에 메시지 표시
      if (response.data.message !== '게시글을 좋아했습니다.') {
        Alert.alert(response.data.message);
      }

      // 서버 응답이 "게시글을 좋아했습니다."일 경우에만 게시글 데이터 다시 조회
      if (response.data.message === '게시글을 좋아했습니다.') {
        Alert.alert(response.data.message);
        // 게시글 조회 함수 호출
        fetchPostData();

      }
    } catch (error) {
      Alert.alert("오류가 발생했습니다");

      console.error('좋아요 요청 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };


  const handleDeleteConfirmation = () => {
    if (contentInfo.display == true) {
      Alert.alert(
        '해당 글을 삭제하시겠습니까?',
        '',
        [
          {
            text: '취소',
            onPress: () => console.log('취소 버튼이 눌렸습니다.'),
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => handleDelete(),
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        '해당 글을 영구 삭제하시겠습니까?',
        '',
        [
          {
            text: '취소',
            onPress: () => console.log('취소 버튼이 눌렸습니다.'),
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => handlePostConfirmation(contentInfo.post_id),
          },
        ],
        { cancelable: true }
      );
    }

  };


  //댓글 불러오기
  const fetchComments = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 댓글 조회 API 호출
      const apiUrl = `${baseURL}/boards/${board_id}/posts/${post_id}/comments/`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // 응답 데이터 파싱
      const commentsData = response.data;

      // 댓글 상태 업데이트
      setComments(commentsData);
      //console.log('댓글 데이터:', commentsData);
    } catch (error) {
      console.error('댓글 조회 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };



  const textInputRef = useRef(null);

  const handleButtonClick = () => {
    //console.log("onPress 작동");
    if (textInputRef.current) {
      setIsReplyMode(!isReplyMode);
      textInputRef.current.focus();

      //onCommentPress(true); // textinput이 활성화되면 isReplyMode를 true로 설정
    }
  };

  // const handleSecondCommentSubmit = (secondComment) => {
  //   // 두 번째 댓글 등록 후 실행되는 함수
  //   setSecondComment(secondComment);
  //   //console.log(secondComment);
  // };

  const changeReply = () => {
    //console.log("댓글 모드로 돌아옴");
    setIsReplyMode(!isReplyMode);
  }

  const handleModalChange = () => {
    setIsReportModalVisible(!isReportModalVisible);
  }

  const dummyBlock = () => {
    Alert.alert(
      "차단하기", // 제목
      "정말 작성자를 차단하시겠습니까?\n차단 이후에는 번복이 불가능하며, \n해당글 이후에 작성자가 작성한 글들은 보이지 않게 됩니다. ", // 내용 수정
      [
        {
          text: "취소", // 취소 버튼
          onPress: () => console.log("차단하기 취소됨"), // 취소를 누르면 아무 동작 없이 종료
          style: "cancel",
        },
        {
          text: "확인", // 확인 버튼
          onPress: () => {
            navigation.goBack();
            Alert.alert("차단하기가 완료되었습니다. \n 해당글 이후에 작성자가 작성한 글들은 보이지 않게 됩니다.");
          }, // 확인을 누르면 회원가입 페이지로 이동
        },
      ]
    );

  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsReplyMode(false);
      setUpperId('');
      //console.log("키보드 닫음");
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isReplyMode && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isReplyMode]);

  //댓글 좋아요

  const pressLike = async (comment_id) => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 좋아요 요청 보내기
      const apiUrl = `${baseURL}/boards/${board_id}/posts/${postID}/comments/${comment_id}/like/`;
      //console.log(apiUrl);
      const response = await axios.patch(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // 응답 확인
      //console.log('Like API 응답:', response.data);

      // 만약 다른 메시지면 Alert 창에 메시지 표시
      if (response.data.message !== '댓글을 좋아했습니다.') {
        Alert.alert(response.data.message);
      }

      // 서버 응답이 "댓글을 좋아했습니다."일 경우에만 댓글 데이터 다시 조회
      if (response.data.message === '댓글을 좋아했습니다.') {
        // 댓글 조회 함수 호출
        Alert.alert(response.data.message);
        fetchComments();
      }
    } catch (error) {
      console.error('좋아요 요청 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };


  const handlePostConfirmation = async (id) => {
    try {
      console.log(id);
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
      Alert.alert('게시글이 영구 삭제되었습니다.');
      // 여기에서 필요한 작업을 수행하세요.
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      // 여기에서 오류 발생 시 처리를 수행하세요.
    }
  };

  const handleDeleteButtonClick = () => {
    // 버튼 클릭 시 상태 변경
    setShowBlock(!showBlock);
    //console.log(showBlock);
  };

  const UserClick = (item) => {
    navigation.navigate('Confirm', { user_id: item.author_id });
  };

  const commentUserClick = (id) => {
    console.log('작성자' + id);
    navigation.navigate('Confirm', { user_id: id });
  };

  const secondCmtUserClick = (id) => {
    console.log('작성자' + id);
    navigation.navigate('Confirm', { user_id: id });
  };


  const handleCommentSuccess = (success) => {
    if (success) {
      fetchComments(); // 댓글이 성공적으로 작성되면 fetchComments 호출
    }
  };

  const handleLinkPress = (url) => {
    // 외부 웹 브라우저로 URL 열기
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      {/* <TopBar BulletinName={bulletinName} /> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0} // or whatever your offset is
      >


        <ScrollView >

          <ReportModal
            visible={isReportModalVisible}
            onClose={() => setIsReportModalVisible(false)}
            onReport={(option) => {
              //console.log(option); // 선택된 옵션을 출력합니다.
              setIsReportContent(option);
              setIsReportModalVisible(false);
            }}
          />

          <View style={[styles.contentArea, !contentInfo.display && { backgroundColor: '#ECECEC' }]}>
            {/* 글 상단부 */}
            <View style={styles.writer}>
              {contentInfo ? (
                contentInfo.anon_status ? (
                  isDeleteMode ? (
                    <TouchableOpacity onPress={() => UserClick(contentInfo)}>
                      <View style={styles.profileIcon}>
                        <UserIcon index={10} />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.profileIcon}>
                      <UserIcon index={10} />
                    </View>
                  )

                ) : (
                  isDeleteMode ? (
                    <TouchableOpacity onPress={() => UserClick(contentInfo)}>
                      <View style={styles.profileIcon}>
                        <UserIcon index={contentInfo.author_profile} />
                      </View>
                    </TouchableOpacity>
                  ) :
                    <View style={styles.profileIcon}>
                      <UserIcon index={contentInfo.author_profile} />
                    </View>
                )
              ) : (
                <View style={styles.profileIcon}>
                  <UserIcon index={10} />
                </View>
              )}
              <View style={styles.profileBox}>
                <Text style={styles.name}>{contentInfo.anon_status === true ? "익명" : contentInfo.author_name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.date}>{createdDate.getFullYear()} {(createdDate.getMonth() + 1).toString().padStart(2, '0')}/{createdDate.getDate().toString().padStart(2, '0')} {createdDate.getHours().toString().padStart(2, '0')}:{createdDate.getMinutes().toString().padStart(2, '0')}`</Text>
                  <TouchableOpacity onPress={() => (isDeleteMode ? handleDeleteConfirmation() : handleModalChange())}>
                    {isDeleteMode ? (
                      <Text style={{ ...styles.date, color: "#68b901", paddingLeft: 10, onPress: { handleModalChange } }}>
                        삭제하기
                      </Text>
                    ) : (
                      board_id !== '1' && (
                        <Text style={{ ...styles.date, paddingLeft: 10 }}>
                          신고하기
                        </Text>
                      )
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => (isDeleteMode ? dummy() : dummyBlock())}>
                    {isDeleteMode ? (
                      <Text style={{ ...styles.date, color: "#68b901", paddingLeft: 10, onPress: { handleModalChange } }}>
                      </Text>
                    ) : (
                      board_id !== '1' && (
                        <Text style={{ ...styles.date, paddingLeft: 10 }}>
                          차단하기
                        </Text>
                      )
                    )}
                  </TouchableOpacity>

                </View>

              </View>
            </View>

            {/* 글 메인 부분 */}
            <View style={styles.titleBox}>
              <Text style={styles.title}>{contentInfo.title}</Text>
            </View>

            <View style={styles.content}>
              <Autolink
                text={contentInfo.content}
                onPress={handleLinkPress}  // 링크 클릭 시 외부 브라우저로 열기
                style={styles.contentText} // 기존 Text 스타일을 Autolink에 전달
              />
            </View>

            {contentInfo.images && contentInfo.images.length > 0 && (
              <View style={styles.scrollView}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {contentInfo.images.map((image, index) => (
                    <SquareImage key={index} source={{ uri: image.imgfile }} onPress={() => console.log(`Pressed Image ${index + 1}`)} />
                  ))}
                </ScrollView>
              </View>
            )}



            {/* 하단 추천 파트 */}
            <View style={styles.lowBox}>
              <TouchableOpacity onPress={bulletinGoodIconClick}>
                <WithLocalSvg asset={GoodSvg} />
              </TouchableOpacity>
              <Text style={{ ...styles.lowText, color: "#68b901" }}>{contentInfo.like_size}</Text>
              {board_id !== '1' && <WithLocalSvg asset={CommentSvg} />}
              {board_id !== '1' && <Text style={{ ...styles.lowText, color: "#40A2DB" }}>{contentInfo.comment_size}</Text>}


            </View>
          </View>
          <View style={styles.line}></View>
          {board_id !== 1 &&
            <View style={styles.commentsArea}>

              {/* Render existing comments */}
              {comments.map((comment, index) => (
                <CommentBox
                  key={index}
                  isDelete={!comment.display}
                  onReplyModeChange={comment.up_comment_id !== null}
                  board_id={board_id}
                  post_id={postID}
                  comment_id={comment.comment_id}
                  name={comment.commenter}
                  created_at={comment.created_at}
                  content={comment.content}
                  anon_status={comment.anon_status} // comment 익명 처리 아직 안 함
                  like_size={comment.like_size}
                  warn_size={comment.warn_size} // 얘도
                  display={comment.display}  // 얘도
                  pressLike={pressLike}
                  writer_id={comment.writer_id}
                  profileIcon={comment.anon_status ? 10 : comment.commenter_profile}
                  reloadFunction={commentReload}
                  onPress={handleButtonClick}
                  secondComment={secondComment}
                  textInputRef={textInputRef}
                  changeReply={changeReply}
                  onChange={handleModalChange}
                  showBlock={showBlock}
                  secondCommentAdd={secondCommentAdd}
                  UserClick={commentUserClick}
                  secondCmtUserClick={secondCmtUserClick}
                />
              ))}

            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>


      {/* Pass the handleCommentSubmit function to InputComment */}
      {!noInputState ?

        <View style={[styles.footer, { bottom: heightPercentage(1.5) + keyboardOffset * 0.75, }]}>
          {board_id !== '1' &&
            <InputComment
              onCommentSubmit={handleCommentSubmit}
              textInputRef={textInputRef}
              // onSecondCommentSubmit={handleSecondCommentSubmit}
              isReplyMode={isReplyMode}
              anon_status={handleCheckBoxChange}
              board_id={board_id}
              post_id={postID}
              reloadFunction={commentReload}
              upperId={upperId}
              onSuccess={handleCommentSuccess} // 성공 처리 핸들러 전달
            />
          }

        </View>
        :
        <View style={[styles.footer, { bottom: heightPercentage(1) + keyboardOffset * 1.6, }]}>
          <DeleteButton onPress={handleDeleteButtonClick} />
        </View>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(104, 185, 1, 0.1)',
  },
  contentArea: {
    width: "100%",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 12,
    backgroundColor: "white",
  },
  commentsArea: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  header: {
    width: "100%",
    height: widthPercentage(10),
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "yellow",
  },
  bulletin: {
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(17),
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
  profileIcon: {
    width: widthPercentage(10),
    height: widthPercentage(10),
  },


  profileBox: {
    width: widthPercentage(75),
    height: "100%",
    //backgroundColor: "lightgreen",
    justifyContent: "center",
    paddingLeft: 10,
  },
  writer: {
    width: "100%",
    height: widthPercentage(15),
    //backgroundColor: "pink",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 10,
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: fontPercentage(16),
    fontWeight: "700",
    color: "#232323",
  },
  date: {
    fontFamily: "Pretendard",
    fontSize: fontPercentage(11),
    fontWeight: "300",
    color: "#acacac",
  },
  titleBox: {
    width: "100%",
    //backgroundColor: "skyblue",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: fontPercentage(18),
    fontWeight: "700",
    color: "#232323",
    marginBottom: widthPercentage(1),
    marginLeft: widthPercentage(2),
  },
  content: {
    width: "100%",
    flex: 1,
    //backgroundColor: "purple",
  },
  contentText: {
    fontFamily: "Pretendard",
    fontSize: fontPercentage(15),
    marginLeft: widthPercentage(2),
    fontWeight: "400",
    color: "#232323",
  },
  comment: {
    position: "absolute",
    bottom: 10,
  },
  line: {
    width: "100%",
    height: widthPercentage(0.3),
    backgroundColor: "#e5e5e7",
    paddingLeft: 30,
  },
  footer: {
    position: 'fixed',

    width: "100%",
    // height: widthPercentage(17),
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: "center",
    alignItems: "center",

  },
  lowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: 'pink',
    marginTop: 40,
    // position: "absolute",
    // bottome: 10,
  },
  lowText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(13),
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 8,

  },
})