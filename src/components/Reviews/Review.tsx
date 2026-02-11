"use client";

import {
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/api/reviewsApi";
import { useState } from "react";
import { MediaButton } from "../ui/icon";
import Pagination from "../ui/Pagination";
import { handleApiResponse } from "@/lib/handleApiResponse";

interface ReviewType {
  id: string;
  user: {
    fullName: string;
    profileImage?: string;
  };
  product: {
    name: string;
    price: number;
  };
  review: string;
  rating: number;
  createdAt: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Dummy data

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetAllReviewsQuery({ page: currentPage, limit: 20 });
  console.log(data?.data);

  const currentItems = data?.data?.data || [];
  const totalReviews = data?.data?.meta?.totalPages || 0;

  const [updateFN, { isLoading }] = useUpdateReviewStatusMutation();
  const handleStatusChange = async (
    id: string,
    status: ReviewType["status"],
  ) => {
    console.log(status);
    await handleApiResponse(
      updateFN,
      { id, status: status },
      "Review status updated successfully",
    );
  };

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="w-full rounded-xl">
        <thead className="border-b border-borderColor rounded-full bg-white">
          <tr className="text-[#667085] text-left text-sm font-semibold">
            <th className="py-4 px-4">#</th>
            <th className="py-4 px-4">User</th>
            <th className="py-4 px-4">Product</th>
            <th className="py-4 px-4">Review Title</th>
            <th className="py-4 px-4">Comment</th>
            <th className="py-4 px-4">Created At</th>
            <th className="py-4 px-4">Rating</th>
            <th className="py-4 px-4">Status</th>
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
                  <span className="font-semibold truncate">
                    {info.userName}
                  </span>
                </td>

                {/* Product info */}
                <td className="py-2 px-4">{info.product?.productName}</td>

                {/* Review text */}
                <td className="py-2 px-4 text-secondaryColor truncate">
                  {info.title}
                </td>

                {/* Comment */}
                <td className="py-2 px-4 text-secondaryColor">
                  {info.comment}
                </td>

                {/* Created At */}
                <td className="py-2 px-4 text-secondaryColor">
                  {new Date(info.createdAt).toLocaleDateString()}
                </td>

                {/* Rating */}
                <td className="py-2 px-4 text-secondaryColor">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: info.rating }).map((_, idx) => (
                      <MediaButton key={idx} type="star" />
                    ))}
                    {info.rating}
                  </div>
                </td>

                {/* Status */}
                <td className="py-2 px-4">
                  <select
                    value={info.status}
                    onChange={(e) =>
                      handleStatusChange(
                        info.id,
                        e.target.value as ReviewType["status"],
                      )
                    }
                    className={`border rounded-md px-2 py-1 text-sm
                      ${
                        info.status === "PENDING"
                          ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                          : info.status === "APPROVED"
                            ? "bg-green-100 border-green-400 text-green-800"
                            : "bg-red-100 border-red-400 text-red-800"
                      }`}
                  >
                    <option value="">
                      {isLoading ? "Loading..." : info?.status}
                    </option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 text-gray-500 bg-white"
              >
                Review not found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalReviews}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Review;
