import { NextResponse } from 'next/server';
import * as mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Force Node.js runtime for compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Disable worker for serverless environment
GlobalWorkerOptions.workerSrc = '';

//==============================================================================
// POWER HUB - Document Parser API
// Extracts text from PDF and Word documents for brand guidelines
//==============================================================================

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

    // Handle PDF files
    if (fileName.endsWith('.pdf')) {
      try {
        // Use pdfjs-dist (pure JS, works on serverless)
        const uint8Array = new Uint8Array(bytes);
        const pdf = await getDocument({ data: uint8Array, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;

        const textParts: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: { str?: string }) => item.str || '')
            .join(' ');
          textParts.push(pageText);
        }
        extractedText = textParts.join('\n\n');
      } catch (error) {
        console.error('PDF parsing error:', error);
        return NextResponse.json(
          { error: 'Failed to parse PDF. Please try a different file or paste the content directly.' },
          { status: 400 }
        );
      }
    }
    // Handle Word documents (.docx)
    else if (fileName.endsWith('.docx')) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } catch (error) {
        console.error('DOCX parsing error:', error);
        return NextResponse.json(
          { error: 'Failed to parse Word document. Please try a different file or paste the content directly.' },
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
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\n{3,}/g, '\n\n')  // Remove excessive line breaks
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
    console.error('Document parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to process document: ' + String(error) },
      { status: 500 }
    );
  }
}
