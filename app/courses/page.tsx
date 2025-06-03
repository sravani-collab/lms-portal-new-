// app/assignments/page.tsx
"use client";
import React, { useState } from 'react';
import {
  FaGraduationCap,
  FaEnvelope,
} from 'react-icons/fa';
import {
  MdDashboard,
  MdLogout,
  MdSettings,
  MdAssignment,
  MdLibraryBooks,
} from 'react-icons/md';

export default function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState<'enrolled' | 'explore'>('enrolled');

  const enrolledCourses = [
    'Computer Networks',
    'DBMS',
    'Operating Systems',
    'Software Engineering',
    'Web Development',
  ];

  const exploreCourses = [
    'Artificial Intelligence',
    'Cloud Computing',
    'Cyber Security',
    'Blockchain Basics',
    'Machine Learning',
    'Data Structures',
    'React Native',
    'UI/UX Design'
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-48 bg-indigo-50 p-4 flex md:flex-col justify-between">
        <div>
          <div className="flex justify-center mb-6">
            <FaGraduationCap size={36} className="text-indigo-500" />
          </div>
          <nav className="space-y-4">
            <SidebarItem icon={<MdDashboard />} label="Dashboard" />
            <SidebarItem icon={<MdAssignment />} label="Assignments" />
            <SidebarItem icon={<MdLibraryBooks />} label="Courses" active />
            <SidebarItem icon={<FaEnvelope />} label="Profile" />
            <SidebarItem icon={<MdSettings />} label="Settings" />
          </nav>
        </div>
        <SidebarItem icon={<MdLogout />} label="Logout" />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 px-4 py-2 rounded-full shadow-md outline-none"
          />
          <div className="flex items-center gap-4">
            <button className="border rounded-full px-4 py-2 text-sm text-gray-600">
              Sort by: Date Created
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-200" />
              <div>
                <p className="font-semibold">David</p>
                <p className="text-sm text-gray-500">david@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex bg-indigo-100 p-1 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTab === 'enrolled'
                  ? 'bg-white shadow text-indigo-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('enrolled')}
            >
              Enrolled Courses
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTab === 'explore'
                  ? 'bg-white shadow text-indigo-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('explore')}
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedTab === 'enrolled' ? enrolledCourses : exploreCourses).map(
            (course, index) => (
              <div
                key={index}
                className="bg-purple-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  {course}
                </h3>
                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm">
                    View
                  </button>
                  <div className="w-8 h-8 bg-purple-300 rounded-full shadow-inner" />
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }: { icon: JSX.Element; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium ${
        active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-white'
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
