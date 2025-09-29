import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid3x3 as Grid3X3, Heart, User, Ticket, Info, Phone, Menu, X, Calendar } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard/discover", label: "Discover", icon: <Grid3X3 size={20} /> },
    { to: "/dashboard/saved", label: "Saved", icon: <Heart size={20} /> },
    { to: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
    { to: "/dashboard/registered", label: "Registered", icon: <Ticket size={20} /> },
    { to: "/dashboard/about", label: "About Us", icon: <Info size={20} /> },
    { to: "/dashboard/contact", label: "Contact", icon: <Phone size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 bg-white shadow-lg border border-slate-200 
                   text-teal-600 p-3 rounded-xl hover:bg-teal-50 transition-all duration-200 
                   hover:shadow-xl hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-gradient-to-b from-teal-600 to-teal-700 
        text-white shadow-2xl transform transition-all duration-300 ease-in-out z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header Section */}
        <div className="p-8 border-b border-teal-500/30">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white">
            Event Hub
          </h2>
          <p className="text-teal-100 text-sm text-center mt-1 opacity-90">
            Your Event Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 
                relative overflow-hidden hover:bg-white/10 hover:shadow-lg hover:translate-x-1 ${
                  isActive 
                    ? "bg-white/15 shadow-lg backdrop-blur-sm border border-white/20" 
                    : "hover:bg-white/8"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                  )}
                  
                  {/* Icon container */}
                  <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-teal-100 group-hover:bg-white/10 group-hover:text-white"
                  }`}>
                    {link.icon}
                  </div>
                  
                  {/* Label */}
                  <span className={`font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-white font-semibold" 
                      : "text-teal-100 group-hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                                rounded-xl" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-teal-500/30">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Welcome back!</p>
                <p className="text-teal-100 text-xs opacity-90">Manage your events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
