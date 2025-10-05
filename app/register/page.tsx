"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Lock, Shield, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    lifestyleGoals: "",
    hipaaConsent: false,
    dataProcessingConsent: false,
    termsConsent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      // Validate all consents are checked
      if (!formData.hipaaConsent || !formData.dataProcessingConsent || !formData.termsConsent) {
        alert("Please accept all required consents to continue.");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      // Calculate BMI
      const heightInMeters = parseFloat(formData.height) / 100;
      const weightInKg = parseFloat(formData.weight);
      const bmi = weightInKg / (heightInMeters * heightInMeters);

      // Create complete user profile
      const userProfile = {
        email: formData.email,
        fullName: formData.fullName,
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(bmi.toFixed(1)),
        medicalHistory: formData.medicalHistory,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        lifestyleGoals: formData.lifestyleGoals,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
        },
      };

      // Save both user credentials and profile
      localStorage.setItem("openmedx_user", JSON.stringify({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      }));
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      localStorage.setItem("openmedx_authenticated", "true");
      
      // Redirect to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">OpenMedX</span>
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Create Your Account</h1>
          <p className="text-slate-600">Join OpenMedX for personalized AI health guidance</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span className="font-medium">Account</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span className="font-medium">Consent</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span className="font-medium">Profile</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Creation */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Secure Account Creation</h2>
                </div>
                
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
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
                  <Label htmlFor="password">Password *</Label>
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

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue to Consent
                </Button>
              </div>
            )}

            {/* Step 2: HIPAA Consent */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Privacy & Consent</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="hipaaConsent"
                      checked={formData.hipaaConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("hipaaConsent", checked as boolean)}
                    />
                    <Label htmlFor="hipaaConsent" className="text-sm leading-relaxed cursor-pointer">
                      I consent to the collection, use, and disclosure of my health information in accordance with HIPAA regulations.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="dataProcessingConsent"
                      checked={formData.dataProcessingConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("dataProcessingConsent", checked as boolean)}
                    />
                    <Label htmlFor="dataProcessingConsent" className="text-sm leading-relaxed cursor-pointer">
                      I consent to the processing of my personal data for AI-powered health recommendations.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="termsConsent"
                      checked={formData.termsConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("termsConsent", checked as boolean)}
                    />
                    <Label htmlFor="termsConsent" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy.
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Continue to Profile
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Health Profile */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Health Profile</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Input
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      placeholder="Male/Female/Other"
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      required
                      placeholder="170"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      placeholder="70"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                  <Textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    placeholder="Any chronic conditions, past surgeries, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="currentMedications">Current Medications (Optional)</Label>
                  <Textarea
                    id="currentMedications"
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    placeholder="List any medications you're currently taking"
                  />
                </div>

                <div>
                  <Label htmlFor="allergies">Allergies (Optional)</Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="Food, drug, or environmental allergies"
                  />
                </div>

                <div>
                  <Label htmlFor="lifestyleGoals">Health & Lifestyle Goals *</Label>
                  <Textarea
                    id="lifestyleGoals"
                    name="lifestyleGoals"
                    value={formData.lifestyleGoals}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g., Weight loss, better sleep, stress management"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
