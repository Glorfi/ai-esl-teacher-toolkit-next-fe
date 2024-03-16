import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IExercise } from '../../../interfaces/exercise';
import { IDeleteExerciseRequest } from '../../../interfaces/requests/deleteExercise';
import { mainApi } from '../MainApiRouter.api';

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
