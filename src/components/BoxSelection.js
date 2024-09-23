import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const BoxSelection = () => {
  const [selectedBox, setSelectedBox] = useState(0);

  const handleBoxPress = (index) => {
    setSelectedBox(index);
  };

  const renderBoxes = () => {
    const boxData = [
      { text: '기본', color: 'darkblue' },
      { text: 'HOT 게시판', color: 'darkgreen' },
      { text: '사생 게시판', color: 'darkred' },
      { text: '장터 게시판', color: 'darkorange' },
    ];

    return boxData.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.box,
            { backgroundColor: selectedBox === index ? 'rgba(104, 185, 1, 1)' : 'rgba(104, 185, 1, 0.1)' },
          ]}
          onPress={() => handleBoxPress(index)}
        >
          <Text style={[styles.boxText, { color: selectedBox === index ? 'white' : 'black' }]}>
            {data.text}
          </Text>
        </TouchableOpacity>
      ));
      
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {renderBoxes()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  box: {
    flex: 1,
    height: widthPercentage(8),
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  boxText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BoxSelection;



