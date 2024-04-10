import { USERS_URL } from "../../constants";
import { LoginData, UserInfo } from "../../types";

import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginData>({
      query: (data) => ({
        url: USERS_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: USERS_URL + "/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<UserInfo, LoginData & { name: string }>({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
