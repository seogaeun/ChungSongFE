import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';

// Component imports
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import MypageWhiteTurnBox from '../../components/Mypage/MypageWhiteTurnBox';
import MypageInputBox from '../../components/Mypage/MypageInputBox';
import MypageTitle from '../../components/Mypage/MypageTitle';
import MypageBlueBtn from '../../components/Mypage/MypageBlueBtn';
import MypageWhiteBtn from '../../components/Mypage/MypageWhiteBtn';

// Separate functional component for displaying team members
const TeamMember = ({ role, names }) => (
  <View style={{alignContent:"flex-start", width: widthPercentage(265), paddingStart:widthPercentage(10)}}>
    <Text style={{fontSize: fontPercentage(10), fontWeight: 'bold', color: colors.primary }}>
      {role}
    </Text>
    {names.map((name, index) => (
      <Text key={index} style={{ fontSize: fontPercentage(13), color: colors.text }}>
        {name}
      </Text>
    ))}
    <Blank height={15} />
  </View>
);

const MypagePolicy = () => {

  // Define team members
  const team = {
    productManager: ["유덕현"],
    designers: ["김민주", "김채현"],
    frontendDevelopers: ["서가은", "박주형"],
    backendDevelopers: ["최예슬", "박소연"],

  };

  const AppInfo = `서비스 이용약관

  커뮤니티 이용약관에 관하여
  
  <청송> 커뮤니티 서비스를 이용해 주시는 여러분께 감사드립니다.
  
  본 약관에는 서비스 제공 및 이용 과정에서 청송과 사용자가 반드시 준수해야 하는 사항들이 포함되어 있으므로, 서비스를 이용하기 전에 반드시 본 약관을 주의 깊게 읽어보시고 본 약관의 내용에 동의하시는 경우에만 서비스를 이용하시기 바랍니다.  
  
  서비스 이용에 관하여
  
  사용자는 본 약관에 동의하고 커뮤니티 기능을 이용합니다. 청송은 사용자가 자신의 의견이나 남도학숙 관련 정보 등을 다른 사용자들과 공유할 수 있는 기능을 제공합니다. 사용자들이 자유로운 소통과 정보교환을 도우려고 이용자가 게시글 또는 댓글을 작성할 때 사용자가 달리 설정하지 않는 이상 사용자를 특정지을 수 있는 별명과 같은 개인식별정보를 다른 사용자에게 공개하지 않습니다.
  
  다만 신뢰할 수 있는 커뮤니티 및 운영 및 이용을 위해 사용자와 관련이 있는 특정 게시판에만 게시글과 댓글을 작성할 수 있도록 합니다. (학교 게시판) 어떠한 경우에도 사용자의 선택에 반하여 게시글 내에 사용자를 식별할 수 있는 개인식별정보를 포함하지 않습니다.
  
  한편, 사용자는 직접 프로필을 작성하고 게시글 및 댓글 작성의 익명 여부를 정할 수 있습니다.
  
  청송은 사용자의 필요한 의견에 따라 서비스를 유지 보수해 나갑니다. 이에 따라 공유할 수 있는 정보의 범위, 사용자 정보와 설정 방식 등이 계속해서 변경될 수 있습니다. 청송은 이러한 변경 내용을 사용자가 쉽게 이해할 수 있도록 설명합니다.
  
  <청송>이 제공하는 서비스
  
  <청송>은 남도학숙 동기들의 화합, 친목을 목적으로 한 사생 간의 커뮤니티 구축을 위한 커뮤니티 플랫폼입니다. 
  
  1. 사생들의 생활편의 증진
  청송은 사생들의 생활편의를 증진하기 위해 끊임없는 노력을 기울입니다. 쓰임별 분류된 게시판, 자율회 공지사항, 학사 관리시스템 브라우저 연결과 같은 서비스를 제공하여 사생들이 더 편리하고 쾌적한 기숙사 생활을 누릴 수 있도록 지원합니다.
  
  2. 지속 가능한 사생 내 네트워크 구축
  청송은 지속 가능한 사생들의 네트워크를 구축하여 남도학숙 은평관 사생들 간의 유대감과 상호 작용을 증진하고, 긍정적인 커뮤니티 문화를 형성하는 데 최선을 다하겠습니다.
  
  3. 학숙 내 공동체 의식 함양
  청송은 학숙 내 공동체 의식을 함양시키기 위해 사생 간의 화합을 촉진하고, 비도덕적인 행동을 예방하는 데 힘쓸 것입니다. 청송은 학숙 내에서 존중과 배려를 바탕으로 한 화합된 분위기를 조성하기 위해 노력할 것입니다.
  
  4. 지역사회에 대한 애향심 및 자긍심 고취
  청송은 지역사회에 대한 애향심 및 자긍심을 고취하기 위해 다양한 자율회의 활동과 프로젝트를 지원할 것입니다. 
  
  제한되는 게시물, 댓글 조치
  
  <청송>은 사용자들의 자유로운 의견 및 정보 교환을 위해 노력합니다. 하지만 관련 법령에 위배되거나, 본 약관에 위배되거나, 다른 사용자 및 <청송>의 정당한 이익과 권리를 해치는 게시물에 대해서는 관리자가 발견 즉시 삭제 또는 비공개 처리를 하고, 필요에 따라서 사용자 계정의 내용물 작성 권한을 임의 기간동안 정지 처분을 하는 등의 기술적 제재를 취할 수 있습니다.
  
  사용자 신고 및 조치
  
   <청송> 커뮤니티의 본질을 흐리는 내용에 대해서 사용자는 {불건전한 내용, 사기, 상업적 광고, 특정인에 대한 비난, 도배, 기타} 의 카테고리로 게시물 또는 댓글을 신고할 수 있습니다. 신고가 들어온 사항에 대해서는 관리자가 직접 특정 내용물을 삭제 또는 비공개 처리를 하고, 필요에 따라서 사용자 계정의 내용물 작성 권한을 임의 기간동안 정지 처분을 하는 등의 기술적 제재를 취할 수 있습니다.
  
  면책
  
  서비스 내에 사용자가 작성한 내용물에 대한 모든 책임은 사용자 본인에게 있습니다. 사용자가 작성한 어떠한 게시물도 <청송>의 공식적인 입장이 될 수 없으며 <청송>은 공지사항 게시판 외 어떠한 게시물 내용도 정확성, 유효성, 신뢰성, 진실성을 보장하거나 확인하지 않습니다. 게시물의 내용을 믿거나 추천에 따라 행동한 결과 역시 사용자의 책임이며, <청송>은 이에 대해 어떠한 책임도 지지 않습니다. 사용자는 본인의 판단과 책임으로 서비스를 이용하며 다른 이용자가 작성한 게시물의 내용을 스스로 검증하고 판단해야 합니다. 
  
  일반사항
  
  <청송>은 필요한 경우에 본 약관을 개정할 수 있습니다. 본 약관이 개정되는 경우 <청송>은 변경되는 내용과 변경 일자를 공지하며 변경일 7일 전에 사용자에게 알려 사용자가 충분히 검토하고 결정할 수 있도록 합니다. 다만, 법령에 개정, 법원 또는 규제 기관에 명령 등에 따라 본 약관을 변경해야 하는 경우 사전 공지 없이 본 약관을 개정할 수 있으며, 이 경우 지체 없이 사용자에게 변경된 내용을 알리겠습니다. 변경되는 약관 내용에 동의하지 않으시는 경우 서비스 이용을 중단하셔야 하며 공지된 약관 변경 일자 이후에도 서비스를 이용하시는 경우 변경된 약관 내용에 동의하시는 것으로 간주합니다.
  
  서비스 이용약관 변경 고지
  
  이 서비스 이용약관은 2024년 3월 1일부터 적용됩니다.`



  return (
    <View style={{}}>
      {/* Top bar */}
      {/* <TopBar /> */}

      {/* Main screen */}
      <View style={{
        height: heightPercentage(500), alignItems: "center",
      }}>
        <Blank height={15} />
        <MypageTitle title="서비스 이용약관" />
        <Blank height={5} />

        <ScrollView style={{
          height: heightPercentage(300),
          width: widthPercentage(260),
          paddingTop: heightPercentage(10),
          marginBottom: heightPercentage(10),
          paddingLeft: widthPercentage(12),
          paddingRight: widthPercentage(12),
          minHeight: heightPercentage(35),
          backgroundColor: colors.fontWhite,
          borderRadius: 10,
          fontSize: 12,
          color: colors.fontGray,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2, // For Android
          overflow:'scroll',
        }}>
          <View style={{paddingBottom:heightPercentage(50)}}>
          <Text>{AppInfo}</Text>

          </View>



        </ScrollView>


        <MypageTitle title="개발자 정보" />
        <ScrollView style={{
          height: heightPercentage(300),
          width: widthPercentage(260),
          paddingTop: heightPercentage(10),
          marginBottom: heightPercentage(30),
          paddingLeft: widthPercentage(12),
          paddingRight: widthPercentage(12),
          minHeight: heightPercentage(35),
          backgroundColor: colors.fontWhite,
          borderRadius: 10,
          fontSize: 12,
          color: colors.fontGray,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2, // For Android
          overflow:'scroll',
        }}>
        {/* Display team members */}
        <TeamMember role="Product Manager" names={team.productManager} />
        <TeamMember role="Frontend Developers" names={team.frontendDevelopers} />
        <TeamMember role="Backend Developers" names={team.backendDevelopers} />
        <TeamMember role="Designers" names={team.designers} />
        </ScrollView>

      </View>
    </View>
  );
};

export default MypagePolicy;
