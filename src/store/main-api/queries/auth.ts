import { API_PATH } from "@/constants/ApiBaseUrl";
import { IUserData } from "@/interfaces/userData";
import { mainApi } from "../MainApiRouter.api";


const mainApiEndpoint = mainApi.injectEndpoints({
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
  mainApiEndpoint;
