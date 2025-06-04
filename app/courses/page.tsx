'use client';
import React, { useState, useEffect } from 'react';
import {
  FaGraduationCap,
  FaEnvelope,
} from 'react-icons/fa';
import {
  MdDashboard,
  MdLogout,
  MdAssignment,
  MdLibraryBooks,
} from 'react-icons/md';

export default function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState<'enrolled' | 'explore'>('enrolled');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [exploreCourses, setExploreCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/courses'); // Adjust this API path as needed
        if (!response.ok) throw new Error('Failed to fetch courses');

        const data = await response.json();

        setEnrolledCourses(data.enrolledCourses || []);
        setExploreCourses(data.exploreCourses || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-48 bg-indigo-50 p-4 flex flex-row md:flex-col justify-between md:items-start items-center">
        <div className="flex md:flex-col items-center md:items-start w-full">
          <div className="flex justify-center md:mb-6 mb-0 w-full">
            <FaGraduationCap size={30} className="text-indigo-500" />
          </div>
          <nav className="flex md:flex-col gap-4 md:gap-2 mt-4 md:mt-0 w-full justify-center md:justify-start">
            <SidebarItem icon={<MdDashboard />} label="Dashboard" />
            <SidebarItem icon={<MdAssignment />} label="Assignments" />
            <SidebarItem icon={<MdLibraryBooks />} label="Courses" active />
            <SidebarItem icon={<FaEnvelope />} label="Profile" />
          </nav>
        </div>
        <div className="hidden md:block mt-auto w-full">
          <SidebarItem icon={<MdLogout />} label="Logout" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-1/2 px-4 py-2 rounded-full shadow-md outline-none"
          />
          <div className="flex items-center gap-4">
            <button className="border rounded-full px-4 py-2 text-sm text-gray-600 whitespace-nowrap">
              Sort by: Date Created
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-200" />
              <div className="hidden sm:block">
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
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTab === 'enrolled'
                  ? 'bg-white shadow text-indigo-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('enrolled')}
            >
              Enrolled Courses
            </button>
            <button
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {(selectedTab === 'enrolled' ? enrolledCourses : exploreCourses).map(
              (course, index) => (
                <div
                  key={index}
                  className="bg-purple-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200"
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
        )}
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: JSX.Element;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-lg cursor-pointer text-sm font-medium transition w-fit md:w-full ${
        active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-white'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </div>
  );
}
