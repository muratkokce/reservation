import React from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';
import {scaledWidth} from '@/theme/Responsive';
import Colors from '@/theme/Colors';
import {ISvgProps} from '@/assets/types';

const PasswordSvg: React.FC<ISvgProps> = ({
  size = scaledWidth(20),
  color = Colors.helpColor,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 18" fill="none" {...props}>
      <G>
        <Path
          d="M7.5 1.60714C8.97991 1.60714 10.1786 2.8058 10.1786 4.28571V6.42857H4.82143V4.28571C4.82143 2.8058 6.02009 1.60714 7.5 1.60714ZM3.21429 4.28571V6.42857H2.14286C0.960938 6.42857 0 7.38951 0 8.57143V15C0 16.1819 0.960938 17.1429 2.14286 17.1429H12.8571C14.0391 17.1429 15 16.1819 15 15V8.57143C15 7.38951 14.0391 6.42857 12.8571 6.42857H11.7857V4.28571C11.7857 1.91853 9.86719 0 7.5 0C5.13281 0 3.21429 1.91853 3.21429 4.28571ZM2.14286 8.03571H12.8571C13.1518 8.03571 13.3929 8.27679 13.3929 8.57143V15C13.3929 15.2946 13.1518 15.5357 12.8571 15.5357H2.14286C1.84821 15.5357 1.60714 15.2946 1.60714 15V8.57143C1.60714 8.27679 1.84821 8.03571 2.14286 8.03571ZM8.30357 10.7143C8.30357 10.269 7.94531 9.91071 7.5 9.91071C7.05469 9.91071 6.69643 10.269 6.69643 10.7143V12.8571C6.69643 13.3025 7.05469 13.6607 7.5 13.6607C7.94531 13.6607 8.30357 13.3025 8.30357 12.8571V10.7143Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_22_173">
          <Rect width="15" height="17.1429" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PasswordSvg;
