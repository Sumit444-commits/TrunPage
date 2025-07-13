// SalesPage.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { statusMap } from "../utils/StatusMap";
import { useStore } from "../../context/Store";

const SalesCard = ({ sale }) => {
  // const {sale} = useStore()
  const { _id, user, service, price, createdAt, status } = sale;
  const statusInfo = statusMap[status] || statusMap[0];
  const navigate = useNavigate();

  const handleClick = () => {
    // getSaleDataById(id)
    navigate(`/sale/details/${_id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 transition hover:shadow-lg">
      {/* User Section */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img
          src={user?.profile_url}
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{user?.username}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Service Section */}
      <div className="min-w-[220px] flex flex-col justify-center text-center md:text-left">
        <h4 className="text-md font-semibold">{service?.name}</h4>
        <p className="text-sm text-gray-600">
          {service?.title || service?.category}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center">
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${statusInfo.color}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Price & Date */}
      <div className="min-w-[150px] flex flex-col justify-center text-center">
        <h5 className="text-md font-bold text-green-700">${price}</h5>
        <p className="text-md text-gray-500">
          {createdAt ? format(new Date(createdAt), "dd MMM yyyy") : "N/A"}
        </p>
      </div>

      {/* Edit Icon */}
      <div onClick={handleClick} className="flex flex-col justify-center cursor-pointer hover:text-blue-600">
        <FaEdit size={20} />
      </div>
    </div>
  );
};

export default SalesCard;
