import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';


const FindPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleFindEmail = () => {
    navigation.navigate('FindEmailStep1');

  };

  const handleFindPwd = () => {
    navigation.navigate('FindPwdStep1');
  };

  return (
    <View>

      {/* 상단바 */}
      {/* <TopBar /> */}


      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), alignItems: "center" }}>



        {/* 객체간 여백 */}
        <Blank height={17} />
        <TouchableOpacity onPress={handleFindEmail} style={{ alignItems: "center", justifyContent: "center", backgroundColor: colors.lightGreen, borderRadius: 10, width: widthPercentage(265), paddingVertical: heightPercentage(10) }}>
          <Text style={{ color: colors.black, textAlign: "center", fontSize: fontPercentage(14), fontWeight:500 }}>이메일 찾기</Text>
        </TouchableOpacity>


        {/* 객체간 여백 */}
        <Blank height={9} />

        <TouchableOpacity onPress={handleFindPwd} style={{alignItems:"center",justifyContent:"center",backgroundColor:colors.lightGreen,borderRadius:10,width:widthPercentage(265),paddingVertical:heightPercentage(10)}}>
            <Text style={{color:colors.black,textAlign:"center",fontSize:fontPercentage(14),fontWeight:500}}>비밀번호 찾기</Text>
          </TouchableOpacity>




      </View>



    </View>
  );
};

export default FindPage;
