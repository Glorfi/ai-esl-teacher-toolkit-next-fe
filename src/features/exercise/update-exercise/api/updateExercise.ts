import { API_PATH } from '@/shared/constants/ApiBaseUrl';
import { IExercise } from '@/entities/exercise';
import { mainApi } from '@/shared';
import { IUpdateExerciseRequest } from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    updateExercise: builder.mutation<IExercise, IUpdateExerciseRequest>({
      query: ({ token, id, body }) => ({
        url: `${API_PATH.EXERCISES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useUpdateExerciseMutation } = mainApiEndpoint;
