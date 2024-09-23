import React, { useState, useRef, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';
import { useNavigation } from '@react-navigation/native';
import { WithLocalSvg } from 'react-native-svg/css';

//SVG 파일
import GoodIcon from '../../assets/images/Icon/Good.svg';
import CommentIcon from '../../assets/images/Icon/Comment.svg';



//클릭시 BulletinContent로 이동
const MyPostInfo = ({board, post_id, board_id, img, category, title, subtitle, goodCount, commentCount, date, who }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Call the onPress function with the post data
        // BulletinContent 화면으로 이동하며 관련 데이터 전달
        navigation.navigate('BulletinContent', {
          board,
          board_id,
          post_id,
    
        });
  };



  const originalDate = new Date(date);
const formattedDate = `${originalDate.getMonth() + 1}/${originalDate.getDate()}`;

    const renderBackgroundImage = () => {
        if (img && img !== "") {
          return (
            <Image
              source={img} // Assuming img is the image source
              style={{
                width: widthPercentage(56),
                height: widthPercentage(56),
                borderRadius: 10,
                backgroundColor:"gray"
              }}
            />
          );
        }
        return null;
      };

    return (
        <TouchableOpacity onPress={handlePress} style={{ backgroundColor: "#FFF", width: '100%', display: "flex", flexDirection: "row", paddingTop: heightPercentage(10), paddingBottom: heightPercentage(13), justifyContent:"flex-start", paddingLeft:widthPercentage(17), alignItems: 'center',borderBottomWidth: 1, borderBottomColor: '#E5E5E7' }}>
            <View style={{ alignItems: 'flex-start', marginStart: widthPercentage(1), width: widthPercentage(190), marginEnd: widthPercentage(10) }}>
                {/*게시판명*/}
                <Text style={{ color: "#40A2DB", fontSize: 12, fontWeight: 600 }}>{category}</Text>
                <Blank height={4}></Blank>
                {/* 글 제목 */}
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: widthPercentage(170), color: colors.black, fontSize: 15, fontWeight: 600 }}>{title}</Text>
                <Blank height={2}></Blank>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{
                    width: widthPercentage(180),
                    maxHeight: heightPercentage(35),
                    color: colors.black,
                    fontSize: 13,
                    fontWeight: 300,
                    overflow: 'hidden',
                }}>{subtitle}</Text>
                <Blank height={5} />
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems:'flex-end', justifyContent: 'flex-end', marginRight:widthPercentage(5) }}>
                        <WithLocalSvg asset={GoodIcon} width={widthPercentage(10)} height={heightPercentage(10)} />
                        <Text style={{ color: "#68B901", fontSize: 12, fontWeight: 600 }}>{goodCount}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems:'flex-end', justifyContent: 'flex-end', marginRight:widthPercentage(5) }}>
                        <WithLocalSvg asset={CommentIcon} width={widthPercentage(9)} height={heightPercentage(9)} />
                        <Text style={{ color: "#40A2DB", fontSize: 12, fontWeight: 600 }}>{commentCount}</Text>
                    </View>

                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#ACACAC", fontSize: 12, fontWeight: 400, maxWidth:widthPercentage(100) }}>{formattedDate} | {who}</Text>
                </View>




            </View>

            {renderBackgroundImage()}


        </TouchableOpacity>

    );
};

export default MyPostInfo;
