import {Dimensions} from 'react-native';

const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('window');

const heightMobileUI = 896;
const widthMobileUI = 414;

const scaledWidth = (scaleWidthVar: number) => {
  return (ScreenWidth * scaleWidthVar) / widthMobileUI;
};

const scaledHeight = (scaleHeightVar: number) => {
  return (ScreenHeight * scaleHeightVar) / heightMobileUI;
};

const Paddings = {
  page: {
    horizontal: scaledWidth(20),
    vertical: scaledWidth(20),
  },
};

export {Paddings, scaledWidth, scaledHeight, ScreenWidth, ScreenHeight};
