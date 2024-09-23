import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GrayFolderBoxSVG from '../../assets/images/Main/grayFolderBox.svg';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import { WithLocalSvg } from 'react-native-svg/css';

const GrayFolderBoxWithText = ({ width=264,height=61,children }) => {
  return (
    <View style={styles.container}>
      <WithLocalSvg asset={GrayFolderBoxSVG} width={width} height={height} />
      <View style={styles.textContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    position: 'absolute',
  },
});

export default GrayFolderBoxWithText;
