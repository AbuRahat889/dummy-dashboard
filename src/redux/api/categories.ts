import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const CategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all content
    getAllCategories: build.query({
      query: ({ page, limit }) => ({
        url: `/categories/all-category`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["categories"],
    }),

    //get single content
    getSingleCategories: build.query({
      query: (id) => ({
        url: `/categories/category/${id}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),

    //create category
    createCategory: build.mutation({
      query: (formData) => ({
        url: `/categories/create-category`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    //update category
    updateCategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `/categories/update-category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    //delete category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/delete-category/${id}`,
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
