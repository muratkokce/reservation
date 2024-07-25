import React from 'react';
import Colors from '@/theme/Colors';
import {StatusBar, StyleSheet, View, LogBox} from 'react-native';
import MainNavigationWrapper from '@/navigation/MainStack';
import {Provider} from 'react-redux';
import store from '@/redux/store';
import CustomLoader from '@/components/CustomLoader';
import Toast from 'react-native-toast-message';
import {ToastMessageConfig} from '@/components/ToastMessage';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor={Colors.transparent}
            />
            <MainNavigationWrapper />
            <CustomLoader />
          </View>
          <Toast config={ToastMessageConfig} />
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
