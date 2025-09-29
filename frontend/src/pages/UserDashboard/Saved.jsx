import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, Trash2, AlertCircle, BookmarkX } from "lucide-react";

export default function Saved() {
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
    setSavedEvents(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = savedEvents.filter((ev) => ev._id !== id);
    setSavedEvents(updated);
    localStorage.setItem("savedEvents", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Saved Events
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Your curated collection of interesting events
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedEvents.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              No Saved Events Yet
            </h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
              Start saving events that catch your interest. You can find them 
              all here for easy access later.
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
                  Your Saved Events ({savedEvents.length})
                </h2>
                <p className="text-slate-600 mt-1">
                  Events you've bookmarked for later
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedEvents.map((event) => (
                <div
                  key={event._id}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-200 
                           hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1 
                           transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header with Heart Icon */}
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full 
                                     text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        <Heart className="w-3 h-3 mr-1 fill-current" />
                        Saved
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

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {/* View Details Button */}
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                       bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-800 
                                       border border-teal-200 hover:border-teal-300 rounded-xl 
                                       font-medium transition-all duration-200 
                                       hover:shadow-md hover:shadow-teal-100">
                        <Calendar className="w-4 h-4" />
                        View Details
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(event._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white 
                                 border border-red-200 hover:border-red-500 rounded-xl 
                                 font-medium transition-all duration-200 
                                 hover:shadow-md hover:shadow-red-100"
                      >
                        <BookmarkX className="w-4 h-4" />
                        Remove from Saved
                      </button>
                    </div>
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