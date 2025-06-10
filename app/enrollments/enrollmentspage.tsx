'use client';
import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  ChevronDown,
  Play,
  Lock,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Star
} from 'lucide-react';

// Mock data for course detail
const courseData = {
  id: '1',
  title: 'Introduction to Computer Networks',
  description: 'Learn the fundamentals of computer networking, protocols, and architecture with hands-on exercises and real-world examples.',
  instructor: 'Dr. Sarah Johnson',
  duration: '8 weeks',
  students: 1250,
  rating: 4.8,
  level: 'Beginner',
  progress: 65,
  isEnrolled: false, // Change this to test enrolled vs unenrolled state
  modules: [
    {
      id: 1,
      title: 'Module 1 Introduction',
      isLocked: false,
      lessons: [
        { id: '1.1', title: 'Lesson 1.1 Overview', isLocked: false, duration: '15 min' },
        { id: '1.2', title: 'Lesson 1.2 Basics', isLocked: false, duration: '20 min' },
      ]
    },
    {
      id: 2,
      title: 'Module 2 OSI Models',
      isLocked: true,
      lessons: [
        { id: '2.1', title: 'Understanding OSI Layers', isLocked: true, duration: '25 min' },
        { id: '2.2', title: 'Practical Implementation', isLocked: true, duration: '30 min' },
      ]
    },
    {
      id: 3,
      title: 'Module 3 TCP/IP',
      isLocked: true,
      lessons: [
        { id: '3.1', title: 'TCP Protocol Deep Dive', isLocked: true, duration: '35 min' },
        { id: '3.2', title: 'IP Addressing', isLocked: true, duration: '40 min' },
      ]
    },
    {
      id: 4,
      title: 'Module 4 Protocols',
      isLocked: true,
      lessons: [
        { id: '4.1', title: 'HTTP/HTTPS Protocols', isLocked: true, duration: '30 min' },
        { id: '4.2', title: 'DNS and DHCP', isLocked: true, duration: '25 min' },
      ]
    }
  ]
};

export default function CourseDetailPage() {
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [selectedLesson, setSelectedLesson] = useState('1.2');
  const [activeTab, setActiveTab] = useState<'resources' | 'notes' | 'remarks'>('resources');
  const [course, setCourse] = useState(courseData);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    setCourse(prev => ({ ...prev, isEnrolled: true }));
    // Unlock first module after enrollment
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === 1 
          ? { ...module, isLocked: false, lessons: module.lessons.map(lesson => ({ ...lesson, isLocked: false })) }
          : module
      )
    }));
  };

  const SidebarItem = ({ icon, label, href, active, className = "" }: {
    icon: JSX.Element;
    label: string;
    href: string;
    active?: boolean;
    className?: string;
  }) => (
    <a
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' 
          : `text-gray-600 hover:bg-gray-50 hover:text-gray-800 ${className}`
      }`}
    >
      <span className={active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-xl lg:h-auto">
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
              <SidebarItem icon={<FileText size={20} />} label="Assignments" href="/assignments" />
              <SidebarItem icon={<BookOpen size={20} />} label="Courses" href="/courses" active />
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
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {course.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* User Info */}
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
          </div>

          {/* Progress Bar (only if enrolled) */}
          {course.isEnrolled && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Course Progress</span>
                <span className="text-sm font-semibold text-purple-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Course Modules Sidebar */}
          <div className="w-full lg:w-80 bg-white border-r border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Modules</h2>
            
            <div className="space-y-2">
              {course.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {module.isLocked && !course.isEnrolled ? (
                        <Lock size={16} className="text-gray-400" />
                      ) : (
                        expandedModules.includes(module.id) ? 
                          <ChevronDown size={16} className="text-gray-600" /> :
                          <ChevronRight size={16} className="text-gray-600" />
                      )}
                      <span className={`font-medium ${module.isLocked && !course.isEnrolled ? 'text-gray-400' : 'text-gray-800'}`}>
                        {module.title}
                      </span>
                    </div>
                  </button>
                  
                  {expandedModules.includes(module.id) && (
                    <div className="px-4 pb-4">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.isLocked && setSelectedLesson(lesson.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                            selectedLesson === lesson.id 
                              ? 'bg-purple-100 text-purple-800' 
                              : lesson.isLocked && !course.isEnrolled
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {lesson.isLocked && !course.isEnrolled ? (
                            <Lock size={14} className="text-gray-400" />
                          ) : (
                            <Play size={14} className="text-gray-600" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{lesson.title}</div>
                            <div className="text-xs text-gray-500">{lesson.duration}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Enroll Button (only if not enrolled) */}
            {!course.isEnrolled && (
              <div className="mt-6">
                <button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Enroll Now
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enroll to unlock all course content
                </p>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Lesson Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Lesson 1.2 - Basics
              </h2>
            </div>

            {/* Video/Content Area */}
            <div className="bg-gray-100 rounded-2xl h-80 mb-6 flex items-center justify-center relative overflow-hidden">
              {course.isEnrolled || selectedLesson === '1.1' || selectedLesson === '1.2' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <Play size={32} className="text-purple-600 ml-1" />
                    </div>
                    <p className="text-gray-600">Click to start lesson</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <Lock size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">Content Locked</p>
                    <p className="text-gray-400 text-sm">Enroll in the course to access this lesson</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-8">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <ArrowLeft size={16} />
                Back
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all">
                Next
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                {['resources', 'notes', 'remarks'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-3 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
                  {course.isEnrolled || selectedLesson === '1.1' || selectedLesson === '1.2' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Network Fundamentals PDF</span>
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          Download
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Practice Exercises</span>
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock size={32} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Enroll to access resources</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                  {course.isEnrolled ? (
                    <div className="space-y-4">
                      <textarea
                        placeholder="Take notes during the lesson..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Save Notes
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock size={32} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Enroll to take notes</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'remarks' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Remarks</h3>
                  {course.isEnrolled ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          <strong>Important:</strong> Make sure to understand the OSI model before proceeding to the next module.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          <strong>Tip:</strong> Practice with real network tools to better understand the concepts.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock size={32} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Enroll to view instructor remarks</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}