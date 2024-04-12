import { IExercise } from '@/entities/exercise';
import { API_PATH } from '@/shared';

import { mainApi } from '@/shared';

const getExercisesEndpoint = mainApi.injectEndpoints({
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
  getExercisesEndpoint;
