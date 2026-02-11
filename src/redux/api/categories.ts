import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const CategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all content
    getAllCategories: build.query({
      query: ({ page, limit }) => ({
        url: `/category`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["categories"],
    }),

    //create category
    createCategory: build.mutation({
      query: (formData) => ({
        url: `/category`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),
    //get single content
    getSingleCategories: build.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),

    //update category
    updateCategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    // **********************

    //delete category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetSingleCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = CategoriesApi;
export default CategoriesApi;
