import Colors from '@/theme/Colors';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import SimpleText from './SimpleText';

type ButtonProps = {
  onPress: () => void;
  text: string | React.ReactNode;
  textColor?: TextStyle['color'];
  fontSize?: TextStyle['fontSize'];
  backgroundColor?: string;
  borderColor?: string;
  disablebackgroundColor?: string;
  margin?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rightIconStyle?: StyleProp<ViewStyle>;
  RightIcon?: any;
  LeftIcon?: any;
  activeOpacity?: any;
  disabled?: boolean;
  fontFamily?: string;
};
const SimpleButton = ({
  onPress,
  activeOpacity = 0.75,
  disabled = false,
  text,
  textColor = Colors.white,
  fontSize = scaledWidth(14),
  backgroundColor = Colors.primary.primary,
  borderColor = Colors.primary.primary,
  disablebackgroundColor = Colors.blackOpacity,
  containerStyle,
  rightIconStyle,
  margin,
  RightIcon,
  LeftIcon,
}: ButtonProps) => {
  if (!text) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? disablebackgroundColor : backgroundColor,
          borderWidth: scaledWidth(disabled ? 0 : 1),
          borderColor: borderColor,
        },
        containerStyle,
        margin,
      ]}>
      {LeftIcon && (
        <View>
          <LeftIcon />
        </View>
      )}
      <SimpleText
        style={{
          color: textColor,
          fontSize,
        }}>
        {text}
      </SimpleText>
      {RightIcon && (
        <View style={[styles.rightIconView, rightIconStyle]}>
          <RightIcon />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledHeight(6),
    paddingVertical: scaledHeight(22),
    paddingHorizontal: scaledWidth(22),
    flexDirection: 'row',
    zIndex: 99999,
  },
  rightIconView: {
    position: 'absolute',
    right: scaledWidth(30),
  },
});
