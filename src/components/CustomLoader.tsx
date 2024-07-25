import * as React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useAppSelector} from '@/redux/hooks';
import Colors from '@/theme/Colors';

const CustomLoader: React.FC = () => {
  const {isLoading} = useAppSelector(state => state.globalLoad);
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.black} />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.opacityBackground,
    justifyContent: 'center',
    zIndex: 1,
  },
});
