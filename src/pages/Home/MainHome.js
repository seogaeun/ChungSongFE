import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, Button, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { baseURL } from '../../../baseURL';


//컴포넌트 모음
import Blank from '../../components/Blank';
import FolderBoxIcon from '../../components/MainView/FolderBoxIcon';
import { ScrollView } from 'react-native-gesture-handler';
import MainTitle from '../../components/MainView/Title';
import PostInfo from '../../components/MainView/PostInfo';
import SubPostInfo from '../../components/MainView/SubPostInfo';
import CategorySelector from '../../components/MainView/CategorySelector';
import ItemContent from '../../components/MainView/ItemContent';
import MealModal from '../../components/MainView/MenuModao';
//로딩화면
import GrayFolderBoxWithText from '../../components/MainView/GrayFolderBoxWithText';
import LoadingModal from '../../components/LoadingModal';
// import ColorFolderBoxWithText from '../../components/MainView/ColorFolderBoxSvg';


//1.학숙 식단 - 날짜 관리 함수
//1-1. 한국 표준시(KST)로 현재 시간 가져오는 함수
function getCurrentTimeKST() {
    const currentTime = new Date();
    const UTC = currentTime.getTime();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr =new Date(UTC + (KR_TIME_DIFF));
    return kr_curr;
}

const koreanTime = getCurrentTimeKST();


//1-2. 날짜 형 변환 함수
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


//1-4. 시간에 따른 식단 설정 함수
function setMealTypeByTime(koreanTime,formattedDate) {
    const dinnerEndTime = new Date(koreanTime.getTime());
    dinnerEndTime.setUTCHours(20, 0, 0, 0); // 20:00:00를 한국 시간으로 설정
    const breakfastEndTime = new Date(koreanTime.getTime());
    breakfastEndTime.setUTCHours(8, 0, 0, 0); // 8:00:00를 한국 시간으로 설정
    const lunchEndTime = new Date(koreanTime.getTime());
    lunchEndTime.setUTCHours(13, 0, 0, 0); // 8:00:00를 한국 시간으로 설정
    // const dinnerEndTime = new Date(`${formattedDate}T23:00:00`);
    if (koreanTime < breakfastEndTime) {
        return 'breakfast';
    } else if (koreanTime < lunchEndTime) {
        return 'lunch';
    } else if (koreanTime < dinnerEndTime) {
        return 'dinner';
    } else {
        return 'tomorrowBreakfast'; // 다음 날 아침 식단으로 설정
    }
}


