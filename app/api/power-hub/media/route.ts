import { NextResponse } from 'next/server';

//==============================================================================
// POWER HUB - Media API Route
// Lists images from GitHub repository (public/images/uploads folder)
//==============================================================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  download_url: string;
}

export async function GET(): Promise<NextResponse> {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      error: 'GitHub token not configured. Please add GITHUB_TOKEN to environment variables.',
      media: []
    });
  }

  try {
    // List files in the uploads directory
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/images/uploads?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    // If folder doesn't exist or is empty
    if (response.status === 404) {
      return NextResponse.json({ media: [] });
    }

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({
        error: `GitHub API error: ${error.message}`,
        media: []
      });
    }

    const files: GitHubFile[] = await response.json();

    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file =>
      file.type === 'file' &&
      imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );

    // Transform to our MediaFile format
    const media = imageFiles.map(file => {
      // Extract timestamp from filename if present (format: timestamp-originalname.ext)
      const timestampMatch = file.name.match(/^(\d+)-/);
      const timestamp = timestampMatch ? parseInt(timestampMatch[1]) : Date.now();

      return {
        id: file.sha,
        name: file.name.replace(/^\d+-/, ''), // Remove timestamp prefix for display
        url: `/images/uploads/${file.name}`, // Public URL path for content
        previewUrl: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images/uploads/${file.name}`, // Raw GitHub URL for preview
        size: formatFileSize(file.size),
        uploaded: formatDate(new Date(timestamp)),
        timestamp: timestamp,
      };
    });

    // Sort by timestamp (newest first)
    media.sort((a, b) => b.timestamp - a.timestamp);

    // Remove timestamp from response
    const cleanMedia = media.map(({ timestamp, ...rest }) => rest);

    return NextResponse.json({ media: cleanMedia });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json(
      { error: String(error), media: [] },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + ' min ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' hours ago';
  if (diff < 604800000) return Math.floor(diff / 86400000) + ' days ago';

  return date.toLocaleDateString();
}
