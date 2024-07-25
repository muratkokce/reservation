import React, {useCallback, useRef, useState} from 'react';
import {AuthStackParams} from '@/navigation/AuthStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
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
import {setGlobalLoadState} from '@/redux/slices/globalLoadSlice';
import ToastMessage from '@/components/ToastMessage';
import Globals from '@/constants/Globals';
import {setUserInfoState} from '@/redux/slices/userSlice';
import AsyncStorage from '@react-native-community/async-storage';

type Props = NativeStackScreenProps<AuthStackParams, 'RegisterScreen'>;

interface FormValuesTypes {
  username: string;
  email: string;
  password: string;
}

const FormValuesTypeDefault: FormValuesTypes = {
  username: '',
  email: '',
  password: '',
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
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
        .min(4, 'Kullanıcı adı en az 4 karakter olmalı.'),
      email: yup
        .string()
        .email('Lütfen geçerli bir e-mail giriniz.')
        .required('E-Mail boş olamaz.'),
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

    await AsyncStorage.setItem(
      'userInfo',
      JSON.stringify({
        username: loginForm.values.username,
        email: loginForm.values.email,
        password: loginForm.values.password,
      }),
    );
    setTimeout(() => {
      dispatch(setGlobalLoadState(false));
      ToastMessage({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Başarıyla kayıt yapıldı. Hemen giriş yapabilirsin!',
      });
      navigation.navigate('LoginScreen');
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
        Hemen Aramıza Katıl!
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
        placeholder="E-Mail"
        autoCapitalize="none"
        disabledControllerSpecialCharacters
        onChangeText={loginForm.handleChange('email')}
        onBlur={loginForm.handleBlur('email')}
        value={loginForm.values.email}
        errorText={loginForm.touched.email ? loginForm.errors.email : null}
        containerStyles={styles.textInput}
        autoComplete="email"
        autoCorrect
        keyboardType="email-address"
        textContentType="emailAddress"
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
        text="Yeni Hesap Oluştur"
        containerStyle={styles.button}
        onPress={loginForm.handleSubmit}
      />
      <SimpleButton
        text="Geri Dön"
        backgroundColor={Colors.white}
        textColor={Colors.primary.primary}
        containerStyle={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          navigation.navigate('LoginScreen');
        }}
      />
    </KeyboardAwareScrollView>
  );
};
export default RegisterScreen;

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
