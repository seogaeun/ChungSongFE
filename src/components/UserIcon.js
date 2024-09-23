import React from 'react';
import { Image } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';

// SVG 이미지를 import합니다.
import ProfileSvg from '../assets/images/annonUser.svg';
import CrBea from '../assets/images/character/CrBea.svg';
import CrCat from '../assets/images/character/CrCat.svg';
import CrDog from '../assets/images/character/CrDog.svg';
import CrPan from '../assets/images/character/CrPan.svg';
import CrRab from '../assets/images/character/CrRab.svg';
import CrSqu from '../assets/images/character/CrSqu.svg';
import CrClo from '../assets/images/character/CrClo.svg';
import CrRoc from '../assets/images/character/CrRoc.svg';


const UserIcon = ({ index }) => {
  // 인덱스에 해당하는 이미지를 선택하여 렌더링합니다.
  switch (index) {
    case 0:
      return <WithLocalSvg asset={CrBea}/>;
    case 1:
      return <WithLocalSvg asset={CrBea}/>;
    case 2:
      return <WithLocalSvg asset={CrCat}/>;
    case 3:
      return <WithLocalSvg asset={CrDog}/>;
    case 4:
      return <WithLocalSvg asset={CrPan}/>;
    case 5:
        return <WithLocalSvg asset={CrRab}/>;
    case 6:
        return <WithLocalSvg asset={CrSqu}/>;
    case 7:
        return <WithLocalSvg asset={CrClo}/>;
    case 8:
        return <WithLocalSvg asset={CrRoc}/>;
    default:
      return <WithLocalSvg asset={ProfileSvg}/>;
  }
};

export default UserIcon;
