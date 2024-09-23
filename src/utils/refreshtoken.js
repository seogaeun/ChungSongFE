// tokenUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const refreshToken = async () => {
    try {
        // 기존 refresh_token 가져오기
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        console.log('[리프레쉬 토큰 진입] '+refresh_token)
        // refresh_token이 존재할 때만 API 호출
        if (refresh_token) {
            console.log("[토큰 재할당]", refresh_token);

            // POST 요청 보내기
            const response = await axios.post(
                `${baseURL}/users/refresh_jwt_token/`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Cookie: `refresh_token=${refresh_token}`,
                    },
                }
            );

            // 응답 확인
            const { message, access_token } = response.data;
            console.log('[토큰 재할당 응답]', { message, access_token });

            // 여기에서 access_token을 AsyncStorage에 저장
            AsyncStorage.setItem('accessToken', access_token);
        } else {
            console.log('[토큰 재할당]refresh_token이 존재하지 않습니다.');
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('refresh_token');
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log(accessToken);
        }
    } catch (error) {
        console.error('Error refreshing token:', error.message);
    }
};
