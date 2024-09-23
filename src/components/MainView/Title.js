import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

const MainTitle = ({ title}) => {

    return (
        <View>
            <Text style={{color:colors.black,fontSize:fontPercentage(18), fontWeight:900, width: widthPercentage(260),}}>
                {title}
            </Text>
        </View>
    );
};

export default MainTitle;
