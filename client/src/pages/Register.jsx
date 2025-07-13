import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/UI/InputField";
import { useStore } from "../store/AppContext";

const emptyData = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  const { Api, storeTokenInLS, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(emptyData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      toast.info("Logout First");
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Api}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Registration Successful");
        setUser(emptyData);
        navigate("/");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Register Error: ", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      <div className="flex items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700">Create Account</h1>
            <p className="text-gray-500 text-sm mt-2">Join TurnPage and explore a world of books</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />

            <InputField
              label="Phone"
              name="phone"
              type="tel"
              pattern="03[0-9]{9}"
              maxLength={11}
              value={user.phone}
              onChange={handleChange}
              required
              placeholder="e.g: 03135627838"
              error={error}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    
      <div className="hidden md:flex flex-col justify-center items-center bg-indigo-100 p-10">
        <img
          src="Register.svg" 
          alt="Register Illustration"
          className="w-full max-w-sm"
        />
        <h2 className="text-xl font-semibold text-indigo-700 mt-6 text-center">
          Start your reading journey with <span className="font-bold">TurnPage</span>
        </h2>
      </div>

      
    </div>
  );
};

export default Register;
