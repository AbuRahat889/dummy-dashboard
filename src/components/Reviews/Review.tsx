"use client";

import profileImage from "@/assets/profile.jpg";
import Image from "next/image";
import { useState } from "react";
import { MediaButton } from "../ui/icon";
import Pagination from "../ui/Pagination";

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
const dummyReviews: ReviewType[] = [
  {
    id: "1",
    user: { fullName: "John Doe", profileImage: "" },
    product: { name: "Burger Deluxe", price: 12.99 },
    review: "Delicious burger, loved it!",
    rating: 5,
    createdAt: "2026-01-20T10:00:00Z",
    status: "Pending",
  },
  {
    id: "2",
    user: { fullName: "Jane Smith", profileImage: "" },
    product: { name: "Cheese Pizza", price: 15.5 },
    review: "Good taste, but a bit oily.",
    rating: 4,
    createdAt: "2026-01-18T14:30:00Z",
    status: "Approved",
  },
  {
    id: "3",
    user: { fullName: "Mike Johnson", profileImage: "" },
    product: { name: "Fried Chicken", price: 10.75 },
    review: "Perfectly crispy and juicy.",
    rating: 5,
    createdAt: "2026-01-17T09:15:00Z",
    status: "Rejected",
  },
  {
    id: "4",
    user: { fullName: "Emily Brown", profileImage: "" },
    product: { name: "Pasta Alfredo", price: 14.25 },
    review: "Too creamy for my taste.",
    rating: 3,
    createdAt: "2026-01-16T12:45:00Z",
    status: "Pending",
  },
];

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState(dummyReviews);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const currentItems = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStatusChange = (id: string, status: ReviewType["status"]) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status } : r));
    setReviews(updated);
  };

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
            <th className="py-4 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 ? (
            currentItems.map((info, index) => (
              <tr
                key={info.id}
                className="text-sm text-textColor font-normal bg-white rounded-full hover:bg-red-100"
              >
                {/* Index */}
                <td className="py-2 px-4 w-7">{index + 1}</td>

                {/* User Details */}
                <td className="py-2 px-4 flex items-center">
                  <Image
                    src={info.user.profileImage || profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <span className="font-semibold truncate">
                    {info.user.fullName}
                  </span>
                </td>

                {/* Product info */}
                <td className="py-2 px-4">{info.product.name}</td>

                {/* Review text */}
                <td className="py-2 px-4 text-secondaryColor truncate">
                  {info.review}
                </td>

                {/* Product Price */}
                <td className="py-2 px-4 text-secondaryColor">
                  ${info.product.price}
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
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
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
