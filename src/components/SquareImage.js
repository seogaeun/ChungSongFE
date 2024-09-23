// SquareImage.js
import React, { useState } from 'react';
import { TouchableOpacity, ImageBackground, Image, Modal, StyleSheet, View, Dimensions, Text } from 'react-native';
import { fontPercentage } from '../utils/ResponsiveSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const SquareImage = ({ source, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

  return (
    <View>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
        {isLoading && <View style={styles.loadingBackground} />}
        <Image
          source={source}
          style={styles.imageBackground}
          onLoadEnd={() => setIsLoading(false)} // 이미지 로딩 완료 시 isLoading 상태 변경
        />
        {/* <ImageBackground source={source} style={styles.imageBackground}> */}
          {/* Add any children components here if needed */}
        {/* </ImageBackground> */}
      </TouchableOpacity>

      {/* Modal for full-sized image */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={{ width: '80%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              {/* Add a close button or icon */}
              <Text style={{ color: 'black', fontsize: fontPercentage(20) }}>x 닫기</Text>

            </TouchableOpacity>

          </View>
          <Image source={source} style={styles.modalImage} />

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: widthPercentage(30),
    height: widthPercentage(30),
    marginHorizontal: 8,
    overflow: 'hidden', // 이미지가 박스를 벗어나는 경우 자르기
    borderRadius: 8,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalCloseButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: widthPercentage(1),
    paddingHorizontal: widthPercentage(2),
    // Add styles for the close button
  },
  loadingBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'lightgrey', // 회색 배경
  },
  modalImage: {
    width: '80%',
    height: '55%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default SquareImage;
