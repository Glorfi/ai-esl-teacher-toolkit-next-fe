import { API_PATH } from '@/constants/ApiBaseUrl';
import { IUserData } from '@/entities/user/model/userData';
import { mainApi } from '../../../../shared/api/MainApiRouter.api';

const AuthEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUserData, string | null>({
      query: (token) => ({
        url: API_PATH.CURRENT_USER,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery } =
  AuthEndpoint;
