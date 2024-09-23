import React, {useState, useEffect, useRef} from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions, Image, TouchableOpacity} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function SchoolListBox({title, ID}) {
  const route = useRoute();
  const navigation = useNavigation();
  // const { board_name, board_id  } = route.params;
  


  const handleSchoolBoardsClick = (title, ID) => {
    // 클릭된 아이템의 정보를 전달
    let path = `/boards/${ID}/`;
    let bulletinName = title;
    navigation.navigate('BulletinList', {bulletinName, path});
  };


    return(
        <TouchableOpacity onPress={() => handleSchoolBoardsClick(title, ID)}>
            <View style={styles.block}>
                <Text style={{fontSize: 17, fontWeight: 700}}>{title}</Text>
            </View>
            <View style={styles.line}></View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    block: {
        width: "100%",
        height: widthPercentage(14),
        backgroundColor: "white",
        padding: 14,
        paddingLeft: 25,
        alignItems: "flex-start",
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
      line: {
        width: "100%",
        height: widthPercentage(0.3),
        backgroundColor: "#e5e5e7",
      },
      
})