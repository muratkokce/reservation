import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppBottomTabParams, AppStackParams} from './AppStack';
import HomeScreen from '@/screens/AppScreens/HomeScreen';
import MapScreen from '@/screens/AppScreens/MapScreen';
import Colors from '@/theme/Colors';
import ProfileScreen from '@/screens/AppScreens/ProfilScreen';

type Props = NativeStackScreenProps<AppStackParams, 'HomeScreens'>;

const BottomTab = createBottomTabNavigator<AppBottomTabParams>();

const BottomTabNavigator: React.FC<Props> = () => {
  return (
    <BottomTab.Navigator initialRouteName={'HomeScreen'}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Rezervasyon',
          tabBarActiveTintColor: Colors.primary.primary,
        }}
      />
      <BottomTab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Harita',
          tabBarActiveTintColor: Colors.primary.primary,
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarActiveTintColor: Colors.primary.primary,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
