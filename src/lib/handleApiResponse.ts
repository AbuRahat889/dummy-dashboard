// utils/handleApiResponse.ts

import { toast } from "react-toastify";

export const handleApiResponse = async <T>(
  apiFn: (data: T) => Promise<any>,
  data: T,
  successMessage = "Operation successful!",
  isToast?: boolean,
) => {
  try {
    const res = await apiFn(data);

    if (res?.data?.success) {
      if (isToast) {
        toast.success(res?.data?.message || successMessage);
      }
      return { success: true, data: res.data };
    } else {
      const errorMessage =
        (res?.error &&
          "data" in res.error &&
          (res.error.data as any)?.message) ||
        (res?.error && "message" in res.error && (res.error as any).message) ||
        "An error occurred";

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error: any) {
    const fallbackError =
      error?.message || "Something went wrong. Please try again.";

    toast.error(fallbackError);

    return { success: false, error: fallbackError };
  }
};

// const res = await handleApiResponse(loginFN, data, "Login successful!");
