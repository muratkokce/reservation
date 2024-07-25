import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import SimpleText from '@/components/SimpleText';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import Colors from '@/theme/Colors';
import {Paddings, scaledHeight, scaledWidth} from '@/theme/Responsive';
import BottomSheet from '@gorhom/bottom-sheet';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SimpleTextInput from '@/components/SimpleTextInput';
import SimpleButton from '@/components/SimpleButton';
import ToastMessage from '@/components/ToastMessage';
import {
  addReservation,
  removeReservation,
  ReservationInfoType,
  updateReservation,
} from '@/redux/slices/reservationSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppBottomTabParams} from '@/navigation/AppStack';

interface FormValuesTypes {
  id?: string;
  date: string;
  hour: string;
  note: string;
  city: string;
}

const FormValuesTypeDefault: FormValuesTypes = {
  date: '',
  hour: '',
  note: '',
  city: '',
};

type Props = NativeStackScreenProps<AppBottomTabParams, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const {reservations} = useAppSelector(state => state.reservation);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const dateInputRef = useRef<any>();
  const hourInputRef = useRef<any>();
  const noteInputRef = useRef<any>();
  const cityInputRef = useRef<any>();

  const reservationForm = useFormik({
    initialValues: FormValuesTypeDefault,
    onSubmit: values => onSubmit(values),
    validationSchema: yup.object().shape({
      date: yup.string().required('Tarih bilgisi boş olamaz.'),
      hour: yup.string().required('Saat bilgisi boş olamaz.'),
      note: yup.string().required('Note bilgisi boş olamaz.'),
      city: yup.string().required('Şehir bilgisi boş olamaz.'),
    }),
  });

  const cancelPress = async () => {
    await reservationForm.resetForm();
    bottomSheetRef.current?.close();
  };

  const onSubmit = (values: FormValuesTypes) => {
    Keyboard.dismiss();
    if (!values) {
      ToastMessage({
        type: 'error',
        text1: 'Uyarı',
        text2: 'Lütfen tüm alanları doldurunuz.',
      });
      return;
    }
    if (values.id) {
      dispatch(
        updateReservation({
          id: values.id,
          date: values.date,
          hour: values.hour,
          note: values.note,
          city: values.city,
        }),
      );
      bottomSheetRef.current?.close();
      return;
    }
    dispatch(
      addReservation({
        date: values.date,
        hour: values.hour,
        note: values.note,
        city: values.city,
      }),
    );
    bottomSheetRef.current?.close();
  };

  const RenderEmptyComponent = () => {
    return (
      <View style={styles.emptyInfoView}>
        <SimpleText
          onPress={() => bottomSheetRef.current?.collapse()}
          style={styles.emptyInfoText}>
          Aktif olarak randevunuz bulunmamaktadır.
        </SimpleText>
        <SimpleButton
          text="Yeni Rezervasyon Ekle"
          containerStyle={styles.button}
          onPress={() => bottomSheetRef.current?.collapse()}
        />
      </View>
    );
  };

  const RenderFooterComponent = () => {
    if (reservations.length === 0) {
      return null;
    }
    return (
      <SimpleButton
        text="Yeni Rezervasyon Ekle"
        containerStyle={[
          styles.button,
          {marginHorizontal: Paddings.page.horizontal},
        ]}
        onPress={() => bottomSheetRef.current?.collapse()}
      />
    );
  };

  const RenderItem = (item: ReservationInfoType, index: number) => {
    return (
      <View
        style={[
          styles.reservationView,
          {
            backgroundColor:
              index % 2 === 0
                ? Colors.primaryGray.primaryGray400
                : Colors.white,
          },
        ]}>
        <View style={styles.reservationInfoView}>
          <SimpleText fontSize={16} style={{fontWeight: 'bold'}}>{`${
            index + 1
          }.`}</SimpleText>
          <View style={{marginLeft: Paddings.page.horizontal}}>
            <SimpleText>{item.city.toUpperCase()}</SimpleText>
            <SimpleText>{item.note}</SimpleText>
            <SimpleText>{`${item.hour} - ${item.date}`}</SimpleText>
          </View>
        </View>
        <View>
          <SimpleButton
            text="Düzenle"
            backgroundColor={Colors.black}
            borderColor={Colors.black}
            containerStyle={styles.reservationOptionButton}
            onPress={async () => {
              await reservationForm.setValues({
                id: item.id,
                date: item.date,
                hour: item.hour,
                note: item.note,
                city: item.city,
              });
              bottomSheetRef.current?.collapse();
            }}
          />
          <SimpleButton
            text="Sil"
            backgroundColor={Colors.error}
            borderColor={Colors.error}
            containerStyle={[
              styles.reservationOptionButton,
              {marginTop: scaledHeight(5)},
            ]}
            onPress={() => dispatch(removeReservation(item.id))}
          />
        </View>
      </View>
    );
  };

  const RenderReservationInfo = () => {
    return (
      <KeyboardAwareScrollView
        style={styles.formView}
        contentContainerStyle={styles.formContentView}
        alwaysBounceVertical={false}
        extraScrollHeight={scaledHeight(15)}
        extraHeight={scaledHeight(15)}
        showsVerticalScrollIndicator={false}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardShouldPersistTaps="handled">
        <SimpleTextInput
          title="Kullanıcı Adı"
          editable={false}
          value={user?.username}
          onChangeText={() => {}}
        />
        <SimpleTextInput
          title="Tarih"
          placeholder="örn. 11.10.2024"
          autoCapitalize="none"
          disabledControllerSpecialCharacters
          onChangeText={reservationForm.handleChange('date')}
          onBlur={reservationForm.handleBlur('date')}
          value={reservationForm.values.date}
          errorText={
            reservationForm.touched.date ? reservationForm.errors.date : null
          }
          containerStyles={styles.textInput}
          ref={dateInputRef}
          returnKeyType="next"
          onSubmitEditing={() => hourInputRef.current.focus()}
        />
        <SimpleTextInput
          title="Saat"
          placeholder="Örn. 20:55"
          autoCapitalize="none"
          disabledControllerSpecialCharacters
          onChangeText={reservationForm.handleChange('hour')}
          onBlur={reservationForm.handleBlur('hour')}
          value={reservationForm.values.hour}
          errorText={
            reservationForm.touched.hour ? reservationForm.errors.hour : null
          }
          containerStyles={styles.textInput}
          ref={hourInputRef}
          returnKeyType="next"
          onSubmitEditing={() => noteInputRef.current.focus()}
        />
        <SimpleTextInput
          title="Not"
          placeholder="Örn. Not"
          autoCapitalize="none"
          disabledControllerSpecialCharacters
          onChangeText={reservationForm.handleChange('note')}
          onBlur={reservationForm.handleBlur('note')}
          value={reservationForm.values.note}
          errorText={
            reservationForm.touched.note ? reservationForm.errors.note : null
          }
          containerStyles={styles.textInput}
          ref={noteInputRef}
          returnKeyType="next"
          onSubmitEditing={() => cityInputRef.current.focus()}
        />
        <SimpleTextInput
          title="Şehir"
          placeholder="Örn. İstanbul"
          autoCapitalize="none"
          disabledControllerSpecialCharacters
          onChangeText={reservationForm.handleChange('city')}
          onBlur={reservationForm.handleBlur('city')}
          value={reservationForm.values.city}
          errorText={
            reservationForm.touched.city ? reservationForm.errors.city : null
          }
          containerStyles={styles.textInput}
          ref={cityInputRef}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <SimpleButton
          text="Kayıt Et"
          containerStyle={styles.button}
          onPress={reservationForm.handleSubmit}
        />
        <SimpleButton
          text="Vazgeç"
          backgroundColor={Colors.primaryGray.primaryGray900}
          borderColor={Colors.primaryGray.primaryGray900}
          onPress={cancelPress}
          containerStyle={{marginTop: scaledHeight(10)}}
        />
      </KeyboardAwareScrollView>
    );
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        reservationForm.resetForm();
      }
    },
    [reservationForm],
  );

  return (
    <>
      <FlatList
        data={reservations}
        extraData={reservations}
        keyExtractor={(_, index) => `key_${index}`}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        style={styles.container}
        ListEmptyComponent={RenderEmptyComponent}
        ListFooterComponent={RenderFooterComponent}
        renderItem={({item, index}) => RenderItem(item, index)}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        keyboardBehavior="interactive"
        enablePanDownToClose
        onChange={handleSheetChanges}>
        {RenderReservationInfo()}
      </BottomSheet>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formView: {
    backgroundColor: Colors.primaryGray.primaryGray400,
    padding: Paddings.page.horizontal,
  },
  formContentView: {
    paddingBottom: scaledHeight(50),
  },
  emptyInfoView: {
    width: '100%',
    paddingHorizontal: Paddings.page.horizontal,
    justifyContent: 'center',
    paddingVertical: scaledHeight(100),
  },
  emptyInfoText: {
    alignSelf: 'center',
  },
  textInput: {
    marginTop: scaledHeight(10),
  },
  button: {
    marginTop: scaledHeight(20),
  },
  reservationView: {
    paddingHorizontal: Paddings.page.horizontal,
    paddingVertical: Paddings.page.vertical / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reservationInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Paddings.page.horizontal,
  },
  reservationOptionButton: {
    paddingHorizontal: scaledWidth(5),
    paddingVertical: scaledHeight(5),
  },
});
