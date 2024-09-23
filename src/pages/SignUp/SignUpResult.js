import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

// import { LinearGradient } from 'react-native-svg';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import Blank from '../../components/Blank';

const SignUpResult = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleLogin = () => {
    navigation.navigate('InitPage');
  };



  return (
    <View style={{ padding: 20 }}>
      <View style={{          

          justifyContent: 'center',
          alignItems: 'center',
          marginTop: heightPercentage(100),
}}>

      <Image
        style = {{width: widthPercentage(96),
          height: heightPercentage(121),
        marginBottom: heightPercentage(58), }}
        source={require('../../assets/images/logo.png')} // 이미지 파일의 경로
        resizeMode="contain"
      />

      <Blank height={10}/>
      <Text style={{padding:heightPercentage(10),fontSize:20,fontWeight:700,color:colors.green }}>사생 인증 대기 중...</Text>
      <Text>사생 인증은 일주일 정도 소요됩니다.</Text>
      </View>
      <Blank height={90}/>

      <NxtBtn onPress={handleLogin} title="처음 화면으로" ></NxtBtn>

    </View>
  );
};

export default SignUpResult;
