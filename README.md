# OpenMedX - AI-Powered Health Advisory Platform

**Tagline:** "Where AI meets Medicine — Ethically, Openly, Intelligently."

## 🎯 Overview

OpenMedX is a comprehensive, software-only health AI platform that provides personalized health advisory services through 12 specialized AI health coaches. Built with cutting-edge machine learning, evidence-based medical knowledge, and a strong focus on privacy and ethics.

## 🏗️ Complete System Architecture

### 8-Layer Architecture:

1. **User Interaction & Onboarding Layer**
   - Secure registration with HIPAA-compliant consent
   - Comprehensive health profile creation
   - Emergency contact collection

2. **AI Doctor Lobby – Multi-Agent System**
   - 12 specialized AI health coaches:
     - General Wellness Coach
     - Cardio Wellness Coach
     - Metabolic Health Coach
     - Mental Wellness Coach
     - Musculoskeletal Coach
     - Nutrition & Lifestyle Coach
     - Women's Health Coach
     - Senior Health Coach
     - Pediatric Wellness Coach
     - Respiratory Health Coach
     - Digestive Health Coach
     - Occupational Wellness Coach

3. **AI Intelligence Layer**
   - Fine-tuned LLM (TinyLlama-1.1B for low compute)
   - RAG (Retrieval-Augmented Generation) engine
   - Evidence-based knowledge base (PubMed, WHO, CDC, NIH)

4. **Backend Application Layer**
   - User management & session control
   - Health profile & consultation manager
   - AI agent router & coordinator
   - Data normalization engine
   - Logging & audit service
   - Red-flag symptom detection & escalation

5. **Data Storage & Management**
   - User profiles
   - Health data
   - Consultation history
   - AI recommendations
   - Anonymized research data

6. **Security & Privacy Framework**
   - End-to-end encryption
   - HIPAA & GDPR compliance
   - Role-based access controls
   - Data retention policies

7. **User Dashboard & Analytics**
   - BMI tracking & health metrics
   - Wellness goal progress
   - Multi-agent consultation history
   - Anonymous population health insights

8. **Quality Assurance & Validation**
   - AI content validation
   - Evidence-based responses
   - User feedback loops
   - Continuous model improvement

## 🛠️ Tech Stack

### Frontend:
- **Framework:** Next.js 15 (React)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion

### Backend:
- **API:** Next.js API Routes
- **AI Integration:** Hugging Face Inference API
- **Model:** TinyLlama-1.1B-Chat (optimized for low compute)

### Data Sources:
- PubMed Central (medical research)
- WHO Global Health Observatory
- CDC health guidelines
- NIH medical knowledge
- MedQuAD (medical Q&A dataset)
- MIMIC-III (clinical data)

## 📦 Installation & Setup

### Prerequisites:
- Node.js 18+ or Bun
- Hugging Face API key

### Steps:

1. **Clone the repository:**
```bash
cd /home/code/openmedx
```

2. **Install dependencies:**
```bash
bun install
```

3. **Set up environment variables:**
```bash
# Create .env.local file
echo "HUGGINGFACE_API_KEY=your_api_key_here" > .env.local
```

4. **Run development server:**
```bash
bun run dev
```

5. **Open browser:**
```
http://localhost:3000
```

## 🎨 Design System

