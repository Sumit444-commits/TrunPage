// // src/components/Navbar.jsx
// import { MenuIcon, BellIcon, UserCircle } from 'lucide-react';
// import { useStore } from '../context/Store';

// export default function Navbar({ toggleSidebar }) {
//    const {user} = useStore()
  
//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
//       <div className="flex items-center gap-3">
//         <button
//           className="lg:hidden text-gray-700 hover:text-black"
//           onClick={toggleSidebar}
//         >
//           <MenuIcon className="w-6 h-6" />
//         </button>
//         <h1 className="text-xl font-semibold hidden lg:block">Dashboard</h1>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="text-gray-600 hover:text-black">
//           <BellIcon className="w-6 h-6" />
//         </button>
//         <div className="relative">
//           <img
//             src={user.profile_url}
//             className="w-10 h-10 rounded-full cursor-pointer"
//             alt="User"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// }


// src/components/Navbar.jsx
import { MenuIcon, BellIcon, UserCircle } from 'lucide-react';
import { useStore } from '../context/Store';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ toggleSidebar }) {
  const { user, sales = [] } = useStore(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/logout")
  }

  const getNewSalesCount = ()=> {
    return sales.filter((sale) =>{return sale.status === 0}).length
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-gray-700 hover:text-black"
          onClick={toggleSidebar}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold hidden lg:block">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
      
        <Link to="/sales" className="relative text-gray-600 hover:text-black">
          <BellIcon className="w-6 h-6" />
          {getNewSalesCount()> 0 && (
            <span className="absolute -top-3 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getNewSalesCount()}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <img
            src={user.profile_url}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="User"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
