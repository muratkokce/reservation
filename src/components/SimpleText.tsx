import {Text, TextProps, TextStyle} from 'react-native';
import Colors from '@/theme/Colors';
import {scaledWidth} from '@/theme/Responsive';
import React, {forwardRef, LegacyRef} from 'react';

type SimpleTextProps = {
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
} & TextProps;

const SimpleText = forwardRef(
  (props: SimpleTextProps, ref: LegacyRef<Text>) => {
    const {color = Colors.black, fontSize = 14, style} = props;

    return (
      <Text
        allowFontScaling={false}
        {...props}
        style={[{fontSize: scaledWidth(fontSize), color}, style]}
        ref={ref}>
        {props.children}
      </Text>
    );
  },
);

export default SimpleText;
