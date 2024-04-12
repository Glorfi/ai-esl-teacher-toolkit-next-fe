import { IFormValues } from '@/features/exercise/generate-exercise/model/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IFormValues | null = {
  skill: '',
  taskType: '',
  wordList: '',
  learnerLevel: 'B1',
  learnerAge: 'adults',
  isStrictChecking: true,
};

const AddValuesAction = (
  state: IFormValues,
  action: PayloadAction<IFormValues>
) => {
  return { ...state, ...action.payload };
};

export const ExerciseFormRouter = createSlice({
  name: 'exerciseForm',
  initialState,
  reducers: { addValues: AddValuesAction },
});

export const { addValues } = ExerciseFormRouter.actions;
