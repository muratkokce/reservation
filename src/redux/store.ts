import {configureStore} from '@reduxjs/toolkit';
import globalLoadSlice from './slices/globalLoadSlice';
import userSlice from './slices/userSlice';
import reservationSlice from './slices/reservationSlice';

const store = configureStore({
  reducer: {
    globalLoad: globalLoadSlice.reducer,
    user: userSlice.reducer,
    reservation: reservationSlice.reducer,
  },
});

export default store;

export const {dispatch: storeDispatch} = store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
