import TransactionTable from "@/components/Transaction/TransactionTable";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-[85vh] overflow-y-auto pb-5">
      <TransactionTable />
    </div>
  );
}
