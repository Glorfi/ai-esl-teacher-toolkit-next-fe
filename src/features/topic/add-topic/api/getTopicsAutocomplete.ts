import { ITopic } from '@/entities/topic/model/types';

import { mainApi } from '@/shared';

import { API_PATH } from '@/shared';
import { IGetTopicsAutoCompleteRequest } from '../model/types';

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
