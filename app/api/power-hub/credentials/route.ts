import { NextRequest, NextResponse } from 'next/server';

// GitHub API configuration
const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';
const CREDENTIALS_PATH = 'content/credentials.json';

// Default credentials (fallback)
const DEFAULT_CREDENTIALS = {
  username: 'crockspot',
  password: 'crockspot2026',
};

// Helper: Make authenticated GitHub API request
async function githubFetch(endpoint: string, options: RequestInit = {}) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not configured');
  }

  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
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

// Helper: Get credentials from GitHub
async function getCredentialsFromGitHub() {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CREDENTIALS_PATH}?ref=${GITHUB_BRANCH}`;
    const data = await githubFetch(endpoint);
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return {
      credentials: JSON.parse(content),
      sha: data.sha,
    };
  } catch (error) {
    console.error('Failed to get credentials from GitHub:', error);
    return {
      credentials: DEFAULT_CREDENTIALS,
      sha: null,
    };
  }
}

// Helper: Save credentials to GitHub
async function saveCredentialsToGitHub(credentials: object, sha: string) {
  const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CREDENTIALS_PATH}`;

  const encodedContent = Buffer.from(
    JSON.stringify(credentials, null, 2)
  ).toString('base64');

  const data = await githubFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify({
      message: 'Update Power Hub credentials',
      content: encodedContent,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  return {
    success: true,
    newSha: data.content.sha,
  };
}

// GET: Fetch credentials (for login validation)
export async function GET() {
  try {
    const { credentials, sha } = await getCredentialsFromGitHub();

    return NextResponse.json({
      username: credentials.username,
      password: credentials.password,
      lastUpdated: credentials.lastUpdated,
      sha,
    });
  } catch (error) {
    console.error('Credentials fetch error:', error);
    // Return defaults if GitHub fails
    return NextResponse.json({
      username: DEFAULT_CREDENTIALS.username,
      password: DEFAULT_CREDENTIALS.password,
      sha: null,
    });
  }
}

// PUT: Update credentials
export async function PUT(request: NextRequest) {
  try {
    const { username, password, sha } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get current SHA if not provided
    let currentSha = sha;
    if (!currentSha) {
      const current = await getCredentialsFromGitHub();
      currentSha = current.sha;
    }

    if (!currentSha) {
      return NextResponse.json(
        { error: 'Could not get file SHA for update' },
        { status: 500 }
      );
    }

    const newCredentials = {
      username,
      password,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Power Hub Settings',
    };

    const result = await saveCredentialsToGitHub(newCredentials, currentSha);

    return NextResponse.json({
      success: true,
      message: 'Credentials updated successfully',
      newSha: result.newSha,
    });
  } catch (error) {
    console.error('Credentials update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update credentials' },
      { status: 500 }
    );
  }
}
