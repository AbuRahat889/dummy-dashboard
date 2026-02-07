import React from "react";

export default function CategorySk() {
  return (
    <div className="flex items-center flex-wrap gap-10">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg shadow-cardboxshadow bg-white w-44 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-24 bg-gray-200 rounded-t-lg" />

          {/* Title Skeleton */}
          <div className="px-3 mt-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="bg-gray-200 h-8 w-8 rounded-full" />
            <div className="bg-gray-200 h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
