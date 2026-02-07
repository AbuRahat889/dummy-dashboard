import React from "react";
import notFound from "@/assets/NoData.gif";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-white h-full w-full">
      <div className="w-full h-[500px] ">
        <Image
          src={notFound}
          alt="not found"
          height={500}
          width={900}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
