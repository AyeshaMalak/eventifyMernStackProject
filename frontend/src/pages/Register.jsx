import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react"; // icons

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registered Successfully! Please login now.");
        window.location.href = "/login";
      } else {
        alert("❌ Register Error: " + data.msg);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Icon + Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg mb-3">
            <User size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Eventify Registration
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Create your account to join events and connect with people.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-teal-400">
            <User className="text-teal-500 mr-3" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-400">
            <Mail className="text-cyan-500 mr-3" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-teal-400">
            <Lock className="text-teal-500 mr-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="bg-transparent w-full text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Register Now
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-teal-600 hover:underline"
            >
              Login here
            </Link>
          </p>
          <p className="text-gray-600">
            Or{" "}
            <Link
              to="/admin-login"
              className="font-semibold text-cyan-600 hover:underline"
            >
              Login as Admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
