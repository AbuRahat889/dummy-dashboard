import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

export default function OrderDetails({ item }: Props) {
  if (!item) return null;

  return (
    <div className="w-full overflow-y-auto max-h-[90vh]">
      {/* Content */}
      <div className="p-6 space-y-6">
        <h3 className="font-semibold text-xl text-left">Order Details</h3>
        {/* Order Summary */}
        <div className="grid grid-cols-2 gap-1 text-sm text-left">
          <p className="space-x-2">
            <span className="font-medium">Status:</span>
            <span className="bg-yellow-200 text-yellow-900 px-3 py-[2px] rounded-full">{item.status}</span>
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(item.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Total:</span> {item.totalAmount}
          </p>
          <p>
            <span className="font-medium">Delivery Fee: </span>
            {item.deliveryFee}
          </p>
          <p>
            <span className="font-medium">Tax: </span>
            {item.tax}
          </p>
        </div>
        <div className="flex items-start justify-between">
          {/* User Info */}
          <div className="text-left">
            <h3 className="font-semibold mb-2">Customer Info</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{item.user.fullName}</p>
              <p>{item.user.email}</p>
              <p>{item.user.phoneNumber}</p>
            </div>
          </div>

          {/* Address */}
          <div className="text-left">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-700">
              {item.street}, {item.city}, {item.state}
            </p>
            {item.note && (
              <p className="text-sm text-gray-500 mt-1">Note: {item.note}</p>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="text-left">
          <h3 className="font-semibold mb-3">Order Items</h3>

          <div className="space-y-4">
            {item?.OrderItem?.map((orderItem: any, index: number) => (
              <div key={index} className="flex gap-4 border rounded-lg p-4">
                <Image
                  src={orderItem.product.image}
                  alt={orderItem.product.name}
                  className="w-20 h-20 object-cover rounded"
                  height={500}
                  width={500}
                />

                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <p className="font-medium">{orderItem.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {orderItem.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: {orderItem.price}
                    </p>
                    <p className="text-sm font-medium">
                      Subtotal: {orderItem.subtotal}
                    </p>
                  </div>

                  {/* Variants */}
                  {orderItem.OrderItemVariant?.length > 0 && (
                    <div className="">
                      <p className="text-sm text-gray-600 font-medium">
                        Special Instructions:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {orderItem.OrderItemVariant.map((v: any) => (
                          <li key={v.variant.id}>
                            {v.variant.name} ({v.variant.price})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
