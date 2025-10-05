"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Heart, Apple, Bone, Salad, Shield, Lock, Database, TrendingUp, Users, Stethoscope, Baby, Wind, Droplet, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">OpenMedX</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold mb-6 text-slate-900 tracking-tight">
            Where AI meets Medicine
          </h1>
          <p className="text-2xl text-slate-600 mb-4">
            Ethically, Openly, Intelligently.
          </p>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            Your personal AI health advisory platform powered by cutting-edge machine learning and evidence-based medical knowledge.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Start Your Health Journey
            </Button>
          </Link>
        </div>
      </header>

      {/* Architecture Diagram Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-lg mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
          Complete System Architecture
        </h2>
        
        {/* Layer 1: User Interaction */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
              <Users className="w-6 h-6" />
              1. User Interaction & Onboarding Layer
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3 text-lg">Registration & Consent</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✓ Secure account creation</li>
                  <li>✓ HIPAA-compliant data consent</li>
                  <li>✓ Legal disclaimers (advisory-only)</li>
                  <li>✓ Emergency contact collection</li>
                </ul>
              </Card>
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3 text-lg">Health Profile Creation</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>✓ Demographics</li>
                  <li>✓ Current health status</li>
                  <li>✓ Lifestyle & wellness goals</li>
                  <li>✓ Medical history (context only)</li>
                </ul>
              </Card>
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                ↓ User Data Input (Encrypted)
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: AI Doctor Lobby */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200">
            <h3 className="text-2xl font-bold mb-6 text-cyan-900 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              2. AI Doctor Lobby – Multi-Agent System
            </h3>
            <p className="text-center text-lg font-semibold mb-6 text-cyan-800">
              OpenMedX AI Health Advisory Hub
            </p>
            
            {/* Core Agents */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-center text-cyan-900">Essential Core Agents (Launch Phase)</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <AgentCard icon={<Activity />} name="General Wellness Coach" color="blue" />
                <AgentCard icon={<Heart />} name="Cardio Wellness Coach" color="red" />
                <AgentCard icon={<Apple />} name="Metabolic Health Coach" color="green" />
                <AgentCard icon={<Brain />} name="Mental Wellness Coach" color="purple" />
                <AgentCard icon={<Bone />} name="Musculoskeletal Coach" color="orange" />
                <AgentCard icon={<Salad />} name="Nutrition & Lifestyle Coach" color="lime" />
              </div>
            </div>

            {/* Advanced Agents */}
            <div>
              <h4 className="font-semibold mb-4 text-center text-cyan-900">Advanced Expansion Agents</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <AgentCard icon={<Users />} name="Women's Health Coach" color="pink" />
                <AgentCard icon={<Users />} name="Senior Health Coach" color="indigo" />
                <AgentCard icon={<Baby />} name="Pediatric Wellness Coach" color="yellow" />
                <AgentCard icon={<Wind />} name="Respiratory Health Coach" color="sky" />
                <AgentCard icon={<Droplet />} name="Digestive Health Coach" color="teal" />
                <AgentCard icon={<Briefcase />} name="Occupational Wellness Coach" color="slate" />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                ↓ AI Agent Selection & Routing
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: AI Intelligence Core */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-purple-200">
            <h3 className="text-2xl font-bold mb-4 text-purple-900 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              3. AI Intelligence Layer (Core Reasoning Engine)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3">Fine-tuned OpenMedX LLM</h4>
                <p className="text-sm text-slate-600">Based on Llama 3 / Mistral / FLAN-T5</p>
              </Card>
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3">RAG Engine</h4>
                <p className="text-sm text-slate-600">LangChain / Haystack powered retrieval</p>
              </Card>
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3">Knowledge Base</h4>
                <p className="text-sm text-slate-600">PubMed, WHO, CDC, NIH, MIMIC-III</p>
              </Card>
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                ↓ Personalized AI Insights
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: Backend */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border-2 border-slate-200">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 flex items-center gap-2">
              <Database className="w-6 h-6" />
              4. Backend Application Layer
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">User Management & Session Control</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">Health Profile & Consultation Manager</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">AI Agent Router & Coordinator</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">Data Normalization Engine</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">Logging & Audit Service</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium">Feedback & Escalation Protocol</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-slate-600 text-white px-4 py-2 rounded-full text-sm">
                ↓ Processed Queries & Stored Insights
              </div>
            </div>
          </div>
        </div>

        {/* Layer 5: Database */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
              <Database className="w-6 h-6" />
              5. Data Storage & Management Layer
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm font-medium">users</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm font-medium">health_profiles</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm font-medium">consultations</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm font-medium">ai_recommendations</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm font-medium">research_data</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>HIPAA & GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 6: Security */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
            <h3 className="text-2xl font-bold mb-4 text-red-900 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              6. Security & Privacy Framework
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ End-to-end encryption</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Role-based access controls</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Regular security audits</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Data retention & deletion policy</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Third-party sharing restrictions</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Incident response procedures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 7: Dashboard */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-200">
            <h3 className="text-2xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              7. User Dashboard & Analytics Layer
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3">Health Dashboard</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• BMI tracking & trend analysis</li>
                  <li>• Vital signs (user-input)</li>
                  <li>• Wellness goal progress</li>
                  <li>• Habit adherence score</li>
                  <li>• Multi-agent consultation summary</li>
                </ul>
              </Card>
              <Card className="p-6 bg-white">
                <h4 className="font-semibold mb-3">Research Analytics Module</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Anonymous population health trends</li>
                  <li>• Wellness intervention effectiveness</li>
                  <li>• Engagement vs. outcome correlation</li>
                  <li>• Predictive health risk modeling</li>
                  <li>• Continuous AI model refinement</li>
                </ul>
              </Card>
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm">
                ↓ Ethical Research Feedback Loop (Anonymized Data)
              </div>
            </div>
          </div>
        </div>

        {/* Layer 8: Quality Assurance */}
        <div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-200">
            <h3 className="text-2xl font-bold mb-4 text-yellow-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6" />
              8. Quality Assurance & Validation Framework
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ AI content validation (peer-reviewed sources)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Accuracy audits by certified health educators</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ User feedback loop for model improvement</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Expert panel reviews for sensitive topics</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Real-time performance scoring</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm">✓ Satisfaction metrics & outcome tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
          Why Choose OpenMedX?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Brain className="w-12 h-12 text-blue-600" />}
            title="AI-Powered Intelligence"
            description="Leveraging state-of-the-art LLMs and RAG technology for personalized health insights"
          />
          <FeatureCard 
            icon={<Shield className="w-12 h-12 text-blue-600" />}
            title="Privacy First"
            description="HIPAA & GDPR compliant with end-to-end encryption and consent-driven access"
          />
          <FeatureCard 
            icon={<Database className="w-12 h-12 text-blue-600" />}
            title="Evidence-Based"
            description="Built on peer-reviewed research from PubMed, WHO, CDC, and NIH"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Health Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands using AI-powered health advisory</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-600 border-t">
        <p className="mb-2">© 2025 OpenMedX. All rights reserved.</p>
        <p className="text-sm">
          <strong>Disclaimer:</strong> OpenMedX provides health advisory information only. 
          This is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </footer>
    </div>
  );
}

function AgentCard({ icon, name, color }: { icon: React.ReactNode; name: string; color: string }) {
  return (
    <Card className="p-4 bg-white hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`text-${color}-600`}>{icon}</div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-slate-500">Preventive • Personalized • Advisory</p>
        </div>
      </div>
    </Card>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-8 text-center hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </Card>
  );
}
