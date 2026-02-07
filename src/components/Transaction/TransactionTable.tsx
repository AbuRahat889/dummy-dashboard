"use client";
import { useGetAllTransactionsQuery } from "@/redux/api/transactionsApi";
import { useState } from "react";
import FullTableSkeleton from "../Skletone/Table";
import Pagination from "../ui/Pagination";

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: transictionList, isLoading } = useGetAllTransactionsQuery({
    page: currentPage,
    limit: 15,
  });

  const totalPages = transictionList?.data?.meta?.totalPage || 1;
  const currentItems = transictionList?.data?.data || [];

  if (isLoading) {
    return <FullTableSkeleton />;
  }

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="w-full rounded-xl">
        <thead className="border-b border-borderColor rounded-full bg-white">
          <tr className="text-[#667085] text-left text-sm font-semibold">
            <th className="py-4 px-4">#</th>
            <th className="py-4 px-4">User</th>
            <th className="py-4 px-4">Transaction ID</th>
            <th className="py-4 px-4">Payment Method</th>
            <th className="py-4 px-4">Date</th>
            <th className="py-4 px-4">Amount</th>
          </tr>
        </thead>

        <tbody>
          {currentItems?.length > 0 ? (
            currentItems?.map((info: any, index: number) => (
              <tr
                key={info.id}
                className="text-sm text-textColor font-normal bg-white rounded-full hover:bg-red-100"
              >
                {/* Serial Number */}
                <td className="py-4 px-4">{index + 1}</td>
                {/* User Name */}
                <td className="py-2 px-4">{info.user?.fullName || "N/A"}</td>

                {/* Transaction ID */}
                <td className="py-2 px-4">{info.transactionId}</td>

                {/* Payment Method */}
                <td className="py-2 px-4 capitalize">{info.paymentMethod}</td>

                {/* Date */}
                <td className="py-2 px-4">
                  {new Date(info.createdAt).toLocaleDateString()}
                </td>

                {/* Amount */}
                <td className="py-2 px-4">${info.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-4 text-gray-500 bg-white"
              >
                No transactions found
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

export default TransactionTable;
