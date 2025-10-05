"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Image as ImageIcon, Activity, Brain, Heart, Bone, AlertCircle, CheckCircle, Loader2, Download, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface ScanResult {
  type: string;
  findings: string[];
  recommendations: string[];
  severity: "normal" | "attention" | "urgent";
  confidence: number;
}

export default function MedicalScannerPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanType, setScanType] = useState<"lab" | "xray" | "mri" | "ct">("lab");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      router.push("/login");
      return;
    }
    setUserProfile(JSON.parse(profile));
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setScanResult(null);
      
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const analyzeScan = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    // Simulate AI analysis (in production, this would call your AI API)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock results based on scan type
    const mockResults: Record<string, ScanResult> = {
      lab: {
        type: "Laboratory Report Analysis",
        findings: [
          "Hemoglobin: 14.2 g/dL (Normal range: 13.5-17.5)",
          "White Blood Cell Count: 7,200/μL (Normal range: 4,500-11,000)",
          "Glucose (Fasting): 95 mg/dL (Normal range: 70-100)",
          "Total Cholesterol: 185 mg/dL (Desirable: <200)",
          "HDL Cholesterol: 55 mg/dL (Good: >40)",
          "LDL Cholesterol: 110 mg/dL (Optimal: <100)",
          "Triglycerides: 100 mg/dL (Normal: <150)",
        ],
        recommendations: [
          "Overall lab results are within normal ranges",
          "LDL cholesterol slightly elevated - consider dietary modifications",
          "Maintain current healthy lifestyle habits",
          "Schedule follow-up in 6 months for routine monitoring",
        ],
        severity: "normal",
        confidence: 94.5,
      },
      xray: {
        type: "X-Ray Image Analysis",
        findings: [
          "Chest X-ray shows clear lung fields bilaterally",
          "No evidence of pneumonia or pleural effusion",
          "Heart size within normal limits",
          "No acute bony abnormalities detected",
          "Diaphragm contours are normal",
        ],
        recommendations: [
          "No immediate concerns identified",
          "Continue regular health monitoring",
          "Maintain good respiratory health practices",
          "Consult with radiologist for detailed interpretation",
        ],
        severity: "normal",
        confidence: 91.2,
      },
      mri: {
        type: "MRI Scan Analysis",
        findings: [
          "Brain MRI shows normal gray and white matter differentiation",
          "No evidence of mass lesions or hemorrhage",
          "Ventricular system is normal in size and configuration",
          "No abnormal signal intensities detected",
          "Cerebral vasculature appears normal",
        ],
        recommendations: [
          "MRI findings are within normal limits",
          "No immediate follow-up required",
          "Maintain brain health through healthy lifestyle",
          "Consult neurologist for comprehensive evaluation",
        ],
        severity: "normal",
        confidence: 89.7,
      },
      ct: {
        type: "CT Scan Analysis",
        findings: [
          "Abdominal CT shows normal liver, spleen, and kidneys",
          "No evidence of masses or abnormal fluid collections",
          "Pancreas appears normal in size and attenuation",
          "Bowel loops are unremarkable",
          "No lymphadenopathy detected",
        ],
        recommendations: [
          "CT findings are unremarkable",
          "Continue routine health screenings",
          "Maintain healthy diet and exercise",
          "Follow up with physician as scheduled",
        ],
        severity: "normal",
        confidence: 92.8,
      },
    };

    setScanResult(mockResults[scanType]);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-green-600 bg-green-50 border-green-200";
      case "attention": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "urgent": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "normal": return <CheckCircle className="h-5 w-5" />;
      case "attention": return <AlertCircle className="h-5 w-5" />;
      case "urgent": return <AlertCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
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
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Medical Scanner</h1>
                  <p className="text-sm text-gray-600">Upload and analyze medical reports & imaging</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <Activity className="h-3 w-3" />
              AI-Powered Analysis
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload Medical File
                </CardTitle>
                <CardDescription>
                  Select the type of medical document and upload your file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={scanType} onValueChange={(v) => setScanType(v as any)}>
                  <TabsList className="grid grid-cols-2 gap-2">
                    <TabsTrigger value="lab" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Lab Report
                    </TabsTrigger>
                    <TabsTrigger value="xray" className="gap-2">
                      <ImageIcon className="h-4 w-4" />
                      X-Ray
                    </TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-2 gap-2 mt-2">
                    <TabsTrigger value="mri" className="gap-2">
                      <Brain className="h-4 w-4" />
                      MRI
                    </TabsTrigger>
                    <TabsTrigger value="ct" className="gap-2">
                      <Activity className="h-4 w-4" />
                      CT Scan
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={analyzeScan}
                  disabled={!selectedFile || isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    AI analysis is for informational purposes only. Always consult with a qualified healthcare professional for medical advice.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {previewUrl && (
              <Card className="border-2 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                    Image Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={previewUrl} alt="Medical scan preview" className="w-full h-auto rounded-lg border" />
                </CardContent>
              </Card>
            )}

            {scanResult && (
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Analysis Results
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{scanResult.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Severity Badge */}
                  <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${getSeverityColor(scanResult.severity)}`}>
                    {getSeverityIcon(scanResult.severity)}
                    <div className="flex-1">
                      <p className="font-semibold capitalize">{scanResult.severity} Status</p>
                      <p className="text-sm">AI Confidence: {scanResult.confidence}%</p>
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Key Findings
                    </h3>
                    <ul className="space-y-2">
                      {scanResult.findings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Activity className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Medical Disclaimer:</strong> This AI analysis is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {!scanResult && !isAnalyzing && (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Brain className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">No Analysis Yet</p>
                  <p className="text-sm text-gray-500 text-center max-w-md">
                    Upload a medical file and click "Analyze with AI" to get instant insights powered by advanced machine learning
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
