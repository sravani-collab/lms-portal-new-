"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-500">or continue with</div>
          <div className="flex justify-center space-x-4">
            <FaFacebookF className="text-blue-600 cursor-pointer" />
            <FaTwitter className="text-sky-500 cursor-pointer" />
            <FaGithub className="cursor-pointer" />
          </div>
          <p className="text-center text-sm">
            Don’t have an account?
            <Link href="/signup" className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
