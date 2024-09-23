import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { heightPercentage, widthPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import LinearGradient from 'react-native-linear-gradient';

const ItemContent = ({ onPress, imageUrl, title, description }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: '#ffffff',
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      margin: 10,
      width:widthPercentage(100),
      height:heightPercentage(120)
    }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: '60%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      ) : (
        <LinearGradient
          colors={['rgba(104, 185, 1, 0.80)', 'rgba(64, 162, 219, 0.80)']}
          style={{
            width: '100%',
            height: '60%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center', // 가운데 정렬을 위해 추가된 부분
            justifyContent: 'center', // 가운데 정렬을 위해 추가된 부분
          }}
        >
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>이미지가 없습니다:)</Text>
        </LinearGradient>
      )}
      <View style={{ marginLeft: widthPercentage(5), marginTop: heightPercentage(6) }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: fontPercentage(13), fontWeight: 500 }}>{title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: fontPercentage(9), fontWeight: 300, marginTop: widthPercentage(3) }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemContent;
