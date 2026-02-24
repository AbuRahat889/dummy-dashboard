"use client";

import image from "@/assets/loginImage.jpg";
import logo2 from "@/assets/logo.png";
import Loader from "@/components/ui/Loader";
import { useAdminLoginMutation } from "@/redux/api/auth";
import { setUser } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const [loginFN, { isLoading }] = useAdminLoginMutation();
  const onSubmit = async (data: any) => {
    try {
      const res = await loginFN(data).unwrap();

      if (res?.data?.role === "RESTRICTED_ADMIN") {
        return toast.error("You are not authorized to access this page.");
      }

      if (res?.success) {
        toast.success(res.message || "Login successful");
        Cookies.set("token", res?.data?.accessToken);
        Cookies.set("role", res?.data?.role);

        dispatch(
          setUser({
            user: res?.data,
            token: res?.data?.accessToken,
            isAuthenticated: true,
          }),
        );
        window.location.replace("/");
      } else {
        toast.error(res?.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      let errorMsg = "Login failed. Please try again.";

      if (err?.data?.message) {
        errorMsg = err.data.message;
      } else if (err?.error) {
        errorMsg = err.error;
      } else if (err?.message) {
        errorMsg = err.message;
      }

      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full ">
      <ToastContainer />
      {/* Left Section */}
      <div className="hidden md:flex w-full justify-center items-center">
        <Image
          src={image}
          alt="wapigo"
          className="h-full w-full  "
          height={800}
          width={800}
          priority
        />
      </div>

      {/* Right Section */}
      <div className="relative py-12 flex flex-col gap-10 w-full  px-32 ">
        <Link href={"/"} className="flex justify-center ">
          <Image
            src={logo2}
            alt="logo"
            height={200}
            width={200}
            className=" rounded-full"
          />
        </Link>

        <div className="text-start w-full flex flex-col justify-between px-2 md:px-8">
          <div>
            <h2 className="text-4xl lg:text-[40px] text-[#171717] font-bold w-full">
              Welcome, Admin! Manage{" "}
              <span className="text-[#efa342] ">YanaMart </span> with Ease
            </h2>

            <p className="text-base text-[#6C7278] font-medium  mb-6 mt-4">
              Monitor business activity, sales user activity, user engagement,
              and platform performance.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pt-6 space-y-4"
          >
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`absolute left-3 px-1 transition-all bg-white text-base ${
                  isFocused.email || emailValue
                    ? "-top-3  text-[#acb5bb] px-8"
                    : "top-3 text-gray-400"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "email is required" })}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, email: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, email: false }))
                }
                className="w-full border-2 border-[#dce4e8] rounded-[10px] p-3 outline-none text-[#747474]"
                placeholder=" "
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-3 px-1 transition-all bg-white text-base ${
                  isFocused.password || passwordValue
                    ? "-top-3  text-[#acb5bb] px-8"
                    : "top-3 text-gray-400"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "password is required" })}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, password: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, password: false }))
                }
                className="w-full border-2 border-[#dce4e8] rounded-[10px] p-3 outline-none text-[#747474]"
                placeholder=" "
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 font-bold text-base py-3 rounded-full bg-primaryColor text-white"
            >
              {isLoading ? <Loader /> : "Log In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
