
import React, { useState } from "react";
import StatusSelector from "../ui/StatusSelector";
import { statusMap } from "../utils/StatusMap";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function SaleDetail({ sale, onStatusUpdate }) {
  const {
    user,
    service,
    status,
    reason,
    receipt,
    price,
    createdAt,
    _id,
    email: saleEmail,
  } = sale;

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageClick = (src) => {
    setImagePreview(src);
  };

  const handleClosePreview = () => {
    setImagePreview(null);
  };

  const handleStatusSave = (data) => {
    onStatusUpdate(_id, data);
  };

  return (
    <div className="relative">
      {/* Fullscreen Image Preview */}
      {imagePreview && (
        <div
          className="fixed inset-0 bg-blur-lg bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50"
          onClick={handleClosePreview}
        >
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      )}

      {/* Main Card */}
      <div className="max-w-5xl xl:mx-auto mx-4 bg-white rounded-xl shadow-lg p-6 mt-12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline text-sm"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Sale Details</h2>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${statusMap[status]?.color}`}
          >
            {statusMap[status]?.label || "Unknown"}
          </span>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Info */}
           {user !== null ? 
          <div className="flex gap-4 items-center">
            <img
              src={user?.profile_url}
              alt={user?.username}
              className="w-24 h-24 rounded-full object-cover border cursor-pointer"
              onClick={() => handleImageClick(user?.profile_url)}
              title="Click to view full image"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user?.username}
              </h3>
              <p className="text-sm text-gray-600">User Email: {user?.email}</p>
              <p className="text-sm text-gray-600">Phone: {user?.phone}</p>
            </div>
          </div>
          : <h2 className="text-xl text-gray-600">This user is Deleted</h2> }

          {/* Service Info */}
            {service !== null ? 
          <div className="flex gap-4">
            <img
              src={service?.image}
              alt={service?.name}
              className="w-24 h-24 rounded-md object-cover border cursor-pointer"
              onClick={() => handleImageClick(service?.image)}
              title="Click to view full image"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {service?.name}
              </h3>
              <p className="text-sm text-gray-600">{service?.title}</p>
              <p className="text-sm text-gray-600">
                Category: {service?.category}
              </p>
              <p className="text-sm text-gray-600">
                Base Price: ${service?.price}
              </p>
            </div>
          </div>
          : <h2 className="text-xl text-gray-600">This book is Deleted or replaced</h2> }

          {/* Sale Info */}
          <div className="md:col-span-2 mt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Sale Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-sm text-gray-600">
                <strong>Order Email:</strong> {saleEmail}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Sold Price:</strong> ${price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {format(new Date(createdAt), "PPpp")}
              </p>
              <div className="text-sm text-gray-600">
                <strong>Receipt:</strong>
                <br />
                <img
                  src={receipt}
                  alt="Receipt"
                  className="w-32 h-auto mt-2 rounded-md shadow cursor-pointer border"
                  onClick={() => handleImageClick(receipt)}
                  title="Click to view full receipt"
                />
              </div>
            </div>

            {/* Show reason if status is rejected */}
            {status === 3 && reason && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-300">
                <strong>Rejection Reason:</strong> {reason}
              </div>
            )}
          </div>

          {/* Status Editor */}
          <div className="md:col-span-2 mt-6">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Edit Sale Status
            </h4>
            <StatusSelector
              initialStatus={status}
              onSave={handleStatusSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

