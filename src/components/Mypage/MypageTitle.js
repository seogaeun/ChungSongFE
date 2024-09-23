import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';

const MypageTitle = ({ title }) => {
    return (
        <View>
            <Text style={{ width: widthPercentage(265), marginLeft: widthPercentage(15), color: colors.black, fontSize: 12, fontWeight: '700' }}>
                {title}
            </Text>
            {/* 객체간 여백 */}
            <Blank height={5} />
        </View>
    );
};

export default MypageTitle;
