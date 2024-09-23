// CommentBox.js

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import baseURL from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가
import axios from 'axios';
import GoodSvg from '../assets/images/good(gray).svg';
import GoodSvg_green from '../assets/images/good(green).svg';
import CommentSvg from '../assets/images/comment(gray).svg';
import ReportSvg from '../assets/images/report(gray).svg';
import SecondCommentBox from './secondCommentBox';
import XSvg_green from '../assets/images/X(green).svg';
import ReportModal from '../pages/Bulletin/ReportModal';
import UserIcon from './UserIcon';
import DeleteSvg from '../assets/images/delete.svg';
import { colors } from '../constants/colors';
import { fontPercentage } from '../utils/ResponsiveSize';
import { WithLocalSvg } from 'react-native-svg/css';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function CommentBox({ secondCommentAdd, reloadFunction, profileIcon = 10, onReplyModeChange, pressLike, board_id, post_id, comment_id, name, created_at, content, anon_status, like_size, writer_id, display, showBlock, UserClick, secondCmtUserClick}) {
  // console.log("댓글 루트");
  // console.log(route);
  // const {  } = route.params;
  const navigation = useNavigation();
//  const [liked, setLiked] = useState(false);

  const [secondComments, setSecondComments] = useState([]); // 새로운 상태 추가
  const prevSecondCommentRef = useRef('');
  const [secondComment, setSecondComment] = useState(true);
  const createdAtDate = new Date(created_at);
  // 신고하기 or 삭제하기 여부를 저장할 상태
  const [isDeleteMode, setIsDeleteMode] = useState(true);
  // 모달 상태를 저장할 상태
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  // 신고 내역을 저장할 상태
  const [isReportContent, setIsReportContent] = useState('');

  // 날짜와 시간을 원하는 형식으로 변환
  const formattedDate = `${createdAtDate.getFullYear()}/${String(createdAtDate.getMonth() + 1).padStart(2, '0')}/${String(createdAtDate.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(createdAtDate.getHours()).padStart(2, '0')}:${String(createdAtDate.getMinutes()).padStart(2, '0')}`;

  // 관리자인지 아닌지에 대한 상태 저장
  const [isManage, setIsManage] = useState('');

  //관리자 정보 저장
  useEffect(() => {
    const manageData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');

        const { user_id } = JSON.parse(userData);

        const manager = user_id === '7e81bee9-40f3-41aa-a9e4-dc7d7296965b';
        setIsManage(manager);
        console.log(manager + '입니당');
      } catch (error) {
        console.log(error);
      }
    };
    manageData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log(userData);
        if (userData) {
          const { user_id } = JSON.parse(userData);
          let writer = writer_id === user_id;
          if(writer == false) {
            writer = user_id === '7e81bee9-40f3-41aa-a9e4-dc7d7296965b';
          }
          setIsDeleteMode(writer);
          console.log(writer_id);
          console.log(writer);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // 의존성 배열(dependency array)이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행됩니다.


  const handleSecondCommentSubmit = () => {
    console.log("대댓글 값 추가");
    setSecondComments([...secondComments, secondComment]);
  }

  useEffect(() => {
    if (secondComment !== '' && secondComment !== prevSecondCommentRef.current) {
      console.log("대댓글 값 변경");
      console.log(secondComment);
      handleSecondCommentSubmit();
      prevSecondCommentRef.current = secondComment;
    }
  }, [secondComment]);

  const secondCommentBoxClick = () => {
    //여기에 값을 올릴 파라미터 추가
    console.log('대댓글 입력');
    secondCommentAdd(comment_id);


  };

  //일반 삭제
  const handleDeleteConfirmation = () => {
    if(display == true) {
      Alert.alert(
        '해당 댓글을 삭제하시겠습니까?',
        '',
        [
          {
            text: '취소',
            onPress: () => console.log('취소 버튼이 눌렸습니다.'),
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => handleDeleteComment(),
          },
        ],
        { cancelable: true }
      );
    } else {
      deleteCommentClick(comment_id);
    }
    
  };

  //일반 삭제
  const handleDeleteComment = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 댓글 삭제 API
      const apiUrl = `http://3.34.54.187:8000/boards/${board_id}/posts/${post_id}/comments/${comment_id}/`; // 수정된 부분
      console.log(apiUrl);
      const response = await axios.patch(apiUrl, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // 응답 확인
      console.log('Delete API 응답:', response.data);

      // 만약 삭제 성공이면 알림창 표시
      if (response.data.message === '댓글이 삭제되었습니다.') {
        reloadFunction();
        Alert.alert('댓글이 삭제되었습니다.');
      } else {
        // 삭제 실패 시에 대한 처리 코드 작성
      }
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
      // 에러 처리 로직 추가
    }
  };


  const bulletinGoodIconClick = () => {
    Alert.alert(
      '이 댓글에 좋아요를 누르시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            try {
              // 좋아요 버튼 클릭 시 실행되는 로직
              // ...

              // pressLike 함수 호출
              if (typeof pressLike === 'function') {
                pressLike(comment_id); // 필요시 인자를 전달할 수 있습니다.
              }
            } catch (error) {
              console.error('Error in bulletinGoodIconClick:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );

  };

  const handleModalChange = () => {
    setIsReportModalVisible(!isReportModalVisible);
  };


  const handleReport = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("댓글 아이디 " + comment_id);
      console.log("카테고리 " + isReportContent);
      // 게시글 신고 API 호출
      const apiUrl = `http://3.34.54.187:8000/complains/`;
      const data = {
        comp_comment_id: comment_id,
        category: isReportContent,
      };
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });


      // 응답 확인
      console.log('신고 API 응답:', response.data);

      // 만약 정상적으로 처리되면 알림창 표시
      if (response.data.message === '신고가 접수되었습니다.') {
        Alert.alert('정상적으로 접수가 완료되었습니다.');
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
      Alert.alert('이미 신고되었거나 신고할 수 없는 댓글입니다.');
      // console.error('신고하기 요청 중 에러 발생:', error);
      setIsReportContent('');
      // 에러 처리 로직 추가
    }
  };


  useEffect(() => {
    // isReportContent 값이 변경되면 처리 함수 호출
    if (isReportContent !== '') {
      handleReport();
    }
  }, [isReportContent]);


  //영구 삭제
  const deleteCommentClick = (id) => {
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '이 댓글을 영구 삭제하시겠습니까?',
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

  //영구 삭제
  const handleCommentConfirmation = async (id) => {
    try {
      console.log("아이디!!!"+id);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`http://3.34.54.187:8000/administrators/delete/`, {
        data: {
          comment_id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log('DELETE 요청 성공:', response.data);
      reloadFunction();
      Alert.alert('댓글이 영구 삭제되었습니다.');
      // 여기에서 필요한 작업을 수행하세요.
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      // 여기에서 오류 발생 시 처리를 수행하세요.
    }
  };


  return (
    <View style={styles.Box}>

      <ReportModal
        visible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        onReport={(option) => {
          console.log(option); // 선택된 옵션을 출력합니다.
          setIsReportContent(option);
          setIsReportModalVisible(false);
        }}
      />
      {onReplyModeChange ? (
        <>
          <View style={{ flexDirection: "row" }}>
            <SecondCommentBox
              name={name}
              date={formattedDate}
              time={formattedTime}
              content={content}
              like_size={like_size}
              board_id={board_id}
              post_id={post_id}
              comment_id={comment_id}
              display={display}
              showBlock={showBlock}
              writer_id={writer_id}
              reloadFunction={reloadFunction}
              commentUserClick={secondCmtUserClick}
              pressLike={pressLike}

            />
          </View>

        </>
      ) : (
        <>

          {display ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                {showBlock && (
                  <View style={styles.newBlock}>
                    <TouchableOpacity onPress={() => deleteCommentClick(comment_id)}>
                      <DeleteSvg />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.container}>

                  <View style={styles.profileBox}>
                    <TouchableOpacity style={{ padding: widthPercentage(0.8), borderRadius: 5, borderColor: colors.green, borderWidth: 1.5 }} onPress={() => UserClick(writer_id)}>
                      <View style={{ width: widthPercentage(6), height: widthPercentage(6) }}>
                        <UserIcon index={profileIcon} />
                      </View>
                    </TouchableOpacity>



                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                    <Text style={styles.date}>{formattedTime}</Text>
                  </View>
                  <View style={styles.contentBox}>
                    <Text style={styles.content}>{content}</Text>
                  </View>
                  <View style={{ ...styles.footer, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={{ marginTop: 2.5 }} onPress={bulletinGoodIconClick}>
                        <WithLocalSvg asset={GoodSvg_green} />
                      </TouchableOpacity>
                      <Text style={{ ...styles.lowText, color: "#68b901" }}>{like_size}</Text>
                    </View>
                    <View style={styles.footerButton}>
                      <TouchableOpacity onPress={bulletinGoodIconClick}>
                        <WithLocalSvg asset={GoodSvg} />
                      </TouchableOpacity>
                      <View style={styles.footerButtonLine} />
                      <TouchableOpacity onPress={secondCommentBoxClick}>
                        <WithLocalSvg asset={CommentSvg} />
                      </TouchableOpacity>
                      <View style={styles.footerButtonLine} />
                      <TouchableOpacity onPress={() => (isDeleteMode ? handleDeleteConfirmation() : handleModalChange())}>
                        {isDeleteMode ?
                          <WithLocalSvg asset={XSvg_green} />
                          :
                          <WithLocalSvg asset={ReportSvg} />
                        }
                      </TouchableOpacity>


                    </View>
                  </View>

                </View>
              </View>

            </>
          ) :

            isManage ? (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                  {showBlock && (
                    <View style={styles.newBlock}>
                      <TouchableOpacity onPress={() => deleteCommentClick(comment_id)}>
                        <WithLocalSvg asset={DeleteSvg} />
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={[styles.container, { backgroundColor: '#ECECEC' }]}>

                    <View style={styles.profileBox}>
                      <View style={{ padding: widthPercentage(0.8), borderRadius: 5, borderColor: colors.green, borderWidth: 1.5 }}>
                        <View style={{ width: widthPercentage(6), height: widthPercentage(6) }}>
                          <UserIcon index={profileIcon} />
                        </View>
                      </View>



                      <Text style={styles.name}>{name}</Text>
                      <Text style={styles.date}>{formattedDate}</Text>
                      <Text style={styles.date}>{formattedTime}</Text>
                    </View>
                    <View style={styles.contentBox}>
                      <Text style={styles.content}>{content}</Text>
                    </View>
                    <View style={{ ...styles.footer, justifyContent: "space-between" }}>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ marginTop: 2.5 }} onPress={bulletinGoodIconClick}>
                          <WithLocalSvg asset={GoodSvg_green} />
                        </TouchableOpacity>
                        <Text style={{ ...styles.lowText, color: "#68b901" }}>{like_size}</Text>
                      </View>
                      <View style={styles.footerButton}>
                        <TouchableOpacity onPress={bulletinGoodIconClick}>
                          <WithLocalSvg asset={GoodSvg} />
                        </TouchableOpacity>
                        <View style={styles.footerButtonLine} />
                        <TouchableOpacity onPress={secondCommentBoxClick}>
                          <WithLocalSvg asset={CommentSvg} />
                        </TouchableOpacity>
                        <View style={styles.footerButtonLine} />
                        <TouchableOpacity onPress={() => (isDeleteMode ? handleDeleteConfirmation() : handleModalChange())}>
                          {isDeleteMode ?
                            <WithLocalSvg asset={XSvg_green} />
                            :
                            <WithLocalSvg asset={ReportSvg} />
                          }
                        </TouchableOpacity>


                      </View>
                    </View>

                  </View>
                </View>
              </>
            ) : (
              <View style={[styles.container, { backgroundColor: '#ECECEC' }]}>
                <View style={styles.profileBox}>
                  <View style={{ padding: widthPercentage(0.8), borderRadius: 5 }}>
                    <View style={{ width: widthPercentage(6), height: widthPercentage(6) }}>
                      <UserIcon index={10} />
                    </View>
                  </View>
                  <Text style={styles.name}>{"삭제된 댓글"}</Text>
                  <Text style={styles.date}>{formattedDate}</Text>
                  <Text style={styles.date}>{formattedTime}</Text>
                </View>
                <View style={styles.contentBox}>
                  <Text style={styles.content}>{"댓글이 삭제되었습니다"}</Text>
                </View>
              </View>
            )}
        </>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  Box: {
    width: "100%",
    alignItems: 'flex-end',
    // backgroundColor: 'orange',
  },
  container: {
    width: '100%',
    minHeight: widthPercentage(10),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#d9d9d9',
    borderWidth: 0.7,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentBox: {
    width: '100%',
    paddingLeft: 40,
  },
  name: {
    fontFamily: 'Pretendard',
    fontSize: fontPercentage(15),
    fontWeight: 'bold',
    color: '#232323',
    paddingLeft: 7,
  },
  date: {
    fontFamily: 'Pretendard',
    fontSize: fontPercentage(11),
    fontWeight: '600',
    color: '#acacac',
    paddingLeft: 7,
  },
  content: {
    fontFamily: 'Pretendard',
    fontSize: fontPercentage(14),
    fontWeight: '500',
    color: '#232323',
  },
  footer: {
    width: "100%",
    height: widthPercentage(5),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 40,
    // backgroundColor: "pink",

  },
  footerButton: {
    width: widthPercentage(24),
    height: widthPercentage(4),
    // backgroundColor: "white",
    borderRadius: 10,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
  },
  footerButtonLine: {
    width: widthPercentage(0.3),
    height: widthPercentage(3.8),
    backgroundColor: '#d9d9d9',
  },
  lowText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(11),
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 8,
    marginBottom: 0,
  },
  newBlock: {
    width: widthPercentage(15),
    height: widthPercentage(10),
    // backgroundColor: 'yellow',
    justifyContent: "center",
    alignItems: "center",
  },
});