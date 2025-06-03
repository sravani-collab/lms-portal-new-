"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Sign Up
          </Button>
          <div className="text-center text-sm text-gray-500">or sign up with</div>
          <div className="flex justify-center space-x-4">
            <FaFacebookF className="text-blue-600 cursor-pointer" />
            <FaTwitter className="text-sky-500 cursor-pointer" />
            <FaGithub className="cursor-pointer" />
          </div>
          <p className="text-center text-sm">
            Already have an account?
            <Link href="/login" className="text-blue-500 hover:underline ml-1">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
