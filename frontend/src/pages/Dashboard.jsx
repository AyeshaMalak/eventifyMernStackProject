import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "user");
      } catch (err) {
        console.error("Token decode error:", err.message);
        setRole("user");
      }
    } else {
      setRole("user");
    }
  }, []);

  if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
}
