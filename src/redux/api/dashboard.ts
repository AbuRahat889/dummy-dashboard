import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllDashboardInfo: build.query({
      query: () => ({
        url: `/users/dashboard-data`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),

    getDashboardPerformance: build.query({
      query: (year) => ({
        url: `/users/yearly-graph-data`,
        method: "GET",
        params: year,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardInfoQuery, useGetDashboardPerformanceQuery } =
  DashboardApi;
export default DashboardApi;
