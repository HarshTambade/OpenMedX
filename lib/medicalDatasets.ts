/**
 * Medical Datasets Integration Library
 * Integrates public health and medical knowledge datasets for real-time data
 */

// PubMed Central (PMC) - Biomedical Articles
export interface PubMedArticle {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  publishDate: string;
  keywords: string[];
  citations: number;
}

// MIMIC-IV - ICU Patient Data (De-identified)
export interface MIMICPatientData {
  patientId: string;
  age: number;
  gender: string;
  admissionType: string;
  diagnosis: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  labResults: Record<string, number>;
  medications: string[];
  outcome: string;
}

// MedQuAD - Medical Question Answering Dataset
export interface MedicalQA {
  question: string;
  answer: string;
  source: string;
  category: string;
  confidence: number;
}

// DrugBank - Drug Information
export interface DrugInfo {
  drugId: string;
  name: string;
  genericName: string;
  brandNames: string[];
  description: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  dosage: string;
  category: string;
}

// WHO Global Health Observatory Data
export interface WHOHealthData {
  country: string;
  indicator: string;
  year: number;
  value: number;
  unit: string;
  category: string;
}

// Mental Health Dataset
export interface MentalHealthData {
  condition: string;
  symptoms: string[];
  prevalence: number;
  treatments: string[];
  resources: string[];
  screeningTools: string[];
}

// Nutrition Dataset
export interface NutritionData {
  foodItem: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
  servingSize: string;
}

/**
 * Medical Knowledge Base - Curated from Public Datasets
 */
export const medicalKnowledgeBase = {
  // Common Medical Questions (MedQuAD-inspired)
  commonQuestions: [
    {
      question: "What are the best ways to improve cardiovascular health?",
      answer: "To improve cardiovascular health: 1) Exercise regularly (150 minutes moderate activity/week), 2) Maintain healthy diet rich in fruits, vegetables, whole grains, 3) Control blood pressure and cholesterol, 4) Avoid smoking, 5) Manage stress, 6) Maintain healthy weight, 7) Limit alcohol, 8) Get adequate sleep (7-9 hours). Regular check-ups with healthcare provider are essential.",
      source: "American Heart Association",
      category: "Cardiovascular Health",
      confidence: 0.95
    },
    {
      question: "How can I manage diabetes effectively?",
      answer: "Effective diabetes management includes: 1) Monitor blood glucose regularly, 2) Follow prescribed medication regimen, 3) Maintain balanced diet with controlled carbohydrates, 4) Exercise regularly, 5) Maintain healthy weight, 6) Regular medical check-ups, 7) Manage stress, 8) Avoid smoking, 9) Limit alcohol. Work closely with healthcare team for personalized plan.",
      source: "American Diabetes Association",
      category: "Metabolic Health",
      confidence: 0.95
    },
    {
      question: "What are effective stress management techniques?",
      answer: "Evidence-based stress management techniques: 1) Mindfulness meditation (10-20 min daily), 2) Regular physical exercise, 3) Deep breathing exercises, 4) Progressive muscle relaxation, 5) Adequate sleep, 6) Social support, 7) Time management, 8) Healthy diet, 9) Limit caffeine/alcohol, 10) Professional counseling if needed. Consistency is key.",
      source: "National Institute of Mental Health",
      category: "Mental Health",
      confidence: 0.93
    }
  ] as MedicalQA[],

  // Common Medications (DrugBank-inspired)
  commonMedications: [
    {
      drugId: "DB00945",
      name: "Aspirin",
      genericName: "Acetylsalicylic acid",
      brandNames: ["Bayer", "Ecotrin", "Bufferin"],
      description: "Non-steroidal anti-inflammatory drug (NSAID) used for pain relief, fever reduction, and cardiovascular protection.",
      indications: ["Pain relief", "Fever reduction", "Cardiovascular disease prevention", "Anti-inflammatory"],
      contraindications: ["Bleeding disorders", "Severe liver disease", "Aspirin allergy"],
      sideEffects: ["Stomach upset", "Heartburn", "Nausea", "Increased bleeding risk"],
      interactions: ["Warfarin", "Ibuprofen", "Alcohol"],
      dosage: "81-325mg daily for cardiovascular protection; 325-650mg every 4-6 hours for pain",
      category: "NSAID"
    },
    {
      drugId: "DB00331",
      name: "Metformin",
      genericName: "Metformin hydrochloride",
      brandNames: ["Glucophage", "Fortamet", "Glumetza"],
      description: "First-line medication for type 2 diabetes management.",
      indications: ["Type 2 diabetes", "Prediabetes", "PCOS"],
      contraindications: ["Severe kidney disease", "Liver disease", "Heart failure"],
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
      interactions: ["Alcohol", "Contrast dye", "Certain antibiotics"],
      dosage: "500-2000mg daily in divided doses with meals",
      category: "Antidiabetic"
    }
  ] as DrugInfo[],

  // Mental Health Conditions
  mentalHealthConditions: [
    {
      condition: "Generalized Anxiety Disorder",
      symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Muscle tension", "Sleep disturbances"],
      prevalence: 3.1,
      treatments: ["Cognitive Behavioral Therapy (CBT)", "Medication (SSRIs, SNRIs)", "Mindfulness", "Relaxation techniques"],
      resources: ["NIMH", "Anxiety and Depression Association", "Crisis hotlines"],
      screeningTools: ["GAD-7", "Beck Anxiety Inventory"]
    },
    {
      condition: "Major Depressive Disorder",
      symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep changes", "Appetite changes", "Difficulty concentrating"],
      prevalence: 7.1,
      treatments: ["Psychotherapy", "Antidepressants", "Exercise", "Light therapy", "ECT (severe cases)"],
      resources: ["NIMH", "Depression and Bipolar Support Alliance", "988 Suicide & Crisis Lifeline"],
      screeningTools: ["PHQ-9", "Beck Depression Inventory"]
    }
  ] as MentalHealthData[],

  // Nutrition Data (Nutritionix-inspired)
  nutritionDatabase: [
    {
      foodItem: "Salmon (Atlantic, cooked)",
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 12,
      fiber: 0,
      vitamins: { "D": 570, "B12": 2.8, "B6": 0.6 },
      minerals: { "Selenium": 36, "Phosphorus": 252, "Potassium": 384 },
      servingSize: "100g"
    },
    {
      foodItem: "Broccoli (cooked)",
      calories: 35,
      protein: 2.4,
      carbs: 7,
      fat: 0.4,
      fiber: 3.3,
      vitamins: { "C": 64, "K": 141, "A": 623 },
      minerals: { "Calcium": 40, "Iron": 0.7, "Potassium": 293 },
      servingSize: "100g"
    },
    {
      foodItem: "Quinoa (cooked)",
      calories: 120,
      protein: 4.4,
      carbs: 21,
      fat: 1.9,
      fiber: 2.8,
      vitamins: { "B6": 0.1, "Folate": 42 },
      minerals: { "Magnesium": 64, "Iron": 1.5, "Zinc": 1.1 },
      servingSize: "100g"
    }
  ] as NutritionData[],

  // WHO Global Health Data (Sample)
  globalHealthIndicators: [
    {
      country: "Global",
      indicator: "Life Expectancy at Birth",
      year: 2023,
      value: 73.4,
      unit: "years",
      category: "Mortality"
    },
    {
      country: "Global",
      indicator: "Cardiovascular Disease Mortality",
      year: 2023,
      value: 17.9,
      unit: "million deaths",
      category: "Non-communicable Diseases"
    },
    {
      country: "Global",
      indicator: "Diabetes Prevalence",
      year: 2023,
      value: 10.5,
      unit: "% of adults",
      category: "Metabolic Disorders"
    }
  ] as WHOHealthData[]
};

