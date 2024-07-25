import React, {forwardRef} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SimpleText from './SimpleText';
import Colors from '@/theme/Colors';

type AutoCapitalizeTypes =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters'
  | undefined;

type SimpleTextInputTypes = {
  autoFocus?: boolean;
  onChangeText: TextInputProps;
  onBlur?: TextInputProps;
  title?: string;
  editable?: boolean;
  disabledControllerSpecialCharacters?: boolean;
  justLetterCharacters?: boolean;
  justNumberCharacters?: boolean;
  multiline?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: AutoCapitalizeTypes;
  isSecureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: string;
  textContentType?: string;
  maxLength?: number;
  backgroundColor?: string;
  errorText?: string | false | null | undefined;
  isShowErrorBorder?: boolean;
  isNotShowErrorBorder?: boolean;
  textInputContainerStyle?: TextStyle;
  containerStyles?: ViewStyle;
  inputContainerStyles?: ViewStyle;
  Icon?: any;
  RightIcon?: any;
  RightIconPress?: () => void;
} & TextInputProps;

const supportedCharacters = /[^a-zA-Z0-9çÇğĞıİşŞöÖüÜöÖüÜ ]/g;
const supportedLetterCharacters = /[^a-zA-ZçÇğĞıİşŞöÖüÜöÖüÜ ]/g;
const supportedNumberCharacters = /[^0-9 ]/g;

const SimpleTextInput = forwardRef((props: SimpleTextInputTypes, ref: any) => {
  const {
    autoFocus = false,
    onChangeText,
    onBlur,
    title,
    multiline = false,
    editable = true,
    disabledControllerSpecialCharacters = false,
    justLetterCharacters = false,
    justNumberCharacters = false,
    autoCapitalize = 'sentences',
    autoCorrect = false,
    isSecureText,
    keyboardType = 'default',
    placeholder,
    placeholderTextColor = Colors.placeholderText,
    textContentType = 'none',
    maxLength,
    textInputContainerStyle,
    errorText,
    isShowErrorBorder,
    isNotShowErrorBorder = false,
    backgroundColor = Colors.white,
    inputContainerStyles,
    containerStyles,
    Icon,
    RightIcon,
    RightIconPress,
  } = props;
  return (
    <View style={[styles.container, containerStyles]}>
      {title && (
        <SimpleText fontWeight={'bold'} style={styles.title}>
          {title}
        </SimpleText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            marginTop: scaledHeight(title ? 5 : 0),
            backgroundColor,
            borderColor:
              !isNotShowErrorBorder && (errorText || isShowErrorBorder)
                ? Colors.error
                : Colors.primaryGray.primaryGray400,
          },
          inputContainerStyles,
        ]}>
        <View style={styles.leftComponentView}>
          {Icon && <Icon />}
          <TextInput
            {...props}
            autoFocus={autoFocus}
            onChangeText={text => {
              if (disabledControllerSpecialCharacters) {
                onChangeText(text);
                return;
              }
              if (justLetterCharacters) {
                onChangeText(text.replace(supportedLetterCharacters, ''));
                return;
              }
              if (justNumberCharacters) {
                onChangeText(text.replace(supportedNumberCharacters, ''));
                return;
              }
              onChangeText(text.replace(supportedCharacters, ''));
            }}
            allowFontScaling={false}
            onBlur={onBlur}
            multiline={multiline}
            editable={editable}
            textContentType={textContentType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={isSecureText}
            keyboardType={keyboardType || 'default'}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            style={[
              styles.inputText,
              textInputContainerStyle,
              {
                marginHorizontal: scaledWidth(Icon ? 15 : 0),
                paddingBottom: scaledHeight(Platform.OS === 'ios' ? 22 : 16),
                paddingTop: scaledHeight(Platform.OS === 'ios' ? 22 : 16),
              },
            ]}
            ref={ref}
          />
          {RightIcon && (
            <TouchableOpacity
              disabled={typeof RightIconPress !== 'function'}
              activeOpacity={0.9}
              onPress={RightIconPress}>
              <RightIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {errorText && (
        <SimpleText fontSize={11} style={styles.errorText}>
          {errorText}
        </SimpleText>
      )}
    </View>
  );
});
export default SimpleTextInput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: scaledWidth(15),
    borderRadius: scaledWidth(10),
    borderWidth: scaledWidth(1),
  },
  inputText: {
    flex: 1,
    color: Colors.black,
    fontSize: scaledWidth(14),
  },
  leftComponentView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scaledWidth(14),
    color: Colors.black,
  },
  errorText: {
    color: Colors.error,
    marginTop: scaledHeight(5),
    alignSelf: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
});
