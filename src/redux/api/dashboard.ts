import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllDashboardInfo: build.query({
      query: () => ({
        url: `/dashboard/overview`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),

    getTotalEarning: build.query({
      query: (year) => ({
        url: `/dashboard/total-earning`,
        method: "GET",
        params: year,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardInfoQuery, useGetTotalEarningQuery } =
  DashboardApi;
export default DashboardApi;
