import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/UI/InputField";

const EditProfile = () => {
  const { user, userDataUpdate, isLoggedIn } = useStore();
  const navigate = useNavigate();

   if(!isLoggedIn){
    navigate("/login")
  }
  
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_url: "",
  });

  const [userData, setUserData] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");
  if (user && userData) {
    setNewUserData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      profile_url: user.profile_url,
    });
    setPreviewUrl(user.profile_url);
    setUserData(false);
  }

  const fileInputRef = useRef(null);

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URI, {
      method: "POST",
      body: data,
    });
    const uploaded_image = await response.json();
    // console.log(uploaded_image.url);
    setPreviewUrl(uploaded_image.url);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewUserData({ ...newUserData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...newUserData,
      profile_url: previewUrl,
    };

    // console.log("Submitting data:", updatedUser);

    const updatedTrue = await userDataUpdate(updatedUser);

    // const updatedTrue = userDataUpdate(newUserData)
    if (updatedTrue) {
      navigate("/profile");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Edit Profile
        </h2>

        {/* Avatar & Upload */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={previewUrl || "noimage"}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <p className="mt-2 text-sm text-gray-500">Click image to change</p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Username"
            type="text"
            id="username"
            name="username"
            value={newUserData.username}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="Phone"
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{11}"
            maxLength={11}
            value={newUserData.phone}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
