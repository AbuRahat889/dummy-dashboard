import { baseApi } from "./baseApi";

const ReviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all userss with optional filter
    getAllReviews: build.query({
      query: ({ page, limit }) => ({
        url: `/products/reviews`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["reviews"],
    }),
    // update user status
    updateReviewStatus: build.mutation({
      query: ({ id, ...status }) => ({
        url: `/products/reviews/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useUpdateReviewStatusMutation } =
  ReviewsApi;
export default ReviewsApi;
