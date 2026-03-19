import { NextResponse } from 'next/server';

//==============================================================================
// POWER HUB - Documents API Route
// Stores brand documents (PDFs, text files) on GitHub for persistence
// All team members share the same document library
//==============================================================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';
const DOCUMENTS_PATH = 'content/documents.json';

interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: string;
  fileSize: number;
  fileType: string;
}

interface DocumentsData {
  documents: Document[];
  lastUpdated: string;
}

// GET - Fetch all stored documents
export async function GET(): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (response.status === 404) {
      // File doesn't exist yet, return empty array
      return NextResponse.json({ documents: [], lastUpdated: null });
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const documentsData: DocumentsData = JSON.parse(content);

    return NextResponse.json(documentsData);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents: ' + String(error) },
      { status: 500 }
    );
  }
}

// POST - Add a new document
export async function POST(request: Request): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  try {
    const { name, content, fileSize, fileType } = await request.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }

    // Fetch existing documents
    let documentsData: DocumentsData = { documents: [], lastUpdated: '' };
    let existingSha: string | undefined;

    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (getResponse.ok) {
      const data = await getResponse.json();
      existingSha = data.sha;
      const existingContent = Buffer.from(data.content, 'base64').toString('utf-8');
      documentsData = JSON.parse(existingContent);
    }

    // Create new document
    const newDocument: Document = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      content,
      uploadedAt: new Date().toISOString(),
      fileSize: fileSize || content.length,
      fileType: fileType || 'text/plain',
    };

    // Add to documents array
    documentsData.documents.push(newDocument);
    documentsData.lastUpdated = new Date().toISOString();

    // Save to GitHub
    const saveBody: {
      message: string;
      content: string;
      branch: string;
      sha?: string;
    } = {
      message: `Add brand document: ${name}`,
      content: Buffer.from(JSON.stringify(documentsData, null, 2)).toString('base64'),
      branch: GITHUB_BRANCH,
    };

    if (existingSha) {
      saveBody.sha = existingSha;
    }

    const saveResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(saveBody),
      }
    );

    if (!saveResponse.ok) {
      const error = await saveResponse.json();
      throw new Error(error.message || 'Failed to save document');
    }

    return NextResponse.json({
      success: true,
      document: newDocument,
    });
  } catch (error) {
    console.error('Error saving document:', error);
    return NextResponse.json(
      { error: 'Failed to save document: ' + String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Remove a document
export async function DELETE(request: Request): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Fetch existing documents
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (!getResponse.ok) {
      return NextResponse.json(
        { error: 'No documents found' },
        { status: 404 }
      );
    }

    const data = await getResponse.json();
    const existingSha = data.sha;
    const existingContent = Buffer.from(data.content, 'base64').toString('utf-8');
    const documentsData: DocumentsData = JSON.parse(existingContent);

    // Remove the document
    const originalLength = documentsData.documents.length;
    documentsData.documents = documentsData.documents.filter(doc => doc.id !== id);

    if (documentsData.documents.length === originalLength) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    documentsData.lastUpdated = new Date().toISOString();

    // Save to GitHub
    const saveResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DOCUMENTS_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Remove brand document`,
          content: Buffer.from(JSON.stringify(documentsData, null, 2)).toString('base64'),
          branch: GITHUB_BRANCH,
          sha: existingSha,
        }),
      }
    );

    if (!saveResponse.ok) {
      const error = await saveResponse.json();
      throw new Error(error.message || 'Failed to delete document');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document: ' + String(error) },
      { status: 500 }
    );
  }
}
