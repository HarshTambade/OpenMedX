"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, User, Calendar, Activity, Heart, Brain, Pill, AlertTriangle, TrendingUp, Download, Printer, Share2, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface PatientReport {
  reportId: string;
  generatedDate: string;
  patientInfo: Record<string, unknown>;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    oxygenSaturation: string;
  };
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  recommendations: string[];
  medications: string[];
  followUp: string;
}

export default function ReportGeneratorPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<Record<string, unknown> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<PatientReport | null>(null);
  
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    symptoms: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
  });

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      router.push("/login");
      return;
    }
    setUserProfile(JSON.parse(profile));
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateReport = async () => {
    if (!formData.chiefComplaint || !formData.symptoms) {
      alert("Please fill in chief complaint and symptoms");
      return;
    }

    setIsGenerating(true);

    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const report: PatientReport = {
      reportId: `RPT-${Date.now()}`,
      generatedDate: new Date().toLocaleString(),
      patientInfo: userProfile || {},
      vitalSigns: {
        bloodPressure: formData.bloodPressure || "120/80 mmHg",
        heartRate: formData.heartRate || "72 bpm",
        temperature: formData.temperature || "98.6°F",
        respiratoryRate: formData.respiratoryRate || "16 breaths/min",
        oxygenSaturation: formData.oxygenSaturation || "98%",
      },
      chiefComplaint: formData.chiefComplaint,
      symptoms: formData.symptoms.split(",").map(s => s.trim()),
      diagnosis: "Preliminary Assessment: Based on the reported symptoms and vital signs, the patient appears to be experiencing mild to moderate symptoms that may require further evaluation.",
      recommendations: [
        "Continue monitoring vital signs regularly",
        "Maintain adequate hydration (8-10 glasses of water daily)",
        "Get sufficient rest (7-9 hours of sleep per night)",
        "Follow up with primary care physician within 1-2 weeks",
        "Seek immediate medical attention if symptoms worsen",
      ],
      medications: [
        "Over-the-counter pain reliever as needed (follow package directions)",
        "Multivitamin supplement daily",
        "Consult physician before starting any new medications",
      ],
      followUp: "Schedule follow-up appointment in 1-2 weeks or sooner if symptoms persist or worsen. Monitor for any new symptoms and report to healthcare provider.",
    };

    setGeneratedReport(report);
    setIsGenerating(false);
  };

  const downloadReport = () => {
    if (!generatedReport) return;
    
    const reportText = `
PATIENT MEDICAL REPORT
Report ID: ${generatedReport.reportId}
Generated: ${generatedReport.generatedDate}

PATIENT INFORMATION
Name: ${generatedReport.patientInfo.fullName}
Age: ${generatedReport.patientInfo.age} years
Gender: ${generatedReport.patientInfo.gender}
BMI: ${generatedReport.patientInfo.bmi}

VITAL SIGNS
Blood Pressure: ${generatedReport.vitalSigns.bloodPressure}
Heart Rate: ${generatedReport.vitalSigns.heartRate}
Temperature: ${generatedReport.vitalSigns.temperature}
Respiratory Rate: ${generatedReport.vitalSigns.respiratoryRate}
Oxygen Saturation: ${generatedReport.vitalSigns.oxygenSaturation}

CHIEF COMPLAINT
${generatedReport.chiefComplaint}

SYMPTOMS
${generatedReport.symptoms.map(s => `- ${s}`).join('\n')}

DIAGNOSIS
${generatedReport.diagnosis}

RECOMMENDATIONS
${generatedReport.recommendations.map(r => `- ${r}`).join('\n')}

MEDICATIONS
${generatedReport.medications.map(m => `- ${m}`).join('\n')}

FOLLOW-UP
${generatedReport.followUp}

DISCLAIMER
This report is generated by AI for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-report-${generatedReport.reportId}.txt`;
    a.click();
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Patient Report Generator</h1>
                  <p className="text-sm text-gray-600">Generate comprehensive medical reports with AI</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <Activity className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Patient Information
                </CardTitle>
                <CardDescription>Pre-filled from your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={String(userProfile?.fullName || '')} disabled />
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input value={`${userProfile?.age || 'N/A'} years`} disabled />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Input value={String(userProfile?.gender || '')} disabled />
                  </div>
                  <div>
                    <Label>BMI</Label>
                    <Input value={String(userProfile?.bmi || '')} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Vital Signs
                </CardTitle>
                <CardDescription>Enter current vital signs (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bloodPressure">Blood Pressure</Label>
                    <Input
                      id="bloodPressure"
                      name="bloodPressure"
                      value={formData.bloodPressure}
                      onChange={handleInputChange}
                      placeholder="120/80 mmHg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heartRate">Heart Rate</Label>
                    <Input
                      id="heartRate"
                      name="heartRate"
                      value={formData.heartRate}
                      onChange={handleInputChange}
                      placeholder="72 bpm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      placeholder="98.6°F"
                    />
                  </div>
                  <div>
                    <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                    <Input
                      id="respiratoryRate"
                      name="respiratoryRate"
                      value={formData.respiratoryRate}
                      onChange={handleInputChange}
                      placeholder="16 breaths/min"
                    />
                  </div>
                  <div>
                    <Label htmlFor="oxygenSaturation">O2 Saturation</Label>
                    <Input
                      id="oxygenSaturation"
                      name="oxygenSaturation"
                      value={formData.oxygenSaturation}
                      onChange={handleInputChange}
                      placeholder="98%"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Clinical Information
                </CardTitle>
                <CardDescription>Describe symptoms and concerns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                  <Input
                    id="chiefComplaint"
                    name="chiefComplaint"
                    value={formData.chiefComplaint}
                    onChange={handleInputChange}
                    placeholder="e.g., Persistent headache for 3 days"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="symptoms">Symptoms (comma-separated) *</Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="e.g., Headache, Fatigue, Dizziness"
                    rows={4}
                    required
                  />
                </div>
                <Button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate AI Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Report */}
          <div>
            {generatedReport ? (
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        Medical Report
                      </CardTitle>
                      <CardDescription>Report ID: {generatedReport.reportId}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadReport} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Report Header */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Generated: {generatedReport.generatedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Report Successfully Generated</span>
                    </div>
                  </div>

                  {/* Vital Signs */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      Vital Signs
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(generatedReport.vitalSigns).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-sm font-semibold text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Chief Complaint
                    </h3>
                    <p className="text-sm text-gray-700 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      {generatedReport.chiefComplaint}
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Reported Symptoms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedReport.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary">{symptom}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Assessment
                    </h3>
                    <p className="text-sm text-gray-700 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      {generatedReport.diagnosis}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {generatedReport.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Medications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Pill className="h-5 w-5 text-blue-600" />
                      Suggested Medications
                    </h3>
                    <ul className="space-y-2">
                      {generatedReport.medications.map((med, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Pill className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Follow-up */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      Follow-Up Instructions
                    </h3>
                    <p className="text-sm text-gray-700 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      {generatedReport.followUp}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Medical Disclaimer:</strong> This AI-generated report is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">No Report Generated</p>
                  <p className="text-sm text-gray-500 text-center max-w-md">
                    Fill in the clinical information and click &quot;Generate AI Report&quot; to create a comprehensive medical report
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
