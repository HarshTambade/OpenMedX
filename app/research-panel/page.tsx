"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, Users, FileText, BarChart3, Database, TrendingUp, Search, Plus, ArrowLeft, Loader2, CheckCircle, AlertCircle, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface ResearchStudy {
  id: string;
  title: string;
  status: "active" | "completed" | "recruiting";
  participants: number;
  targetParticipants: number;
  startDate: string;
  category: string;
}

interface StudyData {
  totalParticipants: number;
  avgAge: number;
  genderDistribution: { male: number; female: number; other: number };
  commonConditions: string[];
  dataPoints: number;
}

export default function ResearchPanelPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<Record<string, unknown> | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingStudy, setIsCreatingStudy] = useState(false);
  
  const [newStudy, setNewStudy] = useState({
    title: "",
    description: "",
    category: "",
    targetParticipants: "",
    duration: "",
    criteria: "",
  });

  const [studies, setStudies] = useState<ResearchStudy[]>([
    {
      id: "STD-001",
      title: "AI-Powered Diabetes Management Study",
      status: "active",
      participants: 245,
      targetParticipants: 500,
      startDate: "2025-01-15",
      category: "Metabolic Health",
    },
    {
      id: "STD-002",
      title: "Mental Health Intervention Effectiveness",
      status: "recruiting",
      participants: 89,
      targetParticipants: 300,
      startDate: "2025-03-01",
      category: "Mental Health",
    },
    {
      id: "STD-003",
      title: "Cardiovascular Risk Assessment via AI",
      status: "active",
      participants: 412,
      targetParticipants: 600,
      startDate: "2024-11-20",
      category: "Cardiology",
    },
    {
      id: "STD-004",
      title: "Nutrition Impact on Chronic Disease",
      status: "completed",
      participants: 500,
      targetParticipants: 500,
      startDate: "2024-06-10",
      category: "Nutrition",
    },
  ]);

  const studyData: StudyData = {
    totalParticipants: 1246,
    avgAge: 42.5,
    genderDistribution: { male: 48, female: 49, other: 3 },
    commonConditions: ["Hypertension", "Diabetes Type 2", "Anxiety", "Obesity", "High Cholesterol"],
    dataPoints: 45678,
  };

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      router.push("/login");
      return;
    }
    setUserProfile(JSON.parse(profile));
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewStudy({ ...newStudy, [e.target.name]: e.target.value });
  };

  const createStudy = async () => {
    if (!newStudy.title || !newStudy.description || !newStudy.category) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCreatingStudy(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const study: ResearchStudy = {
      id: `STD-${String(studies.length + 1).padStart(3, '0')}`,
      title: newStudy.title,
      status: "recruiting",
      participants: 0,
      targetParticipants: parseInt(newStudy.targetParticipants) || 100,
      startDate: new Date().toISOString().split('T')[0],
      category: newStudy.category,
    };

    setStudies([...studies, study]);
    setNewStudy({
      title: "",
      description: "",
      category: "",
      targetParticipants: "",
      duration: "",
      criteria: "",
    });
    setIsCreatingStudy(false);
    setActiveTab("studies");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 border-green-300";
      case "recruiting": return "bg-blue-100 text-blue-700 border-blue-300";
      case "completed": return "bg-gray-100 text-gray-700 border-gray-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "recruiting": return <Users className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
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
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                  <FlaskConical className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Research Panel</h1>
                  <p className="text-sm text-gray-600">Conduct medical research studies with AI insights</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <Database className="h-3 w-3" />
              Research Platform
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 gap-4 mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="studies" className="gap-2">
              <FileText className="h-4 w-4" />
              Studies
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Study
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Total Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{studyData.totalParticipants}</div>
                  <p className="text-sm text-gray-600 mt-1">Across all studies</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    Active Studies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{studies.filter(s => s.status === "active").length}</div>
                  <p className="text-sm text-gray-600 mt-1">Currently running</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    Data Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{studyData.dataPoints.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-1">Collected</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    Avg Age
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{studyData.avgAge}</div>
                  <p className="text-sm text-gray-600 mt-1">years old</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Gender Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Male</span>
                        <span className="text-sm text-gray-600">{studyData.genderDistribution.male}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${studyData.genderDistribution.male}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Female</span>
                        <span className="text-sm text-gray-600">{studyData.genderDistribution.female}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${studyData.genderDistribution.female}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Other</span>
                        <span className="text-sm text-gray-600">{studyData.genderDistribution.other}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${studyData.genderDistribution.other}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Common Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {studyData.commonConditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <span className="text-sm font-medium">{condition}</span>
                        <Badge variant="secondary">{Math.floor(Math.random() * 30 + 10)}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Studies Tab */}
          <TabsContent value="studies" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search studies..." className="pl-10" />
              </div>
              <Button onClick={() => setActiveTab("create")} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                New Study
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {studies.map((study) => (
                <Card key={study.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{study.title}</CardTitle>
                          <Badge className={`${getStatusColor(study.status)} gap-1`}>
                            {getStatusIcon(study.status)}
                            {study.status}
                          </Badge>
                        </div>
                        <CardDescription>Study ID: {study.id} • Started: {study.startDate}</CardDescription>
                      </div>
                      <Badge variant="outline">{study.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Participant Enrollment</span>
                          <span className="text-sm text-gray-600">{study.participants} / {study.targetParticipants}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${(study.participants / study.targetParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export Data
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Study Tab */}
          <TabsContent value="create">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-indigo-600" />
                  Create New Research Study
                </CardTitle>
                <CardDescription>Set up a new medical research study with AI-powered data collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Study Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newStudy.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Impact of Exercise on Mental Health"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Study Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newStudy.description}
                    onChange={handleInputChange}
                    placeholder="Describe the purpose, methodology, and expected outcomes of your study"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Research Category *</Label>
                    <Input
                      id="category"
                      name="category"
                      value={newStudy.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Mental Health, Cardiology"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetParticipants">Target Participants *</Label>
                    <Input
                      id="targetParticipants"
                      name="targetParticipants"
                      type="number"
                      value={newStudy.targetParticipants}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Study Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={newStudy.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 6 months"
                  />
                </div>

                <div>
                  <Label htmlFor="criteria">Inclusion/Exclusion Criteria</Label>
                  <Textarea
                    id="criteria"
                    name="criteria"
                    value={newStudy.criteria}
                    onChange={handleInputChange}
                    placeholder="Define who can participate in this study"
                    rows={3}
                  />
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    All research studies must comply with ethical guidelines and obtain proper IRB approval before participant enrollment.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={createStudy}
                  disabled={isCreatingStudy}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isCreatingStudy ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Study...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Research Study
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Research Analytics Dashboard
                </CardTitle>
                <CardDescription>Comprehensive insights from all research studies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">87.5%</div>
                      <p className="text-xs text-gray-600 mt-1">Studies completed on time</p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Data Quality Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">9.2/10</div>
                      <p className="text-xs text-gray-600 mt-1">Average data quality rating</p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Publications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <p className="text-xs text-gray-600 mt-1">Research papers published</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <BarChart3 className="h-4 w-4" />
                  <AlertDescription>
                    Advanced analytics and visualization tools are available for detailed study analysis. Export data in CSV, JSON, or Excel formats for further processing.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Advanced Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
