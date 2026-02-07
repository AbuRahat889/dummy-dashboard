import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all userss with optional filter
    getusersList: build.query({
      query: ({ search, page, limit }) => ({
        url: `/users/all-users`,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["users"],
    }),

    // update users status
    updateusersStatus: build.mutation<any, { usersId: string; status: string }>(
      {
        query: (usersId) => ({
          url: `/users/toggle-status/${usersId}`,
          method: "PATCH",
        }),
        invalidatesTags: ["users"],
      }
    ),
  }),
});

export const { useGetusersListQuery, useUpdateusersStatusMutation } = usersApi;
export default usersApi;
