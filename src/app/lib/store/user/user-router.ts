import { IUserData } from '@/entities/user/model/userData';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = IUserData | null;
const initialState = null as UserState;

const setUserAction = (state: UserState, action: PayloadAction<IUserData>) => {
  return action.payload;
};

export const userRouter = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setUserAction,
  },
});

export const { setUser } = userRouter.actions;
