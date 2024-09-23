import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { fontPercentage, heightPercentage, widthPercentage } from '../utils/ResponsiveSize';

export default function AnonyCheck({ onCheckBoxChange }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckBox = () => {
    setIsSelected(!isSelected);
    onCheckBoxChange(!isSelected);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        disabled={false}
        value={isSelected}
        onValueChange={handleCheckBox}
        style={styles.checkbox}
        tintColors={{ true: '#68b901', false: '#777' }}
        tintColor="#777"
        onCheckColor="#68b901"
      />
      <Text style={[
        styles.text,
        {
          color: isSelected ? '#68b901' : '#777'
        }]}>익명</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'yellow',

  },
  text: {
    marginLeft:widthPercentage(5),
    fontWeight: "600",
    fontSize: fontPercentage(17),
  },
  checkbox:{
    marginVertical:widthPercentage(5),
  }

})