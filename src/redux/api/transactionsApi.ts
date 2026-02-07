import { baseApi } from "./baseApi";

const TransactionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all bookings with pagination
    getAllTransactions: build.query({
      query: ({ page, limit }) => ({
        url: `/orders/all-transaction`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["transactions"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = TransactionsApi;
export default TransactionsApi;
