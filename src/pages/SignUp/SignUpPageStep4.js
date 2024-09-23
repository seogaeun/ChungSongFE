import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentage, heightPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../../baseURL';

//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


//함수 모음
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

const greenColorHex = colors.green;
const greenColorRGB = hexToRgb(greenColorHex);



const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};


const SignUpPageStep4 = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [showUniversityList, setShowUniversityList] = useState(true);
  const [universityData, setUniversityData] = useState([]);
  const navigation = useNavigation();

  /////////값 쿠키 저장
  const saveSignInPage4Data = async (school) => {
    try {
      const data = { school };
      await AsyncStorage.mergeItem('signUpData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving page 4 data:', error);
    }
  };
  //////////////////



  useEffect(() => {
    // 페이지가 처음 마운트될 때 대학교 데이터를 불러옴
    fetchUniversityData();
  }, []);
  
const fetchUniversityData = async () => {
  try {
    const apiUrl = `${baseURL}/administrators/school_list`;
    const response = await axios.get(apiUrl);

    // 확인용 로그
    console.log('Fetched university data:', response.data);

    // 서버에서 받아온 대학교 데이터를 변환하여 state에 저장
    const formattedUniversityData = Object.keys(response.data).map((id) => {
      const name = response.data[id];
      
      return { id, name };
    });
    
    
    // 확인용 로그
    console.log("!!"+formattedUniversityData);
    

        // 확인용 로그
        console.log(formattedUniversityData);

    setUniversityData(formattedUniversityData);
  } catch (error) {
    console.error('Error fetching university data:', error);
  }
};

  




  const filteredUniversities = useMemo(() => {
    return universityData.filter((university) =>
      university.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, universityData]);

  const debouncedFilter = useCallback(
    debounce(() => {
      filterUniversities();
    }, 300),
    []
  );

  const handleLogin = () => {
    // 변경된 부분: 선택된 대학교가 있을 때만 넘어가기 버튼 활성화
    if (selectedUniversity) {
      saveSignInPage4Data(selectedUniversity.name);
      navigation.navigate('SignUpPageStep5');

    }
  };

  const handleImagePress = () => {
    debouncedFilter();
  };

  const filterUniversities = () => {
    // Do nothing, filtering is handled by useMemo
  };

  const handleInputChange = (text) => {
    setSearchKeyword(text);
  
    // Intl.Collator를 사용하여 텍스트 정규화
    const normalizedText = text.toLocaleLowerCase(undefined, { sensitivity: 'base' });
  
    debouncedFilter();
  
    // 대소문자를 구분하지 않고 정확한 일치 확인
    const hasExactMatch = universityData.some((university) => {
      const universityName = university.name ? university.name.toLocaleLowerCase(undefined, { sensitivity: 'base' }) : '';
      return universityName === normalizedText;
    });
  
    // 일치하는 대학교가 있거나 검색 결과가 비어 있지 않으면 다음 버튼 활성화
    setIsNextButtonEnabled(filteredUniversities.length > 0 || hasExactMatch);
  
    // 입력이 변경될 때 대학교 목록 표시
    setShowUniversityList(true);
  };
  
  



  const handleUniversityClick = (university) => {
    setSearchKeyword(university.name);
    setSelectedUniversity(university);
    // 변경된 부분: 대학교를 선택하면 리스트를 숨기도록 설정
    setShowUniversityList(false);
    // 변경된 부분: 대학교를 선택할 때마다 버튼 활성화
    setIsNextButtonEnabled(true);
  };

  return (
    <View>
      {/* 상단바 */}
      {/* <TopBar /> */}

      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        {/* 타이틀 뷰 (객체로 만들기) */}
        <TitleView step={"04 | 대학교 등록"} title={"재학 중인 대학교를 등록하세요"} />

        {/* 객체간 여백 */}
        <Blank height={25} />

        {/* 대학 리스트 검색창  */}
        <View style={{ marginRight: widthPercentage(17) }}>
          {/* 대학 리스트 검색 */}
          <View style={{
            marginBottom: heightPercentage(4), flexDirection: 'row', paddingLeft: widthPercentage(17), paddingRight: widthPercentage(17),
            alignItems: 'center', backgroundColor: `rgba(${greenColorRGB}, 0.05)`, borderRadius: 20, borderColor: colors.green, borderWidth: 1,
          }}>
            <TextInput
              style={{
                flex: 1,
                marginRight: widthPercentage(10),
                fontSize: 12,
              }}
              placeholder="재학 중인 대학교를 검색하세요"
              value={searchKeyword}
              onChangeText={handleInputChange}
            />

            {/* 이미지 버튼 추가 */}
            <TouchableOpacity
              onPress={handleImagePress}
              style={{
                width: widthPercentage(20),
                height: heightPercentage(20),
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={require('../../assets/images/search.png')}
                style={{
                  width: widthPercentage(17),
                  height: heightPercentage(17),
                }}
              />
            </TouchableOpacity>
          </View>

          {/* 대학교 리스트 표시 */}
          {/* 변경된 부분: 대학교 리스트를 보이거나 숨기도록 설정 */}
          {showUniversityList && (
            <View style={{ backgroundColor: `rgba(${greenColorRGB}, 0.05)`, borderRadius: 10, borderColor: colors.green, borderWidth: 1, padding: heightPercentage(5), maxHeight: heightPercentage(300), overflow: "scroll" }}>
              {searchKeyword.length > 0 && (
                <FlatList
                  data={filteredUniversities}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleUniversityClick(item)}>
                      <Text style={{ paddingLeft: widthPercentage(18), paddingTop: heightPercentage(9), paddingBottom: heightPercentage(9) }}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}

              {/* 'No results found' 메시지 표시 */}
              {searchKeyword.length > 0 && filteredUniversities.length === 0 && (
                <Text>No results found</Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* 변경된 부분: 버튼 활성화 여부에 따라서 disabled 속성 추가 */}
      <NxtBtn onPress={handleLogin} title="넘어가기" disabled={!isNextButtonEnabled} />
    </View>
  );
};

export default SignUpPageStep4;
