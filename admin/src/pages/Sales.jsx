// SalesPageList.jsx
import React, { useEffect, useState } from "react";
import SalesCard from "../components/Layout/SalesCard";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Store";
import { statusMap } from "../components/utils/StatusMap";

const SalesPageList = () => {
  const { sales, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const filteredSales = statusFilter === "all" ? sales : sales.filter((sale) => sale.status == statusFilter);

  const uniqueStatuses = [
    ...new Set(sales.map((sale) => sale.status)),
  ];
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sales Overview</h1>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Filter by Status
        </label>
        <select
          id="status"
          name="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`mt-1 block w-40 p-2 border border-gray-300 rounded-md shadow-sm`}
        >
          <option value="all">All</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status} className={statusMap[status].color}>
              {statusMap[status].label}
            </option>
          ))}
        </select>
      </div>

      {filteredSales.length === 0 ? (
        <p className="text-center text-gray-500">No sales available for the selected status.</p>
      ) : (
        filteredSales.map((sale) => <SalesCard key={sale._id} sale={sale} />)
      )}
    </div>
  );
};

export default SalesPageList;
