import { API_PATH } from '@/constants/ApiBaseUrl';
import { IExercise } from '@/interfaces/exercise';
import { IGenerateExerciseRequest } from '@/interfaces/requests/generateExercise';
import { mainApi } from '../MainApiRouter.api';

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
