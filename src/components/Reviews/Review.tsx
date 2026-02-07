"use client";
import profileImage from "@/assets/profile.jpg";
import { useGetAllReviewsQuery } from "@/redux/api/reviewsApi";
import Image from "next/image";
import { useState } from "react";
import FullTableSkeleton from "../Skletone/Table";
import Pagination from "../ui/Pagination";
import { MediaButton } from "../ui/icon";
const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userList, isLoading } = useGetAllReviewsQuery({
    page: currentPage,
    limit: 15,
  });

  const totalPages = userList?.data?.meta?.totalPage || 1;
  const currentItems = userList?.data?.data?.length ? userList.data.data : [];

  if (isLoading) {
    return <FullTableSkeleton />;
  }

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="w-full rounded-xl">
        <thead className="border-b border-borderColor rounded-full bg-white">
          <tr className="text-[#667085] text-left text-sm font-semibold">
            <th className="py-4 px-4">#</th>
            <th className="py-4 px-4">User</th>
            <th className="py-4 px-4">Product</th>
            <th className="py-4 px-4">Review</th>
            <th className="py-4 px-4">Price</th>
            <th className="py-4 px-4">Created At</th>
            <th className="py-4 px-4">Rating</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 ? (
            currentItems.map((info: any, index: number) => (
              <tr
                key={info.id}
                className="text-sm text-textColor font-normal bg-white rounded-full hover:bg-red-100"
              >
                {/* Index */}
                <td className="py-2 px-4 w-7">{index + 1}</td>

                {/* User Details */}
                <td className="py-2 px-4 flex items-center">
                  <Image
                    src={info?.user?.profileImage || profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <span className="font-semibold truncate">
                    {info?.user?.fullName || "N/A"}
                  </span>
                </td>
                {/* Product info */}
                <td className="py-2 px-4 ">{info?.product?.name}</td>

                {/* Review text */}
                <td className="py-2 px-4 text-secondaryColor truncate">
                  {info?.review}
                </td>

                {/* Product Price */}
                <td className="py-2 px-4 text-secondaryColor">
                  ${info?.product?.price}
                </td>

                {/* Created At */}
                <td className="py-2 px-4 text-secondaryColor">
                  {new Date(info?.createdAt).toLocaleDateString()}
                </td>

                {/* Rating */}
                <td className="py-2 px-4 text-secondaryColor">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: info?.rating }).map((_, idx) => (
                      <MediaButton key={idx} type="star" />
                    ))}

                    {info?.rating}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-4 text-gray-500 bg-white"
              >
                Review not found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Review;
