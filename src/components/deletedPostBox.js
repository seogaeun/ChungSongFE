//deletePostBox.js
import React from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image, TouchableOpacity, ImageBackground} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../baseURL';
import BulletinContent from "../pages/Bulletin/BulletinContent";
import { WithLocalSvg } from 'react-native-svg/css';


import GoodSvg from '../assets/images/good(green).svg';
import CommentSvg from '../assets/images/comment(blue).svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function DeletedPostBox({bulletinName, title, content, images, good, comment, date, name, item}) {
  const navigation = useNavigation();
  console.log(images);
  const handleListBoxClick = (item) => {
    // BulletinContent 화면으로 이동하며 관련 데이터 전달
    const noInput = true;
    console.log(noInput + '인풋값');
    navigation.navigate('BulletinContent', {...item, noInput});
  };

    return(
        <TouchableOpacity onPress={() => handleListBoxClick(item)}>
            <View style={styles.block}>
              <View style={styles.highBox}>
                <Text style={styles.highText}>{bulletinName}</Text>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.textArea}>
                  <Text style={styles.title}>{title}</Text>
                  <View style={styles.textAreaGap}></View>
                  <Text 
                    style={styles.content}
                    numberOfLines={2}  // 최대 2줄까지 표시
                    ellipsizeMode="tail"  // 넘어가면 '...'으로 표시
                  >
                      {content}
                  </Text>
                  </View>
                  
                  <View style={styles.imageContainer}>
                    <ImageBackground source={{uri: `${baseURL}${images}`}} style={styles.image} />
                  </View>

                </View>
                <View style={{width: "100%", height: 5}}></View>
                <View style={styles.lowBox}>
                  <WithLocalSvg asset={GoodSvg} />
                  <Text style={{ ...styles.lowText, color: "#68b901" }}>{good}</Text>
                  <WithLocalSvg asset={CommentSvg} />
                  <Text style={{ ...styles.lowText, color: "#40A2DB" }}>{comment}</Text>
                  <Text style={styles.date}>{date}</Text>
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
        height: widthPercentage(36),
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
        //marginTop: 25,
      },
      imageContainer: {
        width: widthPercentage(18),
        height: widthPercentage(18),
        borderRadius: 10,
        overflow: 'hidden', // 내부 이미지가 컨테이너 경계를 넘어서지 않도록 함
      },
      image: {
        width: '100%', // ImageBackground를 컨테이너의 전체 크기로 확장
        height: '100%', // ImageBackground를 컨테이너의 전체 크기로 확장
      },
      imageBackground: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
      },
      textArea: {
        width: widthPercentage(69),
        height: widthPercentage(18),
        //backgroundColor: "gray",
      },
      title: {
        textAlign: "left",
        fontFamily: "Pretendard",
        fontSize: 15,
        fontWeight: "700",
        color: "#232323",
      },
      content: {
        textAlign: "left",
        fontFamily: "Pretendard",
        fontSize: 14,
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
      highBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 2,
        //backgroundColor: 'pink',
      },
      highText: {
        textAlign: "left",
        fontFamily: "Pretendard",
        fontSize: 12,
        fontWeight: "bold",
        color: "#40A2DB",
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
        fontSize: 14,
        fontWeight: "bold",
        paddingLeft: 5,
        paddingRight: 8,
      },
      date: {
        fontFamily: "Pretendard",
        fontSize: 14,
        fontWeight: "500",
        color: "#acacac",
      },
})