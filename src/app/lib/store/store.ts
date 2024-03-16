import { configureStore } from '@reduxjs/toolkit';
import { ExerciseFormRouter } from './exercise-form/exercise-form-router';
import { exerciseListRouter } from './exerciseList/exercise-list-router';
import { gptApi } from './gpt-api/gpt.api';
import { isEditingRouter } from './isEditing/isEditing-router';
import { mainApi } from './main-api/MainApiRouter.api';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ExerciseFormRouter.name]: ExerciseFormRouter.reducer,
      [exerciseListRouter.name]: exerciseListRouter.reducer,
      [isEditingRouter.name]: isEditingRouter.reducer,
      //  [gptApi.reducerPath]: gptApi.reducer,
      [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mainApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
