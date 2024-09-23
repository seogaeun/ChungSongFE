import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, LogBox } from 'react-native';
import { colors } from './src/constants/colors';
import { widthPercentage, heightPercentage, fontPercentage } from './src/utils/ResponsiveSize';
import { WebView } from 'react-native-webview';
import { AppRegistry } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from './baseURL';

//초기화면 및 로그인페이지 링크
import InitPage from './src/pages/SignUp/InitPage';
import LoginPage from './src/pages/LogIn/LoginPage';

//찾기
import FindPage from './src/pages/LogIn/FindPage';
//이메일 찾기
import FindEmailStep1 from './src/pages/LogIn/FindEmailStep1';
import FindEmailStep2 from './src/pages/LogIn/FindEmailStep2';


//비밀번호 찾기
import FindPwdStep1 from './src/pages/LogIn/FindPwdStep1';
import FindPwdStep2 from './src/pages/LogIn/FindPwdStep2';
import NewPwdStep1 from './src/pages/LogIn/NewPwdStep1';

//회원가입 단계 링크
import SignUpCheckPolicy from './src/pages/SignUp/SignUpCheckPolicy';
import SignUpPageStep1 from './src/pages/SignUp/SignUpPageStep1';
import SignUpPageStep2 from './src/pages/SignUp/SignUpPageStep2';
import SignUpPageStep3 from './src/pages/SignUp/SignUpPageStep3';
import SignUpPageStep4 from './src/pages/SignUp/SignUpPageStep4';
import SignUpPageStep5 from './src/pages/SignUp/SignUpPageStep5';
import SignUpPageStep6 from './src/pages/SignUp/SignUpPageStep6';
import SignUpResult from './src/pages/SignUp/SignUpResult';

//메인 페이지(홈) 파트 링크
import MainHome from './src/pages/Home/MainHome';
import AlarmPage from './src/pages/Home/AlarmPage';

//게시판 페이지 파트 링크
import BulletinCategory from './src/pages/Bulletin/BulletinCategory';
import BulletinContent from './src/pages/Bulletin/BulletinContent';
import BulletinList from './src/pages/Bulletin/BulletinList';
import ReportModal from './src/pages/Bulletin/ReportModal';
import CreatePost from './src/pages/Bulletin/createPost';

//마이페이지 파트 링크
import MypageMain from './src/pages/Mypage/MypageMain';
import MypageEditEmail from './src/pages/Mypage/MypageEditEmail';
import MypageEditPwdStep1 from './src/pages/Mypage/MypageEditPwdStep1';
import MypageEditPwdStep2 from './src/pages/Mypage/MypageEditPwdStep2';
import MypageEditPwdStep3 from './src/pages/Mypage/MypageEditPwdStep3';
import MypageEditHo from './src/pages/Mypage/MypageEditHo';
import MypageAsk from './src/pages/Mypage/MypageAsk';
// import MypageSettingAlarm from './src/pages/Mypage/MypageSettingAlarm';
import MypagePolicy from './src/pages/Mypage/MypagePolicy';
import MypageAppInfo from './src/pages/Mypage/MypageAppInfo';
import MypageMyPost from './src/pages/Mypage/MypageMyPost';
import MypageMyReply from './src/pages/Mypage/MypageMyReply';
import Logout from './src/pages/Mypage/MypageLogout';
import MypageRemoveUser from './src/pages/Mypage/MypageRemoveUser';

//관리페이지 파트 링크
import MainManage from './src/pages/Manage/MainManagePage';
import Confirm from './src/pages/Manage/Confirm';
import ConfirmList from './src/pages/Manage/ConfirmList';
import DeletedPost from './src/pages/Manage/DeletedPost';
import ReportList from './src/pages/Manage/ReportList';
import RoomChangeList from './src/pages/Manage/RoomChangeList';
import SchoolList from './src/pages/Manage/SchoolList';
import Suspension from './src/pages/Manage/Suspension';
import { WithLocalSvg } from 'react-native-svg/css';
//상단탭
import AlarmSvg from './src/assets/images/Main/Alarm';
import HomeLogo from './src/assets/images/Main/homeLogo.svg'

//하단 탭
import BoardSvg from './src/assets/images/Tab/Board';
import HomeSvg from './src/assets/images/Tab/Home';
import NdhsLogoSvg from './src/assets/images/Tab/NdhsLogo';
import MyPageSvg from './src/assets/images/Tab/MyPage';
import MypageLogout from './src/pages/Mypage/MypageLogout';

