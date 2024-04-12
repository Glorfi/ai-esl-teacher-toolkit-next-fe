import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../constants/ApiBaseUrl';

export const mainApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH.BASE,
  }),
  endpoints: () => ({}),
});
