// import { API_PATH } from '../../../constants/ApiBaseUrl';
// import { ISignInRequest } from '../../../../interfaces/requests/signin';
// import { ISignInResponse } from '../../../../interfaces/responses/signin';
import { API_PATH } from '@/constants/ApiBaseUrl';
import { ISignInRequest } from '@/interfaces/requests/signin';
import { ISignInResponse } from '@/interfaces/responses/signin';
import { mainApi } from '../MainApiRouter.api';

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
