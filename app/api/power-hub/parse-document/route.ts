import { NextResponse } from 'next/server';
import { extractText } from 'unpdf';
import * as mammoth from 'mammoth';

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
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = '';

    // Handle PDF files
    if (fileName.endsWith('.pdf')) {
      try {
        const { text } = await extractText(new Uint8Array(bytes));
        extractedText = Array.isArray(text) ? text.join('\n') : text;
      } catch (pdfError) {
        return NextResponse.json(
          { error: 'Failed to parse PDF: ' + String(pdfError) },
          { status: 400 }
        );
      }
    }
    // Handle Word documents (.docx)
    else if (fileName.endsWith('.docx')) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } catch (docxError) {
        return NextResponse.json(
          { error: 'Failed to parse Word document: ' + String(docxError) },
          { status: 400 }
        );
      }
    }
    // Handle old Word documents (.doc)
    else if (fileName.endsWith('.doc')) {
      return NextResponse.json(
        { error: 'Old .doc format not supported. Please save as .docx or PDF and try again.' },
        { status: 400 }
      );
    }
    // Handle text files
    else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      extractedText = buffer.toString('utf-8');
    }
    else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a PDF, Word document (.docx), or text file.' },
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
        { error: 'No text could be extracted from this file. The file may be empty or contain only images.' },
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
