'use client';
import React, { useState, useEffect } from 'react';

import {
  GraduationCap,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  PieChart,
  BarChart3,
  Home,
  BookOpen,
  FileText
} from 'lucide-react';

type Course = {
  id: string;
  title: string;
  description: string;
  progress: number;
  createdAt: string;
  modules?: any[];
};

const mockEnrolledCourses: Course[] = [
  {
    id: '1',
    title: 'Computer Networks',
    description: 'Learn the fundamentals of computer networking, protocols, and architecture.',
    progress: 65,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'DBMS',
    description: 'Database Management Systems concepts and practical applications.',
    progress: 40,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Operating Systems',
    description: 'Understanding OS concepts, processes, and system administration.',
    progress: 85,
    createdAt: '2024-01-10'
  }
];

const mockExploreCourses: Course[] = [
  {
    id: '4',
    title: 'Machine Learning',
    description: 'Introduction to ML algorithms and practical implementation.',
    progress: 0,
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: 'Web Development',
    description: 'Full-stack web development with modern frameworks.',
    progress: 0,
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    title: 'Data Structures',
    description: 'Essential data structures and algorithms for programming.',
    progress: 0,
    createdAt: '2024-02-10'
  }
];

export default function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState<'enrolled' | 'explore'>('enrolled');
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [exploreCourses, setExploreCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEnrolledCourses(mockEnrolledCourses);
        setExploreCourses(mockExploreCourses);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = (selectedTab === 'enrolled' ? enrolledCourses : exploreCourses)
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

  const CourseCard = ({ course, isEnrolled }: { course: Course; isEnrolled: boolean }) => {
    const handleCourseClick = () => {
      // Navigate to course detail page with course ID
      const courseDetailUrl = `/coursedetail/${course.id}?id=${course.id}&enrolled=${isEnrolled}`;
      window.location.href = courseDetailUrl;
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {course.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {course.description}
        </p>

        {isEnrolled && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
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

        <div className="flex items-center justify-between">
          <button 
            onClick={handleCourseClick}
            className={`w-full sm:w-auto px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isEnrolled 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
          </button>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isEnrolled ? 'bg-purple-100' : 'bg-indigo-100'
          }`}>
            <div className={`w-4 h-4 rounded-full ${
              isEnrolled ? 'bg-purple-500' : 'bg-indigo-500'
            }`}></div>
          </div>
        </div>
      </div>
    );
  };

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
              href="/login"
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
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
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
        </header>

        {/* Content */}
        <div>
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Manage your enrolled courses and explore new ones</p>
          </div>

          {/* Enrollment Status Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Course Access</h3>
                <p className="text-purple-600 text-sm">
                  {selectedTab === 'enrolled' 
                    ? 'You have full access to all enrolled courses' 
                    : 'Preview available - Enroll to unlock full content'
                  }
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedTab === 'enrolled' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {selectedTab === 'enrolled' ? 'Full Access' : 'Preview Mode'}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="inline-flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
              <button
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTab === 'enrolled'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setSelectedTab('enrolled')}
              >
                Enrolled Courses ({enrolledCourses.length})
              </button>
              <button
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTab === 'explore'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setSelectedTab('explore')}
              >
                Explore Courses ({exploreCourses.length})
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600 text-lg">Error: {error}</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {searchQuery ? 'No courses found matching your search.' : 'No courses found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={selectedTab === 'enrolled'}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}