"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean; confirm?: boolean }>({});

  // Email validation pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const newErrors: typeof errors = {};

    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    if (touched.password) {
      if (!newPassword) {
        newErrors.password = "New password is required";
      } else if (newPassword.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (touched.confirm) {
      if (!confirmPassword) {
        newErrors.confirm = "Please confirm your password";
      } else if (newPassword !== confirmPassword) {
        newErrors.confirm = "Passwords do not match";
      }
    }

    setErrors(newErrors);
  }, [email, newPassword, confirmPassword, touched]);

  const handleSubmit = async () => {
    setTouched({ email: true, password: true, confirm: true });

    if (Object.keys(errors).length === 0) {
      try {
        // 🔒 Replace this with your actual API call
        const response = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: newPassword }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Password reset successfully!");
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to reset password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Enter your email and new password
          </p>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirm && <p className="text-sm text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          >
            Reset Password
          </Button>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Remember your password?
            <Link href="/login" className="text-blue-500 hover:underline ml-1">
              Back to Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
