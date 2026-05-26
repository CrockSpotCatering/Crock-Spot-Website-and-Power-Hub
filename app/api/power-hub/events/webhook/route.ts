//==============================================================================
// POWER HUB CMS - Inbound Webhook (from GHL → Power Hub)
//==============================================================================
// Receives status updates from GoHighLevel after a team member replies to a
// follow-up SMS (DONE / SNOOZE N / BOOKED / LOST). Updates the corresponding
// event in content/events.json so the Power Hub stays the source of truth.
//
// PHASE 2 — currently DORMANT until followUpWebhook.enabled = true in
// content/settings.json AND the GHL workflow is built and pointed at this URL.
//
// SECURITY:
//   - Requires X-CrockSpot-Signature header matching followUpWebhook.sharedSecret
//   - Returns 401 if missing or mismatched
//   - Returns 404 if event id not found (so GHL can mark the rule broken)
//
// EXPECTED PAYLOAD:
//   {
//     "eventId": "evt_abc123",
//     "action": "done" | "snooze" | "booked" | "lost",
//     "snoozeDays"?: 3,
//     "note"?: "Free-text note GHL captured from the SMS reply"
//   }
//==============================================================================

import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';
const EVENTS_PATH = 'content/events.json';
const SETTINGS_PATH = 'content/settings.json';

async function githubFetch(endpoint: string, options: RequestInit = {}) {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }
  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
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

async function loadSharedSecret(): Promise<{ enabled: boolean; secret: string }> {
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${SETTINGS_PATH}?ref=${GITHUB_BRANCH}`;
    const raw = await githubFetch(endpoint);
    const content = Buffer.from(raw.content, 'base64').toString('utf-8');
    const parsed = JSON.parse(content);
    const cfg = parsed?.followUpWebhook;
    return {
      enabled: cfg?.enabled === true,
      secret: typeof cfg?.sharedSecret === 'string' ? cfg.sharedSecret : '',
    };
  } catch {
    return { enabled: false, secret: '' };
  }
}

export async function POST(request: Request) {
  try {
    const cfg = await loadSharedSecret();
    if (!cfg.enabled) {
      return NextResponse.json(
        { error: 'Follow-up webhook is disabled in Power Hub settings.' },
        { status: 503 }
      );
    }
    if (!cfg.secret) {
      return NextResponse.json(
        { error: 'No shared secret configured. Set one in Power Hub settings.' },
        { status: 500 }
      );
    }

    const provided = request.headers.get('X-CrockSpot-Signature') || '';
    if (provided !== cfg.secret) {
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const eventId = typeof body?.eventId === 'string' ? body.eventId : '';
    const action = typeof body?.action === 'string' ? body.action.toLowerCase() : '';
    const snoozeDays = Number.isFinite(body?.snoozeDays) ? Math.max(1, Math.min(60, body.snoozeDays)) : 3;
    const note = typeof body?.note === 'string' ? body.note : '';

    if (!eventId) {
      return NextResponse.json({ error: 'eventId is required' }, { status: 400 });
    }
    if (!['done', 'snooze', 'booked', 'lost'].includes(action)) {
      return NextResponse.json(
        { error: 'action must be one of: done, snooze, booked, lost' },
        { status: 400 }
      );
    }

    // Load events, find target, apply update
    const eventsEndpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${EVENTS_PATH}?ref=${GITHUB_BRANCH}`;
    const raw = await githubFetch(eventsEndpoint);
    const fileSha = raw.sha;
    const content = Buffer.from(raw.content, 'base64').toString('utf-8');
    const parsed = JSON.parse(content);
    const events = Array.isArray(parsed?.events) ? parsed.events : [];

    const idx = events.findIndex((e: { id?: string }) => e.id === eventId);
    if (idx === -1) {
      return NextResponse.json(
        { error: `Event not found: ${eventId}` },
        { status: 404 }
      );
    }

    const target = events[idx] as Record<string, unknown>;
    const now = new Date().toISOString();
    const logEntry = {
      at: now,
      who: 'GHL (via SMS reply)',
      note: note || `Action via SMS: ${action.toUpperCase()}`,
    };
    const existingLog = Array.isArray(target.followUpLog) ? target.followUpLog : [];

    switch (action) {
      case 'done':
        target.followUpDone = true;
        break;
      case 'snooze': {
        // Push followup date out by snoozeDays
        const d = new Date();
        d.setDate(d.getDate() + snoozeDays);
        target.nextFollowUpDate = d.toISOString().slice(0, 10);
        target.followUpDone = false;
        break;
      }
      case 'booked':
        target.status = 'Booked';
        target.followUpDone = true;
        break;
      case 'lost':
        target.status = 'Lost';
        target.followUpDone = true;
        break;
    }

    target.followUpLog = [...existingLog, logEntry];
    target.updatedAt = now;
    events[idx] = target;

    const writeEndpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${EVENTS_PATH}`;
    const encoded = Buffer.from(
      JSON.stringify({ events }, null, 2)
    ).toString('base64');

    await githubFetch(writeEndpoint, {
      method: 'PUT',
      body: JSON.stringify({
        message: `Power Hub: GHL webhook (${action}) on ${eventId}`,
        content: encoded,
        sha: fileSha,
        branch: GITHUB_BRANCH,
      }),
    });

    return NextResponse.json({ success: true, action, eventId });
  } catch (error) {
    console.error('Inbound webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Health probe — lets you sanity-check the URL is reachable from GHL.
export async function GET() {
  const cfg = await loadSharedSecret();
  return NextResponse.json({
    ok: true,
    enabled: cfg.enabled,
    hasSecret: !!cfg.secret,
    docs:
      'POST { eventId, action: "done"|"snooze"|"booked"|"lost", snoozeDays?, note? } with X-CrockSpot-Signature header.',
  });
}
