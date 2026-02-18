import { baseApi } from "./baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all bookings with pagination
    getAllOrders: build.query({
      query: ({ page, limit, status, search }) => ({
        url: `/orders`,
        method: "GET",
        params: {
          page,
          limit,
          status,
          search,
        },
      }),
      providesTags: ["orders"],
    }),
    // get single order details
    getSingleOrder: build.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
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

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrdersMutation,
} = OrderApi;
export default OrderApi;
