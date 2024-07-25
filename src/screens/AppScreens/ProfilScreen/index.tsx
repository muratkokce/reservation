import React from 'react';
import {AppBottomTabParams, AppStackParams} from '@/navigation/AppStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Platform, StyleSheet, View} from 'react-native';
import {Paddings, scaledHeight, scaledWidth} from '@/theme/Responsive';
import {useAppSelector} from '@/redux/hooks';
import SimpleText from '@/components/SimpleText';
import SimpleButton from '@/components/SimpleButton';
import AsyncStorage from '@react-native-community/async-storage';
import {CompositeScreenProps} from '@react-navigation/native';
import {MainStackParams} from '@/navigation/types';
import Colors from '@/theme/Colors';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AppBottomTabParams, 'ProfileScreen'>,
  CompositeScreenProps<
    NativeStackScreenProps<AppStackParams>,
    NativeStackScreenProps<MainStackParams>
  >
>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {user} = useAppSelector(state => state.user);

  const logOutPress = async () => {
    await AsyncStorage.removeItem('userInfo');
    navigation.replace('AuthScreens');
  };
  return (
    <View style={styles.container}>
      <SimpleText fontWeight={'bold'}>Kullanıcı Adı</SimpleText>
      <View style={styles.infoView}>
        <SimpleText>{user?.username}</SimpleText>
      </View>
      <SimpleText fontWeight={'bold'}>Email</SimpleText>

      <View style={styles.infoView}>
        <SimpleText>{user?.email}</SimpleText>
      </View>
      <SimpleButton
        text="Çıkış Yap"
        containerStyle={styles.button}
        onPress={logOutPress}
      />
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Paddings.page.horizontal,
    paddingVertical: Paddings.page.vertical,
  },
  infoView: {
    backgroundColor: Colors.white,
    paddingHorizontal: scaledWidth(15),
    borderRadius: scaledWidth(10),
    borderWidth: scaledWidth(1),
    paddingBottom: scaledHeight(Platform.OS === 'ios' ? 22 : 16),
    paddingTop: scaledHeight(Platform.OS === 'ios' ? 22 : 16),
    marginTop: scaledHeight(5),
    marginBottom: scaledHeight(10),
  },
  button: {
    marginTop: scaledHeight(20),
  },
});
