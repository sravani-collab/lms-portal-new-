"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const validationErrors = {};

    if (touched.name && !formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        validationErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        validationErrors.email = "Invalid email format";
      }
    }

    if (touched.password) {
      if (!formData.password) {
        validationErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        validationErrors.password = "Minimum 6 characters";
      }
    }

    if (touched.confirmPassword) {
      if (!formData.confirmPassword) {
        validationErrors.confirmPassword = "Confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(validationErrors);
  }, [formData, touched]);

  const handleSignup = async () => {
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Signup successful");
        } else {
          alert(data.message || "Signup failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            Sign Up
          </Button>

          <div className="text-center text-sm text-gray-500">or continue with</div>
          <div className="flex justify-center space-x-4 text-xl">
            <FaFacebookF className="text-blue-600 hover:scale-110 transition cursor-pointer" />
            <FaTwitter className="text-sky-500 hover:scale-110 transition cursor-pointer" />
            <FaGithub className="hover:scale-110 transition cursor-pointer" />
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
