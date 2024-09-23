// AcademicManagementScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const AcademicManagementScreen = () => {
  // 외부 링크 URL
  const externalURL = 'http://portal.ndhs.or.kr/index'; // 여기에 외부 링크 주소를 넣어주세요.

  // 외부 링크를 열기 위한 함수
  const openExternalLink = () => {
    Linking.openURL(externalURL);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={openExternalLink}>
        <Text>학사관리 페이지로 이동</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AcademicManagementScreen;
