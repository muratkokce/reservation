import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserInfoType {
  username: string;
  email: string;
  password: string;
}

interface UserType {
  user: UserInfoType | null;
}

const initialState: UserType = {
  user: null,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfoState: (state, action: PayloadAction<UserInfoType>) => {
      state.user = action.payload;
    },
    resetUserSlice: () => initialState,
  },
});

export const {setUserInfoState, resetUserSlice} = userSlice.actions;
export default userSlice;
