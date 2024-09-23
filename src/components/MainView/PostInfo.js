import React, { useState, useRef, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import { heightPercentage, widthPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import Blank from '../Blank';
import talkLogo from '../../assets/images/talkLogo.png'
import deliverLogo from '../../assets/images/deliverLogo.png'
import schoolLogo from '../../assets/images/schoolLogo.png'
import { WithLocalSvg } from 'react-native-svg/css';


//SVG 파일
import CommentIcon from '../../assets/images/Icon/commentIcon.svg';
import DeliverIcon from '../../assets/images/Icon/delieverIcon.svg';
import SchoolIcon from '../../assets/images/Icon/schoolIcon.svg';
import TalkIcon from '../../assets/images/Icon/talkIcon.svg';


const PostInfo = ({ onPress, backgroundColor, borderColor, fontColor, category, postName, title, subtitle }) => {
    const getCategoryIcon = (category) => {
        switch (category) {
            case '배달 게시판':
                return <WithLocalSvg asset={DeliverIcon} width={widthPercentage(27)} height={heightPercentage(27)} />;
            case '자유 게시판':
                return <WithLocalSvg asset={TalkIcon} width={widthPercentage(27)} height={heightPercentage(27)} />;
            case '학교별 게시판':
                return <WithLocalSvg asset={SchoolIcon} width={widthPercentage(27)} height={heightPercentage(27)} />;
            case '건의 게시판':
                return <WithLocalSvg asset={CommentIcon} width={widthPercentage(27)} height={heightPercentage(27)} />;
            default:
                return <WithLocalSvg asset={TalkIcon} width={widthPercentage(27)} height={heightPercentage(27)} />; // 기본값은 TalkIcon
        }
    };

    const CategoryIcon = getCategoryIcon(category);









    return (
        <View style={{ width: widthPercentage(270), display: "flex", flexDirection: "row", marginTop: heightPercentage(4), marginStart: widthPercentage(10), }}>



            <View style={{ marginEnd: widthPercentage(6) }}>
                {CategoryIcon}
            </View>

            <View style={{ alignItems: 'flex-start', marginTop: heightPercentage(3), marginStart: widthPercentage(1) }}>
                <Text style={{ color: colors.black, fontSize: fontPercentage(13), fontWeight: 600 }}>{category}</Text>
                <Blank height={4}></Blank>
                <Text style={{
                    maxWidth: widthPercentage(220),
                    paddingVertical: heightPercentage(6),
                    paddingHorizontal: widthPercentage(10),
                    borderTopLeftRadius: 2,
                    borderRadius: 10,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                    borderColor: borderColor,
                    marginTop: heightPercentage(1),
                    color: fontColor,
                    fontSize: fontPercentage(13),
                    fontWeight: 600
                }}>{postName}</Text>
                <Blank height={4}></Blank>
                <TouchableOpacity onPress={onPress} style={{
                    width: widthPercentage(220),

                    paddingVertical: heightPercentage(1),
                    borderRadius: 10,
                    borderTopRightRadius: 2,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                    borderColor: borderColor,
                }}>
                    <View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: widthPercentage(170), marginStart: widthPercentage(13), marginTop: heightPercentage(5), color: colors.black, fontSize: fontPercentage(14), fontWeight: 600 }}>{title}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{
                            width: widthPercentage(165),
                            paddingBottom: heightPercentage(8),
                            marginStart: widthPercentage(13),
                            marginTop: heightPercentage(3),
                            color: colors.black,
                            fontSize: fontPercentage(12),
                            fontWeight: 300,
                            overflow: 'hidden',
                        }}>{subtitle}</Text>
                    </View>

                </TouchableOpacity>
                <Blank height={20} />



            </View>

        </View>

    );
};

export default PostInfo;


