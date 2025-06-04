'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronRight, FaChevronLeft, FaPlay } from 'react-icons/fa';
import { MdDashboard, MdAssignment, MdLibraryBooks, MdSettings, MdLogout } from 'react-icons/md';
import { FaGraduationCap, FaEnvelope } from 'react-icons/fa';

export default function CourseDetailPage() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(1);
  const router = useRouter();

  const modules = [
    {
      title: 'Module 1 Introduction',
      lessons: ['Lesson 1.1 Overview', 'Lesson 1.2 Basics'],
    },
    {
      title: 'Module 2 OSI Models',
      lessons: [],
    },
    {
      title: 'Module 3 TCP/IP',
      lessons: [],
    },
    {
      title: 'Module 4 Protocols',
      lessons: [],
    },
  ];

  const currentLesson = modules[0].lessons[activeLesson];

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-20 lg:w-48 bg-indigo-50 p-4 flex md:flex-col items-center justify-between md:justify-start space-y-4 md:space-y-4">
        <FaGraduationCap size={36} className="text-indigo-500 mb-4 hidden md:block" />
        <div className="flex md:flex-col gap-4 md:gap-2">
          <SidebarIcon icon={<MdDashboard />} label="Dashboard" />
          <SidebarIcon icon={<MdAssignment />} label="Assignments" />
          <SidebarIcon icon={<MdLibraryBooks />} label="Courses" active />
          <SidebarIcon icon={<FaEnvelope />} label="Profile" />
          <SidebarIcon icon={<MdLogout />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#f7f1fa] p-4 md:p-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button
            className="px-4 py-2 text-black-600"
            onClick={() => router.back()}
          >
            <FaChevronLeft className="inline mr-2" />Courses
          </button>
          <h1 className="text-xl md:text-3xl font-bold">Introduction to Computer Networks</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-full shadow-md outline-none"
            />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="hidden md:block">
                <p className="font-semibold">David</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-purple-200 mt-2 mb-6"></div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Modules List */}
          <div className="bg-white rounded-2xl p-4 w-full lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Course Modules</h2>
            {modules.map((module, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium">› {module.title}</p>
                <div className="ml-4 mt-2 space-y-1">
                  {module.lessons.map((lesson, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-700 cursor-pointer hover:underline"
                      onClick={() => {
                        setActiveModule(idx);
                        setActiveLesson(i);
                      }}
                    >
                      {lesson}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">{currentLesson}</h2>
            <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-xl relative">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <FaPlay className="text-indigo-600 text-xl ml-1" />
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 rounded-full border text-purple-600">
                <FaChevronLeft className="inline mr-2" /> Back
              </button>
              <button className="px-4 py-2 rounded-full bg-purple-300 text-white">
                Next <FaChevronRight className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">Resources</div>
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">Notes</div>
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">Remarks</div>
        </div>
      </main>
    </div>
  );
}

function SidebarIcon({ icon, label, active }: { icon: JSX.Element; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer w-full justify-center md:justify-start md:px-4 transition ${
        active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-white'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </div>
  );
}