AppRegistry.registerComponent('ChungSongIOS', () => App);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs();//Ignore all log notifications


//메인 화면
const HomeStack = () => (
    <Stack.Navigator initialRouteName="MainHome" screenOptions={{
        gestureDirection: 'horizontal',
    }}>
        <Stack.Screen
            name="MainHome"
            component={MainHome}
            options={{
                header: ({ navigation }) => <CustomHomeHeader title="알림 설정" navigation={navigation} />,
                cardStyle: {
                    backgroundColor: '#fff',
                }
            }}
        />
        <Stack.Screen
            name="AlarmPage"
            component={AlarmPage}
            options={{
                header: ({ navigation }) => <CustomHeader title="알림" navigation={navigation} />, cardStyle: {
                    backgroundColor: '#fff', // Set the screen background color
                }
            }}
        />

        <Stack.Screen name="BulletinList" component={BulletinList}
            options={{
                header: ({ navigation }) => <CustomHeader title="카테고리" navigation={navigation} />, cardStyle: {
                    backgroundColor: '#fff', // Set the screen background color
                }
            }}
        />


        <Stack.Screen name="BulletinContent" component={BulletinContent} options={{
            header: ({ navigation }) => <CustomHeader title="게시글" navigation={navigation} />, cardStyle: {
                backgroundColor: '#fff', // Set the screen background color
            }
        }} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{
            header: ({ navigation }) => <CustomHeader title="작성하기" navigation={navigation} />, cardStyle: {
                backgroundColor: '#fff', // Set the screen background color
            }
        }} />
    </Stack.Navigator>
);


//학숙포털 이동
const ExternalPage = () => {
    const webViewRef = useRef(null);

    const handleGoBack = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack(); // 웹뷰에서 뒤로가기 기능
        }
    };

    return (
        <>
            <WebView
                ref={webViewRef}
                style={{ marginTop: heightPercentage(60) }}
                source={{ uri: 'http://portal.ndhs.or.kr' }}
            />
            <TouchableOpacity onPress={handleGoBack} style={{ borderRadius: 10, position: 'absolute', backgroundColor: colors.blue, top: heightPercentage(33), left: widthPercentage(15) }}>
                {/* 뒤로가기 버튼 */}
                <Text style={{ padding: widthPercentage(5), fontSize: fontPercentage(13), color: 'white' }}>뒤로가기</Text>
            </TouchableOpacity>
        </>
    );
};


//게시판 및 게시글 화면
const BulletinStack = () => (
    <Stack.Navigator initialRouteName="Bulletin" screenOptions={{ gestureDirection: 'horizontal', header: ({ navigation }) => <CustomHeader title="카테고리" navigation={navigation} /> }}>
        <Stack.Screen name="BulletinCategory" component={BulletinCategory} />
        <Stack.Screen name="BulletinContent" component={BulletinContent} />
        <Stack.Screen name="BulletinList" component={BulletinList} />
        <Stack.Screen name="ReportModal" component={ReportModal} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
);


