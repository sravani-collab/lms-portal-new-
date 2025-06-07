import React, { useState } from 'react';
import {
  GraduationCap,
  User,
  LogOut,
  Bell,
  Search,
  Home,
  BookOpen,
  FileText
} from 'lucide-react';
import Link from 'next/link';

function SidebarItem({ icon, label, href, active, className = '' }: { icon: JSX.Element; label: string; href: string; active?: boolean; className?: string }) {
  return (
    <Link
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
    </Link>
  );
}

export default function Layout({ children, activePage }: { children: React.ReactNode; activePage: string }) {
  const [searchQuery, setSearchQuery] = useState('');

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
              <span className="text-xl font-bold text-gray-800">YourAppName</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <SidebarItem icon={<Home size={20} />} label="Dashboard" href="/dashboard" active={activePage === 'dashboard'} />
              <SidebarItem icon={<FileText size={20} />} label="Assignments" href="/assignments" active={activePage === 'assignments'} />
              <SidebarItem icon={<BookOpen size={20} />} label="Courses" href="/courses" active={activePage === 'courses'} />
              <SidebarItem icon={<User size={20} />} label="Profile" href="/profile" active={activePage === 'profile'} />
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

        {/* Children Content (Main) */}
        {children}
      </main>
    </div>
  );
}
