// // src/pages/Login.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import InputField from "../components/UI/InputField";
// import { useStore } from "../store/AppContext";
// import {toast} from "react-toastify"

// const emptyData = {
//   email: "",
//   password: "",
// };

// const Login = () => {
//   const { Api, storeTokenInLS ,isLoggedIn,isAuthenticated} = useStore();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(emptyData);

//   useEffect(()=>{
//     if(isLoggedIn){
//       toast.info("Logout First")
//       navigate("/")
//     }
//   },[])

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${Api}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const res_data = await response.json();
//       if (response.ok) {
//         toast.success("Login Successful");
//         storeTokenInLS(res_data.token);
//         setUser(emptyData);
//         navigate("/");
//       } else {
//         toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
//       }

//     } catch (error) {
//       console.error("Login Error: ",error);
      
//     } 
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10">
//         {/* Header */}
//         <div className="mb-6 text-center">
//           <h2 className="text-3xl font-bold text-indigo-600">Welcome Back</h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Login to your BookNest account
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <InputField
//             label="Email"
//             name="email"
//             type="email"
//             value={user.email}
//             onChange={handleChange}
//             required
//             placeholder="you@example.com"
//           />

//           <InputField
//             label="Password"
//             name="password"
//             type="password"
//             value={user.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter your password"
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm"
//           >
//             🔐 Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             Register now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/UI/InputField";
import { useStore } from "../store/AppContext";
import { toast } from "react-toastify";

const emptyData = {
  email: "",
  password: "",
};

const Login = () => {
  const { Api, storeTokenInLS, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(emptyData);

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
      const response = await fetch(`${Api}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLS(res_data.token);
        setUser(emptyData);
        navigate("/");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left: Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center bg-indigo-100 p-10">
        <img
          src="/login.svg" 
          alt="Login Illustration"
          className="w-full max-w-sm"
        />
        <h2 className="text-xl font-semibold text-indigo-700 mt-6 text-center">
          Discover your next great read on <span className="font-bold">TurnPage</span>
        </h2>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">Login to your TurnPage account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              🔐 Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register now
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
