import { mainApi } from '@/shared';
import { API_PATH } from '@/shared'
import { ISignUPResponse, ISignUPRequest } from '../model';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<ISignUPResponse, ISignUPRequest>({
      query: (body) => ({
        url: API_PATH.SIGN_UP,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = mainApiEndpoint;
