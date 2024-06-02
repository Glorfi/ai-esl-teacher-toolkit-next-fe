import { mainApi } from '@/shared';
import { API_PATH } from '@/shared';
import { IAuthMagicRequest, ISignInResponse } from '../model';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    magicAuth: builder.mutation<ISignInResponse, IAuthMagicRequest>({
      query: (body) => ({
        url: API_PATH.SIGN_IN_MAGIC,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useMagicAuthMutation } = mainApiEndpoint;
