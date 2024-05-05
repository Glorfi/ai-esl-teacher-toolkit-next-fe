import { IUserData } from '@/entities/user/model/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = IUserData | null;
const initialState = null as UserState;

const setUserAction = (state: UserState, action: PayloadAction<IUserData>) => {
  return action.payload;
};

const clearUserAction = (state: UserState) => {
  return initialState;
};

export const userRouter = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setUserAction,
    clearUser: clearUserAction,
  },
});

export const { setUser, clearUser } = userRouter.actions;
