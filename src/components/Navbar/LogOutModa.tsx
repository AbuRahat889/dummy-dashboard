import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function LogOutModa() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/auth/login");
  };

  return (
    <div className="w-64 mx-auto space-y-3 mb-7">
      <div>
        <h1 className="text-4xl font-semibold text-textColor text-center">
          Log out?
        </h1>
        <p className="text-base text-[#6C7278] font-medium  mb-6 text-center py-3">
          You’ve been signed out safely. See you again soon!
        </p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <button
          type="submit"
          className="w-full font-bold text-base py-3 rounded-full border border-primaryColor text-primaryColor"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full  font-bold text-base py-3 rounded-full bg-primaryColor text-white"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
