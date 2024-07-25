import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import React from 'react';
import {Vibration} from 'react-native';
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastProps,
} from 'react-native-toast-message';

type ToastMessageType = {
  text1: string;
  text2: string;
  isActive?: boolean;
} & ToastProps;

export const ToastMessageConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      text1Style={{fontSize: scaledWidth(13)}}
      text1Props={{allowFontScaling: false}}
      text1NumberOfLines={2}
      text2Style={{fontSize: scaledWidth(11)}}
      text2Props={{allowFontScaling: false}}
      text2NumberOfLines={3}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{fontSize: scaledWidth(13)}}
      text1Props={{allowFontScaling: false}}
      text1NumberOfLines={2}
      text2Style={{fontSize: scaledWidth(11)}}
      text2Props={{allowFontScaling: false}}
      text2NumberOfLines={3}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      text1Style={{fontSize: scaledWidth(13)}}
      text1Props={{allowFontScaling: false}}
      text1NumberOfLines={2}
      text2Style={{fontSize: scaledWidth(11)}}
      text2Props={{allowFontScaling: false}}
      text2NumberOfLines={3}
    />
  ),
};

//type error | success | info
const ToastMessage = ({
  type = 'success',
  visibilityTime = 3000,
  text1,
  text2,
  position = 'top',
  isActive = false,
}: ToastMessageType) => {
  if (type === 'error' && isActive) {
    setTimeout(() => {
      Vibration.vibrate();
    }, 100);
  }
  return Toast.show({
    type,
    visibilityTime,
    text1,
    text2,
    position,
    topOffset: scaledHeight(60),
  });
};

export default ToastMessage;
