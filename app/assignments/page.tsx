'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
const assignments = [
 { subject: "Computer", date: "May 15, 2025 09:00 AM", grade: "A", status: "Completed" },
 { subject: "Operating Systems", date: "May 20, 2025 09:00 AM", grade: "A", status: "In Progress" },
 { subject: "Python", date: "May 21, 2025 03:00 PM", grade: "B+", status: "Completed" },
 { subject: "Machine Learning", date: "May 23, 2025 04:00 PM", grade: "B", status: "In Progress" },
 { subject: "Internet of Things", date: "May 25, 2025 09:00 AM", grade: "A+", status: "Completed" },
 { subject: "DBMS", date: "May 28, 2025 05:00 PM", grade: "C", status: "In Progress" },
];
const statusStyle = {
 "Completed": "bg-purple-100 text-purple-700",
 "In Progress": "bg-blue-100 text-blue-700"
};
export default function AssignmentsDashboard() {
 const [sortBy, setSortBy] = useState("Date Created","Grade");
 
 return (
<div className="flex h-screen font-sans">
     {/* Sidebar */}
<aside className="w-60 bg-indigo-50 p-6 text-sm text-indigo-700 flex flex-col justify-between">
<div className="space-y-8">
<div className="font-semibold flex items-center gap-4 px-3 py-2 text-indigo-700">
<span>🏠</span><span>Dashboard</span>
</div>
<div className="font-semibold flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow text-indigo-700">
<span>📋</span><span>Assignments</span>
</div>
</div>
<div className="space-y-4">
<div className="font-semibold flex items-center gap-2 text-indigo-700"><span>💬</span><span>Profile</span></div>
<div className="font-semibold flex items-center gap-2 text-indigo-700"><span>⚙️</span><span>Settings</span></div>
<div className="font-semibold flex items-center gap-2 text-indigo-700"><span>🚪</span><span>Logout</span></div>
</div>
</aside>
     {/* Main */}
<main className="flex-1 bg-white p-10">
       {/* Header */}
<div className="flex justify-between items-center mb-10">
<Input
           placeholder="Search"
           className="w-[380px] px-6 py-2 rounded-full shadow-md bg-white focus:outline-none"
         />
<div className="flex items-center gap-6">
<DropdownMenu>
<DropdownMenuTrigger asChild>
<Button variant="outline" className="rounded-full px-4 py-2 text-sm flex items-center gap-2 ">
                 Sort by: {sortBy} <ChevronDown className="w-4 h-4" />
</Button>
</DropdownMenuTrigger>
<DropdownMenuContent className="shadow-lg border">
<DropdownMenuItem onClick={() => setSortBy("Date Created")}>Date Created</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSortBy("Grade")}>Grade</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
<div className="flex items-center gap-3">
<Avatar src="https://i.pravatar.cc/40" className="rounded-full border" />
<div>
<p className="font-semibold">David</p>
<p className="text-xs text-gray-500">david@gmail.com</p>
</div>
</div>
</div>
</div>
       {/* Assignments Table */}
<div className="mb-4 font-semibold text-lg">Total: {assignments.length} Assignments</div>
<div className="overflow-x-auto rounded-xl border shadow-sm">
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
<tr key={i} className="border-b hover:bg-gray-50 transition">
<td className="p-3 font-medium">{a.subject}</td>
<td className="p-3">{a.date}</td>
<td className="p-3">{a.grade}</td>
<td className="p-3">
<span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[a.status]}`}>
                     {a.status.toUpperCase()}
</span>
</td>
</tr>
             ))}
</tbody>
</table>
<div className="text-xs text-gray-500 mt-3 px-3 py-2 flex justify-between items-center">
<span>Showing 1 to {assignments.length} of {assignments.length} entries</span>
<button className="px-3 py-1 border rounded-md text-sm text-indigo-600 hover:bg-indigo-50 transition">1</button>
</div>
</div>
</main>
</div>
 );
}