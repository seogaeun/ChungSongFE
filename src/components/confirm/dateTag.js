import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const LoginInput = ({ date}) => {
  return (
    <View style={styles.container}>
        <Text style={{
            fontSize: 10, 
            color: "white",
            fontWeight: "800",
        }}>{date}일 정지</Text>
      
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
    container: {
        width: widthPercentage(16),
        height: widthPercentage(5),
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#40a2db',
        
    },
})