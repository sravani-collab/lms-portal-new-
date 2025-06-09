// app/coursedetail/[id]/CourseDetailPage.tsx

'use client';

import React, { useState, useEffect} from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout";
import SidebarItem from "@/components/SidebarItem";
import {
  GraduationCap,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Home,
  BookOpen,
  FileText,
} from "lucide-react";

const mockCourseModules: Record<
  string,
  { title: string; lessons: { id: string; title: string; completed: boolean }[] }[]
> = {
  "1": [
    {
      title: "Intro to Networking",
      lessons: [
        { id: "1", title: "What is Networking?", completed: true },
        { id: "2", title: "Types of Networks", completed: false },
      ],
    },
    {
      title: "Networking Protocols",
      lessons: [
        { id: "3", title: "TCP/IP Model", completed: false },
        { id: "4", title: "UDP and ICMP", completed: false },
      ],
    },
  ],
  "2": [
    {
      title: "Intro to DBMS",
      lessons: [
        { id: "1", title: "What is a DBMS?", completed: true },
        { id: "2", title: "Relational vs Non-relational", completed: false },
      ],
    },
    {
      title: "SQL Essentials",
      lessons: [
        { id: "3", title: "SELECT Queries", completed: false },
        { id: "4", title: "JOINs & Subqueries", completed: false },
      ],
    },
  ],
  "3": [
    {
      title: "Intro to OS",
      lessons: [
        { id: "1", title: "What is an Operating System?", completed: true },
        { id: "2", title: "Process Management", completed: true },
      ],
    },
    {
      title: "Memory & File Systems",
      lessons: [
        { id: "3", title: "Memory Allocation", completed: false },
        { id: "4", title: "File System Structures", completed: false },
      ],
    },
  ],
};

const courseTitles: Record<string, string> = {
  "1": "Computer Networks",
  "2": "DBMS",
  "3": "Operating Systems",
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const courseId = id as string;
  const modules = mockCourseModules[courseId] || [];
  const courseTitle = courseTitles[courseId] || "Unknown Course";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const filteredModules = modules.map((mod) => ({
    ...mod,
    lessons: mod.lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const currentLessonTitle =
    modules
      .flatMap((mod) => mod.lessons)
      .find((lesson) => lesson.id === selectedLesson)?.title || "Select a lesson";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-xl lg:h-auto">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center py-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800"></span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <SidebarItem icon={<Home size={20} />} label="Dashboard" href="/dashboard" />
              <SidebarItem icon={<FileText size={20} />} label="Assignments" href="/assignments" />
              <SidebarItem icon={<BookOpen size={20} />} label="Courses" href="/courses" active />
              <SidebarItem icon={<User size={20} />} label="Profile" href="/profile" />
            </div>
          </nav>

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
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{courseTitle}</h1>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
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
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow col-span-1 overflow-y-auto max-h-[600px]">
            <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
            <ul className="space-y-4">
              {filteredModules.length === 0 ? (
                <p className="text-gray-600">No lessons found 😕</p>
              ) : (
                filteredModules.map((mod, idx) => (
                  <li key={idx}>
                    <details open={idx === 0}>
                      <summary className="cursor-pointer font-medium">{mod.title}</summary>
                      {mod.lessons.length > 0 ? (
                        <ul className="ml-4 mt-2 space-y-1 text-[#7c6f98]">
                          {mod.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              onClick={() => setSelectedLesson(lesson.id)}
                              className={`cursor-pointer rounded-md px-3 py-1 ${
                                selectedLesson === lesson.id
                                  ? "bg-purple-200 text-purple-900 font-semibold"
                                  : "hover:bg-purple-50"
                              }`}
                            >
                              {lesson.title}
                              {lesson.completed && (
                                <span className="ml-2 text-green-600">✅</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="ml-4 mt-2 text-sm text-gray-400 italic">No lessons here.</p>
                      )}
                    </details>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6 bg-white rounded-2xl p-8 shadow min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{currentLessonTitle}</h2>
              <div className="bg-[#e7e3fa] rounded-xl flex items-center justify-center h-56 mb-6">
                <svg width="60" height="60" fill="none" stroke="#6d28d9" strokeWidth="2">
                  <polygon points="20,15 50,30 20,45" fill="none" />
                </svg>
              </div>
              <p className="text-gray-700">
                {selectedLesson
                  ? `Content for lesson ID ${selectedLesson} goes here. Get ready to level up! 🚀`
                  : "Select a lesson from the modules on the left to get started."}
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  const allLessons = modules.flatMap((mod) => mod.lessons);
                  if (!selectedLesson) return;
                  const idx = allLessons.findIndex((l) => l.id === selectedLesson);
                  if (idx > 0) setSelectedLesson(allLessons[idx - 1].id);
                }}
                disabled={!selectedLesson || modules.flatMap((mod) => mod.lessons).findIndex((l) => l.id === selectedLesson) === 0}
                className="rounded-full px-6 py-2 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>

              <button
                onClick={() => {
                  const allLessons = modules.flatMap((mod) => mod.lessons);
                  if (!selectedLesson) return;
                  const idx = allLessons.findIndex((l) => l.id === selectedLesson);
                  if (idx < allLessons.length - 1) setSelectedLesson(allLessons[idx + 1].id);
                }}
                disabled={!selectedLesson || modules.flatMap((mod) => mod.lessons).findIndex((l) => l.id === selectedLesson) === modules.flatMap((mod) => mod.lessons).length - 1}
                className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
