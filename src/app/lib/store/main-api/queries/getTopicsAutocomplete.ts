import { IGetTopicsAutoCompleteRequest } from '@/interfaces/requests/getTopicsAutocomplete';

import { mainApi } from '../../../../../shared/api/MainApiRouter.api';
import { ITopic } from '@/interfaces/topic';
import { API_PATH } from '@/constants/ApiBaseUrl';

const getTopicsAutocomplete = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopicsAutocomplete: builder.query<
      ITopic[],
      IGetTopicsAutoCompleteRequest
    >({
      query: ({ token, name }) => ({
        url: `${API_PATH.TOPICS_AUTOCOMPLETE}${name}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
      keepUnusedDataFor: 3,
    }),
  }),
});

export const { useLazyGetTopicsAutocompleteQuery } = getTopicsAutocomplete;
