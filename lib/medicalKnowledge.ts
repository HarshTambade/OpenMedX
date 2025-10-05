// Medical Knowledge Base - Evidence-based health information
// Sources: PubMed, WHO, CDC, NIH guidelines

export const MEDICAL_KNOWLEDGE = {
  // General Health Guidelines
  general: {
    exercise: "Adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities on 2+ days per week (WHO, CDC).",
    sleep: "Adults need 7-9 hours of sleep per night for optimal health. Poor sleep is linked to obesity, diabetes, cardiovascular disease, and mental health issues (NIH).",
    hydration: "Adequate hydration is essential. General recommendation is 8-10 glasses (2-2.5 liters) of water daily, adjusted for activity level and climate (Mayo Clinic).",
    stress: "Chronic stress increases risk of heart disease, obesity, diabetes, and mental health disorders. Stress management techniques include meditation, exercise, and social support (APA).",
  },

  // Cardiovascular Health
  cardiovascular: {
    bloodPressure: "Normal blood pressure is <120/80 mmHg. Hypertension (≥130/80) increases risk of heart disease and stroke. Lifestyle modifications include reducing sodium, exercise, and weight management (AHA).",
    cholesterol: "Total cholesterol should be <200 mg/dL. High LDL cholesterol increases cardiovascular risk. Diet, exercise, and medication can help manage levels (AHA).",
    heartDisease: "Leading cause of death globally. Risk factors include smoking, high blood pressure, high cholesterol, diabetes, obesity, and physical inactivity (WHO).",
  },

  // Metabolic Health
  metabolic: {
    diabetes: "Type 2 diabetes can often be prevented or managed through weight loss, healthy eating, and regular physical activity. HbA1c <5.7% is normal, 5.7-6.4% is prediabetes, ≥6.5% indicates diabetes (ADA).",
    bmi: "BMI 18.5-24.9 is normal weight, 25-29.9 is overweight, ≥30 is obese. However, BMI has limitations and should be considered alongside other health markers (CDC).",
    metabolicSyndrome: "Cluster of conditions (high blood pressure, high blood sugar, excess abdominal fat, abnormal cholesterol) that increase heart disease and diabetes risk (NIH).",
  },

  // Mental Health
  mental: {
    depression: "Major depressive disorder affects 280 million people globally. Symptoms include persistent sadness, loss of interest, sleep changes, and fatigue. Treatment includes therapy and/or medication (WHO).",
    anxiety: "Anxiety disorders are the most common mental health condition. Treatment includes cognitive-behavioral therapy (CBT), medication, and lifestyle modifications (NIMH).",
    mindfulness: "Mindfulness-based interventions reduce stress, anxiety, and depression. Regular practice improves emotional regulation and well-being (JAMA).",
  },

  // Nutrition
  nutrition: {
    balancedDiet: "A healthy diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and saturated fats (USDA Dietary Guidelines).",
    mediterraneanDiet: "Mediterranean diet (rich in fruits, vegetables, whole grains, olive oil, fish) reduces cardiovascular disease risk and promotes longevity (NEJM).",
    supplements: "Most people can get necessary nutrients from food. Supplements may be needed for specific deficiencies (vitamin D, B12, iron). Consult healthcare provider before starting supplements (NIH).",
  },

  // Preventive Care
  preventive: {
    screenings: "Regular health screenings detect diseases early. Recommended: blood pressure (yearly), cholesterol (every 4-6 years), diabetes (every 3 years if at risk), cancer screenings per age/gender guidelines (USPSTF).",
    vaccinations: "Vaccines prevent serious diseases. Adults need flu vaccine annually, Tdap booster every 10 years, and age-appropriate vaccines (shingles, pneumonia) (CDC).",
    dentalCare: "Brush twice daily, floss daily, and visit dentist every 6 months. Poor oral health is linked to heart disease and diabetes (ADA).",
  },

  // Red Flags - Symptoms requiring immediate medical attention
  redFlags: [
    "Chest pain or pressure",
    "Difficulty breathing or shortness of breath",
    "Sudden severe headache",
    "Sudden weakness or numbness (especially one-sided)",
    "Confusion or difficulty speaking",
    "Severe abdominal pain",
    "Coughing up blood",
    "Suicidal thoughts",
    "Severe allergic reaction",
    "High fever (>103°F/39.4°C) that doesn't respond to medication",
  ],
};

// Function to check for red flag symptoms
export function checkRedFlags(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const redFlagKeywords = [
    "chest pain", "can't breathe", "difficulty breathing", "severe headache",
    "numbness", "weakness", "confused", "suicidal", "suicide", "kill myself",
    "severe pain", "coughing blood", "blood in stool", "blood in urine",
  ];

  return redFlagKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to get relevant medical knowledge
export function getMedicalKnowledge(category: string, topic: string): string {
  const knowledge = MEDICAL_KNOWLEDGE as Record<string, unknown>;
  const categoryData = knowledge[category] as Record<string, string> | undefined;
  return categoryData?.[topic] || "";
}
