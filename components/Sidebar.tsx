// components/Sidebar.tsx
import { MdDashboard, MdAssignment, MdLibraryBooks, MdSettings, MdLogout } from "react-icons/md";
import { FaEnvelope, FaGraduationCap } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-48 bg-indigo-50 p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex justify-center mb-6">
          <FaGraduationCap size={36} className="text-indigo-500" />
        </div>
        <nav className="space-y-4">
          <SidebarItem icon={<MdDashboard />} label="Dashboard" />
          <SidebarItem icon={<MdAssignment />} label="Assignments" />
          <SidebarItem icon={<MdLibraryBooks />} label="Courses" active />
          <SidebarItem icon={<FaEnvelope />} label="Profile" />
          <SidebarItem icon={<MdSettings />} label="Settings" />
        </nav>
      </div>
      <SidebarItem icon={<MdLogout />} label="Logout" />
    </aside>
  );
}

function SidebarItem({ icon, label, active }: { icon: JSX.Element; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium ${active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-white'}`}>
      {icon}
      {label}
    </div>
  );
}
