import {ParamListBase, RouteProp} from '@react-navigation/native';

export type MainStackParams = {
  SplashScreen?: NavigationProps;
  AuthScreens?: any;
  AppScreens?: {initialRouteName?: string};
};

export type NavigationProps = {
  route: RouteProp<ParamListBase> | any;
  navigation: any;
};
