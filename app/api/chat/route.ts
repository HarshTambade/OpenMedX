import { NextRequest, NextResponse } from "next/server";
import { checkRedFlags, getMedicalKnowledge } from "@/lib/medicalKnowledge";
import { searchMedicalKnowledge, getDrugInfo, getMentalHealthInfo } from "@/lib/medicalDatasets";

// Agent-specific system prompts
const AGENT_PROMPTS: Record<string, string> = {
  general: "You are a General Wellness Coach AI powered by BioGPT. Provide evidence-based health advice focusing on preventive care, healthy lifestyle habits, and overall wellness. Always remind users to consult healthcare professionals for medical decisions.",
  cardio: "You are a Cardio Wellness Coach AI powered by BioGPT. Provide advice on heart health, cardiovascular fitness, blood pressure management, and exercise recommendations. Base your advice on evidence from cardiology research.",
  metabolic: "You are a Metabolic Health Coach AI powered by BioGPT. Focus on metabolism, diabetes prevention, weight management, blood sugar control, and metabolic syndrome. Provide evidence-based nutritional and lifestyle guidance.",
  mental: "You are a Mental Wellness Coach AI powered by BioGPT. Provide support for stress management, anxiety reduction, sleep improvement, and mental health wellness. Use evidence-based techniques from psychology and psychiatry.",
  musculoskeletal: "You are a Musculoskeletal Coach AI powered by BioGPT. Advise on bone health, joint care, injury prevention, physical therapy exercises, and posture improvement. Base recommendations on orthopedic and physical therapy research.",
  nutrition: "You are a Nutrition & Lifestyle Coach AI powered by BioGPT. Provide evidence-based dietary advice, meal planning guidance, nutritional education, and healthy eating habits. Reference nutritional science and dietary guidelines.",
  womens: "You are a Women's Health Coach AI powered by BioGPT. Focus on women's health issues including reproductive health, hormonal balance, pregnancy wellness, and women-specific health concerns. Provide evidence-based guidance.",
  senior: "You are a Senior Health Coach AI powered by BioGPT. Specialize in health concerns for older adults including mobility, cognitive health, chronic disease management, and healthy aging. Use geriatric medicine evidence.",
  pediatric: "You are a Pediatric Wellness Coach AI powered by BioGPT. Focus on children's health, growth and development, nutrition for kids, and pediatric wellness. Base advice on pediatric medicine research.",
  respiratory: "You are a Respiratory Health Coach AI powered by BioGPT. Advise on lung health, breathing exercises, asthma management, and respiratory wellness. Use pulmonology research and evidence.",
  digestive: "You are a Digestive Health Coach AI powered by BioGPT. Focus on gut health, digestive issues, nutrition for digestive wellness, and gastrointestinal health. Base advice on gastroenterology research.",
  occupational: "You are an Occupational Wellness Coach AI powered by BioGPT. Focus on workplace health, ergonomics, work-life balance, stress management at work, and occupational safety. Use occupational health research."
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

    // Get relevant medical knowledge from multiple sources
    const basicKnowledge = getMedicalKnowledge(message);
    const advancedKnowledge = searchMedicalKnowledge(message);
    
    // Check for drug-related queries
    const drugMatch = message.match(/\b(aspirin|metformin|ibuprofen|medication|drug|medicine)\b/i);
    let drugInfo = "";
    if (drugMatch) {
      const drug = getDrugInfo(drugMatch[1]);
      if (drug) {
        drugInfo = `\n\nDrug Information:\n- ${drug.name} (${drug.genericName})\n- Indications: ${drug.indications.join(", ")}\n- Common side effects: ${drug.sideEffects.slice(0, 3).join(", ")}\n- Always consult your healthcare provider before starting any medication.`;
      }
    }

    // Check for mental health queries
    const mentalHealthMatch = message.match(/\b(anxiety|depression|stress|mental health)\b/i);
    let mentalHealthInfo = "";
    if (mentalHealthMatch) {
      const mhData = getMentalHealthInfo(mentalHealthMatch[1]);
      if (mhData) {
        mentalHealthInfo = `\n\nMental Health Resources:\n- Condition: ${mhData.condition}\n- Common treatments: ${mhData.treatments.slice(0, 3).join(", ")}\n- Screening tools: ${mhData.screeningTools.join(", ")}\n- If you're in crisis, call 988 (Suicide & Crisis Lifeline)`;
      }
    }

    // Build context from user profile
    const userContext = userProfile ? `\nUser Profile:\n- Age: ${userProfile.age}\n- Gender: ${userProfile.gender}\n- BMI: ${userProfile.bmi} (${userProfile.bmi < 18.5 ? 'Underweight' : userProfile.bmi < 25 ? 'Normal' : userProfile.bmi < 30 ? 'Overweight' : 'Obese'})\n- Health Goals: ${userProfile.lifestyleGoals}\n${userProfile.medicalHistory ? `- Medical History: ${userProfile.medicalHistory}` : ''}\n${userProfile.currentMedications ? `- Current Medications: ${userProfile.currentMedications}` : ''}\n` : '';

    // Get agent-specific prompt
    const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.general;

    // Try BioGPT via Hugging Face API
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    
    if (apiKey && apiKey !== 'your_huggingface_api_key_here') {
      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/microsoft/BioGPT-Large",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: `${systemPrompt}\n\n${userContext}\n\nRelevant Medical Knowledge:\n${basicKnowledge}\n\nUser Question: ${message}\n\nProvide a helpful, evidence-based response in 2-3 paragraphs. Include specific recommendations.`,
              parameters: {
                max_new_tokens: 500,
                temperature: 0.7,
                top_p: 0.9,
                return_full_text: false,
                do_sample: true
              },
              options: {
                wait_for_model: true,
                use_cache: false
              }
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          let aiResponse = "";
          
          if (Array.isArray(data) && data[0]?.generated_text) {
            aiResponse = data[0].generated_text.trim();
          } else if (data.generated_text) {
            aiResponse = data.generated_text.trim();
          }

          if (aiResponse && aiResponse.length > 50) {
            // Add drug and mental health info if relevant
            aiResponse += drugInfo + mentalHealthInfo;
            
            const disclaimer = "\n\n⚠️ Disclaimer: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.";
            
            const finalResponse = aiResponse.includes("Disclaimer") || aiResponse.includes("disclaimer") 
              ? aiResponse 
              : aiResponse + disclaimer;

            return NextResponse.json({ 
              response: finalResponse,
              model: "BioGPT-Large",
              sources: advancedKnowledge.length > 0 ? advancedKnowledge.map(k => k.source) : []
            });
          }
        } else {
          const errorText = await response.text();
          console.error("BioGPT API error:", errorText);
        }
      } catch (apiError) {
        console.error("BioGPT API error:", apiError);
      }
    }

    // Enhanced fallback response using medical datasets
    let enhancedResponse = "";
    
    if (advancedKnowledge.length > 0) {
      // Use curated medical Q&A
      const bestMatch = advancedKnowledge[0];
      enhancedResponse = `Based on evidence from ${bestMatch.source}:\n\n${bestMatch.answer}`;
    } else {
      // Use basic knowledge
      enhancedResponse = basicKnowledge;
    }

    // Add personalized recommendations
    if (userProfile) {
      enhancedResponse += `\n\n**Personalized Recommendations for You:**\n`;
      enhancedResponse += `- Age: ${userProfile.age} years - `;
      
      if (userProfile.age < 30) {
        enhancedResponse += `Focus on building healthy habits now for long-term wellness.\n`;
      } else if (userProfile.age < 50) {
        enhancedResponse += `Maintain preventive care and regular health screenings.\n`;
      } else {
        enhancedResponse += `Prioritize chronic disease prevention and management.\n`;
      }
      
      enhancedResponse += `- BMI: ${userProfile.bmi} - `;
      if (userProfile.bmi < 18.5) {
        enhancedResponse += `Consider consulting a nutritionist for healthy weight gain strategies.\n`;
      } else if (userProfile.bmi >= 25) {
        enhancedResponse += `Focus on balanced nutrition and regular physical activity.\n`;
      } else {
        enhancedResponse += `Maintain your healthy weight through balanced lifestyle.\n`;
      }
    }

    // Add drug and mental health info
    enhancedResponse += drugInfo + mentalHealthInfo;

    const disclaimer = "\n\n⚠️ Disclaimer: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.";
    
    return NextResponse.json({ 
      response: enhancedResponse + disclaimer,
      model: "Enhanced Knowledge Base",
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
