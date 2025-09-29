// Login.jsx
import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react"; // added icon

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        if (data.user.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        alert("❌ " + data.msg);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-md w-full p-8 space-y-6">
        {/* Icon at top */}
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg">
            <ShieldCheck className="text-white" size={36} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center">
          Sign in to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Mail className="absolute top-10 left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Lock className="absolute top-10 left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Modern Teal-Cyan Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Link also teal for consistency */}
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-teal-600 font-medium hover:text-cyan-600 hover:underline transition-colors duration-200"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
