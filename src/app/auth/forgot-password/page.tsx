"use client";

import Image from "next/image";
import image from "@/assets/logo.jpg";
import logo2 from "@/assets/logo.jpg";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { useAdminLoginMutation } from "@/redux/api/auth";
const ForgotPassword = () => {
  const router = useRouter();
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

  const [loginFN, { isLoading }] = useAdminLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await loginFN(data);
      if (res?.data?.success) {
        Cookies.set("token", res?.data?.data?.accessToken);
        dispatch(
          setUser({
            token: res?.data?.data?.accessToken,
            user: res?.data?.data,
            isAuthenticated: true,
          })
        );
        toast.success("login successfully!");
        router.push("/auth/otp");
      } else {
        const errorMessage =
          (res?.error &&
            "data" in res.error &&
            (res.error.data as any)?.message) ||
          (res?.error &&
            "message" in res.error &&
            (res.error as any).message) ||
          "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error as string || "An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full shadow-2xl container mx-auto">
      <ToastContainer />
      {/* Left Section */}
      <div className="hidden md:block w-full lg:w-1/2">
        <Image
          src={image}
          alt="Fishing Trip"
          className="h-full w-full lg:h-[100vh] object-fill"
        />
      </div>

      {/* Right Section */}
      <div className="relative py-12 flex flex-col justify-between w-full lg:w-1/2 ml-0 lg:ml-10">
        <Link href={"/"}>
          <Image
            src={logo2}
            alt="logo"
            height={200}
            width={200}
            className="h-24 w-80"
          />
        </Link>

        <div className="text-start w-full flex flex-col justify-between px-2 md:px-8">
          <div>
            <h2 className="text-[40px] text-[#171717] font-bold leading-normal my-2">
              Forgot Password
            </h2>
            <p className="text-base text-[#6C7278] font-medium  mb-6">
              No worries! Enter your email address below and <br /> we will send
              you a code to reset password.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pt-6 space-y-4 "
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

            <button
              type="submit"
              className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white"
            >
              {isLoading ? <Loader /> : "Send Reset Code"}
            </button>
          </form>
        </div>

        <div className="">
          <h1 className="text-textColor font-medium text-sm md:text-base text-center">
            © {new Date().getFullYear()} AnestheLink. All rights reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
