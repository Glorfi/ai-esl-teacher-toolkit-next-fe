import { IAddTopicToExerciseRequest } from '@/interfaces/requests/addTopicToExercise';
import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IExercise } from '../../../interfaces/exercise';
import { mainApi } from '../MainApiRouter.api';

const addTopicToExerciseEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addTopicToExercise: builder.mutation<IExercise, IAddTopicToExerciseRequest>(
      {
        query: ({ token, body }) => ({
          url: `${API_PATH.EXERCISES_TOPICS}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body,
        }),
      }
    ),
  }),
});

export const { useAddTopicToExerciseMutation } = addTopicToExerciseEndpoint;
