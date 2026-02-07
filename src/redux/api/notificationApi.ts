import { baseApi } from "./baseApi";

const NotificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // update users status
    sendNotificationToAll: build.mutation({
      query: (data) => ({
        url: `/notifications/send-notifications`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const { useSendNotificationToAllMutation } = NotificationApi;
NotificationApi;
export default NotificationApi;
