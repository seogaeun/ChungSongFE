import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function RequestTag() {

    return (
      <View style={styles.container}>
        <Text style={{
            fontSize: 10, 
            color: "#40a2db",
            fontWeight: "800",
            }}>요청 중</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        width: widthPercentage(16),
        height: widthPercentage(6),
        borderRadius: 8,
        borderWidth: 1.5  ,
        borderColor: "#40a2db",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        
    },
})