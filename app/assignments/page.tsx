"use client";

import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBars,
  FaEnvelope,
} from "react-icons/fa";
import {
  MdDashboard,
  MdLogout,
  MdAssignment,
  MdLibraryBooks,
} from "react-icons/md";

const assignments = [
  { subject: "Computer", date: "May 15, 2025 09:00 AM", grade: "A", status: "COMPLETED" },
  { subject: "Operating Systems", date: "May 20, 2025 09:00 AM", grade: "A", status: "IN PROGRESS" },
  { subject: "Python", date: "May 21, 2025 03:00 PM", grade: "B+", status: "COMPLETED" },
  { subject: "Machine Learning", date: "May 23, 2025 04:00 PM", grade: "B", status: "IN PROGRESS" },
  { subject: "Internet of Things", date: "May 25, 2025 09:00 AM", grade: "A+", status: "COMPLETED" },
  { subject: "DBMS", date: "May 28, 2025 05:00 PM", grade: "C", status: "IN PROGRESS" },
];

export default function AssignmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - fixed width 64 (16rem) on md+ screens */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-indigo-50 p-4 flex flex-col justify-between
          w-64 z-50
          transform
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div>
          <div className="flex justify-center mb-6">
            <FaGraduationCap size={36} className="text-indigo-500" />
          </div>
          <nav className="space-y-4">
            <SidebarItem icon={<MdDashboard size={20} />} label="Dashboard" />
            <SidebarItem icon={<MdAssignment size={20} />} label="Assignments" active />
            <SidebarItem icon={<MdLibraryBooks size={20} />} label="Courses" />
            <SidebarItem icon={<FaEnvelope size={18} />} label="Profile" />
          </nav>
        </div>
        <SidebarItem icon={<MdLogout size={20} />} label="Logout" />
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen
                      md:ml-64
                      transition-all duration-300 ease-in-out">

        {/* Mobile topbar with hamburger */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-lg font-semibold text-indigo-600">Assignments</h1>
          <div aria-hidden="true" className="w-6" />
        </header>

        {/* Desktop topbar (optional) */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-700">Assignments</h1>
          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Search"
              className="w-64 px-4 py-2 rounded-full shadow-md outline-none text-gray-700"
            />
            <button className="border rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition">
              Sort by: Date Created
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">David</p>
                <p className="text-sm text-blue-500">david@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search & profile (below header) */}
        <div className="md:hidden flex flex-col gap-4 p-4 bg-white border-b border-gray-200">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-full shadow-md outline-none text-gray-700"
          />
          <div className="flex items-center justify-between">
            <button className="border rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition w-full mr-4">
              Sort by: Date Created
            </button>
            <img
              src="null"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <p className="font-semibold mb-4 text-gray-700">
            Total: {assignments.length} Assignments
          </p>

          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="py-3 px-4 whitespace-nowrap">Subject</th>
                  <th className="py-3 px-4 whitespace-nowrap">Submission Date</th>
                  <th className="py-3 px-4 whitespace-nowrap">Grade</th>
                  <th className="py-3 px-4 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{item.subject}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.grade}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium select-none ${
                          item.status === "COMPLETED"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Showing 1 to {assignments.length} of {assignments.length} entries
          </p>
        </main>
      </div>
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
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium select-none transition-colors
        ${
          active
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-gray-600 hover:bg-white hover:text-indigo-600"
        }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </div>
  );
}
