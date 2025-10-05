import { NextRequest, NextResponse } from "next/server";
import { checkRedFlags, getMedicalKnowledge } from "@/lib/medicalKnowledge";
import { searchMedicalKnowledge, getDrugInfo, getMentalHealthInfo } from "@/lib/medicalDatasets";

// Agent-specific system prompts
const AGENT_PROMPTS: Record<string, string> = {
  general: "You are a General Wellness Coach AI. Provide evidence-based health advice focusing on preventive care, healthy lifestyle habits, and overall wellness.",
  cardio: "You are a Cardio Wellness Coach AI. Provide advice on heart health, cardiovascular fitness, blood pressure management, and exercise recommendations.",
  metabolic: "You are a Metabolic Health Coach AI. Focus on metabolism, diabetes prevention, weight management, and blood sugar control.",
  mental: "You are a Mental Wellness Coach AI. Provide support for stress management, anxiety reduction, sleep improvement, and mental health wellness.",
  musculoskeletal: "You are a Musculoskeletal Coach AI. Advise on bone health, joint care, injury prevention, and physical therapy exercises.",
  nutrition: "You are a Nutrition & Lifestyle Coach AI. Provide evidence-based dietary advice, meal planning guidance, and healthy eating habits.",
  womens: "You are a Women's Health Coach AI. Focus on women's health issues including reproductive health, hormonal balance, and pregnancy wellness.",
  senior: "You are a Senior Health Coach AI. Specialize in health concerns for older adults including mobility, cognitive health, and healthy aging.",
  pediatric: "You are a Pediatric Wellness Coach AI. Focus on children's health, growth and development, and pediatric wellness.",
  respiratory: "You are a Respiratory Health Coach AI. Advise on lung health, breathing exercises, asthma management, and respiratory wellness.",
  digestive: "You are a Digestive Health Coach AI. Focus on gut health, digestive issues, and gastrointestinal health.",
  occupational: "You are an Occupational Wellness Coach AI. Focus on workplace health, ergonomics, work-life balance, and stress management at work."
};

