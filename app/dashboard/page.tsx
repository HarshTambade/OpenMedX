"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Brain, Heart, Apple, Bone, Salad, Users, Baby, Wind, Droplet, Briefcase, TrendingUp, MessageSquare, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const AI_AGENTS = [
  { id: "general", name: "General Wellness Coach", icon: Activity, color: "blue", description: "Overall health and preventive care" },
  { id: "cardio", name: "Cardio Wellness Coach", icon: Heart, color: "red", description: "Heart health and cardiovascular fitness" },
  { id: "metabolic", name: "Metabolic Health Coach", icon: Apple, color: "green", description: "Metabolism, diabetes, and weight management" },
  { id: "mental", name: "Mental Wellness Coach", icon: Brain, color: "purple", description: "Stress, anxiety, and mental health" },
  { id: "musculoskeletal", name: "Musculoskeletal Coach", icon: Bone, color: "orange", description: "Bones, joints, and physical therapy" },
  { id: "nutrition", name: "Nutrition & Lifestyle Coach", icon: Salad, color: "lime", description: "Diet, nutrition, and healthy habits" },
  { id: "womens", name: "Women's Health Coach", icon: Users, color: "pink", description: "Women's health and wellness" },
  { id: "senior", name: "Senior Health Coach", icon: Users, color: "indigo", description: "Health for older adults" },
  { id: "pediatric", name: "Pediatric Wellness Coach", icon: Baby, color: "yellow", description: "Children's health and development" },
  { id: "respiratory", name: "Respiratory Health Coach", icon: Wind, color: "sky", description: "Lung health and breathing" },
  { id: "digestive", name: "Digestive Health Coach", icon: Droplet, color: "teal", description: "Gut health and digestion" },
  { id: "occupational", name: "Occupational Wellness Coach", icon: Briefcase, color: "slate", description: "Work-life balance and ergonomics" },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("openmedx_authenticated");
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Load user data
    const userData = localStorage.getItem("openmedx_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Calculate BMI
      if (parsedUser.height && parsedUser.weight) {
        const heightInMeters = parsedUser.height / 100;
        const calculatedBmi = parsedUser.weight / (heightInMeters * heightInMeters);
        setBmi(parseFloat(calculatedBmi.toFixed(1)));
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("openmedx_authenticated");
    router.push("/");
  };

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = AI_AGENTS.find(a => a.id === agentId);
    setChatMessages([
      {
        role: "assistant",
        content: `Hello! I'm your ${agent?.name}. I'm here to provide personalized health advisory based on evidence-based medical knowledge. How can I help you today?`
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim() || !selectedAgent) return;

    const newMessages = [...chatMessages, { role: "user", content: userMessage }];
    setChatMessages(newMessages);
    setUserMessage("");
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          agentId: selectedAgent,
          userProfile: user,
        }),
      });

      const data = await response.json();
      setChatMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setChatMessages([...newMessages, { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">OpenMedX</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Welcome, {user.fullName}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Health Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Health Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">BMI</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {bmi || "N/A"}
                    {bmi && (
                      <span className="text-sm font-normal ml-2">
                        {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese"}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Age</p>
                  <p className="text-2xl font-bold text-slate-900">{user.age}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Height</p>
                  <p className="text-2xl font-bold text-slate-900">{user.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Weight</p>
                  <p className="text-2xl font-bold text-slate-900">{user.weight} kg</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Wellness Goals</h3>
              <p className="text-sm text-slate-600">{user.lifestyleGoals}</p>
            </Card>

            {user.medicalHistory && (
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Medical History</h3>
                <p className="text-sm text-slate-600">{user.medicalHistory}</p>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedAgent ? (
              <>
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-slate-900">Your AI Health Advisory Hub</h1>
                  <p className="text-slate-600">Select an AI health coach to get personalized guidance</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {AI_AGENTS.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <Card
                        key={agent.id}
                        className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300"
                        onClick={() => handleAgentSelect(agent.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${agent.color}-100`}>
                            <Icon className={`w-6 h-6 text-${agent.color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{agent.name}</h3>
                            <p className="text-sm text-slate-600">{agent.description}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Chat Interface */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      {AI_AGENTS.find(a => a.id === selectedAgent)?.name}
                    </h2>
                    <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                      Back to Agents
                    </Button>
                  </div>

                  {/* Chat Messages */}
                  <div className="bg-slate-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-slate-200"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 p-4 rounded-lg">
                          <p className="text-sm text-slate-600">Thinking...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Ask your health question..."
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !userMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Send
                    </Button>
                  </div>
                </Card>

                {/* Disclaimer */}
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> This is advisory information only. Always consult with 
                    licensed healthcare professionals for medical decisions.
                  </p>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
