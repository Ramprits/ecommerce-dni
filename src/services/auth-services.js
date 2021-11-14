import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "constants/helper";

export const authApi = createApi({
  reducerPath: "auth_service",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.dev }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({ url: `auth/local`, method: "POST", body: user }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({ url: `auth/local/register`, method: "POST", body: user }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
