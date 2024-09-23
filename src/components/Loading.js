import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const Loading = () => {
    const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
    const spin = spinAnim.interpolate({
        inputRange: [0,1],
        outputRange: ["0deg","3600deg"],
    });

    useEffect(()=>{
        Animated.loop(
            Animated.timing(spinAnim,{
                toValue: 1,
                duration:10000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    },[]);

    return (
        <Animated.Image
            source={require('../assets/images/homeLogo.png')}
            style={{ ...styles.loadingImage, transform: [{ rotate: spin }] }}
        />
    )
}

const styles = {
    loadingImage: {
        width: '10%',
        height: '10%',
        resizeMode: 'contain', // 이미지를 비율을 유지하며 가로 너비나 세로 높이 중 작은 쪽에 맞춰 조정합니다.

        // 여기에 다른 스타일을 추가할 수 있습니다.
    }
};

export default Loading;
