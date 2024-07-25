import {SvgProps} from 'react-native-svg';

interface ISvgProps extends SvgProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export type {ISvgProps};
