import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

const setAction = (state: boolean, action: PayloadAction<boolean>) => {
  return action.payload;
};

export const isEditingRouter = createSlice({
  name: 'isEditing',
  initialState,
  reducers: {
    setIsEditing: setAction,
  },
});

export const { setIsEditing } = isEditingRouter.actions;
