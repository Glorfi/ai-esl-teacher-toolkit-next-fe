import { API_PATH } from '@/constants/ApiBaseUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH.BASE,
  }),
  endpoints: () => ({}),
});
