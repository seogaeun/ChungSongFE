// WriteButton.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';
import PenSvg from '../assets/images/pen.svg';
import { WithLocalSvg } from 'react-native-svg/css';

const WriteButton = ({ board_id }) => {
  const navigation = useNavigation();

  const handleWriteButtonClick = () => {
    // Navigate to CreatePost screen when the button is clicked
    navigation.navigate('CreatePost', { board_id });
  };


  return (
    <TouchableOpacity style={styles.container} onPress={handleWriteButtonClick}>
      <WithLocalSvg asset={PenSvg} />
      <Text style={styles.text}> 작성하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 45,
    backgroundColor: "#68b901",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  text: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

export default WriteButton;
