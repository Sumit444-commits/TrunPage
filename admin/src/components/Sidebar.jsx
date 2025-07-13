// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";

import {
  HomeIcon,
  UsersIcon,
  UserIcon,
  BookOpen,
  ShoppingCart,
  LogOutIcon,
  XIcon,
  ContactIcon,
} from "lucide-react";
import { useStore } from "../context/Store";

const menuItems = [
  { name: "Overview", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Customers", path: "/customers", icon: <UsersIcon className="w-5 h-5" /> },
  { name: "Sales", path: "/sales", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Books", path: "/books", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Contacts", path: "/contacts", icon: <ContactIcon className="w-5 h-5" />, },
  { name: "Account", path: "/account", icon: <UserIcon className="w-5 h-5" /> },
  // { name: "Error", path: "*", icon: <AlertCircleIcon className="w-5 h-5" /> },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { user, isLoading } = useStore();

  if (user && isLoading) {
    return <h1>Loading ...</h1>;
  }

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <div
      className={`fixed z-50 lg:static bg-gray-900 text-white h-full w-64 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Close button for mobile only */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 lg:hidden">
            {/* <h2 className="text-xl font-semibold">Booko</h2> */}
            <img src="/logodark.png" className="max-h-14" alt="logo" />
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Brand for desktop */}
          <div className="hidden lg:block text-2xl font-bold px-6 py-4">
            <img src="/logodark.png" className="max-h-18" alt="logo" />
          </div>

          <div className="px-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg mt-2 text-sm hover:bg-gray-700 ${
                    isActive ? "bg-purple-600" : ""
                  }`
                }
                onClick={toggleSidebar}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={user?.profile_url}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{user?.username}</p>
              <button
                className="text-xs flex items-center gap-1 text-gray-400 hover:text-white"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
