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

const toggleTopicAction = (
  state: IFilterOptions,
  action: PayloadAction<string>
) => {
  const topicIndex = state.topicList.indexOf(action.payload);
  if (topicIndex === -1) {
    state.topicList.push(action.payload);
  } else {
    state.topicList.splice(topicIndex, 1);
  }
};

export const filterOptionsRouter = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    setFilterOptions: setOptionsAction,
    resetFilterOptions: resetOptionsAction,
    toggleTopic: toggleTopicAction,
  },
});

export const { setFilterOptions, resetFilterOptions, toggleTopic } =
  filterOptionsRouter.actions;
