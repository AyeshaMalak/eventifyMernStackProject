// src/pages/UserDashboard/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Globe } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Users className="w-10 h-10 text-teal-600" />,
      title: "Community",
      description:
        "We bring people together through shared interests and meaningful events.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-teal-600" />,
      title: "Event Discovery",
      description:
        "Easily explore and register for exciting events happening near you.",
    },
    {
      icon: <Globe className="w-10 h-10 text-teal-600" />,
      title: "Networking",
      description:
        "Expand your network, meet professionals, and grow your opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header Section / Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-3xl shadow-xl p-12 max-w-5xl mx-auto my-12 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-yellow-300">Eventify</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Eventify is your go-to platform to discover, save, and register for amazing
          events. Our mission is to connect people with opportunities, networking, 
          and unforgettable experiences.
        </motion.p>
        <motion.a
          href="/dashboard/discover"
          className="inline-block mt-6 px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl shadow-md hover:bg-yellow-300 hover:text-black transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Discover Events
        </motion.a>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-teal-600 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-4 p-4 bg-teal-50 rounded-full shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
