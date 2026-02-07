"use client";

import { useState } from "react";
import { SearchBar } from "../ui/searchBar";
import OrderTable from "./OrderTable";
import Pagination from "../ui/Pagination";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";

export default function OrderList() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(1);

  const { data } = useGetAllOrdersQuery({
    filter:
      activeTab === 1 ? "PENDING" : activeTab === 2 ? "PROCESSING" : undefined,
    page: currentPage,
    limit: 15,
  });

  const totalPages = data?.data?.meta?.totalPage;
  // const currentItems = data?.data?.data || [];
  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const items = [
    {
      key: "1",
      label: "Pending",
      children: (
        <OrderTable
        // currentItems={currentItems}
        // isLoading={isLoading}
        // isFetching={isFetching}
        // isError={isError}
        />
      ),
    },
    {
      key: "2",
      label: "Processing",
      children: (
        <OrderTable
        // currentItems={currentItems}
        // isLoading={isLoading}
        // isFetching={isFetching}
        // isError={isError}
        />
      ),
    },
    {
      key: "3",
      label: "History",
      children: (
        <OrderTable
        // currentItems={currentItems}
        // isLoading={isLoading}
        // isFetching={isFetching}
        // isError={isError}
        />
      ),
    },
  ];

  return (
    <div className="w-[98%] h-full">
      <div className="flex items-center justify-between gap-5 mb-4">
        <SearchBar searchValue={searchValue} onSearchChange={onSearchChange} />
      </div>

      <div className="flex flex-col lg:flex-row items-end lg:items-center justify-end lg:justify-between gap-0 lg:gap-5 ">
        {/* Tabs */}
        <ul className="flex items-center w-full   relative bg-[#f5f7f9] dark:bg-slate-800 rounded-full p-3 ">
          {/* Animated background */}
          <div
            className={`absolute h-[85%] w-[520px] bg-primaryColor rounded-full transition-all duration-500 ease-in-out mx-2
              ${activeTab === 1 ? "left-0" : ""}
              ${activeTab === 2 ? "left-[520px]" : ""}
              ${activeTab === 3 ? "right-[0px]" : ""}
              `}
          ></div>

          {items.map((item, index) => (
            <li
              key={index}
              className={`${
                item.key === activeTab.toString()
                  ? "text-white"
                  : "text-textColor"
              } px-5 md:px-10 py-2 z-10 transition duration-300 cursor-pointer truncate  w-full text-center`}
              onClick={() => {
                setActiveTab(Number(item.key));
                setCurrentPage(1);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Show active tab content */}
      <div className="pt-5 text-center pb-5">
        {items.find((item) => item.key === activeTab.toString())?.children}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
