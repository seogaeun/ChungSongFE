import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { WithLocalSvg } from 'react-native-svg/css';

import GoodSvg from '../assets/images/good(green).svg';
import CommentSvg from '../assets/images/comment(blue).svg';
import { colors } from "../constants/colors";
import { fontPercentage } from "../utils/ResponsiveSize";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ListBox({ board_id, post_id, title, content, images, good, comment, date, name }) {


  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = dateObject.getDate();

  const navigation = useNavigation();

  const handleListBoxClick = () => {
    // BulletinContent 화면으로 이동하며 관련 데이터 전달
    navigation.navigate('BulletinContent', {
      board_id,
      post_id,

    });
  };

  return (
    <TouchableOpacity onPress={handleListBoxClick}>
      <View style={styles.block}>
        <View style={styles.contentBox}>
          <View style={styles.textArea}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.textAreaGap}></View>
            <Text
              style={styles.content}
              numberOfLines={2}  // 최대 2줄까지 표시
              ellipsizeMode="tail"  // 넘어가면 '...'으로 표시
            >
              {content}
            </Text>
          </View>
          <View style={styles.image}>
            <ImageBackground source={{ uri: images }} style={styles.imageBackground}>
              {/* Add any children components here if needed */}
            </ImageBackground>

          </View>

        </View>
        <View style={{ width: "100%", height: 5 }}></View>
        <View style={styles.lowBox}>
          {board_id !== '1' && (
            <>
              <WithLocalSvg asset={GoodSvg} />
              <Text style={{ ...styles.lowText, color: "#68b901" }}>{good}</Text>
              <WithLocalSvg asset={CommentSvg} />
              <Text style={{ ...styles.lowText, color: "#40A2DB" }}>{comment}</Text>
            </>
          )}
          <Text style={styles.date}>{`${month}\/${day}`}</Text>
          <Text style={styles.date}> | </Text>
          <Text style={styles.date}>{name}</Text>
        </View>
      </View>


      <View style={styles.line}></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
    height: widthPercentage(34),
    backgroundColor: "white",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    width: "100%",
    height: widthPercentage(18),
    //backgroundColor: "lightgreen",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 25,
  },
  image: {
    width: widthPercentage(18),
    height: widthPercentage(18),
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%', // ImageBackground를 컨테이너의 전체 크기로 확장
    height: '100%', // or 'stretch' or 'contain'
  },
  textArea: {
    width: widthPercentage(69),
    height: widthPercentage(18),
    //backgroundColor: "gray",
  },
  title: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(15),
    fontWeight: "700",
    color: "#232323",
  },
  content: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(13),
    fontWeight: "500",
    color: "#232323",
  },
  textAreaGap: {
    width: widthPercentage(65),
    height: widthPercentage(1),
    //backgroundColor: "gray",
  },
  line: {
    width: "100%",
    height: widthPercentage(0.3),
    backgroundColor: "#e5e5e7",
  },
  lowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: 'pink',
  },
  lowText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: fontPercentage(12),
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 8,
  },
  date: {
    fontFamily: "Pretendard",
    fontSize: fontPercentage(12),
    fontWeight: "500",
    color: "#acacac",
  },
})