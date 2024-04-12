import { configureStore } from '@reduxjs/toolkit';
import { isEditingRouter, mainApi } from '@/shared';

import { exerciseListRouter } from '@/entities/exercise';
import { userRouter } from '@/entities/user';
import { ExerciseFormRouter } from '@/features/exercise';

export const store = configureStore({
  reducer: {
    [userRouter.name]: userRouter.reducer,
    [ExerciseFormRouter.name]: ExerciseFormRouter.reducer,
    [exerciseListRouter.name]: exerciseListRouter.reducer,
    [isEditingRouter.name]: isEditingRouter.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppStore = ReturnType<typeof configureStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
