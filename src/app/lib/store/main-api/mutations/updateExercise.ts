import { API_PATH } from '@/constants/ApiBaseUrl';
import { IExercise } from '@/interfaces/exercise';
import { IUpdateExerciseRequest } from '@/interfaces/requests/updateExercise';
import { mainApi } from '../MainApiRouter.api';

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
