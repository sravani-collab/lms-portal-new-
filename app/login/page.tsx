"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const validationErrors: typeof errors = {};

    if (touched.email) {
      if (!formData.email.trim()) {
        validationErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        validationErrors.email = "Enter a valid email";
      }
    }

    if (touched.password) {
      if (!formData.password.trim()) {
        validationErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        validationErrors.password = "Minimum 6 characters";
      }
    }

    setErrors(validationErrors);
  }, [formData, touched]);

  const handleLogin = async () => {
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, rememberMe }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Login successful");
        } else {
          alert(data.message || "Login failed");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
        <CardContent className="space-y-4">
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

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-blue-500"
              />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-gray-500">or continue with</div>
          <div className="flex justify-center space-x-4 text-xl">
            <FaFacebookF className="text-blue-600 hover:scale-110 transition cursor-pointer" />
            <FaTwitter className="text-sky-500 hover:scale-110 transition cursor-pointer" />
            <FaGithub className="hover:scale-110 transition cursor-pointer" />
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
