// pages/SaleDetailPage.jsx
import React, { useEffect, useState } from "react";
import SaleDetail from "../components/Layout/SaleDetail";
import { useParams } from "react-router-dom";
import { useStore } from "../context/Store";

const SaleDetailPage = () => {
  const { id } = useParams();
  const { updateSaleStatusById, getSaleDataById, sale } = useStore();
  const handleStatusUpdate = async (saleId, data) => {
    try {
      const updated = { ...sale, status: data.status, reason : data.reason };
      await updateSaleStatusById(saleId, updated);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };
  useEffect(() => {
    getSaleDataById(id);
  }, [id,handleStatusUpdate]);



  if (!sale) return <p className="text-center mt-10">Loading...</p>;

  return <SaleDetail sale={sale} onStatusUpdate={handleStatusUpdate} />;
};

export default SaleDetailPage;
