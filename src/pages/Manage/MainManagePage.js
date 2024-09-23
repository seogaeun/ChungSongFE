import React from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { WithLocalSvg } from "react-native-svg/css";
import TopBar from '../../components/TopBar2';
import User2 from '../../assets/images/User(blue).svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const MainManage = () => {
  const navigation = useNavigation();

  const infoManageBoxClick = () => {
    // '사생 정보 및 인증 관리' 항목을 클릭했을 때 ConfirmList 페이지로 이동
    navigation.navigate('ConfirmList');
  };

  const roomChangeBoxClick = () => {
    navigation.navigate('RoomChangeList');
  };

  const schoolListClick = () => {
    navigation.navigate('SchoolList');
  };

  const reportListClick = () => {
    navigation.navigate('ReportList');
  };

  const deletedPostClick = () => {
    navigation.navigate('DeletedPost');
  };

  const logOutClick = () => {
    navigation.navigate('MypageLogout');
  };

    return(
      <View style={styles.container}>
        <ScrollView>
          
              
          <View style={styles.contentArea}>
              <View style={styles.profileFrame}>
                  <View style={styles.profileBox}>
                    <WithLocalSvg asset={User2} />
                    <Text style={styles.managerName}>남도학숙 은평관 자율회</Text>
                  </View>
              </View>
              
          </View>

          <View style={styles.infoFrame}>
              <View style={styles.infoTitleBox}>
                  <Text style={styles.infoTitle}>사생 정보 관리</Text>
              </View>
              <View style={styles.infoBox}>
              <TouchableOpacity onPress={infoManageBoxClick}>
                <View style={styles.infoInnerBox}>
                  <Text style={styles.infoInnerText}>사생 정보 및 인증 관리</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={roomChangeBoxClick}>
                <View style={styles.infoInnerBox}>
                  <Text style={styles.infoInnerText}>호수 변동 신청 리스트</Text>
                </View>
              </TouchableOpacity> 
              </View>
          </View>

          <View style={styles.infoFrame}>
              <View style={styles.infoTitleBox}>
                  <Text style={styles.infoTitle}>게시판 관리</Text>
              </View>
              <View style={styles.reportBox}>
                <TouchableOpacity onPress={schoolListClick}>
                  <View style={styles.infoInnerBox}>
                      <Text style={styles.infoInnerText}>학교별 게시판</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.infoFrame}>
              <View style={styles.infoTitleBox}>
                  <Text style={styles.infoTitle}>신고 관리</Text>
              </View>
              <View style={styles.reportBox}>
                <TouchableOpacity onPress={reportListClick}>
                  <View style={styles.infoInnerBox}>
                      <Text style={styles.infoInnerText}>신고 리스트</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.infoFrame}>
              <View style={styles.infoTitleBox}>
                  <Text style={styles.infoTitle}>휴지통</Text>
              </View>
              <View style={styles.reportBox}>
                <TouchableOpacity onPress={deletedPostClick}>
                  <View style={styles.infoInnerBox}>
                      <Text style={styles.infoInnerText}>삭제된 글</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.infoFrame}>
              <View style={styles.infoTitleBox}>
                  <Text style={styles.infoTitle}>로그아웃</Text>
              </View>
              <View style={styles.reportBox}>
                <TouchableOpacity onPress={logOutClick}>
                  <View style={styles.infoInnerBox}>
                      <Text style={styles.infoInnerText}>로그아웃</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
          <View style={{height: widthPercentage(7)}} />
        </ScrollView>
        
      </View>
      
    )
  }
  export default MainManage;
  
  const styles = StyleSheet.create({
      container: {
        backgroundColor: 'rgba(64, 162, 219, 0.15)',
        //justifyContent: "flex-start",
        flex: 1,
      },
      contentArea: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        //backgroundColor: "gray",
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
      profileFrame: {
        width: "100%",
        height: widthPercentage(24),
        //backgroundColor: "pink",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        
      },
      profileBox: {
        width: "100%",
        height: widthPercentage(20),
        backgroundColor: "white",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
      },
      profileImage: {
        width: widthPercentage(10),
        height: widthPercentage(10),
      },
      managerName: {
        fontFamily: "Pretendard",
        fontSize: 17,
        fontWeight: "bold",
        color: "#232323",
        paddingLeft: 15,
      },
      infoFrame: {
        width: "100%",
        //height: widthPercentage(40),
        //backgroundColor: "yellow",
        paddingTop: 10,
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
      infoTitle: {
        fontFamily: "Pretendard",
        fontSize: 17,
        fontWeight: "bold",
        color: "#232323",
        paddingLeft: 15,
        
      },
      infoBox: {
        width: "100%",
        height: widthPercentage(25),
        backgroundColor: "white",
        borderRadius: 15,
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
      },
      infoInnerBox: {
        width: widthPercentage(40),
        height: widthPercentage(7),
        //backgroundColor: "green",
        justifyContent: "center",
        //margin: 20,
      },
      infoInnerText: {
        fontFamily: "Pretendard",
        fontSize: 16,
        fontWeight: "600",
        color: "#232323",
      },
      reportBox: {
        width: "100%",
        height: widthPercentage(12.5),
        backgroundColor: "white",
        borderRadius: 15,
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
      },
  })