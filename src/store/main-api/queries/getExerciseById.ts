import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IExercise } from '../../../interfaces/exercise';
import { mainApi } from '../MainApiRouter.api';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getExerciseById: builder.query<
      IExercise,
      { token?: string | null | undefined; id: string | undefined }
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
  mainApiEndpoint;
