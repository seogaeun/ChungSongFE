import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { baseURL } from '../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Request from './confirm/requestTag';
import Complete from './confirm/completeTag';
import User2 from '../assets/images/User(blue).svg';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { WithLocalSvg } from 'react-native-svg/css';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function RoomChangeBlock({ room_request_id, name, nickname, preRoom, nextRoom, date, status, reLoadFunction }) {

  const roomChangeAlert = () => {
    Alert.alert(
      '호수 변동을 허가하시겠습니까?',
      '',
      [
        {
          text: '아니오',
          onPress: () => handleConfirmation(false),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => handleConfirmation(true),
        },
      ],
      { cancelable: true }
    );
  };


  const handleConfirmation = async (answer) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(`${baseURL}/administrators/room_request/`, {
        // params: {
        room_request_id: room_request_id,
        answer: answer,
        // },
      },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'

            // 추가적인 헤더 필요시 여기에 추가
          },
          // 추가적인 Request Body 필요시 여기에 추가
        });
      console.log('PATCH 요청 성공:', response.data);
      Alert.alert('호수 변동을 허가하였습니다.');
      reLoadFunction();

    } catch (error) {
      console.error('PATCH 요청 실패:', error);

    };
  };

  const checkStatus = () => {
    // 댓글 상자 클릭 시 알림 창 표시
    Alert.alert(
      '이미 호수 변동 신청 처리가 완료되었습니다.',
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

  return (
    <TouchableOpacity onPress={status === 1 ? checkStatus : roomChangeAlert}>
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <View style={styles.leftBox}>
            <View>
              <WithLocalSvg asset={User2} />
            </View>
            <View style={styles.textBox}>
              <View style={styles.highTextBox}>
                <Text style={styles.highText}>{name}</Text>
                <Text style={styles.highText}> | </Text>
                <Text style={styles.highText}>{nickname}</Text>
              </View>
              <View style={styles.lowTextBox}>
                <Text style={styles.lowText}>호수 변동 : </Text>
                <Text style={styles.lowText}>{preRoom}호 {'->'} </Text>
                <Text style={styles.lowText}>{nextRoom}호 </Text>
              </View>
            </View>
          </View>

          <View style={styles.rightBox}>
            <Text style={styles.dateText}>{date}</Text>
            {status ? (
              <Complete />
            ) : (
              // <TouchableOpacity>

              <Request />
              // </TouchableOpacity>

            )}
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: widthPercentage(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    paddingHorizontal: 23,
  },
  innerBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
  },
  leftBox: {
    width: widthPercentage(60),
    height: widthPercentage(10),
    flexDirection: "row",
    //backgroundColor: "purple",
  },
  textBox: {
    width: widthPercentage(60),
    height: widthPercentage(10),
    //backgroundColor: "orange",
    marginLeft: 12,
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
    fontWeight: "600",
    color: "#232323",
  },
  line: {
    width: "100%",
    height: widthPercentage(0.15),
    backgroundColor: "#e5e5e7",
  },
  rightBox: {
    width: widthPercentage(17),
    height: widthPercentage(10),
    justifyContent: "center",
    alignItems: 'flex-end',

  },
  dateText: {
    fontFamily: "Pretendard",
    fontSize: 11,
    fontWeight: "600",
    color: "#acacac",
    marginBottom: 3,
  },
})