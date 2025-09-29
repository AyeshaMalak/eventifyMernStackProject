import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  LogOut,
  Plus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  FileText,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Building2,
  Clock,
  Star,
  TrendingUp,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    isPaid: false,
  });
  const [loggedOut, setLoggedOut] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);

   const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/events-with-registrations",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) return alert("Not authorized");

      if (selectedEvent) {
        await axios.put(
          `http://localhost:3000/api/admin/events/${selectedEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Event updated successfully!");
      } else {
        await axios.post(
          "http://localhost:3000/api/admin/events",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Event created successfully!");
      }

      setFormData({ title: "", location: "", date: "", description: "", isPaid: false });
      setSelectedEvent(null);
      fetchEvents();

      // 3 sec me message hide ho jaye
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error("Error submitting event:", err.response?.data || err.message);
      setMessage("❌ Failed to save event.");
      setTimeout(() => setMessage(null), 3000);
    }
  };


    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Event deleted successfully!");
      fetchEvents();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting event:", err.response?.data || err.message);
      setMessage("❌ Failed to delete event.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

   const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      location: event.location,
      date: new Date(event.date).toISOString().slice(0, 16),
      description: event.description,
      isPaid: event.isPaid,
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedOut(true);
  };

  if (loggedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <LogOut className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Logout Successful
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Your session has been securely ended. Please login again to access the dashboard.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-teal-700 font-medium text-sm">Thank you for using EventPro</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 px-6 py-4">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                EventPro Dashboard
              </h1>
              <p className="text-slate-500 text-sm">Event & Registration Management</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors duration-200"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-teal-600" size={20} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Events</p>
                <p className="text-2xl font-bold text-slate-900">{events.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Registrations</p>
                <p className="text-2xl font-bold text-slate-900">
                  {events.reduce((total, event) => total + (event.registrations?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Paid Events</p>
                <p className="text-2xl font-bold text-slate-900">
                  {events.filter(event => event.isPaid).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg. Registrations</p>
                <p className="text-2xl font-bold text-slate-900">
                  {events.length > 0 ? Math.round(events.reduce((total, event) => total + (event.registrations?.length || 0), 0) / events.length) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Event Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                {selectedEvent ? <Edit className="text--800" size={18} /> : <Plus className="text-teal-600" size={18} />}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="text-slate-500 text-sm">
                  {selectedEvent ? "Update event details" : "Add a new event to the platform"}
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Event Title *
                </label>
                <input
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-cyan-500 outline-none transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location *
                </label>
                <input
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-cyan-500 outline-none transition-colors duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date & Time *
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-cyan-500 outline-none transition-colors duration-200"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter event description (optional)"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-cyan-500 outline-none transition-colors duration-200 resize-none"
              />
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-6">
              <input
                type="checkbox"
                name="isPaid"
                checked={formData.isPaid}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
              />
              <label className="flex items-center gap-2 text-slate-700 font-medium">
                <DollarSign size={16} className="text-emerald-600" />
                This is a paid event
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-teal-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
              >
                {selectedEvent ? "Update Event" : "Create Event"}
              </button>
              {selectedEvent && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(null);
                    setFormData({
                      title: "",
                      location: "",
                      date: "",
                      description: "",
                      isPaid: false,
                    });
                  }}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Activity className="text-emerald-600" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Event Management</h2>
                <p className="text-slate-500 text-sm">Manage events and view registrations</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((ev) => (
                  <div key={ev._id} className="border border-slate-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Calendar className="text-teal-600" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                {ev.title}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  <span>{ev.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{new Date(ev.date).toLocaleString()}</span>
                                </div>
                                {ev.isPaid && (
                                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                    Paid Event
                                  </span>
                                )}
                              </div>
                              {ev.description && (
                                <p className="text-slate-600 text-sm leading-relaxed">{ev.description}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(ev)} 
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-teal-600 rounded-lg transition-colors duration-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(ev._id)} 
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Registrations Section */}
                      {ev.registrations && ev.registrations.length > 0 ? (
                        <div className="mt-4">
                          <button
                            onClick={() => setExpandedEvent(expandedEvent === ev._id ? null : ev._id)}
                            className="flex items-center justify-between w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <Users size={16} />
                              <span>Registrations ({ev.registrations.length})</span>
                            </div>
                            {expandedEvent === ev._id ? 
                              <ChevronUp size={16} /> : 
                              <ChevronDown size={16} />
                            }
                          </button>
                          
                          {expandedEvent === ev._id && (
                            <div className="mt-3 space-y-2">
                              {ev.registrations.map((r) => (
                                <div key={r._id} className="bg-slate-50 rounded-lg p-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                    <div>
                                      <span className="font-medium text-slate-700">Name:</span>
                                      <p className="text-slate-600">{r.name}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-slate-700">Email:</span>
                                      <p className="text-slate-600 break-all">{r.email}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-slate-700">Phone:</span>
                                      <p className="text-slate-600">{r.phone || "Not provided"}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-slate-700">Ticket:</span>
                                      <p className="text-teal-600 font-medium">{r.ticketNumber || "N/A"}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg text-center">
                          <Users size={20} className="text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600 text-sm font-medium">No registrations yet</p>
                          <p className="text-slate-500 text-xs">Registrations will appear here once users sign up</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Events Created</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Get started by creating your first event using the form above.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Summary Table */}
        {events.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-purple-600" size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Events Overview</h2>
                  <p className="text-slate-500 text-sm">Complete summary of all events</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Registrations</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {events.map((ev) => (
                    <tr key={ev._id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{ev.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{new Date(ev.date).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{ev.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ev.isPaid ? (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 text-slate-800 rounded-full">
                            Free
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-sm font-medium bg-blue-100 text-teal-600 rounded-full">
                          {ev.registrations?.length || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}