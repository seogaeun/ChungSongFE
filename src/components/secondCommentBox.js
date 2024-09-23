import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가
import axios from 'axios';
import SquirrelSvg from '../assets/images/CommentProfile/Squirrel.svg';
import GoodSvg from '../assets/images/good(gray).svg';
import CommentSvg from '../assets/images/comment(gray).svg';
import ReportSvg from '../assets/images/report(gray).svg';
import GoodSvg_green from '../assets/images/good(green).svg';
import XSvg_green from '../assets/images/X(green).svg';
import ReportModal from '../pages/Bulletin/ReportModal';
import UserIcon from './UserIcon';
import DeleteSvg from '../assets/images/delete.svg';
import { WithLocalSvg } from 'react-native-svg/css';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function SecondCommentBox({ name, date, time, content, pressLike,like_size, board_id, post_id, comment_id, display, showBlock, writer_id, reloadFunction, commentUserClick }) {
  // 신고하기 or 삭제하기 여부를 저장할 상태
  const [isDeleteMode, setIsDeleteMode] = useState(true);
  // 모달 상태를 저장할 상태
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  // 신고 내역을 저장할 상태
  const [isReportContent, setIsReportContent] = useState('');
  // 관리자인지 아닌지에 대한 상태 저장
  const [isManage, setIsManage] = useState('');

  

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
  }, []);

  const bulletinGoodIconClick = () => {
    Alert.alert(
      '이 대댓글에 좋아요를 누르시겠습니까?',
      '',
      [
        { text: '취소', onPress: () => console.log('취소 버튼이 눌렸습니다.'), style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              if (typeof pressLike === 'function') {
                await pressLike(comment_id);

              }
            } catch (error) {
              console.error('Error in bulletinGoodIconClick:', error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };


  const handleModalChange = () => {
    setIsReportModalVisible(!isReportModalVisible);
  };

  const handleDeleteConfirmation = () => {
    if(display == true) {
      Alert.alert(
        '해당 대댓글을 삭제하시겠습니까?',
        '',
        [
          {
            text: '취소',
            onPress: () => console.log('취소 버튼이 눌렸습니다.'),
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => handleDeleteSecondCmt(),
          },
        ],
        { cancelable: true }
      );
    } else {
      deleteSecondCmtClick(comment_id);
    }
    
  };

  const handleDeleteSecondCmt = async () => {
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

  const handleReport = async () => {
    try {
      // AsyncStorage에서 access_token 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("대댓글 아이디" + comment_id);
      console.log("카테고리" + isReportContent);
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
        Alert.alert(data.message);
        // isReportContent 값 초기화
        setIsReportContent('');
      }
    } catch (error) {
      console.error('신고하기 요청 중 에러 발생:', error);
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


  const deleteSecondCmtClick = (id) => {
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '이 대댓글을 영구 삭제하시겠습니까?',
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
      console.log(id);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`http://3.34.54.187:8000/administrators/delete/`, {
        data:{
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
      Alert.alert('대댓글이 영구 삭제되었습니다.');
      // 여기에서 필요한 작업을 수행하세요.
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      // 여기에서 오류 발생 시 처리를 수행하세요.
    }
  };


  return (
    <View>
      {display ? (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {showBlock && (
              <View style={styles.newBlock}>
                <TouchableOpacity onPress={() => deleteSecondCmtClick(comment_id)}>
                  <WithLocalSvg asset={DeleteSvg} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.container}>
              <ReportModal
                visible={isReportModalVisible}
                onClose={() => setIsReportModalVisible(false)}
                onReport={(option) => {
                  setIsReportContent(option);
                  setIsReportModalVisible(false);
                }}
              />
              <View style={styles.profileBox}>
                <TouchableOpacity onPress={() => commentUserClick(writer_id)}>
                  <WithLocalSvg asset={SquirrelSvg} />
                </TouchableOpacity>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.date}>{time}</Text>
              </View>
              <View style={styles.contentBox}>
                <Text style={styles.content}>{content}</Text>
              </View>
              <View style={{ ...styles.footer, justifyContent: like_size ? "space-between" : "flex-end" }}>
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
                  <TouchableOpacity onPress={() => (isDeleteMode ? handleDeleteConfirmation() : handleModalChange())}>
                    {isDeleteMode ? <WithLocalSvg asset={XSvg_green} /> : <WithLocalSvg asset={ReportSvg} />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : isManage ? (
        <>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        {showBlock && (
              <View style={styles.newBlock}>
                <TouchableOpacity onPress={() => deleteSecondCmtClick(comment_id)}>
                  <WithLocalSvg asset={DeleteSvg} />
                </TouchableOpacity>
              </View>
            )}
        <View style={[styles.container, {backgroundColor: '#ECECEC'}]}>

            <ReportModal
              visible={isReportModalVisible}
              onClose={() => setIsReportModalVisible(false)}
              onReport={(option) => {
                console.log(option); // 선택된 옵션을 출력합니다.
                setIsReportContent(option);
                setIsReportModalVisible(false);
              }}
            />

          <View style={styles.profileBox}>
            <WithLocalSvg asset={SquirrelSvg} />
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.date}>
              {date}
            </Text>
            <Text style={styles.date}>
              {time}
            </Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.content}>
              {content}
            </Text>
          </View>
          <View style={{ ...styles.footer, justifyContent: (like_size>0) ? "space-between" : "flex-end" }}>
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
              <TouchableOpacity onPress={() => (isDeleteMode ?  handleDeleteConfirmation() : handleModalChange())}>
                {isDeleteMode ? 
                    <WithLocalSvg asset={XSvg_green}/>
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
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.date}>{time}</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.content}>{"댓글이 삭제되었습니다"}</Text>
        </View>
      </View>
      )}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentage(75),
    //flex: 1,
    //height: widthPercentage(10),
    minHeight: widthPercentage(10),
    //flexDirection: "column",
    // justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: 'white',
    borderColor: '#d9d9d9',
    borderWidth: 0.7,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginTop: 10,
    // marginLeft: 40,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileBox: {
    width: "100%",
    //backgroundColor: "pink",
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentBox: {
    width: widthPercentage(65),
    // backgroundColor: "yellow",
    paddingLeft: 40,
    // paddingRight: 20,
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
    color: "#232323",
    paddingLeft: 7,
  },
  date: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "600",
    color: "#acacac",
    paddingLeft: 7,
  },
  content: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "500",
    color: "#232323",
  },
  footer: {
    width: "100%",
    flexDirection: 'row',
    height: widthPercentage(5),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 40,
    //backgroundColor: "pink",

  },
  footerButton: {
    width: widthPercentage(16),
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
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 8,
    marginBottom: 0,
  },
  newBlock: {
    width: widthPercentage(15),
    height: widthPercentage(10),
    // backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
})