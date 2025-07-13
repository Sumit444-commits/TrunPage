import React from "react";
import { format } from "date-fns";
import { statusMap } from "../utils/statusMap";
import { useNavigate } from "react-router-dom";

export default function SaleCard({ sale,  onCancel }) {
  const { service, receipt, price, status, createdAt, _id } = sale;
  const navigate = useNavigate()
  // const isCancellable = status === 1 || status === 0; // allow cancel order if order is in pending state or new 

  const handleView = () => {
    navigate(`/shop/${_id}`)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-all p-4 flex flex-col space-y-4">
      {/* Image & Service Info */}
      <div className="flex gap-4">
        <img
          src={service.image}
          alt={service.name}
          className="w-20 h-20 object-cover rounded-md border"
        />

        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800">{service.name}</h3>
          <p className="text-sm text-gray-500">Category: {service.category}</p>
          <p className="text-sm text-gray-600 mt-1">${price.toFixed(2)}</p>
        </div>
      </div>

      {/* Status & Date */}
      <div className="flex justify-between items-center text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[status]?.color || "bg-gray-100 text-gray-700"}`}>
          {statusMap[status]?.label || "Unknown"}
        </span>
        <span className="text-gray-400">{format(new Date(createdAt), "PP")}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => {handleView()}}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View
        </button>

        {/* {isCancellable && (
          <button
            onClick={() => onCancel?.(_id)}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            Cancel
          </button>
        )} */}
      </div>
    </div>
  );
}
