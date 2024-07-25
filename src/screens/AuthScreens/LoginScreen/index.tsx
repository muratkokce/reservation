import React, {useCallback, useRef, useState} from 'react';
import {AuthStackParams} from '@/navigation/AuthStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParams} from '@/navigation/types';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {StyleSheet, Keyboard} from 'react-native';
import {useAppDispatch} from '@/redux/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Paddings, scaledHeight, scaledWidth} from '@/theme/Responsive';
import SimpleText from '@/components/SimpleText';
import SimpleButton from '@/components/SimpleButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleTextInput from '@/components/SimpleTextInput';
import Colors from '@/theme/Colors';
import Icons from '@/assets/icons';
import AppLogo from '@/assets/images/SvgFiles/AppLogo.svg';
import ToastMessage from '@/components/ToastMessage';
import {setGlobalLoadState} from '@/redux/slices/globalLoadSlice';
import Globals from '@/constants/Globals';
import AsyncStorage from '@react-native-community/async-storage';
import {setUserInfoState, UserInfoType} from '@/redux/slices/userSlice';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, 'LoginScreen'>,
  NativeStackScreenProps<MainStackParams>
>;

interface FormValuesTypes {
  username: string;
  password: string;
}

const FormValuesTypeDefault: FormValuesTypes = {
  username: '',
  password: '',
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const usernameInputRef = useRef<any>();
  const passwordInputRef = useRef<any>();
  const [isPasswordSecureText, setIsPasswordSecureText] =
    useState<boolean>(true);

  const loginForm = useFormik({
    initialValues: FormValuesTypeDefault,
    onSubmit: values => onSubmit(values),
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required('Kullanıcı adı boş olamaz.')
        .min(4, 'Kullanıcı adı 4 karakter olmalı.'),
      password: yup
        .string()
        .required('Şifre boş olamaz.')
        .test('isLength', 'Lütfen geçerli bir şifre giriniz.', value =>
          !value ? false : value.length > 1,
        ),
    }),
  });

  const onSubmit = async (values: FormValuesTypes) => {
    Keyboard.dismiss();
    if (!values) {
      ToastMessage({
        type: 'error',
        text1: 'Uyarı',
        text2: 'Lütfen tüm alanları doldurunuz.',
      });
      return;
    }
    dispatch(setGlobalLoadState(true));

    const userInfoSession = await AsyncStorage.getItem('userInfo');
    const objectUserInfoSession: UserInfoType | null = userInfoSession
      ? JSON.parse(userInfoSession)
      : null;

    if (!objectUserInfoSession) {
      setTimeout(() => {
        dispatch(setGlobalLoadState(false));
        ToastMessage({
          type: 'error',
          text1: 'Hata',
          text2: 'Kullanıcı bilgileri kontrol ediniz.',
        });
      }, Globals.LoadTimeOut / 2);
      return;
    }
    dispatch(
      setUserInfoState({
        username: objectUserInfoSession.username,
        email: objectUserInfoSession.email,
        password: objectUserInfoSession.password,
      }),
    );
    setTimeout(() => {
      dispatch(setGlobalLoadState(false));
      navigation.replace('AppScreens');
    }, Globals.LoadTimeOut);
  };

  useFocusEffect(
    useCallback(() => {
      return () => loginForm.resetForm();
    }, []),
  );

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + scaledHeight(20),
        paddingBottom: insets.bottom + scaledHeight(20),
      }}
      alwaysBounceVertical={false}
      extraScrollHeight={scaledHeight(45)}
      extraHeight={scaledHeight(15)}
      showsVerticalScrollIndicator={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      keyboardShouldPersistTaps="handled">
      <AppLogo
        width={scaledWidth(125)}
        height={scaledHeight(125)}
        style={styles.logo}
      />
      <SimpleText fontSize={34} fontWeight={'bold'} style={styles.titleText}>
        Merhaba,
      </SimpleText>
      <SimpleText
        fontSize={34}
        fontWeight={'bold'}
        color={Colors.primary.primary}
        style={styles.welcomeText}>
        Hoş geldin!
      </SimpleText>
      <SimpleTextInput
        placeholder="Kullanıcı Adı"
        autoCapitalize="none"
        disabledControllerSpecialCharacters
        onChangeText={loginForm.handleChange('username')}
        onBlur={loginForm.handleBlur('username')}
        value={loginForm.values.username}
        errorText={
          loginForm.touched.username ? loginForm.errors.username : null
        }
        containerStyles={styles.textInput}
        ref={usernameInputRef}
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <SimpleTextInput
        placeholder="Şifre"
        autoCapitalize="none"
        disabledControllerSpecialCharacters
        RightIcon={Icons.InputIcons.PasswordVisible}
        RightIconPress={() => setIsPasswordSecureText(!isPasswordSecureText)}
        isSecureText={isPasswordSecureText}
        onChangeText={loginForm.handleChange('password')}
        onBlur={loginForm.handleBlur('password')}
        value={loginForm.values.password}
        errorText={
          loginForm.touched.password ? loginForm.errors.password : null
        }
        containerStyles={styles.textInput}
        ref={passwordInputRef}
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <SimpleButton
        text="Giriş Yap"
        containerStyle={styles.button}
        onPress={loginForm.handleSubmit}
      />
      <SimpleButton
        text="Yeni Hesap Oluştur"
        backgroundColor={Colors.white}
        textColor={Colors.primary.primary}
        containerStyle={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          navigation.navigate('RegisterScreen');
        }}
      />
    </KeyboardAwareScrollView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGray.primaryGray200,
    paddingHorizontal: Paddings.page.horizontal,
  },
  logo: {
    alignSelf: 'center',
  },
  titleText: {
    marginTop: scaledHeight(30),
  },
  welcomeText: {
    marginBottom: scaledHeight(20),
  },
  textInput: {
    marginTop: scaledHeight(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: scaledHeight(20),
  },
});
