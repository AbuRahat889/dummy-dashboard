"use client";

import Image from "next/image";
import image from "@/assets/logo.jpg";
import logo2 from "@/assets/logo.jpg";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { useRef, useState } from "react";
import { useAdminLoginMutation } from "@/redux/api/auth";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { handleSubmit } = useForm(); // ✅ FIXED

  const [autoOtp, setAutoOtp] = useState("");
  const navigationInputs = useRef<any[]>([]);

  const length = 6;

  const onChange = (value: string) => {
    setAutoOtp(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newOtp = [
      ...navigationInputs.current.map((input) => input?.value || ""),
    ];

    // Ensure only a single digit is entered per box
    if (/^[0-9]$/.test(value) && value.length === 1) {
      newOtp[index] = value;
      onChange(newOtp.join(""));

      if (index < length - 1) {
        navigationInputs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      onChange(newOtp.join(""));
    } else {
      e.target.value = value.slice(0, 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    const newOtp = [
      ...navigationInputs.current.map((input) => input?.value || ""),
    ];

    for (let i = 0; i < pastedData.length && i < length; i++) {
      newOtp[i] = pastedData[i];
      if (navigationInputs.current[i]) {
        navigationInputs.current[i].value = pastedData[i];
      }
    }
    onChange(newOtp.join(""));

    const focusIndex = Math.min(pastedData.length, length - 1);
    navigationInputs.current[focusIndex]?.focus();
  };

  const handleKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !navigationInputs.current[index]?.value &&
      index > 0
    ) {
      navigationInputs.current[index - 1]?.focus();
    }
  };

  const [loginFN, { isLoading }] = useAdminLoginMutation();

  const onSubmit = async () => {
    try {
      const res = await loginFN({ otp: autoOtp });
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
        router.push("/auth/new-password");
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
              Verify account
            </h2>
            <p className="text-base text-[#6C7278] font-medium">
              The code has been sent to johndoe@gmail.com.
            </p>
            <p className="text-base text-[#6C7278] font-medium mb-6">
              Enter the code to verify your account.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full pt-6 space-y-4"
          >
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    navigationInputs.current[index] = el;
                  }}
                  //   inputMode="numeric"
                  className="p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8]"
                  placeholder="0"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeydown(e, index)}
                  onPaste={(e) => handlePaste(e)}
                  //   type="number"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white"
            >
              {isLoading ? <Loader /> : "Verify account"}
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
