import { NextResponse } from 'next/server';

// Remove nodejs runtime - not needed anymore
export const dynamic = 'force-dynamic';

//==============================================================================
// POWER HUB - Document Parser API
// Extracts text from PDF and Word documents for brand guidelines
//==============================================================================

// Test endpoint - GET to verify route is deployed
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 'ok', message: 'Parse document endpoint is working' });
}

export async function POST(request: Request): Promise<NextResponse> {
  // Debug: Return immediately to test if POST even works
  // return NextResponse.json({ debug: 'POST received' });

  let formData;
  try {
    formData = await request.formData();
  } catch (formError) {
    return NextResponse.json(
      { error: 'Failed to parse form data: ' + String(formError) },
      { status: 400 }
    );
  }

  try {
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();

    // Return early for PDF/DOCX with friendly message
    if (fileName.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'PDF upload temporarily unavailable. Please convert to .txt or paste content directly.' },
        { status: 400 }
      );
    }

    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return NextResponse.json(
        { error: 'Word upload temporarily unavailable. Please convert to .txt or paste content directly.' },
        { status: 400 }
      );
    }

    // Only handle text files
    if (!fileName.endsWith('.txt') && !fileName.endsWith('.md')) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a text file (.txt).' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let extractedText = buffer.toString('utf-8');

    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!extractedText) {
      return NextResponse.json(
        { error: 'No text could be extracted from this file.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: extractedText,
      fileName: file.name,
      fileSize: file.size,
      charCount: extractedText.length,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process document: ' + String(error) },
      { status: 500 }
    );
  }
}