### Color Palette:
- **Primary:** Blue (#2563eb) - Medical trust and professionalism
- **Secondary:** Cyan (#06b6d4) - Technology and innovation
- **Accent:** White (#ffffff) - Clean and minimal
- **Text:** Slate (#0f172a) - Readability

### Typography:
- **Font:** Inter (sans-serif)
- **Letter Spacing:** -0.5px for headings
- **Line Height:** 1.6 for body text

### Design Principles:
- Clean, minimal, Apple/Linear-level polish
- Futuristic medical-tech aesthetic
- Responsive and mobile-friendly
- Accessibility-first approach

## 🤖 AI Features

### Intelligent Health Advisory:
- **Personalized Responses:** Based on user profile (age, BMI, health goals)
- **Evidence-Based:** References medical research and guidelines
- **Context-Aware:** Considers medical history and current medications
- **Safety-First:** Red-flag symptom detection for emergencies

### Agent Specializations:
Each AI agent is trained with specific medical knowledge:
- Cardiology research for Cardio Coach
- Mental health guidelines for Mental Wellness Coach
- Nutritional science for Nutrition Coach
- And more...

### Fallback System:
If Hugging Face API is unavailable, the system uses comprehensive fallback responses based on:
- Medical knowledge base
- Evidence-based guidelines
- User profile analysis
- Question topic detection

## 🔒 Privacy & Compliance

### HIPAA Compliance:
- Encrypted data storage (AES-256)
- Secure data transmission (HTTPS)
- User consent management
- Data access controls

### GDPR Compliance:
- Right to access data
- Right to deletion
- Data portability
- Consent-driven processing

### Advisory-Only Disclaimer:
All responses include clear disclaimers that this is advisory information only and users should consult healthcare professionals for medical decisions.

## 🚨 Safety Features

### Red-Flag Detection:
The system automatically detects emergency symptoms:
- Chest pain
- Difficulty breathing
- Severe headache
- Suicidal thoughts
- And more...

When detected, users are immediately advised to:
1. Call emergency services (911)
2. Contact their healthcare provider
3. Visit the nearest emergency room

## 📊 Data Sources & Knowledge Base

### Medical Research:
- **PubMed Central:** 7+ million full-text articles
- **WHO Guidelines:** Global health standards
- **CDC Recommendations:** Disease prevention and control
- **NIH Research:** Evidence-based medical knowledge

### Clinical Data:
- **MIMIC-III:** De-identified ICU patient data
- **MedQuAD:** Medical question-answering dataset
- **DrugBank:** Comprehensive drug information

## 🎯 Use Cases

1. **Preventive Health:** General wellness guidance and lifestyle optimization
2. **Chronic Disease Management:** Support for diabetes, hypertension, etc.
3. **Mental Wellness:** Stress management and mental health support
4. **Fitness & Nutrition:** Exercise plans and dietary guidance
5. **Health Education:** Understanding medical conditions and treatments

## 🔮 Future Enhancements

### Phase 2:
- [ ] Firebase/MongoDB integration for persistent storage
- [ ] User authentication with OAuth
- [ ] Wearable device integration (Fitbit, Apple Watch)
- [ ] Medication reminders
- [ ] Appointment scheduling

### Phase 3:
- [ ] Telemedicine integration
- [ ] Lab result interpretation
- [ ] Symptom tracking over time
- [ ] Family health profiles
- [ ] Multi-language support

### Phase 4:
- [ ] Mobile app (React Native)
- [ ] Voice assistant integration
- [ ] AI-powered health risk prediction
- [ ] Personalized health reports
- [ ] Healthcare provider portal

## 📝 API Documentation

### Chat Endpoint:
```typescript
POST /api/chat

Request Body:
{
  "messages": [
    { "role": "user", "content": "Your question" }
  ],
  "agentId": "cardio",
  "userProfile": {
    "age": 35,
    "gender": "Male",
    "height": 175,
    "weight": 75,
    // ... other profile data
  }
}

Response:
{
  "response": "AI-generated health advisory with disclaimer"
}
```

## 🤝 Contributing

This is a hackathon project. Contributions are welcome!

### Areas for Contribution:
- Additional AI agents (dermatology, ophthalmology, etc.)
- Enhanced medical knowledge base
- UI/UX improvements
- Mobile responsiveness
- Accessibility features
- Internationalization

## ⚠️ Important Disclaimers

1. **Not Medical Advice:** OpenMedX provides advisory information only. This is NOT a substitute for professional medical advice, diagnosis, or treatment.

2. **Emergency Situations:** For medical emergencies, call 911 or visit your nearest emergency room immediately.

3. **Consult Healthcare Professionals:** Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

4. **No Doctor-Patient Relationship:** Use of this platform does not create a doctor-patient relationship.

## 📄 License

This project is created for educational and hackathon purposes.

## 👨‍💻 Developer

Built with ❤️ for the future of healthcare AI

**Contact:** muthonibrayan257@gmail.com

---

## 🎉 Hackathon Highlights

### Innovation:
- 12 specialized AI health coaches in one platform
- Evidence-based medical knowledge integration
- Low-compute AI model optimization
- Comprehensive 8-layer architecture

### Impact:
- Democratizing health advisory access
- Reducing healthcare information gaps
- Promoting preventive health
- Supporting mental wellness

### Technical Excellence:
- Modern tech stack (Next.js, TypeScript, Tailwind)
- Responsive design
- Privacy-first architecture
- Scalable system design

---

**OpenMedX** - Empowering individuals with AI-powered health intelligence, ethically and openly.
