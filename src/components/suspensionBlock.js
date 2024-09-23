import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';


import DateTag from './confirm/dateTag';
import User1 from '../assets/images/User1.svg';
import { WithLocalSvg } from 'react-native-svg/css';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function SuspensionBlock({Complained, Start, End, days}) {

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <DateTag date={days} />
                </View>
                <View style={styles.middleBox}>
                    
                    <View style={{paddingLeft: 26}}>
                      <WithLocalSvg asset={User1} />
                    </View>
                    <View style={styles.textBox}>
                        <View style={styles.highTextBox}>
                            <Text style={styles.highText}>신고 수 {Complained}</Text>
                            
                        </View>
                        <View style={styles.lowTextBox}>
                            <Text style={styles.lowText}>{Start+ '  ~  '+ End}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
            <View style={styles.line} />
        </View>
      
    )
  }

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: widthPercentage(30),
        //flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        padding: 10,
    },
    topBox: {
        width: "100%",
        height: widthPercentage(8),
        justifyContent: "space-between",
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
        //backgroundColor: "skyblue",
        justifyContent: "center",
    },
    profileImage: {
        width: widthPercentage(10),
        height: widthPercentage(10),

    },
    textBox: {
        width: widthPercentage(60),
        height: widthPercentage(10),
        // backgroundColor: "orange",
        marginLeft: 15,
        // flexDirection: "row",
        
    },
    highTextBox: {
        // flex: 30,
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
        // flex: 10,
        width: widthPercentage(60),
        // backgroundColor: "skyblue",
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
})