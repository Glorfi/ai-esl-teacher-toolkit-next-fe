import { API_PATH } from '@/shared';
import { mainApi } from '@/shared';
import { IExercise } from '@/entities/exercise';
import { IGenerateExerciseRequest } from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    generateExercise: builder.mutation<IExercise, IGenerateExerciseRequest>({
      query: ({ token, body }) => ({
        url: `${API_PATH.EXERCISES_GENERATE}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGenerateExerciseMutation } = mainApiEndpoint;
