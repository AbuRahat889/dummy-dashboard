import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //login users
    adminLogin: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //get me
    getMe: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useAdminLoginMutation, useGetMeQuery } = AuthApi;
export default AuthApi;
