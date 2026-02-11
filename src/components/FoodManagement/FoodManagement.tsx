"use client";

import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ContentCardSkeleton from "../Skletone/ContentCard";
import { Button } from "../ui/button";
import NotFound from "../ui/NotFound";
import Pagination from "../ui/Pagination";
import { SearchBar } from "../ui/searchBar";
import FoodCard from "./FoodCard";

export default function FoodManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    page: currentPage,
    limit: 20,
    ...(searchValue ? { search: searchValue } : {}),
  });

  const totalPages = data?.data?.meta?.totalPages;
  const currentItems = data?.data?.data || [];

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="w-[98%] h-full overflow-y-auto pb-20">
      <div className="flex items-center justify-between gap-3 md:gap-5 mb-4">
        <SearchBar searchValue={searchValue} onSearchChange={onSearchChange} />

        <Button href="/add-product?type=Add" variant="default" className="w-64">
          <FaPlus />
          Add Product
        </Button>
      </div>

      <div className="py-6">
        {isLoading || isFetching ? (
          <ContentCardSkeleton />
        ) : currentItems?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 h-full overflow-y-auto">
            {currentItems?.map((content: any) => (
              <FoodCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <NotFound />
          </div>
        )}
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
