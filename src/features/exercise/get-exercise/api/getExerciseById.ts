import { API_PATH } from '@/shared/constants/ApiBaseUrl';
import { mainApi } from '@/shared';
import { IExercise } from '@/entities/exercise';

const GetExerciseEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getExerciseById: builder.query<
      IExercise,
      { token?: string | null | undefined; id: string | undefined | string[] }
    >({
      query: ({ token, id }) => ({
        url: `${API_PATH.EXERCISES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetExerciseByIdQuery, useLazyGetExerciseByIdQuery } =
  GetExerciseEndpoint;
