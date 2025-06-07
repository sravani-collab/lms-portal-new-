// components/SidebarItem.tsx
"use client";

import Link from "next/link";
import React from "react";

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  href?: string;
  active?: boolean;
  className?: string;
}

export default function SidebarItem({
  icon,
  label,
  href = "#",
  active = false,
  className = "",
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all
          ${active ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"} ${className}`}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
}
