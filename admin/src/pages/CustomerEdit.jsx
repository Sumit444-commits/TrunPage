import { useState, useEffect } from "react";
import InputField from "../components/ui/InputField";
import { useStore } from "../context/Store";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProfileCard } from "../components/ui/ProfileCard";

export default function CustomerEdit() {
  const { Api, AuthorizationToken, getAllData, isLoggedIn } = useStore();

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_url: "",
  });
  const [userData,setUserData] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const getDataById = async () => {
    try {
      const response = await fetch(`${Api}/api/admin/users/${params.id}`, {
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      setUserData(data)
      setNewUserData(data);
      setPreview(data.profile_url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);

    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_URI, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setPreview(result.url);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...newUserData,
      profile_url: preview || newUserData.profile_url,
    };

    try {
      const response = await fetch(
        `${Api}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        toast.success("Customer updated successfully");
        getAllData("users");
        navigate("/customers");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Customer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}

        <ProfileCard user={userData}/>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Update Info</h2>

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
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-1 file:px-3 file:rounded-md
                  file:border-0 file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>

            {/* Form Fields */}
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

            {/* Submit */}
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