//관리자페이지 화면
const ManagePageStack = () => (

    <Stack.Navigator screenOptions={{ gestureDirection: 'horizontal' }} initialRouteName="MainManage" >
        <Stack.Screen name="MainManage" component={MainManage} options={{
            header: ({ navigation }) => <CustomHeader title="관리 페이지" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="BulletinCategory" component={BulletinCategory} />
        <Stack.Screen name="BulletinContent" component={BulletinContent} />
        <Stack.Screen name="BulletinList" component={BulletinList} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="ConfirmList" component={ConfirmList} options={{
            header: ({ navigation }) => <CustomHeader title="사생 정보 및 인증 관리" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="DeletedPost" component={DeletedPost} options={{
            header: ({ navigation }) => <CustomHeader title="삭제된 글" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="ReportList" component={ReportList} options={{
            header: ({ navigation }) => <CustomHeader title="신고 리스트" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="RoomChangeList" component={RoomChangeList} options={{
            header: ({ navigation }) => <CustomHeader title="호수 변동 신청 리스트" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="SchoolList" component={SchoolList} options={{
            header: ({ navigation }) => <CustomHeader title="학교별 게시판" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />
        <Stack.Screen name="Suspension" component={Suspension} />
        <Stack.Screen name="MypageLogout" component={MypageLogout} options={{
            header: ({ navigation }) => <CustomHeader title="로그아웃" navigation={navigation} />, cardStyle: {
                backgroundColor: 'rgb(225,242,250)', // Set the screen background color
            }
        }} />

    </Stack.Navigator>
);


//마이페이지 화면
const MyPageStack = () => (
    <Stack.Navigator screenOptions={{ gestureDirection: 'horizontal' }} initialRouteName="AcademicManagement" >
        <Stack.Screen
            name="MypageMain"
            component={MypageMain}
            options={{
                header: ({ navigation }) => <CustomHeader title="마이페이지" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                },
            }}
        />
        <Stack.Screen
            name="MypageEditEmail"
            component={MypageEditEmail}
            options={{
                header: ({ navigation }) => <CustomHeader title="가입 이메일 변경" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                },
            }}
        />
        <Stack.Screen
            name="MypageEditPwdStep1"
            component={MypageEditPwdStep1}
            options={{
                header: ({ navigation }) => <CustomHeader title="비밀번호 변경" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageEditPwdStep2"
            component={MypageEditPwdStep2}
            options={{
                header: ({ navigation }) => <CustomHeader title="비밀번호 변경" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageEditPwdStep3"
            component={MypageEditPwdStep3}
            options={{
                header: ({ navigation }) => <CustomHeader title="비밀번호 변경" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageEditHo"
            component={MypageEditHo}
            options={{
                header: ({ navigation }) => <CustomHeader title="호수 변동 신청" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageMyPost"
            component={MypageMyPost}
            options={{
                header: ({ navigation }) => <CustomHeader title="내가 쓴 게시글" navigation={navigation} />, cardStyle: {
                    backgroundColor: '#fff', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageMyReply"
            component={MypageMyReply}
            options={{
                header: ({ navigation }) => <CustomHeader title="내가 쓴 댓글" navigation={navigation} />, cardStyle: {
                    backgroundColor: '#fff', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageAsk"
            component={MypageAsk}
            options={{
                header: ({ navigation }) => <CustomHeader title="문의하기" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />

        <Stack.Screen
            name="Logout"
            component={Logout}
            options={{
                header: ({ navigation }) => <CustomHeader title="로그아웃" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="RemoveUser"
            component={MypageRemoveUser}
            options={{
                header: ({ navigation }) => <CustomHeader title="회원 탈퇴" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />

        {/* 알림은 차후 업뎃시 사용 */}
        {/* <Stack.Screen
      name="MypageSettingAlarm"
      component={MypageSettingAlarm}
      options={{
        header: ({ navigation }) => <CustomHeader title="알림 설정" navigation={navigation} />, cardStyle: {
          backgroundColor: 'rgb(225,242,250)', // Set the screen background color
        }
      }}
    /> */}
        <Stack.Screen
            name="MypagePolicy"
            component={MypagePolicy}
            options={{
                header: ({ navigation }) => <CustomHeader title="개인정보 처리방침" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />
        <Stack.Screen
            name="MypageAppInfo"
            component={MypageAppInfo}
            options={{
                header: ({ navigation }) => <CustomHeader title="App 정보" navigation={navigation} />, cardStyle: {
                    backgroundColor: 'rgb(225,242,250)', // Set the screen background color
                }
            }}
        />

    </Stack.Navigator>
);

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false); //로그인 상태변수
    const [manager, setManager] = useState(false); // 관리자 상태 변수 

    useEffect(() => {
        // AccessToken 변경 여부를 주기적으로 확인
        const tokenCheckInterval = setInterval(async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                setLoggedIn(accessToken !== null);

                // userData 가져오기
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { status } = JSON.parse(userData);
                    console.log('user', status);
                    setManager(status === '관리자');
                    console.log("매니저 상태", manager);
                } else {
                    console.log("userData가 없습니다.");
                    setManager(false);
                }
            } catch (error) {
                console.error('로그인 및 userData 확인 중 오류 발생:', error);
                setLoggedIn(false);
                setManager(false);
            }
        }, 5000); // 5초마다 확인

        // 컴포넌트가 언마운트되면 인터벌 제거
        return () => {
            clearInterval(tokenCheckInterval);
        };

    }, []); // 빈 의존성 배열은 이 효과가 마운트될 때 한 번만 실행되도록 보장







    useEffect(() => {
        //게시글 불러오기
        const fetchData = async () => {
            try {
                // JWT 토큰 가져오기 (AsyncStorage 또는 다른 방식 사용)
                const accessToken = await AsyncStorage.getItem('accessToken');

                const response = await fetch(`${baseURL}/users/user_info/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();

                // userData 값을 AsyncStorage에 저장
                await AsyncStorage.setItem('userData', JSON.stringify(data));

                //console.log('API Response:', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isLoggedIn) {
            fetchData();
        }


    }, [isLoggedIn]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("로그인 변화")
                const userData = await AsyncStorage.getItem('userData');
                const { status } = JSON.parse(userData);
                console.log('user', status);
                setManager(status == '관리자');
                console.log("메니저 상태", manager);
            } catch (error) {
                console.error('로그인시 에러', error);
                setManager(false);
                console.log("메니저 상태", manager);


            }
        };

        fetchData();

    }, []);





    //메인 화면(로그인 시에 보여주게끔)
    const MainScreen = isLoggedIn ? (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === '홈') {
                        return <HomeSvg focused={focused} color={color} size={size} />;
                    } else if (route.name === '게시판') {
                        return <BoardSvg focused={focused} color={color} size={size} />;
                    } else if (route.name === '학사관리') {
                        return <NdhsLogoSvg focused={focused} color={color} size={size} />;
                    } else if (route.name === '마이페이지') {
                        return <MyPageSvg focused={focused} color={color} size={size} />;
                    } else if (route.name === '관리페이지') {
                        return <MyPageSvg focused={focused} color={color} size={size} />;
                    }
                },
                tabBarActiveTintColor: '#666666',
                tabBarInactiveTintColor: '#D9D9D9',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF', // 탭 바 배경색
                },
                labelStyle: {
                    fontSize: fontPercentage(10), // 탭 바 글자 크기
                },
                tabStyle: {
                    paddingBottom: heightPercentage(5), // 탭 간격 조절
                },
            })}
        >
            <Tab.Screen
                name="홈" component={HomeStack}
                options={{
                    tabBarLabel: '홈', // 탭 바에 표시되는 라벨 설정
                    headerShown: false, // 헤더 숨기기
                }}
            />
            <Tab.Screen
                name="게시판" component={BulletinStack}

                options={{
                    tabBarLabel: '게시판', // 탭 바에 표시되는 라벨 설정
                    headerShown: false, // 헤더 숨기기
                }}

            />
            <Tab.Screen name="학사관리"
                component={ExternalPage}
                options={{
                    tabBarLabel: '학사관리', // 탭 바에 표시되는 라벨 설정
                    headerShown: false, // 헤더 숨기기
                }}

            />
            {/* <Tab.Screen
                name={manager ? "관리페이지" : "마이페이지"}
                component={manager ? ManagePageStack : MyPageStack}
                options={{
                    tabBarLabel: manager ? '관리페이지' : '마이페이지',
                    headerShown: false,
                }}
            /> */}
            {manager ? (
                <Tab.Screen
                    name="관리페이지"
                    component={ManagePageStack}
                    options={{
                        tabBarLabel: '관리페이지',
                        headerShown: false,
                    }}
                />
            ) : (
                <Tab.Screen
                    name="마이페이지"
                    component={MyPageStack}
                    options={{
                        tabBarLabel: '마이페이지',
                        headerShown: false,
                    }}
                />
            )}

        </Tab.Navigator>
    ) : (
        <Stack.Navigator
            initialRouteName="InitPage"
            screenOptions={({ route, navigation }) => ({
                header: ({ navigation }) => {
                    // 현재 화면이 InitPage인 경우에만 헤더를 없애기
                    const headerShown = route.name !== 'InitPage';

                    // headerShown이 true인 경우에만 CustomHeader를 렌더링
                    return headerShown ? <CustomHeader navigation={navigation} /> : null;
                },
                cardStyle: {
                    backgroundColor: '#fff',
                },
            })}
        >
            <Stack.Screen name="InitPage" component={InitPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} options={{
                header: ({ navigation }) => <CustomHeader title="로그인" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="SignUpCheckPolicy" component={SignUpCheckPolicy} />
            <Stack.Screen name="SignUpPageStep1" component={SignUpPageStep1} />
            <Stack.Screen name="SignUpPageStep2" component={SignUpPageStep2} />
            <Stack.Screen name="SignUpPageStep3" component={SignUpPageStep3} />
            <Stack.Screen name="SignUpPageStep4" component={SignUpPageStep4} />
            <Stack.Screen name="SignUpPageStep5" component={SignUpPageStep5} />
            <Stack.Screen name="SignUpPageStep6" component={SignUpPageStep6} />
            <Stack.Screen name="SignUpResult" component={SignUpResult} screenOptions={{ headerShown: false }} />
            <Stack.Screen name="FindPage" component={FindPage} options={{
                header: ({ navigation }) => <CustomHeader title="로그인/비밀번호 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="FindEmailStep1" component={FindEmailStep1} options={{
                header: ({ navigation }) => <CustomHeader title="이메일 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="FindEmailStep2" component={FindEmailStep2} options={{
                header: ({ navigation }) => <CustomHeader title="이메일 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="FindPwdStep1" component={FindPwdStep1} options={{
                header: ({ navigation }) => <CustomHeader title="비밀번호 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="FindPwdStep2" component={FindPwdStep2} options={{
                header: ({ navigation }) => <CustomHeader title="이메일 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen name="NewPwdStep1" component={NewPwdStep1} options={{
                header: ({ navigation }) => <CustomHeader title="비밀번호 찾기" navigation={navigation} />, // LoginPage에만 title을 전달
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }} />
            <Stack.Screen
                name="MainHome"
                component={MainHome}
                options={{
                    header: ({ navigation }) => <CustomHomeHeader title="알림 설정" navigation={navigation} />,
                    cardStyle: {
                        backgroundColor: '#fff',
                    }
                }}
            />
            <Stack.Screen name="MainManage" component={MainManage} />


        </Stack.Navigator>

    );

    return (
        <AuthProvider>
            <NavigationContainer>
                {MainScreen}
            </NavigationContainer>
        </AuthProvider>
    );
}

// 커스텀 헤더1 - 게시판, 게시글에 주로 활용
const CustomHeader = ({ title, navigation }) => (
    <View style={{ width: widthPercentage(294), height: heightPercentage(62), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: colors.fontWhite, paddingBottom: heightPercentage(4) }}>
        <TouchableOpacity style={{ marginTop: heightPercentage(25) }} onPress={() => navigation.goBack()}>
            <Text style={{ padding: heightPercentage(10), paddingRight: widthPercentage(3) }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: heightPercentage(30), paddingRight: heightPercentage(3) }}>{title}</Text>
        <View />
    </View>
);


// 커스텀 헤더2 - 메인 화면에 주로 활용
const CustomHomeHeader = ({ title, navigation }) => (
    <View style={{ marginTop: heightPercentage(20), paddingTop: heightPercentage(15), paddingBottom: heightPercentage(10), width: widthPercentage(294), height: heightPercentage(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, backgroundColor: colors.fontWhite }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: widthPercentage(270), alignItems: 'center' }}>
            <View style={{ width: widthPercentage(30), height: heightPercentage(30) }}>
                <WithLocalSvg asset={HomeLogo}></WithLocalSvg>
            </View>
            {/* 이미지 간의 간격 */}
            <View style={{ width: widthPercentage(200) }} />
            <TouchableOpacity onPress={() => navigation.navigate('AlarmPage')}>
                <AlarmSvg></AlarmSvg>
            </TouchableOpacity>

        </View>
    </View>
);

// 커스텀 헤더2 - 메인 화면에 주로 활용
const CustomHomeHeader2 = ({ navigation }) => (
    <View style={{ marginTop: heightPercentage(20), paddingTop: heightPercentage(15), paddingBottom: heightPercentage(10), width: widthPercentage(294), height: heightPercentage(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, backgroundColor: colors.fontWhite }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: widthPercentage(270), alignItems: 'center' }}>
            <View style={{ width: widthPercentage(30), height: heightPercentage(30) }}>
                <WithLocalSvg asset={HomeLogo}></WithLocalSvg>
            </View>
            {/* 이미지 간의 간격 */}
            <View style={{ width: widthPercentage(200) }} />
        </View>
    </View>
);






export default App;
