import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "constants/helper";

export const supportApi = createApi({
  reducerPath: "support",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.dev,
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState().auth;
      if (user.jwt) {
        headers.set("authorization", `Bearer ${user.jwt}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSupport: builder.mutation({
      query: (support) => ({ url: `supports`, method: "POST", body: support }),
    }),
  }),
});

export const { useCreateSupportMutation } = supportApi;
