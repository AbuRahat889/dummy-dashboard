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

import p1 from "@/assets/images (6).jpg";
import p12 from "@/assets/images (7).jpg";
import p13 from "@/assets/download (2).jpg";

export default function FoodManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dummyFoods = [
    {
      id: "1",
      name: "Burger Deluxe",
      image: p1,
      totalRaters: 120,
      avgRating: 4.5,
      price: 12.99,
      quantity: 15,
    },
    {
      id: "2",
      name: "Cheese Pizza",
      image: p12,
      totalRaters: 98,
      avgRating: 4.2,
      price: 15.5,
      quantity: 10,
    },
    {
      id: "3",
      name: "Fried Chicken",
      image: p13,
      totalRaters: 76,
      avgRating: 4.1,
      price: 10.75,
      quantity: 20,
    },
    {
      id: "4",
      name: "Pasta Alfredo",
      image: p1,
      totalRaters: 65,
      avgRating: 4.3,
      price: 14.25,
      quantity: 8,
    },
  ];

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    page: currentPage,
    limit: 12,
    ...(searchValue ? { search: searchValue } : {}),
  });

  const totalPages = data?.data?.meta?.totalPages;
  // const currentItems = data?.data?.data || [];

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
        ) : dummyFoods?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 h-full overflow-y-auto">
            {dummyFoods?.map((content: any) => (
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
