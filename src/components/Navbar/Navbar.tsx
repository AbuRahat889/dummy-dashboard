"use client";

import Image from "next/image";
import logo from "@/assets/logo2.png";
import profileImage from "@/assets/profile.jpg";
import { useGetMeQuery } from "@/redux/api/auth";

export default function Navbar() {
  const { data } = useGetMeQuery("");

  return (
    <nav
      className={`h-24 flex px-2 md:px-5  bg-[#efa342] w-full rounded-b-[32px]`}
    >
      <div className="flex justify-between w-[95%] mx-auto">
        <div className="hidden md:flex items-center ">
          <Image
            src={logo}
            alt="Logo"
            height={200}
            width={200}
            className="object-contain w-full h-full "
            priority
          />
        </div>
        <div></div>

        <div className=" flex items-center gap-2">
          <Image
            src={data?.data?.profileImage || profileImage}
            alt="profile image"
            height={200}
            width={200}
            className="h-12 w-12 rounded-full border "
            priority
          />
          <div>
            <h1 className="text-white text-sm md:text-base font-medium">
              {data?.data?.fullName}
            </h1>
            <h1 className="text-white text-sm font-normal">
              {data?.data?.email}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
