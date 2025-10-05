# OpenMedX System Architecture Documentation

## 🏗️ Complete Architecture Overview

This document provides a detailed breakdown of the OpenMedX platform architecture, designed for hackathon presentations and technical documentation.

---

## 📊 Architecture Diagram Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION LAYER                        │
│  Registration → Consent → Health Profile → Dashboard Access     │
└────────────────────────────┬────────────────────────────────────┘
                             │ (Encrypted User Data)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              AI DOCTOR LOBBY - MULTI-AGENT SYSTEM               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              DiagnoAI (Central Orchestrator)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────┴──────────────────────────┐       │
│  │                                                       │       │
│  ▼                                                       ▼       │
│  CORE AGENTS (6)                    EXPANSION AGENTS (6)        │
│  • General Wellness                 • Women's Health            │
│  • Cardio Wellness                  • Senior Health             │
│  • Metabolic Health                 • Pediatric Wellness        │
│  • Mental Wellness                  • Respiratory Health        │
│  • Musculoskeletal                  • Digestive Health          │
│  • Nutrition & Lifestyle            • Occupational Wellness     │
└────────────────────────────┬────────────────────────────────────┘
                             │ (Agent Selection & Routing)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│           AI INTELLIGENCE LAYER (Core Reasoning Engine)         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │ Fine-tuned   │  │  RAG Engine  │  │  Knowledge Base    │   │
│  │ OpenMedX LLM │  │  (LangChain/ │  │  • PubMed          │   │
│  │ (TinyLlama)  │  │   Haystack)  │  │  • WHO, CDC, NIH   │   │
│  │              │  │              │  │  • MIMIC-III       │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ (Personalized AI Insights)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND APPLICATION LAYER (FastAPI)                │
│                                                                  │
│  • User Management & Session Control                            │
│  • Health Profile & Consultation Manager                        │
│  • AI Agent Router & Coordinator                                │
│  • Data Normalization Engine                                    │
│  • Logging & Audit Service                                      │
│  • Feedback & Escalation Protocol (Red-Flag Detection)          │
└────────────────────────────┬────────────────────────────────────┘
                             │ (Processed Queries & Stored Insights)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│         DATA STORAGE & MANAGEMENT LAYER (Firebase/MongoDB)      │
│                                                                  │
│  ┌──────┐ ┌────────────────┐ ┌──────────────┐ ┌──────────────┐│
│  │users │ │health_profiles │ │consultations │ │ai_recommend..││
│  └──────┘ └────────────────┘ └──────────────┘ └──────────────┘│
│                                                                  │
│  🔒 AES-256 Encryption | HIPAA & GDPR Compliant                │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              SECURITY & PRIVACY FRAMEWORK (Layer 6)             │
│                                                                  │
│  • End-to-end encryption                                        │
│  • Role-based access controls                                   │
│  • Regular security audits                                      │
│  • Data retention & deletion policy                             │
│  • Third-party sharing restrictions                             │
│  • Incident response procedures                                 │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│         USER DASHBOARD & ANALYTICS LAYER (Layer 7)              │
│                                                                  │
│  ┌──────────────────────┐  ┌─────────────────────────────────┐ │
│  │  Health Dashboard    │  │  Research Analytics Module      │ │
│  │  • BMI tracking      │  │  • Population health trends     │ │
│  │  • Vital signs       │  │  • Intervention effectiveness   │ │
│  │  • Wellness goals    │  │  • Outcome correlation          │ │
│  │  • Habit adherence   │  │  • Risk modeling                │ │
│  │  • Consultation log  │  │  • AI model refinement          │ │
│  └──────────────────────┘  └─────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │ (Anonymized Research Feedback)
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│      QUALITY ASSURANCE & VALIDATION FRAMEWORK (Layer 8)         │
│                                                                  │
│  • AI content validation (peer-reviewed sources)                │
│  • Accuracy audits by certified health educators                │
│  • User feedback loop for continuous improvement                │
│  • Expert panel reviews for sensitive health topics             │
│  • Real-time performance scoring for AI responses               │
│  • Satisfaction metrics & clinical outcome tracking             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### User Journey Flow:

```
1. USER REGISTRATION
   ↓
2. CONSENT & LEGAL AGREEMENTS
   ↓
3. HEALTH PROFILE CREATION
   ↓
4. DASHBOARD ACCESS
   ↓
5. AI AGENT SELECTION
   ↓
6. HEALTH QUERY INPUT
   ↓
7. AI PROCESSING (RAG + LLM)
   ↓
8. EVIDENCE-BASED RESPONSE
   ↓
9. USER FEEDBACK
   ↓
10. CONTINUOUS LEARNING
```

