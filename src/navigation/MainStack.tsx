import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackParams} from './types';
import SplashScreen from '@/screens/SplashScreen/index';
import AuthStackNavigator from './AuthStack';
import AppStackNavigator from './AppStack';
import {SafeAreaView} from 'react-native';

const MainStack = createNativeStackNavigator<MainStackParams>();

const MainNavigationWrapper: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
        <MainStack.Screen name="AuthScreens" component={AuthStackNavigator} />
        <MainStack.Screen name="AppScreens" component={AppStackNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigationWrapper;
