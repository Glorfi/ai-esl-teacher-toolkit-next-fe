import { mainApi } from '@/shared';
import { API_PATH } from '@/shared';
import {
  IAuthMagicRequest,
  ILoginMagicRequest,
  ISignInResponse,
} from '../model';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    magicLogin: builder.mutation<ISignInResponse, ILoginMagicRequest>({
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

export const { useMagicLoginMutation } = mainApiEndpoint;