---

## 🎯 Layer-by-Layer Breakdown

### Layer 1: User Interaction & Onboarding

**Purpose:** Secure user registration and comprehensive health profile creation

**Components:**
- Registration form with validation
- HIPAA-compliant consent management
- Legal disclaimers (advisory-only nature)
- Emergency contact collection
- Health profile questionnaire

**Data Collected:**
- Demographics (age, gender)
- Physical metrics (height, weight)
- Medical history (optional)
- Current medications (optional)
- Allergies
- Wellness goals

**Security:**
- Password encryption
- Email verification
- Secure session management

---

### Layer 2: AI Doctor Lobby - Multi-Agent System

**Purpose:** Specialized AI health coaches for different medical domains

**Core Agents (Launch Phase):**

1. **General Wellness Coach** 🩹
   - Preventive health
   - Lifestyle optimization
   - Health screening recommendations

2. **Cardio Wellness Coach** ❤️
   - Heart health
   - Blood pressure management
   - Cardiovascular exercise

3. **Metabolic Health Coach** 🍎
   - Diabetes prevention
   - Weight management
   - Blood sugar control

4. **Mental Wellness Coach** 🧠
   - Stress management
   - Anxiety reduction
   - Sleep improvement

5. **Musculoskeletal Coach** 🦴
   - Joint health
   - Injury prevention
   - Physical therapy

6. **Nutrition & Lifestyle Coach** 🥗
   - Dietary guidance
   - Meal planning
   - Nutritional education

**Expansion Agents:**

7. **Women's Health Coach** 👩‍⚕️
8. **Senior Health Coach** 👴
9. **Pediatric Wellness Coach** 👶
10. **Respiratory Health Coach** 🌬️
11. **Digestive Health Coach** 💧
12. **Occupational Wellness Coach** 💼

**Agent Capabilities:**
- Personalized advisory based on user profile
- Evidence-based recommendations
- Triage and follow-up suggestions
- Risk awareness education

---

### Layer 3: AI Intelligence Layer

**Purpose:** Core reasoning engine for generating health insights

**Components:**

1. **Fine-tuned OpenMedX LLM**
   - Model: TinyLlama-1.1B-Chat (optimized for low compute)
   - Alternative: FLAN-T5-base, Mistral-7B
   - Training: Medical Q&A datasets (MedQuAD)

2. **RAG Engine (Retrieval-Augmented Generation)**
   - Framework: LangChain / Haystack
   - Vector database for medical knowledge
   - Semantic search for relevant information

3. **Evidence-Based Knowledge Base**
   - PubMed Central: 7M+ medical articles
   - WHO Guidelines: Global health standards
   - CDC Recommendations: Disease prevention
   - NIH Research: Clinical studies
   - MIMIC-III: De-identified patient data

**Processing Flow:**
```
User Query → Context Extraction → Knowledge Retrieval → 
LLM Generation → Validation → Response with Citations
```

---

### Layer 4: Backend Application Layer

**Purpose:** Business logic and API management

**Modules:**

1. **User Management & Session Control**
   - Authentication
   - Authorization
   - Session management

2. **Health Profile & Consultation Manager**
   - Profile CRUD operations
   - Consultation history
   - Data versioning

3. **AI Agent Router & Coordinator**
   - Agent selection logic
   - Load balancing
   - Fallback handling

4. **Data Normalization Engine**
   - Input validation
   - Data standardization
   - Unit conversion

5. **Logging & Audit Service**
   - Activity logs
   - Compliance tracking
   - Error monitoring

6. **Feedback & Escalation Protocol**
   - Red-flag symptom detection
   - Emergency routing
   - Healthcare provider referral

**Technology:**
- Framework: Next.js API Routes
- Language: TypeScript
- Runtime: Node.js / Bun

---

### Layer 5: Data Storage & Management

**Purpose:** Persistent data storage with encryption

**Database Schema:**

