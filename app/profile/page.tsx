'use client';
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/custom/Sidebar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-white">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 px-4 py-2 rounded-full shadow-md focus:outline-none"
          />
        </div>

        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/avatar.jpg" alt="Profile" />
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">David Ross</h2>
                <p className="text-gray-500">david@gmail.com</p>
              </div>
            </div>
            <Button>Edit</Button>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-1">First Name</label>
              <Input placeholder="Your First Name" />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <Input placeholder="Your Last Name" />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <Select>
                <SelectTrigger>Gender</SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Country</label>
              <Select>
                <SelectTrigger>Country</SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Language</label>
              <Select>
                <SelectTrigger>Language</SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Time Zone</label>
              <Select>
                <SelectTrigger>Time (EX:UTC+05:30)</SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc530">UTC+05:30</SelectItem>
                  <SelectItem value="utc0">UTC+00:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <h3 className="font-semibold mb-2">Email Address</h3>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 13.065l8.338-6.24A1 1 0 0019.88 5H4.12a1 1 0 00-.457 1.825l8.337 6.24z" />
                    <path d="M20 8.935l-8 6-8-6V18a1 1 0 001 1h14a1 1 0 001-1V8.935z" />
                  </svg>
                </div>
                <div>
                  <p>david@gmail.com</p>
                  <p className="text-sm text-gray-500">1 month ago</p>
                </div>
              </div>
              <Button variant="outline" className="mt-2">+Add Email Address</Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Mobile</h3>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.9.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.37.26 2.69.76 3.9a1 1 0 01-.21 1.11l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <p>+918749283821</p>
                  <p className="text-sm text-gray-500">1 month ago</p>
                </div>
              </div>
              <Button variant="outline" className="mt-2">+Add Mobile</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
