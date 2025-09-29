// src/pages/UserDashboard/Contact.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    {
      icon: <Mail className="w-10 h-10 text-cyan-500" />,
      title: "Email",
      value: (
        <a
          href="mailto:support@eventify.com"
          className="text-cyan-500 hover:underline"
        >
          support@eventify.com
        </a>
      ),
    },
    {
      icon: <Phone className="w-10 h-10 text-teal-500" />,
      title: "Phone",
      value: "+92 300 1234567",
    },
    {
      icon: <MapPin className="w-10 h-10 text-pink-500" />,
      title: "Address",
      value: "Karachi, Pakistan",
    },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000); // success message disappears after 4s
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-3xl shadow-xl p-12 max-w-5xl mx-auto my-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Have questions or need help? We’d love to hear from you!
          </p>
        </motion.div>
      </section>

      {/* Contact Cards + Form Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Cards */}
        <div className="space-y-6">
          {contacts.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-white p-10 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
            Send Us a Message
          </h2>

          {submitted && (
            <motion.p
              className="text-green-600 font-medium mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Your message has been sent!
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 flex items-center justify-center gap-2 transition-all duration-300"
            >
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
