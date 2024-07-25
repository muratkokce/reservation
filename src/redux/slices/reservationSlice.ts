import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

export interface ReservationInfoType {
  id: string;
  date: string;
  hour: string;
  note: string;
  city: string;
}

interface ReservationType {
  reservations: ReservationInfoType[];
}

const initialState: ReservationType = {
  reservations: [],
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    addReservation: (
      state,
      action: PayloadAction<Omit<ReservationInfoType, 'id'>>,
    ) => {
      console.warn(action.payload);
      const newReservation = {id: uuid.v4().toString(), ...action.payload};
      state.reservations.push(newReservation);
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(
        reservation => reservation.id !== action.payload,
      );
    },
    updateReservation: (state, action: PayloadAction<ReservationInfoType>) => {
      const index = state.reservations.findIndex(
        reservation => reservation.id === action.payload.id,
      );
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    resetReservationSlice: () => initialState,
  },
});

export const {
  addReservation,
  removeReservation,
  updateReservation,
  resetReservationSlice,
} = reservationSlice.actions;
export default reservationSlice;
