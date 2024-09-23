import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';


import Request from './confirm/requestTag';
import Complete from './confirm/completeTag';
import User2 from '../assets/images/User(blue).svg';
import { WithLocalSvg } from 'react-native-svg/css';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function ConfirmBlock({name, ID, room, univ, status}) {

    return (
        <View>
            <View style={styles.container}>
                <View style={{paddingLeft: 26}}>
                    <WithLocalSvg asset={User2} />
                </View>
                <View style={styles.textBox}>
                    <View style={styles.highTextBox}>
                        <Text style={styles.highText}>{name}</Text>
                        <Text style={styles.highText}> | </Text>
                        <Text style={styles.highText}>{ID}</Text>
                    </View>
                    <View style={styles.lowTextBox}>
                        <Text style={styles.lowText}>남도학숙 은평관 {room}호</Text>
                        <Text style={styles.lowText}> | </Text>
                        <Text style={styles.lowText}>{univ}</Text>
                    </View>
                </View>
                {status === '인증대기' ? <WithLocalSvg asset={Request} /> : <WithLocalSvg asset={Complete} />}
            </View>
            <View style={styles.line} />
        </View>
      
    )
  }

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: widthPercentage(18),
        flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        
    },
    profileImage: {
        width: widthPercentage(10),
        height: widthPercentage(10),

    },
    textBox: {
        width: widthPercentage(60),
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
})