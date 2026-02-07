import { baseApi } from "./baseApi";

const ReviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all userss with optional filter
    getAllReviews: build.query({
      query: ({ page, limit }) => ({
        url: `/reviews/all-reviews`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useGetAllReviewsQuery } = ReviewsApi;
export default ReviewsApi;
