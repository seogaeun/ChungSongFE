// DeleteButton.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { WithLocalSvg } from 'react-native-svg/css';

import XSvg from '../assets/images/X(white).svg';

const DeleteButton = ({ onPress }) => {
  const handleWriteButtonClick = () => {
    // onPress가 전달되었을 때 실행
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleWriteButtonClick}>
      <WithLocalSvg asset={XSvg} />
      <Text style={styles.text}> 삭제하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 45,
    backgroundColor: "#40A2DB",
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

export default DeleteButton;
