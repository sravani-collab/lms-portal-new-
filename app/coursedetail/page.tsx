'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // to get the dynamic param
import {
  FaChevronRight,
  FaChevronLeft,
  FaPlay,
  FaGraduationCap,
  FaEnvelope,
} from 'react-icons/fa';
import {
  MdDashboard,
  MdAssignment,
  MdLibraryBooks,
  MdLogout,
} from 'react-icons/md';

type Lesson = { id: string; title: string };
type Module = { id: string; title: string; lessons: Lesson[] };
type Course = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams(); // gives { courseId: string }
  const courseId = params?.courseId;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    if (!courseId) return;

    async function fetchCourse() {
      setLoading(true);
      try {
        // Call your backend API to get course details by ID
        // Replace the URL with your actual API route
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) throw new Error('Failed to fetch course details');
        const data = await res.json();

        setCourse(data);
        setActiveModule(0);
        setActiveLesson(0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="p-4">Loading course details...</div>;
  if (!course) return <div className="p-4 text-red-600">Course not found</div>;

  // Defensive check: If modules or lessons empty, handle gracefully
  const modules = course.modules || [];
  const currentModule = modules[activeModule] || { lessons: [] };
  const lessons = currentModule.lessons || [];
  const currentLesson = lessons[activeLesson]?.title || 'Select a lesson';

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
          <button className="px-4 py-2 text-black-600" onClick={() => router.back()}>
            <FaChevronLeft className="inline mr-2" />Courses
          </button>
          <h1 className="text-xl md:text-3xl font-bold">{course.title}</h1>
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
            {modules.length === 0 && <p>No modules found</p>}
            {modules.map((module, idx) => (
              <div key={module.id} className="mb-4">
                <p
                  className={`font-medium cursor-pointer ${
                    idx === activeModule ? 'text-indigo-600' : ''
                  }`}
                  onClick={() => {
                    setActiveModule(idx);
                    setActiveLesson(0);
                  }}
                >
                  › {module.title}
                </p>
                <div className="ml-4 mt-2 space-y-1">
                  {module.lessons.length === 0 && <p className="text-sm italic">No lessons</p>}
                  {module.lessons.map((lesson, i) => (
                    <p
                      key={lesson.id}
                      className={`text-sm text-gray-700 cursor-pointer hover:underline ${
                        idx === activeModule && i === activeLesson ? 'font-semibold' : ''
                      }`}
                      onClick={() => {
                        setActiveModule(idx);
                        setActiveLesson(i);
                      }}
                    >
                      {lesson.title}
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
              <button
                className="px-4 py-2 rounded-full border text-purple-600"
                onClick={() => {
                  if (activeLesson > 0) setActiveLesson(activeLesson - 1);
                  else if (activeModule > 0) {
                    setActiveModule(activeModule - 1);
                    setActiveLesson(
                      modules[activeModule - 1]?.lessons.length - 1 || 0
                    );
                  }
                }}
              >
                <FaChevronLeft className="inline mr-2" /> Back
              </button>
              <button
                className="px-4 py-2 rounded-full bg-purple-300 text-white"
                onClick={() => {
                  if (activeLesson < lessons.length - 1) setActiveLesson(activeLesson + 1);
                  else if (activeModule < modules.length - 1) {
                    setActiveModule(activeModule + 1);
                    setActiveLesson(0);
                  }
                }}
              >
                Next <FaChevronRight className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">
            Resources
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">Notes</div>
          <div className="bg-white p-4 rounded-2xl shadow text-center font-medium">Remarks</div>
        </div>
      </main>
    </div>
  );
}

function SidebarIcon({
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
      className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer w-full justify-center md:justify-start md:px-4 transition ${
        active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-white'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </div>
  );
}
