import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { statusMap } from "../components/utils/statusMap";
import { useStore } from "../store/AppContext";

const SaleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSaleById, isLoggedIn} = useStore();

  const [sale, setSale] = useState(""); // fix: set default to null
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

   if(!isLoggedIn){
    navigate("/login")
  }

  useEffect(() => {
    getSaleData();
  }, []);

  const getSaleData = async () => {
    const data = await getSaleById(id);
    setSale(data);
  };

  // Optional: early return while loading
  if (!sale) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading transaction...
      </div>
    );
  }

  const { email, status, reason, price, receipt, service = {} } = sale;
  const statusInfo = statusMap[status] || statusMap[0];

  const handleImageClick = (link) => {
    setPreviewImage(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPreviewImage("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-gray-100 shadow-2xl rounded-xl mb-10 mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Shop
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Transaction Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Receipt</h3>
          <img
            src={receipt}
            onClick={() => handleImageClick(receipt)}
            alt="Receipt"
            className="w-full h-64 object-contain rounded border"
          />
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="text-md font-medium text-gray-900">{email}</p>
          </div>

          <div>
            <span className="text-sm text-gray-500">Status</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          <div>
            <span className="text-sm text-gray-500">Reason</span>
            <p className="text-md text-gray-800">{reason || "—"}</p>
          </div>

          <div>
            <span className="text-sm text-gray-500">Transaction Price</span>
            <p className="text-md font-bold text-gray-900">${price?.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Book Bought
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={service?.image || ""}
            alt="Service"
            onClick={() => handleImageClick(service?.image)}
            className="w-full h-56 object-cover rounded border"
          />
          <div className="space-y-3">
            <p><strong>Name:</strong> {service?.name}</p>
            <p><strong>Title:</strong> {service?.title}</p>
            <p><strong>Category:</strong> {service?.category}</p>
            <p><strong>Book Price:</strong> ${service?.price?.toFixed(2)}</p>
          </div>
        </div>
      </div>

        {/* Image Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50"
        >
          <img
            src={previewImage}
            alt="Full-size avatar"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default SaleDetailPage;
