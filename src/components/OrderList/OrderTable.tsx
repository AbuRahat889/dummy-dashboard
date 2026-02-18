"use client";
import { useState } from "react";
import TableSkeleton from "../Skletone/Table";
import Modal from "../ui/modal";
import OrderDetails from "./OrderDetails";

interface OrderTableProps {
  currentItems: any[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  COMPLETE: "bg-[#e9effd] text-[#2563eb]",
  CANCEL: "bg-red-100 text-red-800",
};

const OrderTable = ({
  currentItems,
  isLoading,
  isFetching,
  isError,
}: OrderTableProps) => {
  const [loadingAction, setLoadingAction] = useState<{
    orderId: string;
    action: "PENDING" | "COMPLETE" | "CANCEL" | null;
  }>({ orderId: "", action: null });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<any>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setLoadingAction({ orderId, action: newStatus as any });

    // Simulate API delay
    setTimeout(() => {
      setLoadingAction({ orderId: "", action: null });
    }, 500);
  };

  if (isLoading || isFetching) return <TableSkeleton />;
  if (isError) return <div className="p-4">Error loading orders.</div>;

  return (
    <div className="">
      <div className="relative overflow-x-auto rounded-md p-6 bg-white ">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white">
            <tr className="text-[#667085] text-left text-sm font-semibold border-b">
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Phone</th>
              <th className="py-4 px-4">Address</th>
              <th className="py-4 px-4">Total Items</th>
              <th className="py-4 px-4">Total Price</th>
              <th className="py-4 px-4">Delivery Fee</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={index} className="text-sm hover:bg-red-50 border-b">
                <td className="py-4 px-4 text-left">{index + 1}</td>
                <td className="py-4 px-4 text-left">{order?.userName}</td>
                <td className="py-4 px-4 text-left">
                  {order?.userPhoneNumber}
                </td>
                <td className="py-4 px-4 text-left">
                  {order.address}, {order.district}
                </td>
                <td className="py-4 px-4 text-left">
                  {order?._count?.orderItems}
                </td>
                <td className="py-4 px-4 text-left">{order.totalAmount}</td>
                <td className="py-4 px-4 text-left">{order.deliveryCharge}</td>

                <td className="py-4 px-4 text-left">
                  {new Date(order.createdAt)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </td>
                <td className="py-4 px-4 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-left">
                  <div className="flex gap-2">
                    {(order.status === "PENDING" ||
                      order.status === "PROCESSING") && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(order.id, "CANCEL")}
                          className="bg-[#fae6e6] rounded-full text-[#cf0607] px-4 py-1"
                        >
                          {loadingAction.orderId === order.id &&
                          loadingAction.action === "CANCEL"
                            ? "Updating..."
                            : "Cancel"}
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(
                              order.id,
                              order.status === "PENDING"
                                ? "COMPLETE"
                                : "CANCEL",
                            )
                          }
                          className="bg-primaryColor rounded-full text-white px-4 py-1"
                        >
                          {loadingAction.orderId === order.id &&
                          (loadingAction.action === "COMPLETE" ||
                            loadingAction.action === "CANCEL")
                            ? "Updating..."
                            : "Accept"}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setItem(order?.id);
                      }}
                      className="bg-[#e9effd] rounded-full text-[#2563eb] px-4 py-1"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <OrderDetails item={item} />
      </Modal>
    </div>
  );
};

export default OrderTable;
