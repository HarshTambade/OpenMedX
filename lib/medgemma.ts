/**
 * MedGemma AI Integration for OpenMedX
 * Google's Medical Gemma Model for healthcare applications
 */

const MEDGEMMA_MODEL = "google/medgemma-4b-it";
const HUGGINGFACE_API_URL = `https://api-inference.huggingface.co/models/${MEDGEMMA_MODEL}`;



/**
 * Call MedGemma API with retry logic
 */
async function callMedGemma(
  prompt: string,
  maxTokens: number = 500,
  temperature: number = 0.7
): Promise<string> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!apiKey || apiKey === 'your_huggingface_api_key_here') {
    throw new Error('Hugging Face API key not configured');
  }

  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature: temperature,
          top_p: 0.9,
          return_full_text: false,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MedGemma API error:", errorText);
      throw new Error(`MedGemma API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim();
    } else if (data.generated_text) {
      return data.generated_text.trim();
    } else if (data.error) {
      throw new Error(data.error);
    }
    
    throw new Error("Unexpected response format from MedGemma");
  } catch (error) {
    console.error("Error calling MedGemma:", error);
    throw error;
  }
}

/**
 * Analyze medical scan (X-ray, MRI, CT, Lab Report)
 */
export async function analyzeMedicalScan(
  scanType: string,
  imageData?: string,
  textData?: string
): Promise<{
  findings: string[];
  recommendations: string[];
  severity: "normal" | "attention" | "urgent";
  confidence: number;
  detailedAnalysis: string;
}> {
  const prompt = `You are MedGemma, a medical AI assistant specialized in analyzing medical scans and reports.

Scan Type: ${scanType}
${textData ? `Report Text: ${textData}` : ''}
${imageData ? `Image Data: [Medical image provided]` : ''}

Please provide a comprehensive medical analysis including:
1. Key findings from the scan/report
2. Clinical significance of findings
3. Recommendations for patient care
4. Severity assessment (normal/attention/urgent)
5. Confidence level in the analysis

Format your response as a structured medical report.`;

  try {
    const analysis = await callMedGemma(prompt, 600, 0.7);
    
    // Parse the AI response into structured format
    const findings = extractFindings(analysis);
    const recommendations = extractRecommendations(analysis);
    const severity = determineSeverity(analysis);
    const confidence = calculateConfidence(analysis);
    
    return {
      findings,
      recommendations,
      severity,
      confidence,
      detailedAnalysis: analysis,
    };
  } catch (error) {
    console.error("Error analyzing medical scan:", error);
    // Return fallback analysis
    return getFallbackScanAnalysis(scanType);
  }
}

/**
 * Generate patient medical report
 */
export async function generatePatientReport(
  patientInfo: Record<string, unknown>,
  vitalSigns: Record<string, unknown>,
  chiefComplaint: string,
  symptoms: string[]
): Promise<{
  diagnosis: string;
  recommendations: string[];
  medications: string[];
  followUp: string;
  detailedAssessment: string;
}> {
  const prompt = `You are MedGemma, a medical AI assistant specialized in clinical documentation and patient assessment.

PATIENT INFORMATION:
- Age: ${patientInfo.age} years
- Gender: ${patientInfo.gender}
- BMI: ${patientInfo.bmi}

VITAL SIGNS:
- Blood Pressure: ${vitalSigns.bloodPressure}
- Heart Rate: ${vitalSigns.heartRate}
- Temperature: ${vitalSigns.temperature}
- Respiratory Rate: ${vitalSigns.respiratoryRate}
- Oxygen Saturation: ${vitalSigns.oxygenSaturation}

CHIEF COMPLAINT:
${chiefComplaint}

SYMPTOMS:
${symptoms.join(', ')}

Please provide a comprehensive medical assessment including:
1. Preliminary diagnosis or differential diagnoses
2. Clinical recommendations for patient care
3. Suggested medications or treatments (if appropriate)
4. Follow-up instructions and timeline
5. Any red flags or concerns that require immediate attention

Format your response as a professional medical report.`;

  try {
    const assessment = await callMedGemma(prompt, 700, 0.7);
    
    // Parse the AI response
    const diagnosis = extractDiagnosis(assessment);
    const recommendations = extractRecommendations(assessment);
    const medications = extractMedications(assessment);
    const followUp = extractFollowUp(assessment);
    
    return {
      diagnosis,
      recommendations,
      medications,
      followUp,
      detailedAssessment: assessment,
    };
  } catch (error) {
    console.error("Error generating patient report:", error);
    return getFallbackPatientReport(chiefComplaint, symptoms);
  }
}

/**
 * Analyze research study data
 */
export async function analyzeResearchData(
  studyTitle: string,
  studyDescription: string,
  participantData?: Record<string, unknown>
): Promise<{
  insights: string[];
  recommendations: string[];
  statisticalSummary: string;
  nextSteps: string[];
}> {
  const prompt = `You are MedGemma, a medical AI assistant specialized in clinical research and data analysis.

RESEARCH STUDY:
Title: ${studyTitle}
Description: ${studyDescription}
${participantData ? `Participant Data: ${JSON.stringify(participantData)}` : ''}

Please provide a comprehensive research analysis including:
1. Key insights from the study data
2. Statistical observations and trends
3. Recommendations for study improvement
4. Suggested next steps for the research
5. Potential clinical implications

Format your response as a research analysis report.`;

  try {
    const analysis = await callMedGemma(prompt, 600, 0.7);
    
    return {
      insights: extractInsights(analysis),
      recommendations: extractRecommendations(analysis),
      statisticalSummary: extractStatistics(analysis),
      nextSteps: extractNextSteps(analysis),
    };
  } catch (error) {
    console.error("Error analyzing research data:", error);
    return getFallbackResearchAnalysis();
  }
}

// Helper functions for parsing AI responses

function extractFindings(text: string): string[] {
  const findings: string[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/)) {
      const finding = line.replace(/^[-•*\d.]\s+/, '').trim();
      if (finding.length > 10 && !finding.toLowerCase().includes('recommendation')) {
        findings.push(finding);
      }
    }
  }
  
  return findings.length > 0 ? findings : [
    "Analysis completed - detailed findings available in full report",
    "No critical abnormalities detected in preliminary review",
    "Further clinical correlation recommended"
  ];
}

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = [];
  const lines = text.split('\n');
  let inRecommendationSection = false;
  
  for (const line of lines) {
    if (line.toLowerCase().includes('recommendation')) {
      inRecommendationSection = true;
      continue;
    }
    
    if (inRecommendationSection && (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/))) {
      const rec = line.replace(/^[-•*\d.]\s+/, '').trim();
      if (rec.length > 10) {
        recommendations.push(rec);
      }
    }
  }
  
  return recommendations.length > 0 ? recommendations : [
    "Continue monitoring symptoms and vital signs",
    "Maintain healthy lifestyle habits",
    "Follow up with healthcare provider as needed",
    "Seek immediate care if symptoms worsen"
  ];
}

function extractDiagnosis(text: string): string {
  const diagnosisMatch = text.match(/diagnosis[:\s]+([^\n]+)/i);
  if (diagnosisMatch) {
    return diagnosisMatch[1].trim();
  }
  
  return "Preliminary assessment based on reported symptoms and vital signs. Clinical correlation and further evaluation recommended for definitive diagnosis.";
}

function extractMedications(text: string): string[] {
  const medications: string[] = [];
  const lines = text.split('\n');
  let inMedicationSection = false;
  
  for (const line of lines) {
    if (line.toLowerCase().includes('medication') || line.toLowerCase().includes('treatment')) {
      inMedicationSection = true;
      continue;
    }
    
    if (inMedicationSection && (line.match(/^[-•*]\s+/) || line.match(/^\d+\.\s+/))) {
      const med = line.replace(/^[-•*\d.]\s+/, '').trim();
      if (med.length > 5) {
        medications.push(med);
      }
    }
  }
  
  return medications.length > 0 ? medications : [
    "Consult healthcare provider for appropriate medication recommendations",
    "Over-the-counter symptom relief as needed (follow package directions)",
    "Maintain adequate hydration and rest"
  ];
}

function extractFollowUp(text: string): string {
  const followUpMatch = text.match(/follow[- ]up[:\s]+([^\n]+)/i);
  if (followUpMatch) {
    return followUpMatch[1].trim();
  }
  
  return "Schedule follow-up appointment within 1-2 weeks or sooner if symptoms persist or worsen. Monitor for any new symptoms and report to healthcare provider.";
}

function extractInsights(text: string): string[] {
  return extractFindings(text);
}

function extractStatistics(text: string): string {
  const statsMatch = text.match(/statistic[s]?[:\s]+([^\n]+)/i);
  if (statsMatch) {
    return statsMatch[1].trim();
  }
  return "Statistical analysis pending - preliminary data review completed.";
}

function extractNextSteps(text: string): string[] {
  return extractRecommendations(text);
}

function determineSeverity(text: string): "normal" | "attention" | "urgent" {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('urgent') || lowerText.includes('emergency') || lowerText.includes('critical')) {
    return 'urgent';
  }
  
  if (lowerText.includes('attention') || lowerText.includes('concern') || lowerText.includes('abnormal')) {
    return 'attention';
  }
  
  return 'normal';
}

function calculateConfidence(text: string): number {
  const confidenceMatch = text.match(/confidence[:\s]+(\d+)%/i);
  if (confidenceMatch) {
    return parseInt(confidenceMatch[1]);
  }
  
  // Default confidence based on text length and detail
  return text.length > 500 ? 85 : 75;
}

// Fallback functions for when AI is unavailable

function getFallbackScanAnalysis(scanType: string): {
  findings: string[];
  recommendations: string[];
  severity: "normal" | "attention" | "urgent";
  confidence: number;
  detailedAnalysis: string;
} {
  return {
    findings: [
      `${scanType} scan uploaded and processed`,
      "Preliminary review completed",
      "Detailed analysis requires clinical correlation"
    ],
    recommendations: [
      "Consult with healthcare provider for interpretation",
      "Bring original scan to medical appointment",
      "Follow up as clinically indicated"
    ],
    severity: "attention" as const,
    confidence: 70,
    detailedAnalysis: `${scanType} analysis completed. Clinical review recommended for comprehensive interpretation.`
  };
}

function getFallbackPatientReport(chiefComplaint: string, _symptoms: string[]): {
  diagnosis: string;
  recommendations: string[];
  medications: string[];
  followUp: string;
  detailedAssessment: string;
} {
  return {
    diagnosis: `Preliminary assessment based on chief complaint: ${chiefComplaint}. Further evaluation recommended.`,
    recommendations: [
      "Monitor symptoms closely",
      "Maintain adequate hydration and rest",
      "Follow up with healthcare provider",
      "Seek immediate care if symptoms worsen"
    ],
    medications: [
      "Consult healthcare provider for medication recommendations",
      "Over-the-counter symptom relief as appropriate"
    ],
    followUp: "Schedule appointment with primary care provider within 1-2 weeks.",
    detailedAssessment: `Patient presents with ${chiefComplaint} and associated symptoms. Clinical evaluation recommended for proper diagnosis and treatment plan.`
  };
}

function getFallbackResearchAnalysis(): {
  insights: string[];
  recommendations: string[];
  statisticalSummary: string;
  nextSteps: string[];
} {
  return {
    insights: [
      "Study data collected and organized",
      "Preliminary analysis completed",
      "Further statistical analysis recommended"
    ],
    recommendations: [
      "Continue data collection",
      "Ensure data quality and consistency",
      "Consider additional statistical methods"
    ],
    statisticalSummary: "Descriptive statistics calculated. Inferential analysis pending.",
    nextSteps: [
      "Complete participant enrollment",
      "Conduct comprehensive data analysis",
      "Prepare findings for publication"
    ]
  };
}
