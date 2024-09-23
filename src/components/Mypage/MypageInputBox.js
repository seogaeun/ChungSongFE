import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';

const MypageInputBox = ({ values,placeholder, editables=true, color = colors.fontGray, inputType,onChangeText }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
      setInputValue(text);
      onChangeText(text); // Call the provided callback function with the updated text
    };
  



    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={values}
                onChangeText={handleInputChange} // Pass the input change handler
                secureTextEntry={inputType === 'password'} // password 타입 여부 체크
                editable={editables}
                style={{
                    width: widthPercentage(265),
                    height: heightPercentage(10),
                    paddingTop: heightPercentage(10),
                    paddingBottom: heightPercentage(10),
                    paddingLeft: widthPercentage(18),
                    minHeight: heightPercentage(35),
                    backgroundColor: colors.fontWhite,
                    borderRadius: 10,
                    fontSize: fontPercentage(11),
                    color: color,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 2,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 2, // For Android
                }}></TextInput>

        </View>

    );
};

export default MypageInputBox;
