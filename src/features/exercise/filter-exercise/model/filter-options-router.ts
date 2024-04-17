import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterOptions } from './types';

const initialState: IFilterOptions = {
  studentAge: '',
  studentLevel: '',
  skill: [],
  type: [],
  topicList: [],
};

const setOptionsAction = (
  state: IFilterOptions,
  action: PayloadAction<IFilterOptions>
) => {
  return action.payload;
};

const resetOptionsAction = (
  state: IFilterOptions,
  action: PayloadAction<IFilterOptions>
) => {
  return initialState;
};

export const filterOptionsRouter = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setFilterOptions: setOptionsAction,
    resetFilterOptions: resetOptionsAction,
  },
});

export const { setFilterOptions, resetFilterOptions } =
  filterOptionsRouter.actions;
