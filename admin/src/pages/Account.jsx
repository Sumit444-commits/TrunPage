import { useState } from "react";
import InputField from "../components/ui/InputField";
import { useStore } from "../context/Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProfileCard } from "../components/ui/ProfileCard";

export default function Account() {
  const { user, isLoggedIn, updateUserData } = useStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const [preview, setPreview] = useState(null);

  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_url: "",
  });

  const [userData, setUserData] = useState(true);

  if (user && userData) {
    setNewUserData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      profile_url: user.profile_url,
    });
    setUserData(false);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleImageChange = async (e) => {
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

    const uploaded_img = await response.json();

    setPreview(uploaded_img.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...newUserData,
      profile_url: preview,
    };

    console.log("Submitting data:", updatedUser);

    const updatedTrue = await updateUserData(updatedUser);
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Card */}
        {/* <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
          <div className="w-50 h-50 mb-6">
            <img
              src={user?.profile_url || preview || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
          <div className="flex flex-col gap-2">

          <h2 className="text-2xl font-semibold mb-1">
           {user?.username || "User Name"}
          </h2>
          <p className="text-lg text-gray-600"> {user?.email || "Email not set"}</p>
          <p className="text-lg text-gray-600"> {user?.phone || "Phone not set"}</p>
          </div>


        </div> */}

        <ProfileCard user={user}/>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {/* Other Fields */}
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

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Save Details
            </button>
          </form>
        </div>
         {/* Image Modal */}
     
      </div>
    </div>
  );
}
