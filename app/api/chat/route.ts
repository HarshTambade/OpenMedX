import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { checkRedFlags, getMedicalKnowledge } from "@/lib/medicalKnowledge";

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Agent-specific system prompts
const AGENT_PROMPTS: Record<string, string> = {
  general: "You are a General Wellness Coach AI. Provide evidence-based health advice focusing on preventive care, healthy lifestyle habits, and overall wellness. Always remind users to consult healthcare professionals for medical decisions.",
  cardio: "You are a Cardio Wellness Coach AI. Provide advice on heart health, cardiovascular fitness, blood pressure management, and exercise recommendations. Base your advice on evidence from cardiology research.",
  metabolic: "You are a Metabolic Health Coach AI. Focus on metabolism, diabetes prevention, weight management, blood sugar control, and metabolic syndrome. Provide evidence-based nutritional and lifestyle guidance.",
  mental: "You are a Mental Wellness Coach AI. Provide support for stress management, anxiety reduction, sleep improvement, and mental health wellness. Use evidence-based techniques from psychology and psychiatry.",
  musculoskeletal: "You are a Musculoskeletal Coach AI. Advise on bone health, joint care, injury prevention, physical therapy exercises, and posture improvement. Base recommendations on orthopedic and physical therapy research.",
  nutrition: "You are a Nutrition & Lifestyle Coach AI. Provide evidence-based dietary advice, meal planning guidance, nutritional education, and healthy eating habits. Reference nutritional science and dietary guidelines.",
  womens: "You are a Women's Health Coach AI. Focus on women's health issues including reproductive health, hormonal balance, pregnancy wellness, and women-specific health concerns. Provide evidence-based guidance.",
  senior: "You are a Senior Health Coach AI. Specialize in health concerns for older adults including mobility, cognitive health, chronic disease management, and healthy aging. Use geriatric medicine evidence.",
  pediatric: "You are a Pediatric Wellness Coach AI. Focus on children's health, growth and development, nutrition for kids, and pediatric wellness. Base advice on pediatric medicine research.",
  respiratory: "You are a Respiratory Health Coach AI. Advise on lung health, breathing exercises, asthma management, and respiratory wellness. Use pulmonology research and evidence.",
  digestive: "You are a Digestive Health Coach AI. Focus on gut health, digestive issues, nutrition for digestive wellness, and gastrointestinal health. Base advice on gastroenterology research.",
  occupational: "You are an Occupational Wellness Coach AI. Focus on workplace health, ergonomics, work-life balance, stress management at work, and occupational safety. Use occupational health research."
};

export async function POST(request: NextRequest) {
  try {
    const { message, agentId, userProfile } = await request.json();

    // Check for red-flag symptoms
    const redFlag = checkRedFlags(message);
    if (redFlag) {
      return NextResponse.json({
        response: `⚠️ IMPORTANT: ${redFlag}\n\nIf you're experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately.\n\nFor urgent but non-emergency concerns, please contact your healthcare provider or visit an urgent care facility.\n\nYour emergency contact: ${userProfile?.emergencyContact?.name || 'Not provided'} - ${userProfile?.emergencyContact?.phone || 'Not provided'}`,
        isEmergency: true
      });
    }

    // Get relevant medical knowledge
    const knowledge = getMedicalKnowledge(message);

    // Build context from user profile
    const userContext = userProfile ? `
User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- BMI: ${userProfile.bmi} (${userProfile.bmi < 18.5 ? 'Underweight' : userProfile.bmi < 25 ? 'Normal' : userProfile.bmi < 30 ? 'Overweight' : 'Obese'})
- Health Goals: ${userProfile.lifestyleGoals}
${userProfile.medicalHistory ? `- Medical History: ${userProfile.medicalHistory}` : ''}
${userProfile.currentMedications ? `- Current Medications: ${userProfile.currentMedications}` : ''}
` : '';

    // Get agent-specific prompt
    const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.general;

    // Construct the full prompt
    const fullPrompt = `${systemPrompt}

${userContext}

Relevant Medical Knowledge:
${knowledge}

User Question: ${message}

Please provide a helpful, evidence-based response. Keep it concise (2-3 paragraphs). Always include a disclaimer that this is advisory information only and not a substitute for professional medical advice.`;

    try {
      // Call Hugging Face API
      const response = await hf.textGeneration({
        model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      });

      const aiResponse = response.generated_text.trim();

      // Add disclaimer if not already present
      const disclaimer = "\n\n⚠️ Disclaimer: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.";
      
      const finalResponse = aiResponse.includes("Disclaimer") || aiResponse.includes("disclaimer") 
        ? aiResponse 
        : aiResponse + disclaimer;

      return NextResponse.json({ response: finalResponse });

    } catch (apiError) {
      console.error("Hugging Face API error:", apiError);
      
      // Fallback response based on medical knowledge
      const fallbackResponse = `Based on evidence-based medical knowledge:\n\n${knowledge}\n\nFor personalized medical advice specific to your situation, please consult with a healthcare professional.\n\n⚠️ Disclaimer: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.`;
      
      return NextResponse.json({ response: fallbackResponse });
    }

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
