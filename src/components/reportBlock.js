import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import DateTag from './confirm/dateTag';
import User1 from '../assets/images/User1.svg';
import RightArrow from '../assets/images/rightArrow.svg';
import RightArrow2 from '../assets/images/rightArrow(green).svg';
import ReportedTag from './confirm/reported';
import CompleteTag from './confirm/completeTag';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WithLocalSvg } from 'react-native-svg/css';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ReportBlock({tag, date, category, complainedUser, status, complainedUserID, postID, boardID, item, complain_id, reportedUserClick, reportUserClick}) {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState([]);
    const [nowStatus, setStatus] = useState(status);

    useEffect(() => {
        setStatus(status)
      }, []);  

    const reportedBoardClick = (item) => {
        navigation.navigate('BulletinContent', item);
    };

    const handleReported = (complain_id) => {
        // 댓글 상자 클릭 시 알림 창 표시
        Alert.alert(
          '처리 완료 하시겠습니까?',
          '',
          [
            {
              text: '취소',
              onPress: () => console.log('취소 버튼이 눌렸습니다.'),
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => completeReport(complain_id),
            },
          ],
          { cancelable: true }
        );
      };
    
      const completeReport = async (complain_id) => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          const response = await axios.patch(`${baseURL}/complains/check/`, {
            complain_id: complain_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
    
              // 추가적인 헤더 필요시 여기에 추가
            },
            // 추가적인 Request Body 필요시 여기에 추가
          });
          setStatus("처리완료"); //처리완료로 변환
          console.log('PATCH 요청 성공:', response.data.message);
          Alert.alert('요청 성공', response.data.message);

          
        } catch (error) {
          console.error('PATCH 요청 실패:', error);
          Alert.alert('요청 실패', '다시 시도해 주세요');

          
        };
      };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <Text style={{
                        fontSize: 11, 
                        color: "#40a2db",
                        fontWeight: "800",
                    }}>
                        {tag}
                    </Text>
                    {nowStatus === '처리완료' ? (
                        
                        <CompleteTag/>
                    ) : (
                        <TouchableOpacity onPress={() => handleReported(complain_id)}>
                            <ReportedTag />
                        </TouchableOpacity>
                    )}
                    
                </View>
                <View style={styles.middleBox}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => reportUserClick(item)}>
                        <View style={{paddingLeft: 16}}>
                            <WithLocalSvg asset={User1} />
                        </View>
                        <View style={styles.textBox}>
                            <View style={styles.highTextBox}>
                                <Text style={styles.highText}>익명1</Text>
                            </View>
                            <View style={styles.lowTextBox}>
                                <Text style={styles.lowText}>신고자</Text>
                                <Text style={styles.lowText}> | </Text>
                                <Text style={styles.lowText}>{date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    <View>
                      <WithLocalSvg asset={RightArrow} />
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => reportedUserClick(item)}>
                        <View style={{paddingLeft: 26}}>
                            <WithLocalSvg asset={User1} />
                        </View>
                        <View style={styles.textBox}>
                            <View style={styles.highTextBox}>
                                <Text style={styles.highText}>{complainedUser}</Text>
                            </View>
                            <View style={styles.lowTextBox}>
                                <Text style={styles.lowText}>피신고자</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.bottomBox}>
                    <Text style={{
                        fontSize: 14.2, 
                        color: "#232323",
                        fontWeight: "800",
                    }}>
                        {category}
                    </Text>
                    <TouchableOpacity onPress={() => reportedBoardClick(item)}>
                        <View style={styles.bottomLeftBox}>
                            <Text style={styles.reportMoveText}>
                                신고글로 이동
                            </Text>
                            <WithLocalSvg asset={RightArrow2} />
                        </View> 
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={styles.line} />
        </View>
      
    )
  }

const styles = StyleSheet.create({
    container: {
        width: "100%",
        //height: widthPercentage(18),
        //flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        padding: 10,
    },
    topBox: {
        width: "100%",
        height: widthPercentage(8),
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: "lightgreen",
    },
    middleBox: {
        width: "100%",
        height: widthPercentage(13),
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "skyblue",
    },
    bottomBox: {
        width: "100%",
        height: widthPercentage(8),
        paddingLeft: 10,
        flexDirection: 'row',
        //backgroundColor: "skyblue",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width: widthPercentage(10),
        height: widthPercentage(10),

    },
    textBox: {
        width: widthPercentage(25),
        height: widthPercentage(10),
        //backgroundColor: "orange",
        marginLeft: 15,
        flex: 0,
        
    },
    highTextBox: {
        flex: 3,
        width: widthPercentage(60),
        //backgroundColor: "pink",
        flexDirection: "row",
    },
    highText: {
        fontFamily: "Pretendard",
        fontSize: 17,
        fontWeight: "bold",
        color: "#232323",
        
    },
    lowTextBox: {
        flex: 2,
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
    line: {
        width: "100%",
        height: widthPercentage(0.15),
        backgroundColor: "#e5e5e7",
    },
    arrowImage: {
        width: widthPercentage(4),
        height: widthPercentage(5),

    },
    bottomLeftBox: {
        width: widthPercentage(25),
        //backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    reportMoveText: {
        fontFamily: "Pretendard",
        fontSize: 13,
        fontWeight: "600",
        color: "#68B901",
        paddingRight: 4,
    },
})