import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image} from "react-native";
import axios from "axios";
import { baseURL } from '../../../baseURL';
// import { SvgXml } from 'react-native-svg';  // 수정된 import 문
import { WithLocalSvg } from 'react-native-svg/css';
import { useNavigation } from '@react-navigation/native';

import PinSvg from '../../assets/images/Bulletin/pin.svg';
import DeliverySvg from '../../assets/images/Bulletin/delivery.svg';
import DietSvg from '../../assets/images/Bulletin/diet.svg';
import FreeSvg from '../../assets/images/Bulletin/free.svg';
import LossSvg from '../../assets/images/Bulletin/loss.svg';
import PromoteSvg from '../../assets/images/Bulletin/promote.svg';
import ProposalSvg from '../../assets/images/Bulletin/proposal.svg';
import SchoolSvg from '../../assets/images/Bulletin/school.svg';
import ShareSvg from '../../assets/images/Bulletin/share.svg';
import TalkSvg from '../../assets/images/Bulletin/talk.svg';
import ToolSvg from '../../assets/images/Bulletin/tool.svg';
import SaleSvg from '../../assets/images/Bulletin/sale.svg';

import TopBar from '../../components/TopBar2';
import Box from '../../components/categoryBox';
import BoxSelection from "../../components/BoxSelection";
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function BulletinCategory() {

  useEffect(() => {
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

        console.log('API Response:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const navigation = useNavigation();

  const handleBoxClick = (bulletinName) => {
    let path = '';

    // bulletinName에 따라 경로 결정
    switch (bulletinName) {
      case '공지사항':
        path = '/boards/1/'; // '공지사항'에 대한 경로는 '/boards/1'
        break;
      case '웅성웅성':
        path = '/boards/hot_posts/';
        break;
      case '자유 게시판':
        path = '/boards/2/'; // '자유 게시판'에 대한 경로는 '/boards/2'
        break;
      case '배달 게시판':
        path = '/boards/3/'; // '배달 게시판'에 대한 경로는 '/boards/3'
        break;
      case '건의 게시판':
        path = '/boards/4/'; // '건의 게시판'에 대한 경로는 '/boards/4'
        break;
      case '분실 게시판':
        path = '/boards/5/'; // '분실 게시판'에 대한 경로는 '/boards/5'
        break;
      case '홍보 게시판':
        path = '/boards/6/'; // '홍보 게시판'에 대한 경로는 '/boards/6'
        break;
      case '판매 게시판':
        path = '/boards/7/'; // '판매 게시판'에 대한 경로는 '/boards/7'
        break;
      case '공구 게시판':
        path = '/boards/8/'; // '공구 게시판'에 대한 경로는 '/boards/8'
        break;
      case '나눔 게시판':
        path = '/boards/9/'; // '나눔 게시판'에 대한 경로는 '/boards/9'
        break;
      case '학교 게시판':
        path = '/my_school_board/';
        break;
      // 추가 게시판에 대한 경우도 추가

      default:
        path = ''; // 기본 경로
    }

    console.log("이동"+path)
    // 계산된 경로와 함께 적절한 화면으로 이동
    navigation.navigate('BulletinList', { bulletinName, path });
  };

    return(
      <View style={styles.container}>
        <View style={styles.line}></View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
              <BoxSelection />
            </ScrollView>
        </View>
        
        
        <ScrollView>
          <View style={styles.three}>
            
              <Text style={styles.category}>기본</Text>
              <View style={styles.blank}></View>
              <View style={styles.boxRow}>

                <Box Name={"공지사항"} SVG={<WithLocalSvg asset={PinSvg} style={styles.image}/>} onPress={() => handleBoxClick("공지사항")} />
                {/* <Box Name={"식단"} SVG={<DietSvg style={styles.image}/>} onPress={() => handleBoxClick("식단")} /> */}
                <View style={[styles.box, { backgroundColor: 'rgba(104, 185, 1, 0)' }]}>
                  <Text style={styles.boxFont}></Text>
                </View>
              </View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>
              
              <Text style={styles.category}>HOT 게시판</Text>
              <View style={styles.blank}></View>
              <View style={styles.boxRow}>
                <Box Name={"웅성웅성"} SVG={<WithLocalSvg asset={TalkSvg} style={styles.image}/>} onPress={() => handleBoxClick("웅성웅성")}/>
                <View style={[styles.box, { backgroundColor: 'rgba(104, 185, 1, 0)' }]}>
                  <Text style={styles.boxFont}></Text>
                </View>
                <View style={[styles.box, { backgroundColor: 'rgba(104, 185, 1, 0)' }]}>
                  <Text style={styles.boxFont}></Text>
                </View>
              </View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>

              <Text style={styles.category}>사생 게시판</Text>
              <View style={styles.blank}></View>
              <View style={styles.boxRow}>
                <Box Name={"자유 게시판"} SVG={<WithLocalSvg asset={FreeSvg} style={styles.image}/>} onPress={() => handleBoxClick("자유 게시판")}/>
                <Box Name={"배달 게시판"} SVG={<WithLocalSvg asset={DeliverySvg} style={styles.image}/>} onPress={() => handleBoxClick("배달 게시판")}/>
                <Box Name={"학교 게시판"} SVG={<WithLocalSvg asset={SchoolSvg} style={styles.image}/>} onPress={() => handleBoxClick("학교 게시판")}/>
              </View>
              <View style={styles.boxRow}>
                <Box Name={"건의 게시판"} SVG={<WithLocalSvg asset={ProposalSvg} style={styles.image}/>} onPress={() => handleBoxClick("건의 게시판")}/>
                {/* <Box Name={"분실 게시판"} SVG={<WithLocalSvg asset={LossSvg} style={styles.image}/>} onPress={() => handleBoxClick("분실 게시판")}/> */}
                <Box Name={"홍보 게시판"} SVG={<WithLocalSvg asset={PromoteSvg} style={styles.image}/>} onPress={() => handleBoxClick("홍보 게시판")}/>
              </View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>
              <View style={styles.blank}></View>

              <Text style={styles.category}>장터 게시판</Text>
              <View style={styles.blank}></View>
              <View style={styles.boxRow}>
                <Box Name={"판매 게시판"} SVG={<WithLocalSvg asset={SaleSvg} style={styles.image}/>} onPress={() => handleBoxClick("판매 게시판")}/>
                <Box Name={"공구 게시판"} SVG={<WithLocalSvg asset={ToolSvg} style={styles.image}/>} onPress={() => handleBoxClick("공구 게시판")}/>
                <Box Name={"나눔 게시판"} SVG={<WithLocalSvg asset={ShareSvg} style={styles.image}/>} onPress={() => handleBoxClick("나눔 게시판")}/>
              </View>
          </View>
        </ScrollView>
      </View>
      
    )
  }
  
  const styles = StyleSheet.create({
      container: {
        //flexDirection: "row",
        backgroundColor: 'rgba(104, 185, 1, 0.1)',
        justifyContent: "center",
        paddingBottom: 40,
      },
      three: {
        //height: "100%",
        padding: 20,
        //backgroundColor: "green",
      },
      category: {
        width: "100%",
        height: 25,
        margin: "0 58px 15px 0",
        fontFamily: "Pretendard",
        fontSize: 18,
        fontWeight: "800",
        textAlign: "left",
        color: "#232323",
        //backgroundColor: "yellow",
      },
      box: {
        width: widthPercentage(27),
        height: widthPercentage(25.65),
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        
      },
      boxFont: {
        fontFamily: "Pretendard",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "left",
        color: "#232323",
        
      },
      boxRow: {
        width: "100%",
        height: widthPercentage(30),
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      blank: {
        width: "100%",
        height: widthPercentage(2),
        //backgroundColor: "pink",
      },
      imageBox: {
        width: widthPercentage(15),
        height: widthPercentage(15),
        //backgroundColor: "orange",
        position: 'absolute',
        right: 13,
        bottom: 13,
      },
      image: {
        
        width: widthPercentage(15),
        height: widthPercentage(15),
        position: 'absolute',
        right: 0,
        bottom: 0,
      },
      line: {
        width: "100%",
        height: widthPercentage(0.15),
        backgroundColor: "#e5e5e7",
      },
      categoryBar: {
        width: "100%",
        height: widthPercentage(13),
        backgroundColor: "white",
        flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
      },
  })