import { API_PATH } from '@/shared';

import { IExercise } from '@/entities/exercise';
import { IDeleteExerciseRequest } from '../model/types';
import { mainApi } from '@/shared';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteExercise: builder.mutation<IExercise, IDeleteExerciseRequest>({
      query: ({ token, id }) => ({
        url: `${API_PATH.EXERCISES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteExerciseMutation } = mainApiEndpoint;
