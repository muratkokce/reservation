import React, {useEffect} from 'react';
import {MainStackParams} from '@/navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, StyleSheet} from 'react-native';
import Colors from '@/theme/Colors';
import Globals from '@/constants/Globals';
import AppLogo from '@/assets/images/SvgFiles/AppLogo.svg';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import AsyncStorage from '@react-native-community/async-storage';
import {setUserInfoState} from '@/redux/slices/userSlice';
import {useAppDispatch} from '@/redux/hooks';

type Props = NativeStackScreenProps<MainStackParams, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const checkUserInfo = async () => {
    const userInfoSession = await AsyncStorage.getItem('userInfo');
    const objectUserInfoSession = userInfoSession
      ? JSON.parse(userInfoSession)
      : null;

    if (!objectUserInfoSession) {
      setTimeout(() => {
        navigation.replace('AuthScreens');
      }, Globals.LoadTimeOut);
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
      navigation.replace('AppScreens');
    }, Globals.LoadTimeOut);
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <AppLogo width={scaledWidth(125)} height={scaledHeight(125)} />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryGray.primaryGray900,
  },
});
