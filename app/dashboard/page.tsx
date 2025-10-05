"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Heart, Apple, Brain, Bone, Salad, Users, UserCircle, Baby, Wind, Droplet, Briefcase, MessageSquare, TrendingUp, Calendar, Target, Zap, Shield, ArrowLeft, Send, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfile {
  email: string;
  fullName: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  lifestyleGoals: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AI_AGENTS = [
  {
    id: "general",
    name: "General Wellness Coach",
    icon: Activity,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Preventive care, lifestyle optimization, and overall wellness guidance",
    specialties: ["Preventive Health", "Lifestyle", "Wellness Goals"],
  },
  {
    id: "cardio",
    name: "Cardio Wellness Coach",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Heart health, cardiovascular fitness, and blood pressure management",
    specialties: ["Heart Health", "Exercise", "Blood Pressure"],
  },
  {
    id: "metabolic",
    name: "Metabolic Health Coach",
    icon: Apple,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Metabolism, diabetes prevention, and weight management",
    specialties: ["Weight Management", "Diabetes Prevention", "Metabolism"],
  },
  {
    id: "mental",
    name: "Mental Wellness Coach",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Stress management, anxiety reduction, and sleep improvement",
    specialties: ["Stress Management", "Sleep", "Mental Health"],
  },
  {
    id: "musculoskeletal",
    name: "Musculoskeletal Coach",
    icon: Bone,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Bone health, joint care, and injury prevention",
    specialties: ["Joint Health", "Injury Prevention", "Physical Therapy"],
  },
  {
    id: "nutrition",
    name: "Nutrition & Lifestyle Coach",
    icon: Salad,
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-50",
    borderColor: "border-lime-200",
    description: "Dietary guidance, meal planning, and nutritional education",
    specialties: ["Nutrition", "Meal Planning", "Healthy Eating"],
  },
  {
    id: "womens",
    name: "Women's Health Coach",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    description: "Women's health, reproductive health, and hormonal balance",
    specialties: ["Reproductive Health", "Hormonal Balance", "Pregnancy"],
  },
  {
    id: "senior",
    name: "Senior Health Coach",
    icon: UserCircle,
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    description: "Healthy aging, mobility, and chronic disease management",
    specialties: ["Healthy Aging", "Mobility", "Chronic Conditions"],
  },
  {
    id: "pediatric",
    name: "Pediatric Wellness Coach",
    icon: Baby,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    description: "Children's health, growth, and development",
    specialties: ["Child Development", "Pediatric Nutrition", "Growth"],
  },
  {
    id: "respiratory",
    name: "Respiratory Health Coach",
    icon: Wind,
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    description: "Lung health, breathing exercises, and respiratory wellness",
    specialties: ["Lung Health", "Breathing", "Asthma Management"],
  },
  {
    id: "digestive",
    name: "Digestive Health Coach",
    icon: Droplet,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    description: "Gut health, digestive issues, and gastrointestinal wellness",
    specialties: ["Gut Health", "Digestion", "Nutrition"],
  },
  {
    id: "occupational",
    name: "Occupational Wellness Coach",
    icon: Briefcase,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description: "Workplace health, ergonomics, and work-life balance",
    specialties: ["Workplace Health", "Ergonomics", "Work-Life Balance"],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      router.push("/login");
      return;
    }
    setUserProfile(JSON.parse(profile));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    router.push("/");
  };

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    setMessages([
      {
        role: "assistant",
        content: `Hello! I'm your ${AI_AGENTS.find(a => a.id === agentId)?.name}. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAgent || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          agentId: selectedAgent,
          userProfile,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "I apologize, but I'm having trouble generating a response. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-600 bg-yellow-50" };
    if (bmi < 25) return { label: "Normal", color: "text-green-600 bg-green-50" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-600 bg-orange-50" };
    return { label: "Obese", color: "text-red-600 bg-red-50" };
  };

  const bmiCategory = getBMICategory(userProfile.bmi);

  if (selectedAgent) {
    const agent = AI_AGENTS.find((a) => a.id === selectedAgent);
    if (!agent) return null;

    const Icon = agent.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAgent(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Agents
                </Button>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${agent.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{agent.name}</h1>
                    <p className="text-sm text-gray-600">{agent.description}</p>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="gap-2">
                <Shield className="h-3 w-3" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card className="h-[calc(100vh-200px)] flex flex-col shadow-xl border-2">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className={`h-10 w-10 bg-gradient-to-br ${agent.color}`}>
                        <AvatarFallback className="text-white">
                          <Icon className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-gray-600 to-gray-800">
                        <AvatarFallback className="text-white">
                          {userProfile.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className={`h-10 w-10 bg-gradient-to-br ${agent.color}`}>
                      <AvatarFallback className="text-white">
                        <Icon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your health question..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">OpenMedX Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {userProfile.fullName}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                BMI Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{userProfile.bmi.toFixed(1)}</div>
              <Badge className={`mt-2 ${bmiCategory.color}`}>{bmiCategory.label}</Badge>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Age
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{userProfile.age}</div>
              <p className="text-sm text-gray-600 mt-2">years old</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-900 line-clamp-2">{userProfile.lifestyleGoals}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-600" />
                AI Coaches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">12</div>
              <p className="text-sm text-gray-600 mt-2">Available specialists</p>
            </CardContent>
          </Card>
        </div>
        {/* Advanced Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            Advanced Medical Features
          </h2>
          <p className="text-gray-600 mb-6">Access professional-grade medical tools and research capabilities</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-purple-200 bg-purple-50 hover:scale-105"
              onClick={() => router.push("/medical-scanner")}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">AI Medical Scanner</CardTitle>
                    <CardDescription className="text-sm">Upload and analyze lab reports, X-rays, MRI, and CT scans with AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Lab Reports</Badge>
                  <Badge variant="secondary" className="text-xs">X-Ray Analysis</Badge>
                  <Badge variant="secondary" className="text-xs">MRI/CT Scans</Badge>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-indigo-200 bg-indigo-50 hover:scale-105"
              onClick={() => router.push("/report-generator")}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Patient Report Generator</CardTitle>
                    <CardDescription className="text-sm">Generate comprehensive medical reports with AI assistance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Health Reports</Badge>
                  <Badge variant="secondary" className="text-xs">AI Analysis</Badge>
                  <Badge variant="secondary" className="text-xs">PDF Export</Badge>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-blue-200 bg-blue-50 hover:scale-105"
              onClick={() => router.push("/research-panel")}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Research Panel</CardTitle>
                    <CardDescription className="text-sm">Conduct medical research studies and analyze health data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Clinical Studies</Badge>
                  <Badge variant="secondary" className="text-xs">Data Analytics</Badge>
                  <Badge variant="secondary" className="text-xs">Research Tools</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* AI Agents Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Your AI Health Coaches
          </h2>
          <p className="text-gray-600 mb-6">Select a specialized coach to start your personalized health consultation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.id}
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${agent.borderColor} ${agent.bgColor} hover:scale-105`}
                onClick={() => handleAgentSelect(agent.id)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${agent.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{agent.name}</CardTitle>
                      <CardDescription className="text-sm">{agent.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
