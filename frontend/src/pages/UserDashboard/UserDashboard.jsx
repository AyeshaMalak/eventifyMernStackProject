import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

// User pages
import Discover from "./Discover";
import Saved from "./Saved";
import Profile from "./Profile";
import Registered from "./Registered";
import About from "./About";
import Contact from "./Contact";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route path="discover" element={<Discover />} />
          <Route path="saved" element={<Saved />} />
          <Route path="profile" element={<Profile />} />
          <Route path="registered" element={<Registered />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Default route */}
          <Route path="*" element={<Discover />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
