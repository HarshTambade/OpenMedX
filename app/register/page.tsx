"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Shield, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Creation
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Step 2: Consent
    hipaaConsent: false,
    advisoryConsent: false,
    dataUsageConsent: false,
    
    // Step 3: Health Profile
    age: "",
    gender: "",
    height: "",
    weight: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    lifestyleGoals: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Save to localStorage (will be replaced with Firebase)
    localStorage.setItem("openmedx_user", JSON.stringify(formData));
    localStorage.setItem("openmedx_authenticated", "true");
    
    // Redirect to dashboard
    router.push("/dashboard");
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
          <p className="text-slate-600">Join the future of AI-powered health advisory</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span className="text-sm font-medium">Account</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Consent</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                3
              </div>
              <span className="text-sm font-medium">Profile</span>
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
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Consent */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Privacy & Consent</h2>
                </div>

                <Card className="p-6 bg-blue-50 border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-900">Important Legal Information</h3>
                  <p className="text-sm text-blue-800">
                    OpenMedX provides health advisory information only. This platform is NOT a substitute 
                    for professional medical advice, diagnosis, or treatment. Always seek the advice of 
                    your physician or other qualified health provider with any questions you may have 
                    regarding a medical condition.
                  </p>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="hipaaConsent"
                      checked={formData.hipaaConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("hipaaConsent", checked as boolean)}
                      required
                    />
                    <div>
                      <Label htmlFor="hipaaConsent" className="font-medium cursor-pointer">
                        HIPAA Compliance & Data Privacy *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I understand that my health data will be encrypted and stored in compliance with 
                        HIPAA regulations. My data will only be used for providing personalized health 
                        advisory services.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="advisoryConsent"
                      checked={formData.advisoryConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("advisoryConsent", checked as boolean)}
                      required
                    />
                    <div>
                      <Label htmlFor="advisoryConsent" className="font-medium cursor-pointer">
                        Advisory-Only Nature Acknowledgment *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I acknowledge that OpenMedX provides advisory information only and does not 
                        diagnose, treat, or prescribe. I will consult with licensed healthcare 
                        professionals for medical decisions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="dataUsageConsent"
                      checked={formData.dataUsageConsent}
                      onCheckedChange={(checked) => handleCheckboxChange("dataUsageConsent", checked as boolean)}
                      required
                    />
                    <div>
                      <Label htmlFor="dataUsageConsent" className="font-medium cursor-pointer">
                        Anonymized Research Data Usage *
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        I consent to my anonymized health data being used for research purposes to 
                        improve AI models and population health insights. No personally identifiable 
                        information will be shared.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Health Profile */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Health Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="175"
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
                    placeholder="Any chronic conditions, past surgeries, or significant medical events..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="currentMedications">Current Medications (Optional)</Label>
                  <Textarea
                    id="currentMedications"
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    placeholder="List any medications you're currently taking..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="allergies">Allergies (Optional)</Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="Food allergies, drug allergies, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="lifestyleGoals">Wellness Goals *</Label>
                  <Textarea
                    id="lifestyleGoals"
                    name="lifestyleGoals"
                    value={formData.lifestyleGoals}
                    onChange={handleInputChange}
                    required
                    placeholder="What are your health and wellness goals? (e.g., weight management, stress reduction, better sleep...)"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 ml-auto"
              >
                {step === 3 ? "Complete Registration" : "Continue"}
              </Button>
            </div>
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
