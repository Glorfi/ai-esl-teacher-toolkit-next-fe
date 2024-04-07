import { IFormValues } from '@/interfaces/form-values';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

const initialState: IFormValues = {
  skill: '',
  taskType: '',
  wordList: '',
  learnerLevel: '',
  learnerAge: '',
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