const MainHome = () => {
    const [currentDate, setCurrentDate] = useState(getCurrentTimeKST());     //현재 시간 조정 상태 변수 
    const formattedDate = formatDate(koreanTime);
    const [mealType, setMealType] = useState(setMealTypeByTime(koreanTime,formattedDate)); // 식단 (아침, 점심, 저녁) 메뉴 설정 상태 변수
    const [menuData, setMenuData] = useState({}); //메뉴 리스트 상태 변수
    const [isloading, setLoading] = useState(true); //로딩 화면 여부 상태 변수
    const [schoolBoard, setSchoolBoard] = useState([]); //본인 학교 게시판 상태 변수
    const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false); // 식단 클릭시 팝업 상태 변수
    const [hotPost, setHotPost] = useState([]); // 웅성웅성 게시판 상태 변수
    const [PostData, setPostData] = useState([ // 게시판 목록 리스트 상태 변수
        { "boardId": 0, postId: "", "content": "", "title": "" },
        { "boardId": 1, postId: "", "content": "", "title": "" },
        { "boardId": 2, postId: "", "content": "", "title": "" },
        { "boardId": 3, postId: "", "content": "", "title": "" },
        { "boardId": 4, postId: "", "content": "", "title": "" },
        { "boardId": 5, postId: "", "content": "", "title": "" },
        { "boardId": 6, postId: "", "content": "", "title": "" }
    ]);
    const [selectedCategoryMain, setSelectedCategoryMain] = useState(7); // 나눔, 공구, 장터 게시판 선택한 카테고리 상태 변수
    const [categoryData, setCategoryData] = useState([]); // 나눔, 공구, 장터 게시판 게시물 데이터 상태 변수

    //데이터 호출 1) 학숙 식단 데이터 호출 함수
    const fetchMenuData = async () => {
        try {
            const response = await axios.get(`${baseURL}/haksuk/menu/`, {
            });
            setMenuData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //데이터 호출 2) 게시판 데이터(공지,자유,배달,건의,분실,홍보)
    const fetchLatestPosts = async () => {
        try {
            const boards = [1, 2, 3, 4, 5, 6];
            const accessToken = await AsyncStorage.getItem('accessToken');

            for (const boardId of boards) {
                const response = await axios.get(`${baseURL}/boards/${boardId}/`, {
                    params: { limit: 1 }, // 포스트의 고유한 ID를 기준으로 내림차순으로 정렬
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    // console.log("게시판 데이터")
                    // console.log(data.results[0].title) // 가장 첫 게시글이 나타나도록 하기
                    // console.log(data.results[0].content) // 가장 첫 게시글이 나타나도록 하기
                    // console.log(data.results[0].post_id) // 가장 첫 게시글이 나타나도록 하기

                    if (data.results.length > 0) {
                        const latestPost = {
                            title: data.results[0].title || '',
                            content: data.results[0].content || '',
                            postId: data.results[0].post_id || ''
                        };
                        setPostData(prevData => {
                            const newData = [...prevData]; // 이전 데이터를 복제
                            const index = boardId - 1; // 배열 인덱스는 boardId - 1
                            newData[index] = { ...newData[index], ...latestPost }; // 해당 인덱스에 새로운 데이터 할당
                            return newData; // 업데이트된 데이터 반환
                        });
                    }
                } else {
                    console.error(`[게시판 정보 불러오기 실패] ${boardId}`);
                    await AsyncStorage.removeItem('accessToken');
                    await AsyncStorage.removeItem('userData');
                    await AsyncStorage.removeItem('refresh_token');
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('[토큰 만료]Token is expired or invalid. Redirecting to login page...');
                //토큰 재할당
                const accessToken = await AsyncStorage.getItem('accessToken');
                console.log(accessToken);

                refreshToken();
            } else {
                console.error('[토큰 만료 및 재할당 불가] Error:', error.message);
                //재할당 불가시 자동 로그아웃
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('refresh_token');
                const accessToken = await AsyncStorage.getItem('accessToken');
                // console.log("[토큰 만료 및 재할당 불가]");
                // console.log(accessToken);

            }
        }
    };

    //데이터 호출 3) 본인 학교 게시판 
    const NanTitle = "게시판에 글이 없습니다."
    const NanSubtitle = "글을 작성해주세요:)"
    const callMySchoolBoard = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const response = await axios.get(`${baseURL}/boards/my_school_board/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: { order_by: '-post_id', limit: 1 },
                });


                if (response.status === 200) {
                    const responseData = response.data;
                    if (responseData && responseData.results && responseData.results.length > 0) {
                        const firstPostStringified = JSON.stringify(responseData.results[0]);
                        const firstPost = JSON.parse(firstPostStringified);

                        const newPostData = {
                            board: firstPost.board,
                            title: firstPost.title,
                            content: firstPost.content,
                            postId: firstPost.post_id,
                        };
                        setSchoolBoard([newPostData]);

                    } else {
                        console.log('[학교 게시판]API 응답에 데이터가 없습니다!!!!');
                    }

                } else {
                    console.error('[학교 게시판]API 응답이 실패했습니다.', response.status);
                }
            } else {
                console.log('[학교 게시판]accessToken이 없습니다.');
            }

        } catch (error) {
            console.log("[학교 게시판]" + error);
        }

    };

    //데이터 호출 4) 웅성웅성 게시판 
    const callHotPostsApi = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const response = await axios.get(`${baseURL}/boards/hot_posts/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    params: { order_by: '-post_id', limit: 1 },

                });
                if (response.status === 200) {
                    // 응답이 정상적으로 왔을 때 처리
                    const responseData = response.data;

                    if (responseData && responseData.results && responseData.results.length > 0) {
                        // 여기에서 응답 데이터를 처리할 수도 있음
                        const firstPostStringified = JSON.stringify(responseData.results);
                        const firstPost = JSON.parse(firstPostStringified);
                        setHotPost(firstPost[0]);
                    } else {
                        console.log('[웅성웅성 게시판]API 응답에 데이터가 없습니다.');
                    }
                } else {
                    console.error('[웅성웅성 게시판]API 응답이 실패했습니다.', response.status);
                }
            } else {
                console.log('[웅성웅성 게시판] accessToken이 없습니다.');
            }
        } catch (error) {
            console.error('Error calling hot posts API:', error.message);
        }
    };

    //데이터 호출 5) 토큰 재할당 함수
    const refreshToken = async () => {
        try {
            // 기존 refresh_token 가져오기
            const refresh_token = await AsyncStorage.getItem('refresh_token');

            // refresh_token이 존재할 때만 API 호출
            if (refresh_token) {
                console.log("[토큰 재할당~]", refresh_token);

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

    /////useEffect 함수 모음
    //1. 초기 세팅
    useEffect(() => {
        setLoading(true); //로딩 화면 호출
        setCurrentDate(getCurrentTimeKST()); //현재 시간 설정
        setMealType(setMealTypeByTime(koreanTime)); //아침, 점심, 저녁 타입 설정
        callMySchoolBoard(); // 본인 학교 게시판 설정
        callHotPostsApi(); // 웅성웅성 게시판 설정
        fetchLatestPosts(); // 이외 게시판 설정
        fetchMenuData(); // 학숙 식단 설정
        // console.log("[게시판 데이터 불러오기]")
        // console.log(PostData);

        // 2.5초 후에 호출 및 로딩 화면 종료 (화면 렌더링 시간 고려)
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => {
            clearTimeout(timeout);
        }

    }, []);

    //2. 시간대 바뀔시, 학숙 메뉴 데이터 재 호출
    useEffect(() => {
        fetchMenuData();
    }, [mealType]);

    //시간에 따른 아침, 점심, 저녁 재설정
    let mealtitle = '';
    let subMealTitle = '';
    if (mealType === 'breakfast') {
        mealtitle = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 ${getDayOfWeek(currentDate)} 아침 식단`;
        subMealTitle = '' + menuData[formattedDate]?.breakfast || '식단 정보가 없습니다';
    } else if (mealType === 'lunch') {
        mealtitle = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 ${getDayOfWeek(currentDate)} 점심 식단`;
        subMealTitle = '' + menuData[formattedDate]?.lunch || '식단 정보가 없습니다';
    } else if (mealType === 'dinner') {
        mealtitle = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 ${getDayOfWeek(currentDate)} 저녁 식단`;
        subMealTitle = '' + menuData[formattedDate]?.dinner || '식단 정보가 없습니다';
    } else if (mealType === 'tomorrowBreakfast') {
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        mealtitle = `(내일) ${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일 ${getDayOfWeek(tomorrow)} 아침 식단`;
        subMealTitle = '' + menuData[tomorrow.toISOString().split('T')[0]]?.breakfast || '식단 정보가 없습니다';
    }

    // 요일 구하기
    function getDayOfWeek(date) {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[date.getDay()];
    }


    //재랜더링시(ex, 페이지 재진입), 호출하는 useEffect
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            // console.log("메인 화면 재진입");
            setCurrentDate(getCurrentTimeKST());
            console.log(koreanTime);
            setMealType(setMealTypeByTime(koreanTime));
            callMySchoolBoard();
            callHotPostsApi();
            fetchLatestPosts();
            // console.log("[게시판 데이터 불러오기]")
            // console.log(PostData);
        }
    }, [isFocused]); // isFocused가 변경될 때마다 호출


    //메인 화면서 게시글 이동 경로 지정 함수
    const navigation = useNavigation();
    const handleBoxClick = (bulletinName) => {
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
            case '학교별 게시판':
                path = '/boards/my_school_board/';
                break;
            // 추가 게시판에 대한 경우도 추가
            default:
                path = ''; // 기본 경로
        }

        // console.log("이동" + path)
        navigation.navigate('BulletinList', { bulletinName, path });
    };

    //나눔 공구 장터 게시판 카테고리 선택 함수
    const handleCategorySelectMain = (category) => {
        setSelectedCategoryMain(category); // 선택한 카테고리 업데이트
    };

    //나눔 공구 장터 게시판 게시물 호출 useEffect
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');

                // 최대 5개의 게시물을 가져오도록 수정
                const response = await axios.get(`${baseURL}/boards/${selectedCategoryMain}/`, {
                    params: { order_by: 'post_id', limit: 1 },
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const extractedData = response.data.results.map((result) => {
                    // 이미지가 있는지 확인하고 이미지가 없는 경우 대체 이미지 URL을 설정
                    const imageUrl = result.images && result.images.length > 0 ? result.images[0].imgfile : null;

                    return {
                        board_id: result.board_id,
                        board: result.board,
                        title: result.title,
                        post_id: result.post_id,
                        content: result.content,
                        images: imageUrl
                    };
                });
                setCategoryData(extractedData);

            } catch (error) {
                console.error('[나눔,공구,장터 게시판 호출 오류]', error);
            }
        };

        if (selectedCategoryMain) {
            fetchBoardData();
        }
    }, [selectedCategoryMain]); // selectedCategoryMain이 변경될 때마다 실행됨


    //클릭시 나눔 공구 장터 게시글 이동 함수
    const handleListBoxClick = (bulletinName, post_id, board_id) => {
        // console.log("[버튼 클릭: 게시판 이동]");
        console.log(bulletinName);
        console.log(post_id);
        console.log(board_id);
        navigation.navigate('BulletinContent', { bulletinName, post_id, board_id });
    };



    //학숙 식단 메뉴 팝업 창 오픈 함수
    const handleOpenPopup = () => {
        setIsMenuPopupOpen(true);
    };

    //학숙 식단 메뉴 팝업 창 닫기 함수
    const handleClosePopup = () => {
        setIsMenuPopupOpen(false);
    };

    return (
        <ScrollView >
            {/* 상단 - 웅성웅성, 식단 */}
            <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row', marginStart: widthPercentage(10), paddingEnd: widthPercentage(40), marginTop: heightPercentage(17) }}>
                <FolderBoxIcon onPress={() => handleBoxClick("웅성웅성")} color="green" fontColor={colors.green} category="웅성웅성" title={hotPost.title} subtitle={hotPost.content}></FolderBoxIcon>
                <View style={{ marginLeft: widthPercentage(10) }}></View>
                <FolderBoxIcon color="blue" fontColor={colors.blue} category="식단" title={mealtitle} subtitle={subMealTitle} onPress={() => handleOpenPopup()} today={formattedDate}></FolderBoxIcon>
            </ScrollView>

            {/*화면 렌더링시 로딩화면*/}
            {isloading && (
                <LoadingModal></LoadingModal>
            )}

            {/* 학숙 식단 팝업 창 */}
            <MealModal
                isVisible={isMenuPopupOpen}
                onClose={handleClosePopup}
                mealData={menuData}
                today={formattedDate}
            />

            {/* 메인 화면단 */}
            <View style={{
                alignItems: "center"
            }}>

                <Blank height={5} />
                {/* 공지사항 화면 */}
                <TouchableOpacity onPress={() => handleBoxClick("공지사항")} style={{ width: widthPercentage(275), height: heightPercentage(75), justifyContent: 'center', alignItems: 'center' }}>
                    <GrayFolderBoxWithText width={widthPercentage(270)} height={heightPercentage(70)} >
                        <View style={{ maxWidth: widthPercentage(250), maxHeight: heightPercentage(50), marginVertical: heightPercentage(5), marginHorizontal: widthPercentage(10) }}>
                            <Text style={{
                                position: 'absolute',
                                top: heightPercentage(6),
                                maxWidth: widthPercentage(53), color: "#777777", fontSize: fontPercentage(11), fontWeight: 600
                            }}>공지사항</Text>
                            <View style={{ position: 'absolute', top: heightPercentage(23), left: widthPercentage(3) }}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: widthPercentage(200), color: colors.black, fontSize: fontPercentage(14), fontWeight: 600 }}>{PostData[0].title}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{
                                    width: widthPercentage(230), height: heightPercentage(17), marginTop: heightPercentage(2), color: colors.black, fontSize: fontPercentage(12), fontWeight: 300, overflow: 'hidden',
                                }}>{PostData[0].content}</Text>
                            </View>
                        </View>
                    </GrayFolderBoxWithText>
                </TouchableOpacity>
                <Blank height={20} />

                {/* 중단부 - 사생 게시판 */}
                <MainTitle title={"사생 게시판"} />
                <Blank height={15} />
                <PostInfo onPress={() => handleBoxClick("자유 게시판")} backgroundColor='rgba(104, 185, 1, 0.10)' borderColor='#68B901' fontColor={colors.green} category='자유 게시판' postName="썰 좀 풀어봐봐" title={PostData[1]?.title || NanTitle} subtitle={PostData[1]?.content || NanSubtitle} />
                <PostInfo onPress={() => handleBoxClick("배달 게시판")} backgroundColor='rgba(64, 162, 219, 0.10)' borderColor='#40A2DB' fontColor={colors.blue} category="배달 게시판" postName="이거 같이 먹을 사람?" title={PostData[2]?.title || NanTitle} subtitle={PostData[2]?.content || NanSubtitle} />
                <PostInfo onPress={() => handleBoxClick("학교별 게시판")} backgroundColor='rgba(104, 185, 1, 0.10)' borderColor='#68B901' fontColor={colors.green} category="학교별 게시판" postName="우리 같은 대학교 였어?" title={schoolBoard[0]?.title || NanTitle} subtitle={schoolBoard[0]?.content || NanSubtitle} />
                <PostInfo onPress={() => handleBoxClick("건의 게시판")} backgroundColor='rgba(64, 162, 219, 0.10)' borderColor='#40A2DB' fontColor={colors.blue} category="건의 게시판" postName="학숙에 바란다" title={PostData[3]?.title || NanTitle} subtitle={PostData[3]?.content || NanSubtitle} />
                <Blank height={10} />
                <SubPostInfo onPress={() => handleBoxClick("분실 게시판")} backgroundColor='rgba(64, 162, 219, 0.10)' borderColor='#40A2DB' fontColor={colors.blue} postName="분실 게시판" title={PostData[4]?.title || NanTitle} />
                <Blank height={5} />
                <SubPostInfo onPress={() => handleBoxClick("홍보 게시판")} backgroundColor='rgba(104, 185, 1, 0.10)' borderColor='#68B901' fontColor={colors.green} postName="홍보 게시판" title={PostData[5]?.title || NanTitle} />
            </View>

            {/* 하단부 - 장터게시판 */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.00)', 'rgba(227, 227, 227, 0.50)']}
                style={{ alignItems: "center", paddingBottom: heightPercentage(20) }}>
                <Blank height={25} />
                <MainTitle title={"장터 게시판"} />
                <Blank height={13} />
                <CategorySelector
                    selectedCategory={selectedCategoryMain} // 선택한 카테고리 전달
                    onSelect={handleCategorySelectMain} // 카테고리 선택 핸들러 전달
                />
                <Blank height={2} />
                <FlatList
                    data={categoryData}
                    horizontal
                    renderItem={({ item }) => (
                        <ItemContent onPress={() => handleListBoxClick(item.board, item.post_id, item.board_id)} imageUrl={item.images} title={item.title} description={item.content} />
                    )}
                    keyExtractor={item => item.id}
                    style={{ width: widthPercentage(270) }}
                />

            </LinearGradient>

        </ScrollView>

    );
};

export default MainHome;