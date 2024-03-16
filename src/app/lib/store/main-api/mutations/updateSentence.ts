import { API_PATH } from '../../../constants/ApiBaseUrl';
import { IUpdateSentenceRequest } from '../../../interfaces/requests/updateSentence';
import { ISentence } from '../../../interfaces/sentence-with-input';
import { mainApi } from '../MainApiRouter.api';

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
