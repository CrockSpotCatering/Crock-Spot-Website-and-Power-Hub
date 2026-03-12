import { NextResponse } from 'next/server';

//==============================================================================
// POWER HUB - Upload API Route
// Uploads images to GitHub repository (public/images/uploads folder)
//==============================================================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';

export async function POST(request: Request): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token not configured. Please add GITHUB_TOKEN to environment variables.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const filename = `${timestamp}-${safeName}`;
    const path = `public/images/uploads/${filename}`;

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64Content = Buffer.from(bytes).toString('base64');

    // Upload to GitHub
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Upload image: ${filename}`,
          content: base64Content,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('GitHub upload error:', error);
      return NextResponse.json(
        { error: `GitHub upload failed: ${error.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    // Return both URLs:
    // - url: relative path for use in content (works after deploy)
    // - previewUrl: raw GitHub URL for immediate preview
    const publicUrl = `/images/uploads/${filename}`;
    const previewUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images/uploads/${filename}`;

    return NextResponse.json({
      url: publicUrl,
      previewUrl: previewUrl,
      filename: filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file: ' + String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  try {
    const { url } = await request.json();

    // Extract filename from URL
    const filename = url.split('/').pop();
    const path = `public/images/uploads/${filename}`;

    // First, get the file's SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!getResponse.ok) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = await getResponse.json();

    // Delete the file
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Delete image: ${filename}`,
          sha: fileData.sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!deleteResponse.ok) {
      const error = await deleteResponse.json();
      return NextResponse.json(
        { error: `Delete failed: ${error.message}` },
        { status: deleteResponse.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file: ' + String(error) },
      { status: 500 }
    );
  }
}