// import React, { useState, useRef, useEffect } from 'react';
// import { Image, View, Text, TouchableOpacity, Linking } from 'react-native';
// import { heightPercentage, widthPercentage, fontPercentage } from '../../utils/ResponsiveSize';
// import { colors } from '../../constants/colors';
// import Blank from '../Blank';
// import talkLogo from '../../assets/images/talkLogo.png'
// import deliverLogo from '../../assets/images/deliverLogo.png'
// import schoolLogo from '../../assets/images/schoolLogo.png'

// //SVG 파일
// import CommentIcon from '../../assets/images/Icon/commentIcon.svg';
// import DeliverIcon from '../../assets/images/Icon/delieverIcon.svg';
// import SchoolIcon from '../../assets/images/Icon/schoolIcon.svg';
// import TalkIcon from '../../assets/images/Icon/talkIcon.svg';


// const PostInfo = ({ onPress, backgroundColor, borderColor, fontColor, category, postName, title, subtitle }) => {
//     const getCategoryIcon = (category) => {
//         switch (category) {
//             case '배달 게시판':
//                 return <DeliverIcon width={widthPercentage(27)} height={heightPercentage(27)} />;
//             case '자유 게시판':
//                 return <TalkIcon width={widthPercentage(27)} height={heightPercentage(27)} />;
//             case '학교별 게시판':
//                 return <SchoolIcon width={widthPercentage(27)} height={heightPercentage(27)} />;
//             case '건의 게시판':
//                 return <CommentIcon width={widthPercentage(27)} height={heightPercentage(27)} />;
//             default:
//                 return <TalkIcon />; // 기본값은 TalkIcon
//         }
//     };

//     const CategoryIcon = getCategoryIcon(category);









//     return (
//         <View style={{ width: widthPercentage(270), display: "flex", flexDirection: "row", marginTop: heightPercentage(4), marginStart: widthPercentage(10), }}>



//             <View style={{ marginEnd: widthPercentage(6) }}>
//                 {CategoryIcon}
//             </View>

//             <View style={{ alignItems: 'flex-start', marginTop: heightPercentage(3), marginStart: widthPercentage(1) }}>
//                 <Text style={{ color: colors.black, fontSize: fontPercentage(13), fontWeight: 600 }}>{category}</Text>
//                 <Blank height={4}></Blank>
//                 <Text style={{
//                     maxWidth: widthPercentage(220),
//                     paddingVertical: heightPercentage(6),
//                     paddingHorizontal: widthPercentage(10),
//                     borderTopLeftRadius: 2,
//                     borderRadius: 10,
//                     backgroundColor: backgroundColor,
//                     borderWidth: 1,
//                     borderColor: borderColor,
//                     marginTop: heightPercentage(1),
//                     color: fontColor,
//                     fontSize: fontPercentage(13),
//                     fontWeight: 600
//                 }}>{postName}</Text>
//                 <Blank height={4}></Blank>
//                 <TouchableOpacity onPress={onPress} style={{
//                     width: widthPercentage(220),

//                     paddingVertical: heightPercentage(1),
//                     borderRadius: 10,
//                     borderTopRightRadius: 2,
//                     backgroundColor: backgroundColor,
//                     borderWidth: 1,
//                     borderColor: borderColor,
//                 }}>
//                     <View>
//                         <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: widthPercentage(170), marginStart: widthPercentage(13), marginTop: heightPercentage(5), color: colors.black, fontSize: fontPercentage(14), fontWeight: 600 }}>{title}</Text>
//                         <Text numberOfLines={1} ellipsizeMode="tail" style={{
//                             width: widthPercentage(165),
//                             paddingBottom: heightPercentage(8),
//                             marginStart: widthPercentage(13),
//                             marginTop: heightPercentage(3),
//                             color: colors.black,
//                             fontSize: fontPercentage(12),
//                             fontWeight: 300,
//                             overflow: 'hidden',
//                         }}>{subtitle}</Text>
//                     </View>

//                 </TouchableOpacity>
//                 <Blank height={20} />



//             </View>

//         </View>

//     );
// };

// export default PostInfo;
