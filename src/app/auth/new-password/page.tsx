"use client";

import Image from "next/image";
import image from "@/assets/logo.jpg";
import logo2 from "@/assets/logo.jpg";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { useAdminLoginMutation } from "@/redux/api/auth";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isFocused, setIsFocused] = useState({
    password: false,
    confirmPassword: false, // ✅ added confirmPassword focus state
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword"); // ✅ renamed correctly

  const [loginFN, { isLoading }] = useAdminLoginMutation();

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

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
        router.push("/");
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
      toast.error((error as string) || "An error occurred during login.");
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
              Create New Password
            </h2>
            <p className="text-base text-[#6C7278] font-medium  mb-6">
              Please enter and confirm your new password. <br />
              You will need to login after you reset.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pt-6 space-y-4 "
          >
            {/* Password */}

            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-3 px-1 transition-all bg-white text-base ${
                  isFocused.password || passwordValue
                    ? "-top-3 text-[#acb5bb] px-8"
                    : "top-3 text-gray-400"
                }`}
              >
                New Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
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

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 px-1 transition-all bg-white text-base ${
                  isFocused.confirmPassword || confirmPasswordValue
                    ? "-top-3 text-[#acb5bb] px-8"
                    : "top-3 text-gray-400"
                }`}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                onFocus={() =>
                  setIsFocused((prev) => ({ ...prev, confirmPassword: true }))
                }
                onBlur={() =>
                  setIsFocused((prev) => ({ ...prev, confirmPassword: false }))
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white"
            >
              {isLoading ? <Loader /> : "Reset Password"}
            </button>
          </form>
        </div>

        <div>
          <h1 className="text-textColor font-medium text-sm md:text-base text-center">
            © {new Date().getFullYear()} AnestheLink. All rights reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
