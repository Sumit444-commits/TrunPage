// import React from "react";
// import { FiUsers, FiShoppingCart, FiBookOpen, FiTrendingUp } from "react-icons/fi";
// import { useStore } from "../context/Store";
// import { useState } from "react";
// import { useEffect } from "react";

// export default function Overview() {
//     const {customers,contacts,books} = useStore()
//     const [paidBooksCount,setPaidBooksCount] = useState()
//     useEffect(()=>{
//     setPaidBooksCount( books.filter((book)=> (book.price > 0)).length )
//         // console.log(paidBooks);
//     },[books])
//   return (
//     <section className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-screen-xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Overview</h1>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//             <FiUsers className="text-blue-600 text-3xl" />
//             <div>
//               <p className="text-sm text-gray-500">Customers</p>
//               <p className="text-xl font-semibold">{customers.length}</p>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//             <FiBookOpen className="text-green-600 text-3xl" />
//             <div>
//               <p className="text-sm text-gray-500">Books</p>
//               <p className="text-xl font-semibold">{books.length}</p>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//             <FiShoppingCart className="text-yellow-500 text-3xl" />
//             <div>
//               <p className="text-sm text-gray-500">Feedbacks</p>
//               <p className="text-xl font-semibold">{contacts.length}</p>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//             <FiTrendingUp className="text-purple-600 text-3xl" />
//             <div>
//               <p className="text-sm text-gray-500">Paid Books</p>
//               <p className="text-xl font-semibold">{paidBooksCount}</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiShoppingCart,
  FiBookOpen,
  FiTrendingUp,
  FiDollarSign,
  FiGift,
} from "react-icons/fi";
import { useStore } from "../context/Store";

export default function Overview() {
  const { customers, contacts, books,sales } = useStore();

  const [paidBooksCount, setPaidBooksCount] = useState(0);
  const [freeBooksCount, setFreeBooksCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const paid = books.filter((book) => book.price > 0).length;
    const free = books.filter((book) => book.price === 0).length;
    
    const completedSales = sales.filter((sale) => sale.status === 4);
    const total = completedSales.reduce((a,b) => a + b.price,0)
    
    setRevenue(total)
    setPaidBooksCount(paid);
    setFreeBooksCount(free);
  }, [books,sales]);




  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📊 Admin Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            A quick snapshot of everything happening on TurnPage.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {/* Total Users */}
          <StatCard
            title="Customers"
            value={customers.length}
            icon={<FiUsers className="text-blue-600 text-3xl" />}
          />

          {/* Total Books */}
          <StatCard
            title="Books"
            value={books.length}
            icon={<FiBookOpen className="text-green-600 text-3xl" />}
          />

          {/* Feedback */}
          <StatCard
            title="Feedbacks"
            value={contacts.length}
            icon={<FiShoppingCart className="text-yellow-500 text-3xl" />}
          />

          {/* Paid Books */}
          <StatCard
            title="Paid Books"
            value={paidBooksCount}
            icon={<FiTrendingUp className="text-purple-600 text-3xl" />}
          />

          {/* Free Books */}
          <StatCard
            title="Free Books"
            value={freeBooksCount}
            icon={<FiGift className="text-pink-500 text-3xl" />}
          />

          {/* Placeholder: Sales/Revenue */}
          <StatCard
            title="Revenue"
            value={`$${revenue}`}
            icon={<FiDollarSign className="text-indigo-600 text-3xl" />}
          />
        </div>

        {/* Optional Section: Future Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity (Coming Soon)
          </h2>
          <p className="text-gray-500 text-sm">You’ll be able to track user events, book sales, and more here.</p>
        </div>
      </div>
    </section>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition">
      <div>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
