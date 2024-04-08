import { IExercise } from '@/interfaces/exercise';
import { mainApi } from '../../../../../shared/api/MainApiRouter.api';
import { ICreateExerciseRequest } from '@/interfaces/requests/createExercise';
import { API_PATH } from '@/constants/ApiBaseUrl';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createExercise: builder.mutation<IExercise, ICreateExerciseRequest>({
      query: ({ token, body }) => ({
        url: `${API_PATH.EXERCISES}`,
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

export const { useCreateExerciseMutation } = mainApiEndpoint;
