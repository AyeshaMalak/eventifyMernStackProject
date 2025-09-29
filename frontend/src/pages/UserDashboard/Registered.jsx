import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Ticket, Trash2, AlertCircle } from "lucide-react";

export default function Registered() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setRegisteredEvents(data);
  }, []);

  const handleCancel = (id) => {
    const updated = registeredEvents.filter((ev) => ev._id !== id);
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Ticket className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              My Registered Events
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Manage all your event registrations in one place
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {registeredEvents.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              No Registered Events
            </h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
              You haven't registered for any events yet. Discover exciting events 
              and start building your event portfolio.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 
                             text-white font-semibold rounded-xl transition-colors duration-200 
                             transform hover:scale-105">
              <Calendar className="w-5 h-5 mr-2" />
              Discover Events
            </button>
          </div>
        ) : (
          /* Events Grid */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Events ({registeredEvents.length})
                </h2>
                <p className="text-slate-600 mt-1">
                  Upcoming and past event registrations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <div
                  key={event._id}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-200 
                           hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1 
                           transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header with Status */}
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full 
                                     text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        <Ticket className="w-3 h-3 mr-1" />
                        Registered
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 
                                 group-hover:text-teal-700 transition-colors duration-200">
                      {event.title}
                    </h3>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{event.date}</span>
                      </div>
                    </div>

                    {/* Registration Details */}
                    {event.registration && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                              Ticket Number
                            </span>
                            <span className="text-sm font-mono text-teal-600 font-semibold">
                              {event.registration.ticketNumber}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                              Registration Date
                            </span>
                            <span className="text-sm text-slate-600">
                              {new Date(event.registration.registrationDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancel Button */}
                    <button
                      onClick={() => handleCancel(event._id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 
                               bg-red-50 hover:bg-red-500 text-red-600 hover:text-white 
                               border border-red-200 hover:border-red-500 rounded-xl 
                               font-medium transition-all duration-200 
                               hover:shadow-md hover:shadow-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel Registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}