"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categories";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import NotFound from "../ui/NotFound";
import Pagination from "../ui/Pagination";
import AddCategory from "./AddCategory";
import CategoryCard from "./CategoryCard";
import CategorySk from "../Skletone/CategorySk";

export const dummyCategories = [
  {
    id: "1",
    name: "Beverages",
    image: "", // You can leave empty to use default placeholder
  },
  {
    id: "2",
    name: "Snacks",
    image: "",
  },
  {
    id: "3",
    name: "Desserts",
    image: "",
  },
  {
    id: "4",
    name: "Fast Food",
    image: "",
  },
];

export default function CategoryManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetAllCategoriesQuery({
    page: currentPage,
    limit: 21,
  });

  const totalPages = data?.data?.meta?.totalPages;
  const currentItems = data?.data?.data || [];

  return (
    <div className="w-[98%] h-full ">
      <div className="flex items-center justify-between gap-5 mb-4">
        <div></div>
        <Button onClick={() => setIsModalOpen(true)} variant="default">
          <FaPlus />
          Add Category
        </Button>
      </div>
      <div className="py-6">
        {isLoading || isFetching ? (
          <CategorySk />
        ) : currentItems?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5 h-full overflow-y-auto">
            {currentItems?.map((content: any) => (
              <CategoryCard key={content.id} categories={content} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {" "}
            <NotFound />
          </div>
        )}
      </div>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        className="bg-white lg:w-[30%]"
      >
        <AddCategory setIsModalOpen={setIsModalOpen} />
      </Modal>

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
