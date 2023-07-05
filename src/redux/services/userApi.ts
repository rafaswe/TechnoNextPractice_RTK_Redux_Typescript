import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/UserType";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getData: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (res: User[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ["User"],
    }),
    getDataByID: builder.query<User, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getDataInLimit: builder.query<User[], number>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (res: User[]) => res.slice(0, 5),
      providesTags: ["User"],
    }),

    postData: builder.mutation<User, User>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetDataByIDQuery,
  useGetDataInLimitQuery,
  usePostDataMutation,
} = userApi;
