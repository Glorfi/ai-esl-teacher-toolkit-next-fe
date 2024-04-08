import { API_PATH } from '@/constants/ApiBaseUrl';
import { IExercise } from '@/interfaces/exercise';
import { mainApi } from '../../../../../shared/api/MainApiRouter.api';
import { IRemoveTopicFromExerciseRequest } from '@/interfaces/requests/removeTopicFromExercise';

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
