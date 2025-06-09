"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Home,
  FileText,
  BookOpen,
  User,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";

const assignments = [
  { subject: "Computer", date: "May 15, 2025 09:00 AM", grade: "A", status: "COMPLETED" },
  { subject: "Operating Systems", date: "May 20, 2025 09:00 AM", grade: "A", status: "IN PROGRESS" },
  { subject: "Python", date: "May 21, 2025 03:00 PM", grade: "B+", status: "COMPLETED" },
  { subject: "Machine Learning", date: "May 23, 2025 04:00 PM", grade: "B", status: "IN PROGRESS" },
  { subject: "Internet of Things", date: "May 25, 2025 09:00 AM", grade: "A+", status: "COMPLETED" },
  { subject: "DBMS", date: "May 28, 2025 05:00 PM", grade: "C", status: "IN PROGRESS" },
];

function SidebarItem({
  icon,
  label,
  href,
  active,
  className = "",
}: {
  icon: JSX.Element;
  label: string;
  href: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active
          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
          : `text-gray-600 hover:bg-gray-50 hover:text-gray-800 ${className}`
      }`}
    >
      <span className={active ? "text-white" : "text-gray-400 group-hover:text-gray-600"}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
              <SidebarItem icon={<FileText size={20} />} label="Assignments" href="/assignments" active />
              <SidebarItem icon={<BookOpen size={20} />} label="Courses" href="/courses" />
              <SidebarItem icon={<User size={20} />} label="Profile" href="/profile" />
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  D
                </div>
                <div>
                  <p className="font-semibold text-gray-800">David</p>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Assignments Table */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 sm:p-6">
            <p className="text-gray-700 font-semibold mb-4">
              Total: {assignments.length} Assignments
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200">
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Submission Date</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
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
          </div>
        </section>
      </main>
    </div>
  );
}
