import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api";
import { Mail, Lock, LogIn } from "lucide-react"; // icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const inputWrapperClass =
    "flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-teal-400 transition";

  const inputClass =
    "bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Icon + Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg mb-3">
            <LogIn size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Eventify Login
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className={inputWrapperClass}>
            <Mail className="text-cyan-500 mr-3" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className={inputWrapperClass}>
            <Lock className="text-teal-500 mr-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
          <p>
            Or{" "}
            <Link
              to="/admin-login"
              className="text-cyan-600 hover:underline font-medium"
            >
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
