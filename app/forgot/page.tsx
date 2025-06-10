"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({ 
    email: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [touched, setTouched] = useState({ 
    email: false, 
    newPassword: false, 
    confirmPassword: false 
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const validationErrors = { email: "", newPassword: "", confirmPassword: "" };

    if (touched.email) {
      if (!formData.email.trim()) {
        validationErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        validationErrors.email = "Enter a valid email";
      }
    }

    if (touched.newPassword) {
      if (!formData.newPassword.trim()) {
        validationErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 6) {
        validationErrors.newPassword = "Minimum 6 characters";
      }
    }

    if (touched.confirmPassword) {
      if (!formData.confirmPassword.trim()) {
        validationErrors.confirmPassword = "Please confirm your password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(validationErrors);
  }, [formData, touched]);

  const handleResetPassword = async () => {
    setTouched({ email: true, newPassword: true, confirmPassword: true });

    if (!errors.email && !errors.newPassword && !errors.confirmPassword && 
        formData.email && formData.newPassword && formData.confirmPassword) {
      try {
        const res = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Password reset successfully");
          // Redirect to login page
          window.location.href = "/login";
        } else {
          alert(data.message || "Password reset failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResetPassword();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Reset Password</h1>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <Input
                type="email"
                placeholder="Name@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  onBlur={() => setTouched((prev) => ({ ...prev, newPassword: true }))}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Reset Password Button */}
            <div className="pt-2">
              <Button
                onClick={handleResetPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-md font-medium"
              >
                Reset Password
              </Button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-600">
                Remember your password?{" "}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Back to Login
                </a>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}