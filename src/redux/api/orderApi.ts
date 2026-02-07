import { baseApi } from "./baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all bookings with pagination
    getAllOrders: build.query({
      query: ({ page, limit, filter }) => ({
        url: `/orders/all-orders`,
        method: "GET",
        params: {
          page,
          limit,
          filter,
        },
      }),
      providesTags: ["orders"],
    }),

    // Update booking status
    updateOrders: build.mutation({
      query: (data) => ({
        url: `/orders/update-order-status`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrdersMutation } = OrderApi;
export default OrderApi;
