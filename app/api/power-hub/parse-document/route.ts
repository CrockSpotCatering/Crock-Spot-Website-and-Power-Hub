import { NextResponse } from 'next/server';

// Force Node.js runtime for compatibility
export const runtime = 'nodejs';
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
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = '';

    // Handle PDF files - temporarily disabled, ask user to convert
    if (fileName.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'PDF upload temporarily unavailable. Please convert to .txt or paste content directly.' },
        { status: 400 }
      );
    }
    // Handle Word documents - temporarily disabled
    else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return NextResponse.json(
        { error: 'Word upload temporarily unavailable. Please convert to .txt or paste content directly.' },
        { status: 400 }
      );
    }
    // Handle text files - this should work
    else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      extractedText = buffer.toString('utf-8');
    }
    else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a text file (.txt).' },
        { status: 400 }
      );
    }

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
    console.error('Document parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to process document: ' + String(error) },
      { status: 500 }
    );
  }
}
