"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user profile exists
    const storedProfile = localStorage.getItem("userProfile");
    const storedUser = localStorage.getItem("openmedx_user");
    
    if (storedProfile) {
      // User completed full registration
      const profile = JSON.parse(storedProfile);
      const user = storedUser ? JSON.parse(storedUser) : null;
      
      if (profile.email === formData.email && user && user.password === formData.password) {
        localStorage.setItem("openmedx_authenticated", "true");
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } else if (storedUser) {
      // User only completed step 1
      const user = JSON.parse(storedUser);
      if (user.email === formData.email && user.password === formData.password) {
        alert("Please complete your registration first.");
        router.push("/register");
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("No account found. Please register first.");
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">OpenMedX</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your health dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
