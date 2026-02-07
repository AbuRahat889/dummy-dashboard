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

  const dummyFoods = [
    {
      id: "1",
      name: "Burger Deluxe",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      totalRaters: 120,
      avgRating: 4.5,
      price: 12.99,
      quantity: 15,
    },
    {
      id: "2",
      name: "Cheese Pizza",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
      totalRaters: 98,
      avgRating: 4.2,
      price: 15.5,
      quantity: 10,
    },
    {
      id: "3",
      name: "Fried Chicken",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
      totalRaters: 76,
      avgRating: 4.1,
      price: 10.75,
      quantity: 20,
    },
    {
      id: "4",
      name: "Pasta Alfredo",
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882a",
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
      <div className="flex items-center justify-between gap-5 mb-4">
        <SearchBar searchValue={searchValue} onSearchChange={onSearchChange} />

        <Button href="/add-product?type=Add" variant="default" className="w-64">
          <FaPlus />
          Create Medicine Item
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