```typescript
// users collection
{
  id: string,
  email: string,
  passwordHash: string,
  fullName: string,
  emergencyContact: {
    name: string,
    phone: string
  },
  createdAt: timestamp,
  lastLogin: timestamp
}

// health_profiles collection
{
  userId: string,
  age: number,
  gender: string,
  height: number,
  weight: number,
  bmi: number,
  medicalHistory: string,
  currentMedications: string[],
  allergies: string[],
  lifestyleGoals: string,
  updatedAt: timestamp
}

// consultations collection
{
  id: string,
  userId: string,
  agentId: string,
  messages: [
    { role: string, content: string, timestamp: timestamp }
  ],
  createdAt: timestamp
}

// ai_recommendations collection
{
  id: string,
  consultationId: string,
  recommendation: string,
  sources: string[],
  confidence: number,
  feedback: { helpful: boolean, rating: number }
}

// research_data collection (anonymized)
{
  id: string,
  ageGroup: string,
  condition: string,
  intervention: string,
  outcome: string,
  timestamp: timestamp
}
```

**Storage Technology:**
- Current: LocalStorage (MVP)
- Production: Firebase / MongoDB
- Encryption: AES-256

---

### Layer 6: Security & Privacy Framework

**Purpose:** Comprehensive security and compliance

**Security Measures:**

1. **Encryption**
   - Data at rest: AES-256
   - Data in transit: TLS 1.3
   - End-to-end encryption for sensitive data

2. **Access Control**
   - Role-based access control (RBAC)
   - Principle of least privilege
   - Multi-factor authentication (future)

3. **Compliance**
   - HIPAA compliance
   - GDPR compliance
   - Data retention policies
   - Right to deletion

4. **Auditing**
   - Activity logging
   - Access logs
   - Change tracking
   - Compliance reports

5. **Incident Response**
   - Breach detection
   - Notification procedures
   - Recovery protocols

---

### Layer 7: User Dashboard & Analytics

**Purpose:** User interface and health insights

**Health Dashboard Features:**
- BMI calculation and tracking
- Vital signs monitoring (user-input)
- Wellness goal progress
- Habit adherence scoring
- Consultation history
- Personalized recommendations

**Research Analytics Module:**
- Anonymous population health trends
- Wellness intervention effectiveness
- Engagement vs. outcome correlation
- Predictive health risk modeling
- Continuous AI model refinement

**Visualizations:**
- Line charts for trends
- Progress bars for goals
- Heat maps for activity
- Comparison charts

---

### Layer 8: Quality Assurance & Validation

**Purpose:** Ensure accuracy and reliability

**Validation Mechanisms:**

1. **AI Content Validation**
   - Cross-reference with peer-reviewed sources
   - Citation verification
   - Fact-checking algorithms

2. **Accuracy Audits**
   - Certified health educators review
   - Medical professional oversight
   - Regular content updates

3. **User Feedback Loop**
   - Rating system for responses
   - Improvement suggestions
   - Error reporting

4. **Expert Panel Reviews**
   - Sensitive health topics
   - Controversial recommendations
   - Emerging medical research

5. **Performance Scoring**
   - Response accuracy
   - User satisfaction
   - Clinical outcome tracking

---

## 🔐 Security Architecture

### Authentication Flow:
```
User Login → Credential Validation → Session Token Generation → 
Secure Cookie Storage → Token Verification on Each Request
```

### Data Encryption:
```
User Input → Client-side Validation → HTTPS Transmission → 
Server-side Encryption → Database Storage (Encrypted) → 
Decryption on Retrieval → Secure Display
```

---

## 🚀 Scalability Considerations

### Horizontal Scaling:
- Load balancing across multiple servers
- Database sharding by user ID
- CDN for static assets
- Caching layer (Redis)

### Vertical Scaling:
- Optimized database queries
- Efficient AI model inference
- Code optimization
- Resource monitoring

---

## 📈 Performance Metrics

### Target Metrics:
- Page load time: < 2 seconds
- AI response time: < 5 seconds
- API response time: < 500ms
- Uptime: 99.9%
- Concurrent users: 10,000+

---

## 🔮 Future Architecture Enhancements

### Phase 2:
- Microservices architecture
- Kubernetes orchestration
- Real-time notifications (WebSockets)
- Advanced analytics (Apache Spark)

### Phase 3:
- Edge computing for faster responses
- Federated learning for privacy
- Blockchain for data integrity
- Quantum-resistant encryption

---

## 📚 Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| UI Components | shadcn/ui, Lucide Icons |
| Backend | Next.js API Routes, Node.js |
| AI/ML | Hugging Face, TinyLlama, LangChain |
| Database | LocalStorage (MVP) → Firebase/MongoDB |
| Authentication | JWT, bcrypt |
| Deployment | Vercel, Railway |
| Monitoring | Sentry, LogRocket |
| Analytics | Google Analytics, Mixpanel |

---

**Document Version:** 1.0  
**Last Updated:** October 5, 2025  
**Maintained by:** OpenMedX Development Team
