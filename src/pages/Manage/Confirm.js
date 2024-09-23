import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image, TouchableOpacity, Alert, ImageBackground} from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import qs from "qs";

import TopBar from '../../components/TopBar2';
import User2 from '../../assets/images/User(blue).svg';
import { WithLocalSvg } from "react-native-svg/css";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function Confirm({route}) {
  const { user_id, comped_user_id, comp_user_id } = route.params;
  const userID = comped_user_id || comp_user_id || user_id;
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(userID);
      console.log(accessToken);
      // URL에 직접 쿼리 파라미터를 추가하여 구성
      const url = `${baseURL}/administrators/userid_info2/${userID}/`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // 요청 헤더에 인증 토큰을 포함
          'Content-Type': 'application/json'
        }
      });
  
      console.log("데이터를 받아왔습니다");
      console.log(response.data);
      setData(response.data); // 응답 데이터를 상태로 설정, 여기서는 response를 직접 저장하는 대신 response.data를 저장해야 합니다.
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSuspensionListClick = () => {
    // '사생 정보 및 인증 관리' 항목을 클릭했을 때 ConfirmList 페이지로 이동
    navigation.navigate('Suspension', { user_id: userID });
  };

  const showAlert = (days, event) => {
    event.persist(); // SyntheticEvent를 지속시킴
    Alert.alert(
      `사용자를 ${days}일간 정지하시겠습니까?`,
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => freeze(days),
        },
      ],
      { cancelable: true }
    );
  };

  const showBanAlert = (event) => {
    event.persist(); // SyntheticEvent를 지속시킴
    Alert.alert(
      '사용자를 추방하시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => freeze(365),
        },
      ],
      { cancelable: true }
    );
  };
  
  const freeze = async (day) => {
    try {
      console.log(userID);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(`${baseURL}/administrators/freeze/`, {
        user_id: userID,
        freeze_days: day,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log('PATCH 요청 성공:', response.data);
      Alert.alert('정지 처리되었습니다.', response.data.message);
      getData();
      
    } catch (error) {
      console.error('PATCH 요청 실패:', error);
    }
  };

  const checkStatus = () => {
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '이미 가입 처리가 완료되었습니다.',
      '',
      [
        {
          text: '확인',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const joinPermitClick = (userID, event) => {
    event.persist(); // SyntheticEvent를 지속시킴
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '가입을 허가하시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => permitJoin(userID),
        },
      ],
      { cancelable: true }
    );
  };

  const permitJoin = async (userID) => {
    try {
      console.log(userID);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(`${baseURL}/administrators/new_user/`, {
        user_id: user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log('PATCH 요청 성공:', response.data);
      Alert.alert('가입 허가 처리되었습니다.');
      
    } catch (error) {
      console.error('PATCH 요청 실패:', error);
    }
  };

  const joinRefuseClick = (userID, event) => {
    event.persist(); // SyntheticEvent를 지속시킴
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '가입을 거부하시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼이 눌렸습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => refuseJoin(userID),
        },
      ],
      { cancelable: true }
    );
  };

  const refuseJoin = async (userID) => {
    console.log(userID);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${baseURL}/administrators/new_user/`, {
        data: {
          user_id: userID,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log('DELETE 요청 성공:', response.data);
      Alert.alert('가입 거부 처리되었습니다.');
      // 여기에서 필요한 작업을 수행하세요.
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
      // 여기에서 오류 발생 시 처리를 수행하세요.
    }
  };

  return (
    <View style={styles.container}>
      <TopBar BulletinName={"사생 정보 및 인증 관리"} />
      <ScrollView>
        <View style={styles.profileFrame}>
          <View style={styles.profileBox}>
            <View style={styles.profile}>
              <View>
                <WithLocalSvg asset={User2} />
              </View>
              <View style={styles.textBox}>
                <View style={styles.highTextBox}>
                  <Text style={styles.highText}>{data.username}</Text>
                  <Text style={styles.highText}> | </Text>
                  <Text style={styles.highText}>{data.nickname}</Text>
                </View>
                <View style={styles.lowTextBox}>
                  <Text style={styles.lowText}>남도학숙 은평관 {data.room}호</Text>
                  <Text style={styles.lowText}> | </Text>
                  <Text style={styles.lowText}>{data.school}</Text>
                </View>
                <View style={styles.email}>
                  <Text style={styles.lowText}>{data.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.history}>
              <View style={styles.reportCount}>
                <Text style={styles.reportCountText}>피신고 수 {data.complained}</Text>
              </View>
              <TouchableOpacity onPress={handleSuspensionListClick}>
                <View style={styles.historyButton}>
                  <Text style={styles.historyButtonText}>정지 처분 이력 {' >'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.infoFrame}>
          <View style={styles.infoTitleBox}>
            <Text style={styles.categoryText}>정지 여부</Text>
          </View>
          <View style={styles.infoBox}>
            <TouchableOpacity onPress={(event) => showAlert(7, event)}>
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxText}>7일</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => showAlert(15, event)}>
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxText}>15일</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => showAlert(30, event)}>
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxText}>30일</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => showBanAlert(event)}>
              <View style={styles.dateBox}>
                <Text style={styles.dateBoxText}>추방</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoFrame}>
          <View style={styles.infoTitleBox}>
            <Text style={styles.categoryText}>사생카드</Text>
          </View>
          <View style={{ ...styles.infoBox, justifyContent: "center" }}>
            {data.room_card ? (
              <ImageBackground
                source={{uri: `${baseURL}${data.room_card}`}}
                style={styles.profileImage}
              />
            ) : null}
          </View>

          <View style={{...styles.infoBox, justifyContent: "center"}}>
            <TouchableOpacity onPress={data.status === '인증대기' ? (event) => joinRefuseClick(userID, event) : () => checkStatus()}>
              <View style={{...styles.dateBox, marginRight: 10}}>
                <Text style={styles.dateBoxText}>가입 거부</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={data.status === '인증대기' ? (event) => joinPermitClick(userID, event) : () => checkStatus()}>
              <View style={{...styles.permitBox, marginLeft: 10}}>
                <Text style={styles.permitBoxText}>가입 허가</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

  
  const styles = StyleSheet.create({
      container: {
        backgroundColor: 'rgba(64, 162, 219, 0.15)',
        flex: 1,
      },
      header: {
        width: "100%",
        height: widthPercentage(10),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        
        //flex: 1,
      },
      bulletin: {
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: 17,
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

      contentArea: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "gray",
      },
      profileFrame: {
        width: "100%",
        //height: widthPercentage(24),
        //backgroundColor: "pink",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingRight: 25,
        
      },
      profileBox: {
        width: "100%",
        height: widthPercentage(40.15),
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        
      },
      profile: {
        width: "100%",
        height: widthPercentage(23),
        flexDirection: "row",
        paddingTop: 17,
        paddingLeft: 20,
      },
      history: {
        width: "100%",
        height: widthPercentage(17),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
      },
      line: {
        width: "100%",
        height: widthPercentage(0.2),
        backgroundColor: "#e5e5e7",
    },
    profileImage: {
        width: widthPercentage(65),
        height: widthPercentage(65),

    },
    textBox: {
        width: widthPercentage(60),
        height: widthPercentage(15),
        //backgroundColor: "orange",
        marginLeft: 15,
        flex: 0,
    },
    highTextBox: {
        flex: 1.2,
        width: widthPercentage(60),
        //backgroundColor: "pink",
        flexDirection: "row",
    },
    highText: {
        fontFamily: "Pretendard",
        fontSize: 17,
        fontWeight: "bold",
        color: "#232323",
        //paddingLeft: 15,
    },
    lowTextBox: {
        flex: 1,
        width: widthPercentage(60),
        //backgroundColor: "skyblue",
        flexDirection: "row",
    },
    lowText: {
        fontFamily: "Pretendard",
        fontSize: 13,
        fontWeight: "300",
        color: "#acacac",
    },
    email: {
        width: widthPercentage(60),
        flex: 1,
        //backgroundColor: "yellow",
    },
    reportCount: {
        width: widthPercentage(23),
        height: widthPercentage(8),
        backgroundColor: 'rgba(64, 162, 219, 0.15)',
        borderRadius: 15,
        borderColor: "#40a2db",
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    reportCountText: {
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "bold",
        color: "#232323",
    },
    historyButton: {
        width: widthPercentage(23),
        height: widthPercentage(8),
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
    },
    historyButtonText: {
        fontFamily: "Pretendard",
        fontSize: 12,
        fontWeight: "bold",
        color: "#40a2db",
    },
    infoFrame: {
        width: "100%",
        //height: widthPercentage(40),
        //backgroundColor: "yellow",
        paddingLeft: 25,
        paddingRight: 25,
        
      },
      infoTitleBox: {
        width: "100%",
        height: widthPercentage(10),
        //backgroundColor: "lightgreen",
        justifyContent: "center",
        //paddingTop: 10,
      },
      infoBox: {
        width: "100%",
        //height: widthPercentage(13),
        backgroundColor: "white",
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 12,
        marginBottom: 20,
      },
      infoInnerText: {
        fontFamily: "Pretendard",
        fontSize: 15,
        fontWeight: "600",
        color: "#232323",
      },
      dateBox: {
        //width: widthPercentage(18),
        height: widthPercentage(8),
        backgroundColor: '#40a2db',
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        paddingLeft: 22,
        paddingRight: 22,
      },
      dateBoxText: {
        fontFamily: "Pretendard",
        fontSize: 15,
        fontWeight: "800",
        color: "white",
      },
      categoryText: {
        fontFamily: "Pretendard",
        fontSize: 17,
        fontWeight: "bold",
        color: "#232323",
        paddingLeft: 12,
    },
    permitBox: {
      height: widthPercentage(8),
      backgroundColor: "white",
      borderRadius: 13,
      borderWidth: 2,
      borderColor: "#40a2db",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 22,
      paddingRight: 22,
    },
    permitBoxText: {
      fontFamily: "Pretendard",
      fontSize: 15,
      fontWeight: "800",
      color: "#40a2db",
    },
  })