import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/screens/AuthScreens/LoginScreen';
import RegisterScreen from '@/screens/AuthScreens/RegisterScreen';
// import NavigationBar from '@/components/Navigation/NavigationBar';

export type AuthStackParams = {
  LoginScreen: any;
  RegisterScreen: any;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
