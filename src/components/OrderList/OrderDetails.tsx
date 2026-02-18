import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import Image from "next/image";
import React from "react";

type Props = {
  item: string; // orderId
};

export default function OrderDetails({ item }: Props) {
  const { data } = useGetSingleOrderQuery(item);

  const order = data?.data;

  if (!order) return null;

  return (
    <div className="w-full overflow-y-auto max-h-[90vh]">
      <div className="p-6 space-y-6">
        <h3 className="font-semibold text-xl text-left">Order Details</h3>

        {/* Order Summary */}
        <div className="grid grid-cols-2 gap-1 text-sm text-left">
          <p className="space-x-2">
            <span className="font-medium">Status:</span>
            <span className="bg-yellow-200 text-yellow-900 px-3 py-[2px] rounded-full">
              {order.status}
            </span>
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Total:</span> ৳{order.totalAmount}
          </p>

          <p>
            <span className="font-medium">Delivery Fee:</span> ৳
            {order.deliveryCharge}
          </p>
        </div>

        {/* Customer Info */}
        <div className="flex items-start justify-between">
          <div className="text-left">
            <h3 className="font-semibold mb-2">Customer Info</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{order.userName}</p>
              <p>{order.userPhoneNumber}</p>
              <p>{order.district}</p>
            </div>
          </div>

          {/* Address */}
          <div className="text-left">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-700">
              {order.address}, {order.district}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="text-left">
          <h3 className="font-semibold mb-3">Order Items</h3>

          <div className="space-y-4">
            {order.orderItems?.map((orderItem: any) => {
              const subtotal = orderItem.price * orderItem.quantity;

              return (
                <div
                  key={orderItem.id}
                  className="flex gap-4 border rounded-lg p-4"
                >
                  <Image
                    src={orderItem.productImages?.[0]}
                    alt="product"
                    className="w-20 h-20 object-cover rounded"
                    height={200}
                    width={200}
                  />

                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        Product ID: {orderItem.productId}
                      </p>

                      <p className="text-sm text-gray-600">
                        Quantity: {orderItem.quantity}
                      </p>

                      <p className="text-sm text-gray-600">
                        Price: ৳{orderItem.price}
                      </p>

                      <p className="text-sm font-medium">
                        Subtotal: ৳{subtotal}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
