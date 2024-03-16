import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IExercise } from '../../../interfaces/exercise';
import { IUserData } from '../../../interfaces/userData';
import { mainApi } from '../MainApiRouter.api';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<IExercise[], string | null>({
      query: (token) => ({
        url: API_PATH.EXERCISES,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetExercisesQuery, useLazyGetExercisesQuery } =
  mainApiEndpoint;