export async function POST(request: NextRequest) {
  try {
    const { message, agentId, userProfile } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check for red-flag symptoms
    const redFlag = checkRedFlags(message);
    if (redFlag) {
      return NextResponse.json({
        response: `⚠️ IMPORTANT: ${redFlag}\n\nIf you're experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately.\n\nFor urgent but non-emergency concerns, please contact your healthcare provider or visit an urgent care facility.\n\nYour emergency contact: ${userProfile?.emergencyContact?.name || 'Not provided'} - ${userProfile?.emergencyContact?.phone || 'Not provided'}`,
        isEmergency: true
      });
    }

    // Get relevant medical knowledge from multiple sources
    const basicKnowledge = getMedicalKnowledge(message);
    const advancedKnowledge = searchMedicalKnowledge(message);
    
    // Check for drug-related queries
    const drugMatch = message.match(/\b(aspirin|metformin|ibuprofen|medication|drug|medicine)\b/i);
    let drugInfo = "";
    if (drugMatch) {
      const drug = getDrugInfo(drugMatch[1]);
      if (drug) {
        drugInfo = `\n\n**Drug Information:**\n- **${drug.name}** (${drug.genericName})\n- **Indications:** ${drug.indications.join(", ")}\n- **Common side effects:** ${drug.sideEffects.slice(0, 3).join(", ")}\n- Always consult your healthcare provider before starting any medication.`;
      }
    }

    // Check for mental health queries
    const mentalHealthMatch = message.match(/\b(anxiety|depression|stress|mental health)\b/i);
    let mentalHealthInfo = "";
    if (mentalHealthMatch) {
      const mhData = getMentalHealthInfo(mentalHealthMatch[1]);
      if (mhData) {
        mentalHealthInfo = `\n\n**Mental Health Resources:**\n- **Condition:** ${mhData.condition}\n- **Common treatments:** ${mhData.treatments.slice(0, 3).join(", ")}\n- **Screening tools:** ${mhData.screeningTools.join(", ")}\n- **Crisis Support:** If you're in crisis, call 988 (Suicide & Crisis Lifeline)`;
      }
    }

    // Build comprehensive response
    let enhancedResponse = "";
    
    // Get agent-specific context
    const agentContext = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.general;
    enhancedResponse += `**${agentContext.split('.')[0]}**\n\n`;
    
    if (advancedKnowledge.length > 0) {
      // Use curated medical Q&A
      const bestMatch = advancedKnowledge[0];
      enhancedResponse += `**Evidence-Based Answer:**\n\n${bestMatch.answer}\n\n`;
      enhancedResponse += `**Source:** ${bestMatch.source}`;
    } else if (basicKnowledge && basicKnowledge.length > 50) {
      // Use basic knowledge
      enhancedResponse += `**Medical Guidance:**\n\n${basicKnowledge}`;
    } else {
      // Generate contextual response based on query
      enhancedResponse += generateContextualResponse(message, agentId);
    }

    // Add personalized recommendations
    if (userProfile) {
      enhancedResponse += `\n\n**Personalized Recommendations for You:**\n`;
      
      // Age-based recommendations
      if (userProfile.age) {
        enhancedResponse += `\n**Age-Specific Advice (${userProfile.age} years):**\n`;
        if (userProfile.age < 30) {
          enhancedResponse += `- Focus on building healthy habits now for long-term wellness\n- Establish regular exercise routines and balanced nutrition\n- Prioritize preventive care and regular check-ups\n`;
        } else if (userProfile.age < 50) {
          enhancedResponse += `- Maintain preventive care and regular health screenings\n- Monitor cardiovascular health and metabolic markers\n- Balance work, family, and personal health priorities\n`;
        } else {
          enhancedResponse += `- Prioritize chronic disease prevention and management\n- Focus on maintaining mobility and cognitive function\n- Regular screenings for age-related conditions\n`;
        }
      }
      
      // BMI-based recommendations
      if (userProfile.bmi) {
        enhancedResponse += `\n**Weight Management (BMI: ${userProfile.bmi}):**\n`;
        if (userProfile.bmi < 18.5) {
          enhancedResponse += `- Your BMI indicates underweight status\n- Consider consulting a nutritionist for healthy weight gain strategies\n- Focus on nutrient-dense foods and strength training\n`;
        } else if (userProfile.bmi >= 25 && userProfile.bmi < 30) {
          enhancedResponse += `- Your BMI indicates overweight status\n- Focus on balanced nutrition and regular physical activity\n- Aim for 150 minutes of moderate exercise per week\n`;
        } else if (userProfile.bmi >= 30) {
          enhancedResponse += `- Your BMI indicates obesity\n- Consult with healthcare provider for personalized weight management plan\n- Consider working with a registered dietitian and exercise specialist\n`;
        } else {
          enhancedResponse += `- Your BMI is in the healthy range - great job!\n- Maintain your healthy weight through balanced lifestyle\n- Continue regular physical activity and nutritious eating\n`;
        }
      }

      // Health goals
      if (userProfile.lifestyleGoals) {
        enhancedResponse += `\n**Supporting Your Goals (${userProfile.lifestyleGoals}):**\n`;
        enhancedResponse += `- Stay consistent with your health objectives\n- Track your progress regularly\n- Celebrate small wins along the way\n`;
      }
    }

    // Add drug and mental health info
    enhancedResponse += drugInfo + mentalHealthInfo;

    // Add medical disclaimer
    const disclaimer = "\n\n⚠️ **Medical Disclaimer:** This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.";
    
    return NextResponse.json({ 
      response: enhancedResponse + disclaimer,
      model: "OpenMedX Medical Knowledge Base",
      sources: advancedKnowledge.length > 0 ? advancedKnowledge.map(k => k.source) : ["Medical Knowledge Base"]
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

function generateContextualResponse(message: string, agentId: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Cardiovascular health
  if (lowerMessage.includes('heart') || lowerMessage.includes('cardiovascular') || lowerMessage.includes('blood pressure')) {
    return `**Cardiovascular Health Guidance:**

Maintaining heart health is crucial for overall wellness. Here are evidence-based recommendations:

**Key Strategies:**
1. **Regular Exercise:** Aim for at least 150 minutes of moderate aerobic activity per week (brisk walking, swimming, cycling)
2. **Heart-Healthy Diet:** Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats (Mediterranean diet pattern)
3. **Blood Pressure Management:** Keep blood pressure below 120/80 mmHg through lifestyle modifications
4. **Cholesterol Control:** Maintain LDL cholesterol below 100 mg/dL
5. **Stress Management:** Practice relaxation techniques like meditation, yoga, or deep breathing

**Warning Signs to Watch:**
- Chest pain or discomfort
- Shortness of breath
- Irregular heartbeat
- Excessive fatigue

If you experience any of these symptoms, consult your healthcare provider immediately.`;
  }
  
  // Nutrition and diet
  if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return `**Nutrition and Dietary Guidance:**

A balanced diet is fundamental to good health. Here are evidence-based nutritional recommendations:

**Healthy Eating Principles:**
1. **Balanced Plate:** Fill half your plate with vegetables and fruits, quarter with lean protein, quarter with whole grains
2. **Hydration:** Drink 8-10 glasses of water daily
3. **Portion Control:** Use smaller plates and be mindful of serving sizes
4. **Limit Processed Foods:** Reduce intake of added sugars, sodium, and unhealthy fats
5. **Regular Meals:** Eat at consistent times to maintain stable blood sugar

**Nutrient-Rich Foods:**
- **Proteins:** Fish (salmon, tuna), chicken, beans, lentils, tofu
- **Healthy Fats:** Avocados, nuts, olive oil, fatty fish
- **Complex Carbs:** Quinoa, brown rice, oats, sweet potatoes
- **Vitamins & Minerals:** Leafy greens, berries, citrus fruits, cruciferous vegetables

**Meal Planning Tips:**
- Prepare meals in advance
- Keep healthy snacks available
- Read nutrition labels
- Cook at home more often`;
  }
  
  // Exercise and fitness
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness') || lowerMessage.includes('physical activity')) {
    return `**Exercise and Fitness Guidance:**

Regular physical activity is essential for maintaining health and preventing chronic diseases.

**Exercise Recommendations:**
1. **Aerobic Exercise:** 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity per week
2. **Strength Training:** 2-3 sessions per week targeting all major muscle groups
3. **Flexibility:** Daily stretching to maintain range of motion
4. **Balance Training:** Especially important for older adults to prevent falls

**Getting Started:**
- Start slowly and gradually increase intensity
- Choose activities you enjoy
- Set realistic goals
- Track your progress
- Find a workout buddy for motivation

**Types of Exercise:**
- **Cardio:** Walking, jogging, cycling, swimming, dancing
- **Strength:** Weight lifting, resistance bands, bodyweight exercises
- **Flexibility:** Yoga, Pilates, stretching routines
- **Balance:** Tai chi, standing on one foot, heel-to-toe walk

**Safety Tips:**
- Warm up before exercise
- Cool down and stretch after
- Stay hydrated
- Listen to your body
- Consult a doctor before starting a new program if you have health conditions`;
  }
  
  // Mental health and stress
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('mental') || lowerMessage.includes('sleep')) {
    return `**Mental Health and Stress Management:**

Mental health is just as important as physical health. Here are evidence-based strategies:

**Stress Reduction Techniques:**
1. **Mindfulness Meditation:** Practice 10-15 minutes daily
2. **Deep Breathing:** Use 4-7-8 breathing technique (inhale 4, hold 7, exhale 8)
3. **Regular Exercise:** Physical activity reduces stress hormones
4. **Adequate Sleep:** Aim for 7-9 hours per night
5. **Social Connection:** Maintain relationships with friends and family

**Sleep Hygiene:**
- Maintain consistent sleep schedule
- Create a relaxing bedtime routine
- Keep bedroom cool, dark, and quiet
- Avoid screens 1 hour before bed
- Limit caffeine after 2 PM

**When to Seek Professional Help:**
- Persistent feelings of sadness or hopelessness
- Difficulty functioning in daily life
- Thoughts of self-harm
- Severe anxiety or panic attacks

**Resources:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- SAMHSA National Helpline: 1-800-662-4357`;
  }
  
  // Default response
  return `**General Health Guidance:**

Thank you for your question about "${message}". Here are some general health recommendations:

**Foundational Health Practices:**
1. **Balanced Nutrition:** Eat a variety of whole foods including fruits, vegetables, lean proteins, and whole grains
2. **Regular Exercise:** Aim for at least 150 minutes of moderate activity per week
3. **Adequate Sleep:** Get 7-9 hours of quality sleep each night
4. **Stress Management:** Practice relaxation techniques and maintain work-life balance
5. **Preventive Care:** Schedule regular check-ups and screenings with your healthcare provider

**Healthy Lifestyle Habits:**
- Stay hydrated (8-10 glasses of water daily)
- Limit alcohol consumption
- Avoid tobacco and recreational drugs
- Maintain social connections
- Practice good hygiene
- Manage chronic conditions with your doctor

**When to See a Doctor:**
- New or worsening symptoms
- Persistent pain or discomfort
- Changes in appetite, weight, or energy levels
- Concerns about your health

For specific medical advice tailored to your situation, please consult with a qualified healthcare provider.`;
}
