import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const CategoryBox = ({ Name, SVG, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.box}>
        <Text style={styles.boxFont}>{Name}</Text>
        <View style={styles.imageBox}>
          <View style={styles.image}>
            {SVG /* SVG 자체를 출력함 */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryBox;

const styles = StyleSheet.create({
  box: {
    width: widthPercentage(27),
    height: widthPercentage(25.65),
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  boxFont: {
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'left',
    color: '#232323',
  },
  imageBox: {
    width: widthPercentage(15),
    height: widthPercentage(15),
    position: 'absolute',
    right: 13,
    bottom: 13,
  },
  image: {
    width: widthPercentage(15),
    height: widthPercentage(15),
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
