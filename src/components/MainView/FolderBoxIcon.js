import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import BlueFolderBoxWithText from './ColorFolderBoxWithText';

const FolderBoxIcon = ({ color, fontColor, category, title, subtitle,onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: widthPercentage(190), height: heightPercentage(130), alignItems: 'center' }}>
            <BlueFolderBoxWithText color={color}>
                <View style={{ width: "100%", height: "100%", paddingLeft:"19.5%",paddingTop:"9.5%" }}>
                    <Text style={{
                        color: fontColor,
                        fontSize: fontPercentage(12), fontWeight: 600
                    }}>{category}</Text>
                    <View style={{paddingTop:"5%",paddingLeft:"3%"}}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: widthPercentage(150), color: colors.black, fontSize: fontPercentage(15), fontWeight: 600 }}>{title}</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{
                            width: widthPercentage(160), height: heightPercentage(28), marginTop: heightPercentage(3), color: colors.black, fontSize: fontPercentage(11), fontWeight: 300, overflow: 'hidden',
                        }}>{subtitle}</Text>
                        <Text style={{ fontSize: fontPercentage(11), color: colors.blue }}>더 보기</Text>
                    </View>
                </View>
            </BlueFolderBoxWithText>
        </TouchableOpacity>
    );
};

export default FolderBoxIcon;
