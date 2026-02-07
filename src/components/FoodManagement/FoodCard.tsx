"use client";

import fallbackCarImage from "@/assets/placeholder.webp";
import Image from "next/image";
import Link from "next/link";
import { MediaButton } from "../ui/icon";

interface CarCardProps {
  content: any;
}

export default function FoodCard({ content }: CarCardProps) {
  const handleDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      {/* Image */}
      <div className="relative">
        <Image
          src={fallbackCarImage}
          alt="product image"
          className="object-fill h-48 w-full"
          height={500}
          width={500}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        <div className="">
          <h1 className="text-xl font-semibold text-textColor hover:underline leading-normal line-clamp-1 truncate">
            {content?.name}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base text-textColor leading-normal">
            Total Rating:{" "}
          </h1>
          <span className="text-secondaryColor">{content?.totalRaters}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base text-textColor leading-normal">
            Average Rating:{" "}
          </h1>
          <span className="text-secondaryColor">{content?.avgRating}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base text-textColor leading-normal">
            Quantity:{" "}
          </h1>
          <span className="text-secondaryColor">{content?.quantity}</span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f77902] leading-normal">
            ${content?.price}
          </h1>

          <div className="flex gap-2">
            <Link
              href={`/add-product?type=Edit&id=${content?.id}`}
              className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center"
            >
              <MediaButton type="edit" />
            </Link>
            <div
              onClick={() => handleDelete(content?.id)}
              className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center cursor-pointer"
            >
              <MediaButton type="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
