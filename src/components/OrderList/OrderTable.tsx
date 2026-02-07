"use client";
import { useUpdateOrdersMutation } from "@/redux/api/orderApi";
import { toast } from "react-toastify";
import TableSkeleton from "../Skletone/Table";
import { useState } from "react";
import Modal from "../ui/modal";
import OrderDetails from "./OrderDetails";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-pink-100 text-pink-800",
  DELIVERED: "bg-[#e9effd] text-[#2563eb]",
  CANCELLED: "bg-red-100 text-red-800",
};

interface Props {
  currentItems?: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

const OrderTable = ({
  currentItems,
  isLoading,
  isFetching,
  isError,
}: Props) => {
  const [loadingAction, setLoadingAction] = useState<{
    orderId: string;
    action: "CANCELLED" | "DELIVERED" | "PROCESSING" | null;
  }>({ orderId: "", action: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<any>(null);

  const [updateOrderStatus, { isLoading: updateing }] =
    useUpdateOrdersMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoadingAction({ orderId, action: newStatus as any });
    try {
      const updateInfo = {
        orderId: orderId,
        status: newStatus,
      };
      const res = await updateOrderStatus(updateInfo).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Status updated successfully");
      }
    } catch (error) {
      toast.error((error as string) || "Failed to update status");
    }
  };

  if (isLoading || isFetching) return <TableSkeleton />;
  if (isError) return <p>Failed to load orders</p>;
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
              <th className="py-4 px-4">Tax</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order: any, index: number) => (
              <tr key={index} className="text-sm hover:bg-red-50 border-b">
                <td className="py-4 px-4 text-left">{index + 1}</td>

                <td className="py-4 px-4 text-left">{order.user?.fullName}</td>

                <td className="py-4 px-4 text-left">
                  {order.user?.phoneNumber}
                </td>
                <td className="py-4 px-4 text-left">
                  {order.street}, {order.city}
                </td>

                <td className="py-4 px-4 text-left">
                  {order?.OrderItem?.length}
                </td>
                <td className="py-4 px-4 text-left">{order?.totalAmount}</td>
                <td className="py-4 px-4 text-left">{order?.deliveryFee}</td>
                <td className="py-4 px-4 text-left">{order?.tax}</td>

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
                          onClick={() =>
                            handleStatusChange(order.id, "CANCELLED")
                          }
                          className="bg-[#fae6e6] rounded-full text-[#cf0607] px-4 py-1"
                        >
                          {updateing &&
                          loadingAction.orderId === order.id &&
                          loadingAction.action === "CANCELLED"
                            ? "Updating..."
                            : "Cancel"}
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(
                              order.id,
                              order.status === "PENDING"
                                ? "PROCESSING"
                                : "DELIVERED"
                            )
                          }
                          className="bg-primaryColor rounded-full text-white px-4 py-1"
                        >
                          {(updateing &&
                            loadingAction.orderId === order.id &&
                            loadingAction.action === "PROCESSING") ||
                          loadingAction.action === "DELIVERED"
                            ? "Updating..."
                            : "Accept"}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setItem(order);
                      }}
                      className="bg-[#e9effd] rounded-full text-[#2563eb] px-4 py-1"
                    >
                      view details
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
