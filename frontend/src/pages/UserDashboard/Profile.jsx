import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Shield, Loader2, AlertCircle, UserCircle } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        setError("Failed to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          </div>
          <p className="text-slate-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Profile Error
          </h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 
                     text-white font-semibold rounded-xl transition-colors duration-200 
                     transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <UserCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              User Profile
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Manage your account information and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 
                          hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300 
                          overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 
                              bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user?.name}
                </h2>
                <p className="text-teal-100 opacity-90">
                  {user?.role || "User"}
                </p>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg 
                                  flex items-center justify-center">
                      <Mail className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700">Email</p>
                      <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg 
                                  flex items-center justify-center">
                      <Shield className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700">Role</p>
                      <p className="text-sm text-slate-500">{user?.role || "User"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                   bg-teal-50 hover:bg-teal-100 text-teal-700 hover:text-teal-800 
                                   border border-teal-200 hover:border-teal-300 rounded-xl 
                                   font-medium transition-all duration-200 
                                   hover:shadow-md hover:shadow-teal-100">
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 
                          hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-300">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">
                  Account Information
                </h3>
                <p className="text-slate-600 mt-1">
                  Your personal account details and information
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-slate-900 font-medium">{user?.name}</p>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-slate-900 font-medium">{user?.email}</p>
                    </div>
                  </div>

                  {/* Account Role */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Account Role
                    </label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="inline-flex items-center px-3 py-1 rounded-full 
                                     text-xs font-medium bg-teal-100 text-teal-800">
                        <Shield className="w-3 h-3 mr-1" />
                        {user?.role || "User"}
                      </span>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Account Status
                    </label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="inline-flex items-center px-3 py-1 rounded-full 
                                     text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-teal-900 mb-1">
                        Profile Complete
                      </h4>
                      <p className="text-sm text-teal-700">
                        Your profile information is up to date. You can edit your details 
                        anytime by clicking the "Edit Profile" button.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;