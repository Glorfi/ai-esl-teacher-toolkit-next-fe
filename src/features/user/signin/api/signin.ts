import { mainApi } from '@/shared/api/MainApiRouter.api';
import { API_PATH } from '@/constants/ApiBaseUrl';
import { ISignInRequest, ISignInResponse } from '../model';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body) => ({
        url: API_PATH.SIGN_IN,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = mainApiEndpoint;
