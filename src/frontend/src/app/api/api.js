import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO
const API_BASE_URL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: "users" }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = api;
