// LoginInput.js

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors } from '../../constants/colors';
import { widthPercentage, heightPercentage,fontPercentage } from '../../utils/ResponsiveSize';

const LoginInput = ({ title, placeholder, inputType, onChangeText,inputMode }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
    onChangeText(text); // Call the provided callback function with the updated text
  };

  return (
    <View style={{ marginTop: heightPercentage(12) }}>
      <Text style={{
        fontSize: fontPercentage(12), color: colors.black, fontWeight: 500, marginLeft: widthPercentage(1)
      }}>{title}</Text>
      <TextInput
        style={{
          paddingTop: heightPercentage(10),
          paddingBottom: heightPercentage(10),
          marginRight: widthPercentage(15),
          borderBottomWidth: 1,
          borderColor: colors.underGray,
          color: colors.fontGray, // Text color
        }}
        placeholder={placeholder}
        secureTextEntry={inputType === 'password'}
        onChangeText={handleInputChange} // Pass the input change handler
        value={inputValue} // Set the input value
        
      />
    </View>
  );
};

export default LoginInput;
