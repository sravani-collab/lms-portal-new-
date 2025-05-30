'use client';
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const assignments = [
  { subject: "Computer", date: "May 15, 2025 09:00 AM", grade: "A", status: "Completed" },
  { subject: "Operating Systems", date: "May 20, 2025 09:00 AM", grade: "A", status: "In Progress" },
  { subject: "Python", date: "May 21, 2025 03:00 PM", grade: "B+", status: "Completed" },
  { subject: "Machine Learning", date: "May 23, 2025 04:00 PM", grade: "B", status: "In Progress" },
  { subject: "Internet of Things", date: "May 25, 2025 09:00 AM", grade: "A+", status: "Completed" },
  { subject: "DBMS", date: "May 28, 2025 05:00 PM", grade: "C", status: "In Progress" },
];

const statusStyle = {
  Completed: "bg-purple-100 text-purple-600",
  "In Progress": "bg-blue-100 text-blue-600",
};

export default function AssignmentsDashboard() {
  const [sortBy, setSortBy] = useState("Date Created");

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-indigo-50 p-6 text-sm text-indigo-700 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold">
            <span>🏠</span>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-2 font-semibold">
            <span>📝</span>
            <span>Assignments</span>
          </div>
        </div>
        <div className="space-y-4 pt-20">
          <div className="flex items-center space-x-2">
            <span>💬</span>
            <span>Profile</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⚙️</span>
            <span>Settings</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-white p-10">
        <div className="flex justify-between items-center mb-8">
          <Input placeholder="Search" className="w-96 shadow-md rounded-full px-6 py-2" />
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full border px-4 py-2 text-sm">Sort by: {sortBy}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("Date Created")}>Date Created</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Grade")}>Grade</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center space-x-3">
              <Avatar src="https://i.pravatar.cc/40" />
              <div>
                <p className="font-semibold">David</p>
                <p className="text-xs text-gray-500">david@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 font-semibold">Total: {assignments.length} Assignments</div>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Submission Date</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.subject}</td>
                  <td className="p-3">{a.date}</td>
                  <td className="p-3">{a.grade}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>{a.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2">Showing 1 to {assignments.length} of {assignments.length} entries</p>
        </div>
      </main>
    </div>
  );
} 
