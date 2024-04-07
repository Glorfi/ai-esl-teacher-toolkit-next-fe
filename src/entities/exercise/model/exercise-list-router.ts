import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IExercise } from './models';
import { ISentence } from '@/entities/sentence';

const initialState: IExercise[] = [];

const addExerciseListAction = (
  state: IExercise[],
  action: PayloadAction<IExercise[]>
) => {
  return [...state, ...action.payload];
};

const removeExerciseAction = (
  state: IExercise[],
  action: PayloadAction<string>
) => {
  return state.filter((item) => item._id !== action.payload);
};

const addExerciseAction = (
  state: IExercise[],
  action: PayloadAction<IExercise>
) => {
  return [...state, action.payload];
};

const updateExerciseAction = (
  state: IExercise[],
  action: PayloadAction<IExercise>
) => {
  const index = state.findIndex(
    (exercise) => exercise._id === action.payload._id
  );
  if (index !== -1) {
    state[index] = action.payload;
  }
  return state;
};

const replaceSentenceAction = (
  state: IExercise[],
  action: PayloadAction<ISentence>
) => {
  const exIndex = state.findIndex(
    (exercise) => exercise._id === action.payload.exercise
  );
  if (exIndex !== -1) {
    const sentenceIndex = state[exIndex].sentenceList.findIndex(
      (sentence) => sentence._id === action.payload._id
    );
    state[exIndex].sentenceList[sentenceIndex] = action.payload;
  }
  return state;
};

const updateTimeStampByIdAction = (
  state: IExercise[],
  action: PayloadAction<string>
) => {
  const exIndex = state.findIndex(
    (exercise) => exercise._id === action.payload
  );
  if (exIndex !== -1) {
    state[exIndex].updatedAt = new Date();
  }
  return state;
};

export const exerciseListRouter = createSlice({
  name: 'exerciseList',
  initialState,
  reducers: {
    addExerciseList: addExerciseListAction,
    removeExercise: removeExerciseAction,
    addExercise: addExerciseAction,
    replaceExercise: updateExerciseAction,
    replaceSentence: replaceSentenceAction,
    updateTimeStampById: updateTimeStampByIdAction,
  },
});

export const {
  addExerciseList,
  removeExercise,
  addExercise,
  replaceExercise,
  replaceSentence,
  updateTimeStampById,
} = exerciseListRouter.actions;
