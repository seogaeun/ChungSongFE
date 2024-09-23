import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../utils/ResponsiveSize';
import { colors } from '../constants/colors';

const OnOffSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <TouchableOpacity onPress={toggleSwitch} style={[styles.switchContainer, isEnabled && styles.switchOn]}>
      <View style={[styles.switchKnob, isEnabled && styles.switchKnobOn]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: widthPercentage(45),
    height: heightPercentage(21),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2, // For Android
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    padding: widthPercentage(3),
  },
  switchOn: {
    backgroundColor: colors.swithchBlue,
  },
  switchKnob: {
    width: widthPercentage(15),
    height: heightPercentage(15),
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  switchKnobOn: {
    backgroundColor: 'white',
    transform: [{ translateX: widthPercentage(22) }],
  },
});

export default OnOffSwitch;
