// import { configureStore } from '@reduxjs/toolkit';
// import { ExerciseFormRouter } from './exercise-form/exercise-form-router';
// import { exerciseListRouter } from './exerciseList/exercise-list-router';
// import { isEditingRouter } from './isEditing/isEditing-router';
// import { mainApi } from './main-api/MainApiRouter.api';
// import { userRouter } from './user/user-router';

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       [userRouter.name]: userRouter.reducer,
//       [ExerciseFormRouter.name]: ExerciseFormRouter.reducer,
//       [exerciseListRouter.name]: exerciseListRouter.reducer,
//       [isEditingRouter.name]: isEditingRouter.reducer,
//       //  [gptApi.reducerPath]: gptApi.reducer,
//       [mainApi.reducerPath]: mainApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(mainApi.middleware),
//   });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
import { configureStore } from '@reduxjs/toolkit';
import { ExerciseFormRouter } from './exercise-form/exercise-form-router';
import { mainApi } from './main-api/MainApiRouter.api';
import { exerciseListRouter } from './exerciseList/exercise-list-router';
import { isEditingRouter } from './isEditing/isEditing-router';
import { userRouter } from './user/user-router';

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