/**
 * Search medical knowledge base
 */
export function searchMedicalKnowledge(query: string): MedicalQA[] {
  const lowerQuery = query.toLowerCase();
  return medicalKnowledgeBase.commonQuestions.filter(qa =>
    qa.question.toLowerCase().includes(lowerQuery) ||
    qa.answer.toLowerCase().includes(lowerQuery) ||
    qa.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get drug information
 */
export function getDrugInfo(drugName: string): DrugInfo | null {
  const lowerName = drugName.toLowerCase();
  return medicalKnowledgeBase.commonMedications.find(drug =>
    drug.name.toLowerCase().includes(lowerName) ||
    drug.genericName.toLowerCase().includes(lowerName) ||
    drug.brandNames.some(brand => brand.toLowerCase().includes(lowerName))
  ) || null;
}

/**
 * Get mental health information
 */
export function getMentalHealthInfo(condition: string): MentalHealthData | null {
  const lowerCondition = condition.toLowerCase();
  return medicalKnowledgeBase.mentalHealthConditions.find(mh =>
    mh.condition.toLowerCase().includes(lowerCondition)
  ) || null;
}

/**
 * Get nutrition information
 */
export function getNutritionInfo(foodItem: string): NutritionData | null {
  const lowerFood = foodItem.toLowerCase();
  return medicalKnowledgeBase.nutritionDatabase.find(food =>
    food.foodItem.toLowerCase().includes(lowerFood)
  ) || null;
}

/**
 * Fetch real-time PubMed articles (simulated - would use actual API in production)
 */
export async function fetchPubMedArticles(topic: string): Promise<PubMedArticle[]> {
  // In production, this would call the actual PubMed API
  // For now, return simulated data
  return [
    {
      id: "PMC123456",
      title: `Recent Advances in ${topic} Research`,
      abstract: `This study examines the latest developments in ${topic} and their clinical implications...`,
      authors: ["Smith J", "Johnson M", "Williams R"],
      journal: "Journal of Medical Research",
      publishDate: "2024-01-15",
      keywords: [topic, "clinical trial", "evidence-based"],
      citations: 45
    }
  ];
}

/**
 * Get health statistics from WHO data
 */
export function getHealthStatistics(indicator: string): WHOHealthData[] {
  return medicalKnowledgeBase.globalHealthIndicators.filter(data =>
    data.indicator.toLowerCase().includes(indicator.toLowerCase())
  );
}

export default medicalKnowledgeBase;
