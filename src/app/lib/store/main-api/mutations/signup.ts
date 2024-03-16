import { API_PATH } from '../../../constants/ApiBaseUrl';
import { ISignInRequest } from '../../../interfaces/requests/signin';
import { ISignUPRequest } from '../../../interfaces/requests/signup';
import { ISignInResponse } from '../../../interfaces/responses/signin';
import { ISignUPResponse } from '../../../interfaces/responses/signup';
import { mainApi } from '../MainApiRouter.api';

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
