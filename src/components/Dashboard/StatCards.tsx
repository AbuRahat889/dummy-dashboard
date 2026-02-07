"use client";
import { cn } from "@/lib/utils";
import React from "react";
// import restaurant from "@/assets/icon/restaurant.svg";
// import facility from "@/assets/icon/facility.svg";
// import wallet from "@/assets/icon/wallet-add-02.svg";
// import monthWallet from "@/assets/icon/wallet.svg";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  bg?: string;
}

export function StatCard({  title, value, bg }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-5 flex items-center gap-10 rounded-[12px]  ",
        bg ? bg : "bg-white"
      )}
    >
   

      <div>
        <p className="text-white text-sm md:text-xl font-medium">{title}</p>
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <p className="text-base md:text-2xl font-semibold text-white">
            {title === "Total Revenue" ? "$" : ""} {' '} {value}
          </p>
        </div>
      </div>
      {/* <div className="text-sm font-normal border border-borderColor rounded-full px-4 py-1 w-48">
        <h1>
          <span className="text-primaryColor font-semibold">+12%</span> vs last
          month
        </h1>
      </div> */}
    </div>
  );
}
