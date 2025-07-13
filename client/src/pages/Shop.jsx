import React, { useState, useEffect } from "react";
import SaleCard from "../components/UI/SaleCard";
import { useStore } from "../store/AppContext";
import {useNavigate} from "react-router-dom"

export default function Shop() {
  const { user, isLoading , isLoggedIn} = useStore();
  const [sales, setSales] = useState([]);

  const navigate = useNavigate()

   if(!isLoggedIn){
    navigate("/login")
  }

  useEffect(() => {
    if (!isLoading) {
      // Use real data if user is authenticated and has sales
      if (user?.sales && user.sales.length > 0) {
        setSales(user.sales);
      } 
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="text-lg text-gray-600">Loading your purchases...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛍️ My Purchases</h1>

      {sales.length === 0 ? (
        <p className="text-gray-500">You haven’t purchased anything yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sales.map((sale) => (
            <SaleCard key={sale._id} sale={sale} />
          ))}
        </div>
      )}
    </div>
  );
}
