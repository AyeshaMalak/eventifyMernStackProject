import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API as api } from "../../api";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Ticket,
  Search,
  LogOut,
  X,
  Download,
  CheckCircle,
  Clock,
  Building2,
  Award,
  ArrowRight,
  Filter,
  Grid3X3,
  List,
   Heart as HeartIcon,
    Heart,
} from "lucide-react";

export default function Discover() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
    const [savedEvents, setSavedEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    city: "",
    education: "",
    gender: "",
    notes: "",
  });
  const [ticketData, setTicketData] = useState(null);
  const [search, setSearch] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const navigate = useNavigate();
  const formRef = useRef(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
      setFilteredEvents(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(
      (ev) =>
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [search, events]);

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await api.post("/event-registrations", {
      eventId: selectedEvent._id,
      ...formData,
    });

    setSuccessMsg(res.data.msg || "🎉 Successfully registered!");
    setTicketData(res.data.registration);

    // ✅ Save registered event in localStorage
    let registered = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    if (!registered.find((ev) => ev._id === selectedEvent._id)) {
      registered.push({
        ...selectedEvent,
        registration: res.data.registration,
      });
      localStorage.setItem("registeredEvents", JSON.stringify(registered));
    }

    setSelectedEvent(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      cnic: "",
      city: "",
      education: "",
      gender: "",
      notes: "",
    });
    setIsLoading(false);

    setTimeout(() => setSuccessMsg(""), 5000);
  } catch (err) {
    alert(err.response?.data?.msg || "❌ Error registering");
    setIsLoading(false);
  }
};
const handleSaveEvent = (event) => {
  let saved = JSON.parse(localStorage.getItem("savedEvents")) || [];

  if (!saved.find((ev) => ev._id === event._id)) {
    saved.push(event);
    localStorage.setItem("savedEvents", JSON.stringify(saved));
    alert("✅ Event saved!");
  } else {
    alert("⚠️ Already saved!");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    try {
      const res = await api.get(`/event-registrations/ticket/${ticketData._id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${ticketData.ticketNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error downloading ticket");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedOut(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: "Past", color: "text-slate-500 bg-slate-100" };
    if (diffDays === 0) return { status: "Today", color: "text-red-700 bg-red-100" };
    if (diffDays <= 7) return { status: "This Week", color: "text-orange-700 bg-orange-100" };
    return { status: "Upcoming", color: "text-green-700 bg-green-100" };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">EventPro</h1>
              <p className="text-slate-500 text-sm">Professional Event Platform</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Professional Events
            </h2>
            <p className="text-xl text-teal-100 mb-6 max-w-2xl">
              Join industry-leading conferences, workshops, and networking events.
              Connect with professionals and advance your career.
            </p>
            <div className="flex flex-wrap gap-4 text-teal-100">
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>Premium Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Expert Speakers</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={20} />
                <span>Professional Networking</span>
              </div>
            </div>
          </div>
        </div>
        {/* Success Messages */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
            <p className="text-green-800 font-medium">{successMsg}</p>
          </div>
        )}

        {loggedOut && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
            <p className="text-blue-800 font-medium">Successfully logged out. Redirecting...</p>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events by title or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "list"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">Available Events</h3>
            <p className="text-slate-600">{filteredEvents.length} events found</p>
          </div>

          {/* Events Grid/List */}
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
            : "space-y-4"
          }>
            {filteredEvents.map((event) => {
              const eventStatus = getEventStatus(event.date);
               const isSaved = savedEvents.some((e) => e._id === event._id); 

              return (
                <div
                  key={event._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {event.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${eventStatus.color}`}>
                            {eventStatus.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-400" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-400" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            <span>{event.attendees || "TBA"} attendees</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star size={16} className="text-amber-400 fill-amber-400" />
                            <span>{event.rating || "New"}</span>
                          </div>
                        </div>

                        {event.description && (
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock size={14} />
                        <span>Registration open</span>
                      </div>
                         {/* Buttons */}
         <button onClick={() => setSelectedEvent(event)} className="flex items-center gap-2 px-6 py-2 bg-teal-600 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors duration-200" >
           Register <ArrowRight size={16} />
          </button>

        {/* Save Button */}
        <button
          onClick={() => handleSaveEvent(event)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 w-full sm:w-auto
            ${isSaved ? "bg-pink-500 hover:bg-pink-600 text-white" : "bg-white border border-pink-500 text-pink-500 hover:bg-pink-50"}`}
        >
          {isSaved ? <HeartIcon className="w-5 h-5 fill-current" /> : <Heart className="w-5 h-5" />}
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
                    </div>
               
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Events Found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or check back later for new events.</p>
            </div>
          )}
        </div>

        {/* Registration Form Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Event Registration
                    </h3>
                    <p className="text-slate-600">
                      Register for <span className="font-semibold text-teal-600">{selectedEvent.title}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {["name", "email", "phone", "cnic", "city", "education"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                        {["name", "email", "phone", "cnic"].includes(field) && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <input
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                        required={["name", "email", "phone", "cnic"].includes(field)}
                        placeholder={`Enter your ${field}`}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none"
                      placeholder="Any special requirements or dietary restrictions..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-teal-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Complete Registration"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket Modal */}
        {ticketData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6 text-center border-b border-slate-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Registration Confirmed!
                </h3>
                <p className="text-slate-600">Your event ticket has been generated successfully</p>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Event:</span>
                    <span className="text-slate-900 font-semibold text-right">
                      {ticketData.eventId?.title || "Event Details"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Ticket Number:</span>
                    <span className="text-teal-600 font-bold">{ticketData.ticketNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Attendee:</span>
                    <span className="text-slate-900 font-semibold">{ticketData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Email:</span>
                    <span className="text-slate-900 font-semibold text-right text-sm">{ticketData.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Registered:</span>
                    <span className="text-slate-900 font-semibold text-sm">
                      {new Date(ticketData.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    <Download size={18} />
                    Download Ticket
                  </button>
                  <button
                    onClick={() => setTicketData(null)}
                    className="flex-1 py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 