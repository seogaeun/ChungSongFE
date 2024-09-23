
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { heightPercentage, widthPercentage,fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';

//SVG 파일
import CommentIcon from '../../assets/images/Icon/postIcon.svg';
import ReportIcon from '../../assets/images/Icon/reportIcon.svg';
import WongSongIcon from '../../assets/images/Icon/wongSongIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
const MyAlarmInfo = ({ onPress,type, category, subtitle, date, who }) => {




    const getIconByType = () => {
        switch (type) {
            case '정지':
                return <WithLocalSvg asset={ReportIcon} width={widthPercentage(38)} height={heightPercentage(38)} />;
            case '웅성웅성':
                return <WithLocalSvg asset={WongSongIcon} width={widthPercentage(38)} height={heightPercentage(38)} />;
            default:
                return <WithLocalSvg asset={CommentIcon} width={widthPercentage(38)} height={heightPercentage(38)} />;
        }
    };

    // 배경 색상 설정
    const getBackgroundColor = () => {
        switch (type) {
            case '정지':
                return { backgroundColor: 'rgba(181, 181, 181, 0.05)' };
            case '웅성웅성':
                return { backgroundColor: 'rgba(104, 185, 1, 0.05)' };
            default:
                return { backgroundColor: 'rgba(64, 162, 219, 0.05)' };
        }
    };


    // 날짜 및 작성자 정보를 숨기는 함수
    const renderDateAndWho = () => {
        const dateObject = new Date(date);
        const month = dateObject.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
        const day = dateObject.getDate();

        if (type !== '정지') {
            return (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#ACACAC", fontSize: fontPercentage(12), fontWeight: 400, maxWidth: widthPercentage(100) }}>{`${month}\/${day}`} | {who}</Text>
                </View>
            );
        }
        else{
            return (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#ACACAC", fontSize: fontPercentage(12), fontWeight: 400, maxWidth: widthPercentage(100) }}>{`${month}\/${day}`}</Text>
                </View>
            );
        }
    };






    return (
        <TouchableOpacity onPress={onPress} style={{ ...getBackgroundColor(), width: '100%', display: "flex", flexDirection: "row", paddingTop: heightPercentage(10), paddingBottom: heightPercentage(13), justifyContent: "flex-start", paddingLeft: widthPercentage(17), alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E5E7' }}>
            <View style={{ marginRight: widthPercentage(12) }}>
                {getIconByType()}
            </View>


            <View style={{ alignItems: 'flex-start', marginStart: widthPercentage(1), width: widthPercentage(190), marginEnd: widthPercentage(10) }}>
                {/*게시판명*/}
                <Blank height={2}></Blank>
                {/* 글 제목 */}
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: widthPercentage(170), color: colors.black, fontSize: 15, fontWeight: 600 }}>{category}</Text>
                <Blank height={2}></Blank>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{
                    width: widthPercentage(180),
                    maxHeight: heightPercentage(35),
                    color: colors.black,
                    fontSize: fontPercentage(11),
                    fontWeight: 300,
                    overflow: 'hidden',
                }}>{subtitle}</Text>
                <Blank height={2} />
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    {renderDateAndWho()} 

                </View>




            </View>



        </TouchableOpacity>

    );
};

export default MyAlarmInfo;
