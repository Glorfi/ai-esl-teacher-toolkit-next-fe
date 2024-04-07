import { IAddTopicToExerciseRequest } from '@/interfaces/requests/addTopicToExercise';

import { mainApi } from '../MainApiRouter.api';
import { IExercise } from '@/interfaces/exercise';
import { API_PATH } from '@/constants/ApiBaseUrl';

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
