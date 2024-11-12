import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import MypageWhiteTurnBox from '../../components/Mypage/MypageWhiteTurnBox';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';
import MypageWhiteBtn from '../../components/Mypage/MypageWhiteBtn';

const MypageAsk = () => {

  return (
    <View>

      {/* 상단바
      <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{
        height: heightPercentage(480), alignItems: "center"
      }}>


        {/* 객체간 여백 */}
        <Blank height={15} />
        <MypageTitle title="문의하기" />
        <MypageInputBox values={"7th.chungsong@gmail.com"} editables={false} />
        <Blank height={15} />
        <MypageTitle title="위 이메일로 문의주세요:)" />



      </View>



    </View>
  );
};

export default MypageAsk;
