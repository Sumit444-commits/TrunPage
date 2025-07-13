import React, { useState } from "react";
import { useStore } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoggedIn} = useStore();
  const navigate = useNavigate();

   if(!isLoggedIn){
    navigate("/login")
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      {/* Profile card */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 md:flex md:gap-10">
        {/* Left section with avatar */}
        <div className="flex flex-col items-center justify-center md:w-1/3">
          <img
            src={user?.profile_url}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md cursor-pointer"
            onClick={handleImageClick}
          />
          <h2 className="mt-4 text-xl font-bold text-gray-700">{user?.username || "User"}</h2>
          <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>

          <button
            onClick={() => navigate("/profile/edit")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Right section with details */}
        <div className="mt-10 md:mt-0 md:w-2/3">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-6">Profile Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Full Name:</span>
              <span className="text-gray-800">{user?.username || "N/A"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user?.email || "N/A"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Phone:</span>
              <span className="text-gray-800">{user?.phone || "Not provided"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="text-gray-800 capitalize">{user?.isAdmin ? "Admin" : "User"}</span>
            </div>
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
            src={user?.profile_url}
            alt="Full-size avatar"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
