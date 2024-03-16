import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGptResponse } from '../../interfaces/responses/gpt-api';
import { IGptRequest } from '../../interfaces/requests/gpt-api';

const apiKeyEncoded = import.meta.env.VITE_OPENAI_API_KEY;
const apiKeyPassword = import.meta.env.VITE_OPENAI_API_KEY_PASSWORD;

import CryptoJS from 'crypto-js'

export const gptApi = createApi({
  reducerPath: 'gpt',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openai.com/v1' }),
  endpoints: (builder) => ({
    completeChat: builder.mutation<IGptResponse, IGptRequest>({
      query: ({ content }) => ({
        url: '/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + CryptoJS.AES.decrypt(apiKeyEncoded, apiKeyPassword).toString(CryptoJS.enc.Utf8),
        },
        body: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content }],
          temperature: 1,
          max_tokens: 500,
        },
      }),
    }),
  }),
});

export const { useCompleteChatMutation } = gptApi;
