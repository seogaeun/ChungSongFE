// ReportModal.js

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const ReportModal = ({ visible, onClose, onReport }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={() => onClose()}>
        <View style={styles.modalContent}>
            <View style={styles.block} >
                <Text style={{...styles.text, fontWeight: 'bold'}}>신고</Text>
            </View>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("불건전한 내용")}>
                <Text style={styles.text}>불건전한 내용</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("사기")}>
                <Text style={styles.text}>사기</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("상업적 광고")}>
                <Text style={styles.text}>상업적 광고</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("특정인에 대한 비난")}>
                <Text style={styles.text}>특정인에 대한 비난</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("도배")}>
                <Text style={styles.text}>도배</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.block} onPress={() => onReport("기타")}>
                <Text style={styles.text}>기타</Text>
            </TouchableOpacity>

          {/* <Text>이 댓글을 신고하시겠습니까?</Text>
          <TouchableOpacity onPress={() => onReport()}>
            <Text>신고</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClose()}>
            <Text>취소</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: widthPercentage(50),
    backgroundColor: 'white',
    //padding: 20,
    borderRadius: 10,
  },
  block: {
    //width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  }, 
  line: {
    width: "100%",
    height: widthPercentage(0.1),
    backgroundColor: "gray",
  },
});

export default ReportModal;
