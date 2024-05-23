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

const resetStringOptionAction = (
  state: IFilterOptions,
  action: PayloadAction<'studentAge' | 'studentLevel'>
) => {
  state[action.payload] = '';
  console.log(action.payload);
  return state;
};

const resetOptionsAction = (state: IFilterOptions) => {
  return initialState;
};

const removeTypeAction = (
  state: IFilterOptions,
  action: PayloadAction<string>
) => {
  const typeIndex = state.type.indexOf(action.payload);
  if (typeIndex !== -1) {
    state.type.splice(typeIndex, 1);
  }
};

const removeSkillAction = (
  state: IFilterOptions,
  action: PayloadAction<string>
) => {
  const skillIndex = state.skill.indexOf(action.payload);
  if (skillIndex !== -1) {
    state.skill.splice(skillIndex, 1);
  }
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
    resetStringOption: resetStringOptionAction,
    removeType: removeTypeAction,
    removeSkill: removeSkillAction,
  },
});

export const {
  setFilterOptions,
  resetFilterOptions,
  toggleTopic,
  resetStringOption,
  removeType,
  removeSkill,
} = filterOptionsRouter.actions;
