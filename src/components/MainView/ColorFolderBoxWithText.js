import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlueFolderBoxSVG from '../../assets/images/Main/blueFolderBox.svg';
import GreenFolderBoxSVG from '../../assets/images/Main/greenFolderBox.svg';
import { WithLocalSvg } from 'react-native-svg/css';

import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
const ColorFolderBoxWithText = ({ width, height, children, color }) => {
  return (
    <View style={styles.container}>
      {color === 'green' ? (
        <WithLocalSvg asset={GreenFolderBoxSVG} width="120%" height="100%" viewBox="-25 10 234 41" />
      ) : (
        <WithLocalSvg asset={BlueFolderBoxSVG} width="120%" height="100%" viewBox="-25 10 234 42" />
      )}
      <View style={styles.textContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    height:'85%'
  },
  textContainer: {
    position: 'absolute',
  },
});

export default ColorFolderBoxWithText;
