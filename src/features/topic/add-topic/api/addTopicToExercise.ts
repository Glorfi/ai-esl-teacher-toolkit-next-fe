import { IExercise } from '@/entities/exercise';

import { mainApi } from '@/shared';
import { API_PATH } from '@/shared';
import { IAddTopicToExerciseRequest } from '../model/types';

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
