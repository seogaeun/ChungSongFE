import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage } from '../../utils/ResponsiveSize';
import { colors } from '../../constants/colors';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


//컴포넌트 모음
import TitleView from '../../components/LoginProcess/LoginTitleView';
import Blank from '../../components/Blank';
import TopBar from '../../components/TopBar';
import LoginInput from '../../components/LoginProcess/LoginInput';
import EtcTxt from '../../components/LoginProcess/LoginEtcTxt';
import NxtBtn from '../../components/LoginProcess/LoginNxtBtn';
import Markdown from 'react-native-markdown-display';

const SignUpCheckPolicy = () => {

  const privacyContent = `
  # 개인정보 처리 방침

<청송>은 정보 주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한
바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보 주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리 방침을 수립·공개합니다.

## 1. 개인정보 처리 목적

개인정보 보호법 제3조(개인정보 보호 원칙) ① **개인정보처리자는 개인정보의 처리 목적을 명확하게 하여야 하고 그 목적에 필요한 범위에서 최소한의 개인정보만을 적법하고 정당하게 수집하여야 한다**.

<청송>은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

**1. 회원 가입 및 관리**

    회원제 서비스 제공에 따른 회원 가입 의사 확인, 본인 식별·인증, 회원 자격 유지·관리, 회원탈퇴 의사의 확인 서비스 부정 이용 방지, 각종 고지·통지, 고충 처리 목적으로 개인정보를 처리합니다.

**2. 커뮤니티 서비스 제공 및 유지보수**

    이용자의 의사표현, 이용자 간 의견 교환, 정보 공유, 이용자 간의 관계 형성을 포함하는 커뮤니티 서비스 제공
    
**3. 안전한 서비스 이용환경 구축**

    남도학숙 은평관의 인증된 사생들만 이용할 수 있는 커뮤니티 환경 구축

## 2. 개인정보 처리 항목 & 수집 방법

<청송>은 회원가입 시 이용자가 직접 정보를 입력하는 경우, 해당 개인정보를 수집합니다.
‘문의하기’ 메일 또는 <청송> 개인정보 보호 책임자의 직접적인 관할하에 이용자의 개인정보가 수집 또는 수정 될 수 있습니다.

**<회원가입 시>**
    
    필수항목 : 이름, 남도학숙 내 호수, 이메일 주소, 비밀번호, 대학교, 닉네임(별명), 프로필 캐릭터, 호실 카드사진


<청송>은 이용자로부터 다음의 개인정보 항목을 처리하고 있습니다.

**<커뮤니티 서비스 이용 과정>**

    이메일 변경 시 : 새로운 이메일 주소, 인증번호 

    비밀번호 변경 시 : 기존의 비밀번호, 새로운 비밀번호, 새로운 비밀번호 확인

    비밀번호 찾기 및 변경 시 : 이름, 호수, 이메일 주소, 인증번호, 새로운 비밀번호, 새로운 비밀번호 확인

    호수 변동 신청 시 : 기존의 호수, 변동 된 호수

    게시글 & 댓글 신고 시 : 게시글(또는 댓글), 작성자 정보

    회원탈퇴 시 : 비밀번호

**<로그인 전>**

    로그인 시 : 이메일 주소, 비밀번호

    이메일 찾기 : 이름, 호수

    비밀번호 찾기 : 이름, 호수,  이메일 주소, 인증번호, 새로운 비밀번호, 새로운 비밀번호 확인

## 3. 개인정보의 처리 및 보유 기간

<청송>은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

    1. 회원 가입 및 관리 : 청송 커뮤니티 서비스 회원 탈퇴 후 1년
    2. 다만, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지
    3. 서비스 이용 행태 정보 (게시글 & 댓글 작성, 좋아요, 신고, 호실 변동) :  <청송>의 개인정보 보호 책임자의 삭제 시까지 영구
    4. 예외 : 서비스 종료 시 모든 개인정보를 종료 시점으로부터 1년 

## 4. 개인정보의 파기 절차 및 방법

<청송>은 개인정보 보유기간의 경과 또는 회원탈퇴 시 해당 이용자의 개인정보를 지체 없이 파기합니다.

단, (정보 주체로부터 동의받은 개인정보 보유 기간이 경과하거나 회원 탈퇴가 되었음에도 불구하고) 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 <청송>은 아래와 같이 관계 법령에서 정한 일정한 기간 동안 회원 정보를 보관합니다. 
이 경우 <청송>은 해당 개인정보를 별도의 DB table로 옮기거나 보관 장소를 달리하여 보존합니다.

<청송>은 파기 사유가 발생한 개인정보를 선정하고, <청송>의 개인정보 보호 책임자의 승인을 받아 개인정보를 파기합니다.

    이용자의 인터넷 등 로그기록/이용자의 접속지 추적 자료: 3개월 (통신비밀보호법)

    그 외의 통신사실 확인 자료: 12개월 (통신비밀보호법)

**1. 파기 절차**

    이용자가 제공한 개인 정보는 목적이 달성 된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
        *별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유 이외의 다른 목적으로 이용되지 않습니다.
    
**2. 파기 방법**
    
    전자적 파일형태의 개인정보는 기록을 재생할 수 없게 DB에서 완전히 삭제합니다.
    

## 5. 정보주체와 법정대리인의 권리·의무 및 행사 방법

정보주체는 <청송>에 대해 언제든지 자신의 개인정보 열람·정정·삭제·처리정지 요구의
권리를 행사할 수 있습니다. 문의 메일을 이용해 주세요.

이용자의 권리 행사는 이용자의 법정 대리인이나 위임받은 자를 통해서 할 수 있고, 이 경우에는 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다. 

<청송>이 제공하는 서비스 이용 과정에서 이용자 본인이 자발적으로 공개한 개인정보에 관한 권리와 책임은 근본적으로 이용자 본인에게 있습니다. 자발적으로 공개된 정보는 보호받기 어렵고 타인에 의해 무단으로 수집되거나 처리될 수 있으며, 이로 인해 발생한 결과에 대한 책임은 전적으로 본인에게 있음을 유의하여 개인정보가 공개되지 않도록 주의를 기울여 주시기 바랍니다. 또한 이용자는 타인의 개인정보를 침해하지 않도록 주의를 기울여야 합니다.

## 6. 개인정보의 안전성 확보 조치에 관한 사항

<청송>은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

- 이용자의 비밀번호와 같은 중요 정보는 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인 및 변경은 이메일 코드 인증 또는 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
- 개인정보 처리 관리자를 최소한으로 하고 있으며, 관리자는 이를 책임지는 만큼 개인정보 보호의 중요성을 인지하고 있습니다.
    
    단, <청송>이 개인정보보호 의무를 다하였음에도 불구하고 이용자 본인의 부주의나 <청송>이 관리하지 않는 영역에서의 사고 등 <청송>의 귀책에 기인하지 않은 손해에 대해서는 <청송>이 책임을 지지 않습니다. 
    

## 7.행태 정보의 수집·이용·제공 및 거부 등에 관한 사항

<청송>은 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다.

## 8. 추가적인 이용·제공 관련 판단 기준

추가적인 이용·제공 판단기준
① <청송>은(는) 「개인정보 보호법」 제15조 제3항 및 제17조 제4항에 따라 「개인정보 보호법」 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.
항목 : 이름, 호실, 이메일, 학교, 성별
이용·제공 목적 : 자율회 주최 행사 준비 및 원활한 진행 목적, 남도학숙 재사생 편의 증진 목적
보유 및 이용기간 :  청송 커뮤니티 서비스 회원 탈퇴 후 1년 
② 이에 따라 <청송>은 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서
다음과 같은 사항을 고려하였습니다. 
‣ 개인정보를 추가로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부 
‣ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부 
‣ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부 
‣ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부 

## 9. 개인정보 보호책임자에 관한 사항 & 개인정보 열람 청구 접수

<청송>은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보 주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다

    성명 : 최예슬
    담당 부서 : 남도학숙 은평관 7대 자율회 <청송> 정보국
    직책 : 남도학숙 은평관 7대 자율회 <청송> 정보국장
    연락처 : 7th.chungsong@gmail.com

- 정보주체는 <청송>의 서비스을 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당 부서로 문의할 수 있습니다.
- 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구 업무 또한 담당하고 있습니다.

<청송>은 정보주체의 문의에 대해 지체없이 답변 및 처리해 드릴 것입니다.

## 10. 정보주체의 권익침해에 대한 구제방법

정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원, 개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대해서는 아래의 기관에 문의하시기 바랍니다.


1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 ([www.kopico.go.kr](http://www.kopico.go.kr/))
2. 개인정보침해신고센터 : (국번없이) 118 ([privacy.kisa.or.kr](http://privacy.kisa.or.kr/))
3. 대검찰청 : (국번없이) 1301 ([www.spo.go.kr](http://www.spo.go.kr/))
4. 경찰청 : (국번없이) 182 ([ecrm.cyber.go.kr](http://ecrm.cyber.go.kr/))

「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.

‣ 중앙행정심판위원회 : (국번없이) 110 ([www.simpan.go.kr](http://www.simpan.go.kr/))

## 11. 개인정보 처리방침의 변경 고지
이 개인정보 처리 방침은 2024년 3월 1일부터 적용됩니다. 
  
-이하 종료-
  `;

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('SignUpPageStep1');
  };

  // 상태값 추가
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);  // 개인정보 처리방침 동의
  const [isContentAgreed, setIsContentAgreed] = useState(false);  // 불쾌한 콘텐츠 및 남용 금지 동의

  // 두 체크박스 모두 동의해야 버튼 활성화
  const isAllAgreed = isPrivacyAgreed && isContentAgreed;

  return (
    <View>
      {/* 메인 화면단 */}
      <View style={{ height: heightPercentage(480), paddingLeft: widthPercentage(17) }}>
        {/* 타이틀 뷰 */}
        <TitleView step={"개인정보 처리 방침 조회"} title={"개인정보 처리 방침에 동의해주세요"} />

        {/* 객체간 여백 */}
        <Blank height={10} />

        <ScrollView style={{
          width: widthPercentage(260),
          height: heightPercentage(400),
          paddingTop: heightPercentage(10),
          marginBottom: heightPercentage(50),
          paddingLeft: widthPercentage(12),
          paddingRight: widthPercentage(12),
          minHeight: heightPercentage(35),
          backgroundColor: colors.fontWhite,
          borderRadius: 10,
          fontSize: 12,
          color: colors.fontGray,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 2, // For Android
          overflow: 'scroll',
        }}>
          {/* 개인정보 처리방침 내용 */}
          <Markdown style={{ margin: widthPercentage(20) }}>
            {privacyContent}
          </Markdown>
        </ScrollView>

        {/* 체크박스 1: 개인정보 처리방침 동의 */}
        <TouchableOpacity onPress={() => setIsPrivacyAgreed(!isPrivacyAgreed)} style={{ marginRight: widthPercentage(5) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>저는 개인정보 처리방침에 동의합니다. (필수)</Text>
            {isPrivacyAgreed ? <Text>☑️</Text> : <Text>▢</Text>}
          </View>
        </TouchableOpacity>

        {/* 체크박스 2: 불쾌한 콘텐츠 및 남용 금지 동의 */}
        <TouchableOpacity onPress={() => setIsContentAgreed(!isContentAgreed)} style={{ marginRight: widthPercentage(5), marginTop: heightPercentage(10) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: '90%' }}>불쾌한 콘텐츠나 남용적인 행동은 금지 및 제제 가능성을 이해하고 동의합니다. (필수)</Text>
            {isContentAgreed ? <Text>☑️</Text> : <Text>▢</Text>}
          </View>
        </TouchableOpacity>

        <Blank height={50} />
      </View>

      {/* 버튼: 두 체크박스 모두 동의해야 활성화 */}
      <NxtBtn onPress={handleLogin} disabled={!isAllAgreed} title="모두 동의합니다" />
    </View>
  );
};

export default SignUpCheckPolicy;