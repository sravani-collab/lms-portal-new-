'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Settings,
  LogOut,
  Bell,
  Home,
  FileText,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

export default function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    name: 'David',
    role: 'Student',
    email: 'david@example.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    profileComplete: 75,
    about: "Passionate learner and aspiring software engineer. Love coding, coffee, and cats.",
  });

  // For editing form toggling & fields
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800"></span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <SidebarItem icon={<Home size={20} />} label="Dashboard" href="/dashboard" />
              <SidebarItem icon={<FileText size={20} />} label="Assignments" href="/assignments" />
              <SidebarItem icon={<BookOpen size={20} />} label="Courses" href="/courses" />
              <SidebarItem icon={<User size={20} />} label="Profile" href="/profile" active />
            </div>
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-100">
            <SidebarItem
              icon={<LogOut size={20} />}
              label="Logout"
              href="/logout"
              className="text-red-600 hover:bg-red-50"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Search + Notification */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600 mb-8">Manage your personal info and settings</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-purple-600 font-semibold">{user.role}</p>
                <p className="text-center text-gray-600 mt-4">{user.about}</p>

                {/* Profile Completeness */}
                <div className="w-full mt-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
                    <span className="text-sm font-semibold text-purple-600">{user.profileComplete}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${user.profileComplete}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Edit Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-purple-500 text-purple-600 hover:bg-purple-50 transition"
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {!editing ? (
                <div className="space-y-4 text-gray-700">
                  <div>
                    <label className="block font-medium mb-1">Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Phone</label>
                    <p>{user.phone}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Location</label>
                    <p>{user.location}</p>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">About Me</label>
                    <p>{user.about}</p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block font-medium mb-1 text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-medium mb-1 text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-medium mb-1 text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block font-medium mb-1 text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="about" className="block font-medium mb-1 text-gray-700">
                      About Me
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
  className = ''
}: {
  icon: JSX.Element;
  label: string;
  href: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active
          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
          : `text-gray-600 hover:bg-gray-50 hover:text-gray-800 ${className}`
      }`}
    >
      <span className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}
