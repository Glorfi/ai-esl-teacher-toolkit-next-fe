import { mainApi } from '@/shared';
import { API_PATH } from '@/shared';
import { ISentence } from '@/entities/sentence';
import { IUpdateSentenceRequest } from '@/features/sentence/update-sentence/model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    updateSentence: builder.mutation<ISentence, IUpdateSentenceRequest>({
      query: ({ token, id, body }) => ({
        url: `${API_PATH.SENTENCES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useUpdateSentenceMutation } = mainApiEndpoint;
