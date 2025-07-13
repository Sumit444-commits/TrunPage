import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Store";
import {toast} from "react-toastify"
import { useEffect } from "react";
const defaultData = {
  email: "",
  password: "",
};
export default function Login() {
  const { Api,storeTokenInLS,userAuthentication } = useStore();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(defaultData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setUserData({...userData, [name]:value})
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${Api}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(userData)
      });

      const res_data = await response.json()

      if(response.ok){
        if(res_data.isAdmin){
         storeTokenInLS(res_data.token)
         userAuthentication()
         toast.success("Login successful")
         navigate("/")
        }else{
            toast.error("Login Failed: User is not Admin")
        }
      }else{
        // console.log(res_data);
        
        toast.error( res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }


    } catch (error) {
      console.log("Error in login", error);
    }
  };

  useEffect(()=>{},[])

  return (
    <div className="flex min-h-screen">
      {/* Left - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-900 text-white flex flex-col justify-center px-10 py-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-white">
            📚 TrunPage Admin
          </h2>
          <p className="text-gray-400 mb-8">
            Welcome back! Please log in to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium mb-1 text-gray-300"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                placeholder="admin@bookstore.com"
                value={userData.email}
                name={"email"}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium mb-1 text-gray-300"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border-b-2 border-gray-700 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all py-2 rounded font-semibold text-white shadow-md"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don't have access? Contact your administrator.
          </p>
        </div>
      </div>

      {/* Right - Graphic Side */}
      <div className="hidden lg:flex w-1/2 bg-indigo-700 text-white items-center justify-center p-10 relative overflow-hidden">
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Manage your <span className="text-yellow-300">Books, Authors</span>{" "}
            & Orders
          </h2>
          <p className="text-lg opacity-90">
            Your centralized system for managing inventory and tracking store
            analytics.
          </p>
          <p className="mt-6 text-sm text-yellow-100">
            Powered by TrunPage's Admin Dashboard
          </p>
        </div>
        <img
          src="logodark.png"
          alt="books"
          className="absolute inset-0 object-cover opacity-90 z-0"
        />
      </div>
    </div>
  );
}
