// app/assignments/page.tsx
import React from 'react';
import { useEffect, useState } from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt,FaGraduationCap, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import {  MdDashboard,
  MdLogout,
  MdSettings,
  MdAssignment,
  MdLibraryBooks, 

} from 'react-icons/md';

const assignments = [
  { subject: 'Computer', date: 'May 15, 2025 09:00 AM', grade: 'A', status: 'COMPLETED' },
  { subject: 'Operating Systems', date: 'May 20, 2025 09:00 AM', grade: 'A', status: 'IN PROGRESS' },
  { subject: 'Python', date: 'May 21, 2025 03:00 PM', grade: 'B+', status: 'COMPLETED' },
  { subject: 'Machine Learning', date: 'May 23, 2025 04:00 PM', grade: 'B', status: 'IN PROGRESS' },
  { subject: 'Internet of Things', date: 'May 25, 2025 09:00 AM', grade: 'A+', status: 'COMPLETED' },
  { subject: 'DBMS', date: 'May 28, 2025 05:00 PM', grade: 'C', status: 'IN PROGRESS' },
];

export default function AssignmentsPage() {
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
                 <SidebarItem icon={<MdAssignment />} label="Assignments" active />
                 <SidebarItem icon={<MdLibraryBooks />} label="Courses" />
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
              <img
                src="null"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">David</p>
                <p className="text-sm text-blue-500">david@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <p className="font-semibold mb-4">Total: {assignments.length} Assignments</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Submission Date</th>
                <th className="py-2 px-4">Grade</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.subject}</td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4">{item.grade}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'COMPLETED'
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-4">Showing 1 to 6 of 6 entries</p>
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
