// // AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   const login = () => {
//     setLoggedIn(true);
//   };

//   const logout = () => {
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false); // 로그인 상태 변수
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 초기 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          setLoggedIn(true);
          const user = await AsyncStorage.getItem('userData');
          setUserData(user ? JSON.parse(user) : null); // 사용자 정보 불러오기
        } else {
          setLoggedIn(false); // 로그인 실패시 false로 설정
        }
      } catch (error) {
        console.error('로그인 상태 확인 오류:', error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  // 로그인 처리 함수
  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setLoggedIn(true);
      setUserData(userData);
    } catch (error) {
      console.error('로그인 중 오류:', error);
    }
  };

  // 로그아웃 처리 함수
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userData');
      setLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  };

  // 로딩 중일 때는 아무것도 렌더링하지 않도록 함
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
