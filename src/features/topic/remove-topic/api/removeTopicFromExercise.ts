import { API_PATH } from '@/shared';
import { mainApi } from '@/shared';
import { IRemoveTopicFromExerciseRequest } from '@/features/topic/remove-topic/model/types';
import { IExercise } from '@/entities/exercise';

const removeTopicFromExercise = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    removeTopicFromExercise: builder.mutation<
      IExercise,
      IRemoveTopicFromExerciseRequest
    >({
      query: ({ token, exerciseId, topicId }) => ({
        url: `${API_PATH.EXERCISES}/${exerciseId}${API_PATH.TOPICS}/${topicId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useRemoveTopicFromExerciseMutation } = removeTopicFromExercise;
