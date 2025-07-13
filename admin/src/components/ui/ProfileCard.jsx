import { useState } from "react";

export function ProfileCard({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
      <div className="w-50 h-50 mb-6">
        <img
          src={user?.profile_url || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border"
          onClick={handleImageClick}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold mb-1">
          {user?.username || "User Name"}
        </h2>
        <p className="text-lg text-gray-600">
          {" "}
          {user?.email || "Email not set"}
        </p>
        <p className="text-lg text-gray-600">
          {" "}
          {user?.phone || "Phone not set"}
        </p>
        <p className="text-lg text-gray-600">
          {" "}
          {`Books Orders: ${user?.sales?.length}` || "Books Orders: 0"}
        </p>
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
}
