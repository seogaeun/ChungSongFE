import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';

const SubPostInfo = ({ onPress, backgroundColor, borderColor, fontColor, postName, title }) => {
    const handleMorePress = () => {
        // 여기에 링크 주소를 넣어주세요
        const link = 'https://example.com'; // 이동할 링크 주소
        Linking.openURL(link);
    };

    return (
        <View>

            <TouchableOpacity onPress={onPress} style={{
                width: widthPercentage(264),
                paddingTop:heightPercentage(2),
                paddingBottom:heightPercentage(6),
                borderRadius: 10,
                marginStart: widthPercentage(7),
                backgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: borderColor,
            }}>
                <View style={{flexDirection:"row"}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ marginStart: widthPercentage(13), marginTop: heightPercentage(4), color: fontColor, fontSize: fontPercentage(14), fontWeight: 600 }}>{postName}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail"  style={{ maxWidth: widthPercentage(170), marginStart: widthPercentage(13), marginTop: heightPercentage(5), color: colors.black, fontSize: fontPercentage(13), fontWeight: 600 }}>{title}</Text>
                </View>

            </TouchableOpacity>

        </View>

    );
};

export default SubPostInfo;
