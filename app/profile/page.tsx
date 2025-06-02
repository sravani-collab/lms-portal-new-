// pages/profile.tsx
"use client";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import {
  MdDashboard,
  MdLogout,
  MdSettings,
  MdAssignment,
  MdLibraryBooks,
} from "react-icons/md";
import Image from "next/image";
const countryData = [
  { name: "India", code: "+91", flag: "IN" },
  { name: "USA", code: "+1", flag: "US" },
  { name: "UK", code: "+44", flag: "GB" },
  { name: "Canada", code: "+1", flag: "CA" },
  { name: "Australia", code: "+61", flag: "AU" },
  { name: "Germany", code: "+49", flag: "DE" },
  { name: "France", code: "+33", flag: "FR" },
  { name: "Japan", code: "+81", flag: "JP" },
  { name: "China", code: "+86", flag: "CN" },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
    email: "",
    mobile: "",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => {
      if (field === "country") {
        const country = countryData.find((c) => c.name === value);
        return {
          ...prev,
          country: value,
          mobile: country ? country.code : "",
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      window.location.reload();
    }, 2000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    window.location.reload();
  };

  const currentCountry = countryData.find(c => c.name === profile.country);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-48 bg-indigo-50 p-4 flex md:flex-col justify-between">
        <div>
          <div className="flex justify-center mb-6">
            <FaGraduationCap size={36} className="text-indigo-500" />
          </div>
          <nav className="space-y-4">
            <SidebarItem icon={<MdDashboard />} label="Dashboard" />
            <SidebarItem icon={<MdAssignment />} label="Assignments" />
            <SidebarItem icon={<MdLibraryBooks />} label="Courses" />
            <SidebarItem icon={<FaEnvelope />} label="Profile" active />
            <SidebarItem icon={<MdSettings />} label="Settings" />
          </nav>
        </div>
        <SidebarItem icon={<MdLogout />} label="Logout" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        {/* Popup */}
        {showPopup && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            Profile saved successfully!
          </div>
        )}

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-1/2 px-6 py-2 bg-gray-100 rounded-full shadow"
          />
          <div className="flex items-center gap-2">
            <Image
              src="/profile.png"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>David</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/profle1.png"
                alt=""
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Editable Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" value={profile.firstName} onChange={(val) => handleChange("firstName", val)} disabled={!isEditing} />
            <InputField label="Last Name" value={profile.lastName} onChange={(val) => handleChange("lastName", val)} disabled={!isEditing} />
            <SelectField label="Gender" options={["Male", "Female", "Other"]} value={profile.gender} onChange={(val) => handleChange("gender", val)} disabled={!isEditing} />
            <SelectField label="Language" options={["English", "Hindi","German","French", "Japanese", ]} value={profile.language} onChange={(val) => handleChange("language", val)} disabled={!isEditing} />
            <SelectField label="Time Zone" options={["UTC+05:30", "UTC+00:00"]} value={profile.timeZone} onChange={(val) => handleChange("timeZone", val)} disabled={!isEditing} />
            {/* Country with flags */}
            <div>
              <label className="text-sm font-medium">Country</label>
              <select
                value={profile.country}
                onChange={(e) => handleChange("country", e.target.value)}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded disabled:opacity-70"
              >
                {countryData.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded disabled:opacity-70"
              />
              {isEditing && <button className="mt-2 text-sm text-indigo-600 hover:underline">+ Add Email</button>}
            </div>
            <div>
              <label className="text-sm font-medium">Mobile</label>
              <div>
                <div className="flex mt-1">
                 <div className="w-1/3 flex items-center justify-center bg-gray-200 rounded-l px-2">
                {currentCountry?.flag && (
        <span className={`fi fi-${currentCountry.flag.toLowerCase()} w-6 h-4 mr-1 rounded-sm`} />
      )}
      <span>{currentCountry?.code}</span>
    </div>
    <input
      className="w-2/3 px-4 py-2 bg-gray-100 rounded-r"
      value={profile.mobile.replace(currentCountry?.code || "", "")}
      onChange={(e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        const fullNumber = `${currentCountry?.code || ""}${digitsOnly}`;
        if (/^\+\d{0,15}$/.test(fullNumber)) {
          handleChange("mobile", fullNumber);
        }
      }}
      disabled={!isEditing}
    />
  </div>
  {isEditing && <button className="mt-2 text-sm text-indigo-600 hover:underline">+ Add Mobile</button>}
</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: JSX.Element; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
        active ? "bg-indigo-100 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function InputField({ label, value, onChange, disabled }: { label: string; value: string; onChange: (val: string) => void; disabled: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full mt-1 px-4 py-2 bg-gray-100 rounded disabled:opacity-70"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange, disabled }: { label: string; value: string; options: string[]; onChange: (val: string) => void; disabled: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full mt-1 px-4 py-2 bg-gray-100 rounded disabled:opacity-70"
      >
        <option>{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
