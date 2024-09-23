import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';

import ConfirmBlock from '../../components/confirmBlock';
import TopBar from '../../components/TopBar2';
import SchoolListBox from "../../components/schoolListBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import { baseURL } from '../../../baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function SchoolList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("데이터를 받아오겠습니다");
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${baseURL}/administrators/school_boards/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'

          // 추가적인 헤더 필요시 여기에 추가
        },
        // 추가적인 Request Body 필요시 여기에 추가
      });
      console.log("데이터를 받아왔습니다");
      console.log(response);
      setData(response.data); // 데이터를 상태로 설정
    } catch (error) {
      console.log(error);
    }
  };


    return(
      <View style={styles.container}>
        <ScrollView>
          <View>
            {data.map((item, index) => (
              <View key={index} onPress={() => handleSchoolBoardsClick(item)}>
               
                <SchoolListBox 
                  title={item.board_name}
                  ID={item.board_id}
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


  })