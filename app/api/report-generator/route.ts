import { NextRequest, NextResponse } from 'next/server';
import { generatePatientReport } from '@/lib/medgemma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientInfo, vitalSigns, chiefComplaint, symptoms } = body;

    if (!patientInfo || !vitalSigns || !chiefComplaint) {
      return NextResponse.json(
        { error: 'Patient information, vital signs, and chief complaint are required' },
        { status: 400 }
      );
    }

    console.log(`Generating patient report with MedGemma for: ${chiefComplaint}`);

    // Call MedGemma AI for report generation
    const report = await generatePatientReport(
      patientInfo,
      vitalSigns,
      chiefComplaint,
      symptoms || []
    );

    // Generate report ID
    const reportId = `RPT-${Date.now()}`;

    return NextResponse.json({
      success: true,
      reportId,
      report,
      timestamp: new Date().toISOString(),
      model: 'MedGemma-4B-IT',
    });
  } catch (error) {
    console.error('Error in report generator API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate patient report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
