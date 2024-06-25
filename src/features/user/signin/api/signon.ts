import { mainApi } from '@/shared';
import { API_PATH } from '@/shared';
import {
  IAuthMagicRequest,
  ILoginMagicRequest,
  ISignInResponse,
} from '../model';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    magicSignOn: builder.mutation<ISignInResponse, ILoginMagicRequest>({
      query: (body) => ({
        url: API_PATH.MAGIC_AUTH,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useMagicSignOnMutation } = mainApiEndpoint;
