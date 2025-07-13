import { useStore } from "../../context/Store";
import Navbar from "../Navbar";
import {Outlet} from "react-router-dom"
import Sidebar from "../Sidebar";

export default function AppLayout({ toggleSidebar, sidebarOpen }) {
  const { isLoggedIn } = useStore();

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        !isLoggedIn ? "bg-white" : ""
      }`}
    >
      {isLoggedIn && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className="flex-1 flex flex-col bg-gray-100">
        {isLoggedIn && <Navbar toggleSidebar={toggleSidebar} />}
        <div className="overflow-auto flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}