import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions, Image} from "react-native";

import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Confrim from '../../components/confirmBlock';
import TopBar from '../../components/TopBar2';
import SuspensionBlock from '../../components/suspensionBlock';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function Suspension({ route }) {
  const { user_id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }
  
      const response = await axios.get(`${baseURL}/administrators/freeze/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
      console.log("데이터를 받아왔습니다");
      console.log(response.data);
      setData(response.data.results); // 데이터를 상태로 설정
    } catch (error) {
      if (error.response) {
        // 요청이 만들어졌고, 서버가 2xx 범위 외의 상태 코드로 응답했습니다.
        console.error("정지 처분 에러 발생", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        // 서버가 반환한 HTML 내용을 로그에 출력
        if (error.response.data) {
          console.error("Response Data:", error.response.data);
        }
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못했습니다.
        console.error("No response received", error.request);
      } else {
        // 요청을 설정하는 동안 오류가 발생했습니다.
        console.error("Error", error.message);
      }
    }
  };
  

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString); // 문자열을 Date 객체로 변환
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = dateObject.getDate().toString().padStart(2, '0'); // 일
    return `${month}/${day}`; // 월과 일을 조합한 결과
  };

    return(
      <View style={styles.container}>
        <TopBar BulletinName={"정지 처분 이력"} />
          <ScrollView>    
            <View>
            {data.map((item, index) => (
              <View key={index}>
                <SuspensionBlock 
                  Complained={item.complained_size}
                  Start={formatDateString(item.created_at)}
                  End={formatDateString(item.end_date)}
                  days={item.days}
                />
              </View>
            ))}
            </View>
            
          </ScrollView>
      </View>
      
    )
  }
  
  const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        paddingBottom: 40,
        //justifyContent: "flex-start",
      },
    //   contentArea: {
    //     paddingTop: 10,
    //     paddingLeft: 15,
    //     paddingRight: 15,
    //     //backgroundColor: "gray",
    //   },
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
  })