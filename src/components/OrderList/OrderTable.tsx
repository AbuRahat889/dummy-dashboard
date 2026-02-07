"use client";
import { useState } from "react";
import TableSkeleton from "../Skletone/Table";
import Modal from "../ui/modal";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-pink-100 text-pink-800",
  DELIVERED: "bg-[#e9effd] text-[#2563eb]",
  CANCELLED: "bg-red-100 text-red-800",
};

// Dummy orders
const dummyOrders = [
  {
    id: "1",
    user: { fullName: "John Doe", phoneNumber: "123456789" },
    street: "123 Main St",
    city: "New York",
    OrderItem: [{}, {}],
    totalAmount: 25.98,
    deliveryFee: 5,
    tax: 2,
    createdAt: "2026-02-05T10:00:00Z",
    status: "PENDING",
  },
  {
    id: "2",
    user: { fullName: "Jane Smith", phoneNumber: "987654321" },
    street: "456 Park Ave",
    city: "Los Angeles",
    OrderItem: [{}],
    totalAmount: 15.5,
    deliveryFee: 3,
    tax: 1.5,
    createdAt: "2026-02-04T14:30:00Z",
    status: "PROCESSING",
  },
  {
    id: "3",
    user: { fullName: "Mike Johnson", phoneNumber: "456789123" },
    street: "789 Elm St",
    city: "Chicago",
    OrderItem: [{}, {}, {}],
    totalAmount: 32.25,
    deliveryFee: 6,
    tax: 2.5,
    createdAt: "2026-02-03T09:15:00Z",
    status: "DELIVERED",
  },
  {
    id: "4",
    user: { fullName: "Emily Brown", phoneNumber: "321654987" },
    street: "101 Pine St",
    city: "Houston",
    OrderItem: [{}],
    totalAmount: 14.25,
    deliveryFee: 2,
    tax: 1,
    createdAt: "2026-02-02T12:45:00Z",
    status: "CANCELLED",
  },
  {
    id: "5",
    user: { fullName: "David Wilson", phoneNumber: "789123456" },
    street: "202 Oak St",
    city: "San Francisco",
    OrderItem: [{}, {}],
    totalAmount: 21.98,
    deliveryFee: 4,
    tax: 1.8,
    createdAt: "2026-02-01T16:20:00Z",
    status: "PENDING",
  },
];

const OrderTable = ({ isLoading = false }: { isLoading?: boolean }) => {
  const [orders, setOrders] = useState(dummyOrders);
  const [loadingAction, setLoadingAction] = useState<{
    orderId: string;
    action: "CANCELLED" | "DELIVERED" | "PROCESSING" | null;
  }>({ orderId: "", action: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setItem] = useState<any>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setLoadingAction({ orderId, action: newStatus as any });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );

    // Simulate API delay
    setTimeout(() => {
      setLoadingAction({ orderId: "", action: null });
    }, 500);
  };

  if (isLoading) return <TableSkeleton />;

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
            {orders.map((order, index) => (
              <tr key={index} className="text-sm hover:bg-red-50 border-b">
                <td className="py-4 px-4 text-left">{index + 1}</td>
                <td className="py-4 px-4 text-left">{order.user.fullName}</td>
                <td className="py-4 px-4 text-left">
                  {order.user.phoneNumber}
                </td>
                <td className="py-4 px-4 text-left">
                  {order.street}, {order.city}
                </td>
                <td className="py-4 px-4 text-left">
                  {order.OrderItem.length}
                </td>
                <td className="py-4 px-4 text-left">{order.totalAmount}</td>
                <td className="py-4 px-4 text-left">{order.deliveryFee}</td>
                <td className="py-4 px-4 text-left">{order.tax}</td>
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
                          {loadingAction.orderId === order.id &&
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
                                : "DELIVERED",
                            )
                          }
                          className="bg-primaryColor rounded-full text-white px-4 py-1"
                        >
                          {loadingAction.orderId === order.id &&
                          (loadingAction.action === "PROCESSING" ||
                            loadingAction.action === "DELIVERED")
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
        {/* <OrderDetails item={item} /> */}
        <div>show details for order Here </div>
      </Modal>
    </div>
  );
};

export default OrderTable;
