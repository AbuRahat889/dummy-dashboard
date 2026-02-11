import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const FoodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all product
    getAllProducts: build.query({
      query: (filters) => ({
        url: `/products`,
        method: "GET",
        params: { ...filters },
      }),
      providesTags: ["Products"],
    }),

    //create product
    createProducts: build.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // //update product
    updateProducts: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    //get single product
    getSingleProducts: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // delete product
    deleteProducts: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductsQuery,
  useCreateProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
} = FoodApi;
export default FoodApi;
