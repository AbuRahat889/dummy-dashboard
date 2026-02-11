"use client";

import defaultImage from "@/assets/placeholder.webp";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { MediaButton } from "../ui/icon";
import Modal from "../ui/modal";
import AddCategory from "./AddCategory";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "@/redux/api/categories";
import { handleApiResponse } from "@/lib/handleApiResponse";

interface CategoryCardProps {
  categories: {
    id: string;
    categoryName: string;
    categoryImage: string;
  };
}

export default function CategoryCard({ categories }: CategoryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteFN] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("Deleting...");
          try {
            const res = await handleApiResponse(
              deleteFN,
              id,
              "Category Deleted Successfully",
            );
            toast.dismiss(toastId);
            if (res.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your category has been deleted.",
                icon: "success",
              });
            }
          } catch (error) {
            toast.dismiss(toastId);
            toast.error(
              (typeof error === "string" && error) ||
                (error && typeof error === "object" && "message" in error
                  ? (error as any).message
                  : undefined) ||
                "Failed to delete Category",
            );
          }
        }
      });
    } catch (error) {
      toast.error(
        (typeof error === "string" && error) ||
          (error && typeof error === "object" && "message" in error
            ? (error as any).message
            : undefined) ||
          "Failed to delete car",
      );
    }
  };
  return (
    <div>
      <div
        className={cn(
          "rounded-lg shadow-cardboxshadow bg-white w-full md:w-44 ",
        )}
      >
        <div className="w-full">
          <Image
            src={categories?.categoryImage || defaultImage}
            alt="category"
            width={500}
            height={500}
            className="h-24 w-24 mx-auto mb-2 rounded-t-lg"
          />
        </div>
        <p className="text-center text-[#151B27] text-base font-semibold leading-[150%]">
          {categories?.categoryName}
        </p>
        <div className="flex items-center justify-center gap-4 py-2">
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center"
          >
            <MediaButton type="edit" />
          </div>
          <div
            onClick={() => handleDelete(categories?.id)}
            className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center cursor-pointer"
          >
            <MediaButton type="delete" />
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        className="bg-white lg:w-[30%]"
      >
        <AddCategory
          setIsModalOpen={setIsModalOpen}
          categorieId={categories?.id}
        />
      </Modal>
    </div>
  );
}
