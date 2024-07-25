import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

export type AppBottomTabParams = {
  HomeScreen: NavigatorScreenParams<any>;
  MapScreen: undefined;
  ProfileScreen: undefined;
};

export type AppStackParams = {
  HomeScreens?: {initialRouteName?: AppBottomTabParams};
};

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName={'HomeScreens'}>
      <AppStack.Screen
        name="HomeScreens"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
