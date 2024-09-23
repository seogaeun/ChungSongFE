// CreatePost.js
import React, { useState, useEffect } from 'react';
import { View, Alert, Image, StyleSheet, Text, ScrollView, Dimensions, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';  // 추가된 부분
import { WithLocalSvg } from 'react-native-svg/css';

import CheckBox from '../../components/anonymousCheck';
import XSvg from '../../assets/images/X.svg';
import PhotoSvg from '../../assets/images/photo.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../baseURL';
import LoadingModal from '../../components/LoadingModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const route = useRoute();  // 추가된 부분
  const [isSelected, setIsSelected] = useState(false); // 1. isSelected 상태 정의

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isloading, setLoading] = useState(false);



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log("Selected Photos:", selectedPhotos);
  }, [selectedPhotos]);


  // 이미지 선택 버튼
  const handleChoosePhotos = async () => {
    Alert.alert(
      "업로드 방법 선택",
      "사진을 업로드할 방식을 선택해주세요",
      [
        {
          text: "카메라로 촬영하기",
          onPress: async () => {
            const result = await launchCamera({
              mediaType: 'photo',
              cameraType: 'back',
            });
            if (!result.cancelled) {
              const selected = result.uri; // 선택한 이미지들의 uri를 가져옴
              if (selected) {
                setSelectedPhotos(prevPhotos => [...prevPhotos, { imgfile: selected }]);
              }
              console.log('result');
              console.log(result);
              handlePhotosResult(result);
            }
          }
        },
        {
          text: "앨범에서 선택하기",
          onPress: async () => {
            const result = await launchImageLibrary({ // 수정된 부분
              mediaType: 'photo',
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
              multiple: true,
            });
            handlePhotosResult(result);
          }
        },
      ],
      { cancelable: false }
    );
  };

  // 선택한 이미지 처리
  const handlePhotosResult = (result) => {
    console.log('함수진입');
    console.log(result);
    if (!result.cancelled) {
      const selectedImages = result.assets.map(asset => ({ imgfile: "file://" + asset.uri.split("//").pop() }));
      // 선택된 이미지들만 추가하도록 수정
      const filteredImages = selectedImages.filter(image => image.imgfile !== undefined);
      setSelectedPhotos(prevPhotos => [...prevPhotos, ...filteredImages]);
      console.log(selectedPhotos);
    } else {
      console.log('이미지가 선택되지 않았습니다.');
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...selectedPhotos];
    newPhotos.splice(index, 1);
    setSelectedPhotos(newPhotos);
  };

  const handleCheckBox = () => {
    setIsSelected(!isSelected); // 3. 상태 변경 함수
    console.log(!isSelected);
  };


  const handleComplete = async () => {
    try {
      setLoading(true);

      const accessToken = await AsyncStorage.getItem('accessToken');

      // 게시글 작성 API 호출
      const apiUrl = `${baseURL}/boards/${route.params?.board_id}/posts/`;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('anon_status', isSelected);
      console.log(selectedPhotos);
      selectedPhotos.forEach((photo, index) => {
        const fileName = photo.imgfile.split('/').pop();
        const fileType = fileName.split('.').pop();
        formData.append(`images`, {
          uri: photo.imgfile,
          type: `image/${fileType}`, // 이미지의 확장자에 따라 타입 설정
          name: fileName,
        });
      });
      console.log(formData);
      // selectedPhotos.forEach((photo, index) => {
      // formData.append(`images[${index}]`, {
      //     uri: photo.imgfile,
      //     type: 'image/jpeg',
      //     name: `photo_${index}.jpg`,
      //   });
      // });


      console.log(apiUrl)
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // 응답 확인
      console.log('게시글 작성 응답:', response.data);
      console.log('formData');
      console.log(formData);
      const bulletinName = response.data.board;
      const updateTime = response.data.created_at;

      let path = '';

      // bulletinName에 따라 경로 결정
      switch (bulletinName) {
        case '공지사항':
          path = '/boards/1/'; // '공지사항'에 대한 경로는 '/boards/1'
          break;
        case '웅성웅성':
          path = '/boards/hot_posts/';
          break;
        case '자유 게시판':
          path = '/boards/2/'; // '자유 게시판'에 대한 경로는 '/boards/2'
          break;
        case '배달 게시판':
          path = '/boards/3/'; // '배달 게시판'에 대한 경로는 '/boards/3'
          break;
        case '건의 게시판':
          path = '/boards/4/'; // '건의 게시판'에 대한 경로는 '/boards/4'
          break;
        case '분실 게시판':
          path = '/boards/5/'; // '분실 게시판'에 대한 경로는 '/boards/5'
          break;
        case '홍보 게시판':
          path = '/boards/6/'; // '홍보 게시판'에 대한 경로는 '/boards/6'
          break;
        case '판매 게시판':
          path = '/boards/7/'; // '판매 게시판'에 대한 경로는 '/boards/7'
          break;
        case '공구 게시판':
          path = '/boards/8/'; // '공구 게시판'에 대한 경로는 '/boards/8'
          break;
        case '나눔 게시판':
          path = '/boards/9/'; // '나눔 게시판'에 대한 경로는 '/boards/9'
          break;
        case '학교 게시판':
          path = '/my_school_board/';
          break;
        // 추가 게시판에 대한 경우도 추가

        default:
          path = ''; // 기본 경로
      }

      console.log("이동" + path)
      console.log(bulletinName);

      // 작성이 완료되면 게시글 목록 페이지로 이동
      navigation.navigate('BulletinList', { bulletinName, path, updateTime });
      console.log(response.data);
      if (response.data.post_id !== null && response.data.post_id !== undefined) {
        // Alert 창 표시
        setLoading(false);

        Alert.alert('작성 완료', '게시글 작성이 완료되었습니다.');

      }
      else {
        setLoading(false);

        // Alert 창 표시
        Alert.alert('작성 실패', response.data.message);

      }
      

    } catch (error) {
      setLoading(false);
      console.error('게시글 작성 중 에러 발생:', error);
      if (error.status === 400) {
        Alert.alert('제목과 내용을 작성해주세요');
      }

      // 에러 처리 로직 추가
    }
  };


  const handleBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { maxHeight: (windowHeight - keyboardOffset) * 0.83 }]}>
      {isloading && (
        <LoadingModal></LoadingModal>
      )}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <WithLocalSvg asset={XSvg} />
        </TouchableOpacity>
        <Text style={styles.bulletin}>작성하기</Text>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.boxFont}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <TextInput
          style={styles.title}
          placeholder={"제목"}
          multiline={true}
          onChangeText={(text) => setTitle(text)}
        />
        <View style={styles.lineBox}>
          <View style={styles.line}></View>
        </View>
        <TextInput
          style={styles.content}
          placeholder={"내용을 입력하세요."}
          multiline={true}
          onChangeText={(text) => setContent(text)}
        />
      </ScrollView>


      <View style={[styles.footer]}>
        <ScrollView horizontal style={styles.photoList}>
          {selectedPhotos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo.imgfile }} style={styles.photo} />
              <TouchableOpacity style={styles.removeButton} onPress={() => removePhoto(index)}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={[styles.footer2]}>
          {/* 선택한 이미지 목록 표시 */}
          <TouchableOpacity onPress={handleChoosePhotos}>
            <WithLocalSvg asset={PhotoSvg} />

          </TouchableOpacity>
          <CheckBox onCheckBoxChange={handleCheckBox} />

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: widthPercentage(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  bulletin: {
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 17,
    fontWeight: "700",
    color: "#232323",
  },
  backButton: {
    width: widthPercentage(8),
    height: widthPercentage(8),
    //backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 2,
  },
  title: {
    paddingTop: 15,
    paddingLeft: 10,
    fontSize: 20,
  },
  content: {
    paddingLeft: 10,
    fontSize: 15,
    minHeight: heightPercentage(50),
    textAlignVertical: "top"
  },
  line: {
    width: "95%",
    height: widthPercentage(0.3),
    backgroundColor: "#e5e5e7",
    paddingLeft: 30,
  },
  lineBox: {
    width: "100%",
    alignItems: "center",
  },
  completeButton: {
    width: widthPercentage(11),
    height: widthPercentage(6.5),
    backgroundColor: "#68b901",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 2,
  },
  boxFont: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "left",
    color: "white",
  },
  footer: {
    flexDirection: 'column',
    position: 'fixed',
    bottom: 0,
    paddingLeft: 7,
    paddingRight: 7,

  },

  footer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: widthPercentage(13),
    alignItems: "center",

  },

  photoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  photo: {
    width: widthPercentage(25),
    height: widthPercentage(25),
    borderRadius: 8,
  },
  photoItem: {
    marginRight: widthPercentage(2),
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'red',
    fontSize: 14,
  },


});
