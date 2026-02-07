// components/Pagination.tsx
import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end items-center p-6 mt-2 ">
      <div className="flex items-center gap-1">
        <button onClick={goToPreviousPage}>
          <MdOutlineArrowBackIosNew className="size-5 text-[#4d5154]" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <Button
                variant={currentPage === page ? "pagenation" : "ghost"}
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 flex items-center ${
                  currentPage === page ? " " : ""
                }`}
              >
                {page}
              </Button>
            </React.Fragment>
          ))}

        <button onClick={goToNextPage}>
          <MdOutlineArrowForwardIos className="size-5 text-[#4d5154]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
