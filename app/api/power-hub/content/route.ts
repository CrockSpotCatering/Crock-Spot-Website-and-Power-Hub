//==============================================================================
// POWER HUB CMS - Content API
//==============================================================================
// This API handles reading and writing content JSON files via GitHub API.
// Works in production on Vercel - no local filesystem access needed.
//
// REQUIRED ENV VARS:
//   - GITHUB_TOKEN: Personal Access Token with 'repo' scope
//
// ENDPOINTS:
//   GET /api/power-hub/content         - List all content files
//   GET /api/power-hub/content?file=X  - Get specific file content
//   PUT /api/power-hub/content         - Save and deploy content
//==============================================================================

import { NextResponse } from 'next/server';

// GitHub API configuration - CrockSpot specific
const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';

const getConfig = () => ({
  token: GITHUB_TOKEN,
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
  branch: GITHUB_BRANCH,
});

// Helper: Make authenticated GitHub API request
async function githubFetch(endpoint: string, options: RequestInit = {}) {
  const config = getConfig();

  if (!config.token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }

  return response.json();
}

// Helper: Get file content from GitHub
async function getFileFromGitHub(path: string) {
  const config = getConfig();
  const endpoint = `/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

  const data = await githubFetch(endpoint);

  // GitHub returns base64 encoded content
  const content = Buffer.from(data.content, 'base64').toString('utf-8');

  return {
    content: JSON.parse(content),
    sha: data.sha, // Needed for updates
    path: data.path,
  };
}

// Helper: List files in a directory from GitHub
async function listFilesFromGitHub(path: string) {
  const config = getConfig();
  const endpoint = `/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

  const data = await githubFetch(endpoint);

  // Filter for JSON files only
  return data
    .filter((file: { name: string; type: string }) =>
      file.type === 'file' && file.name.endsWith('.json')
    )
    .map((file: { name: string; sha: string; size: number }) => ({
      filename: file.name,
      sha: file.sha,
      size: file.size,
    }));
}

// Helper: Update file on GitHub (creates commit)
async function updateFileOnGitHub(
  path: string,
  content: unknown,
  sha: string,
  message: string
) {
  const config = getConfig();
  const endpoint = `/repos/${config.owner}/${config.repo}/contents/${path}`;

  // Content must be base64 encoded
  const encodedContent = Buffer.from(
    JSON.stringify(content, null, 2)
  ).toString('base64');

  const data = await githubFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: encodedContent,
      sha,
      branch: config.branch,
    }),
  });

  // Trigger Vercel rebuild via deploy hook (optional)
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook) {
    try {
      await fetch(deployHook, { method: 'POST' });
      console.log('Triggered Vercel rebuild');
    } catch (err) {
      console.error('Failed to trigger Vercel rebuild:', err);
    }
  }

  return {
    success: true,
    commit: data.commit.sha,
    newSha: data.content.sha, // Return new file SHA for subsequent updates
    message: 'Content saved and deployed!',
  };
}

//------------------------------------------------------------------------------
// GET: Fetch content files or specific file
//------------------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    // If no specific file requested, return list of all content files
    if (!filename) {
      const files = await listFilesFromGitHub('content');

      return NextResponse.json({
        files,
        source: 'github',
      });
    }

    // Return specific file content
    const file = await getFileFromGitHub(`content/${filename}`);

    return NextResponse.json({
      filename,
      content: file.content,
      sha: file.sha,
      source: 'github',
    });
  } catch (error) {
    console.error('Content read error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to read content' },
      { status: 500 }
    );
  }
}

//------------------------------------------------------------------------------
// PUT: Save content and deploy (commits directly to GitHub)
//------------------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const { filename, content, sha } = await request.json();

    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content are required' },
        { status: 400 }
      );
    }

    if (!sha) {
      return NextResponse.json(
        { error: 'SHA is required for updates (prevents conflicts)' },
        { status: 400 }
      );
    }

    // Security check: only allow content/ directory
    if (!filename.startsWith('content/') && !filename.endsWith('.json')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    const path = filename.startsWith('content/') ? filename : `content/${filename}`;
    const commitMessage = `Update ${filename.replace('content/', '').replace('.json', '')} content via Power Hub`;

    const result = await updateFileOnGitHub(path, content, sha, commitMessage);

    return NextResponse.json({
      ...result,
      deployedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Content write error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save content' },
      { status: 500 }
    );
  }
}
