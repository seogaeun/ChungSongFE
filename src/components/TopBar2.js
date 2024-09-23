import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import BackSvg from '../assets/images/backIcon.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const TopBar2 = ({ BulletinName }) => {
  const navigation = useNavigation();

  // const handleBackButtonClick = () => {
  //   // Go back to the previous screen
  //   navigation.goBack();
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleBackButtonClick} style={styles.backBotton}>
          <BackSvg />
        </TouchableOpacity> */}
        <Text style={styles.bulletin}>{BulletinName}</Text>
      </View>
    </View>
  );
};

export default TopBar2;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: widthPercentage(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bulletin: {
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 17,
    fontWeight: '700',
    color: '#232323',
  },
  backBotton: {
    width: widthPercentage(8),
    height: widthPercentage(8),
    position: 'absolute',
    left: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBottonIcon: {
    width: widthPercentage(3.5),
    height: widthPercentage(6),
  },
});
