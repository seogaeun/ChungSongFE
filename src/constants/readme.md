상수와 관련된 파일

지정된 색, 폰트 등 지정해서 쓰는 상수들을 기재한 곳 입니다.

### 컴포넌트에서는 아래와 같이 활용됩니다.

<pre><code>
// 예시: src/components/MyComponent.js

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../constants/styles';

const MyComponent = () => {
  return (
    <View>
      <Text style={styles.(실제 폰트 이름))}>내 컴포넌트 내용</Text>
    </View>
  );
};

export default MyComponent;
</code></pre>