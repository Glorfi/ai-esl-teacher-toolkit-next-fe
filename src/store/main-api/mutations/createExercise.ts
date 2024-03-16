import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IExercise } from '../../../interfaces/exercise';
import { ICreateExerciseRequest } from '../../../interfaces/requests/createExercise';
import { mainApi } from '../MainApiRouter.api';

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
