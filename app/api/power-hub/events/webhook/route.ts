//==============================================================================
// POWER HUB CMS - Follow-Up Webhook (inbound + email click-through)
//==============================================================================
// Two ways to fire a follow-up action against an event:
//
//   1. JSON POST (machine-to-machine, e.g. GHL workflow node)
//        - Body: { eventId, action, snoozeDays?, note? }
//        - Auth: X-CrockSpot-Signature header == followUpWebhook.sharedSecret
//
//   2. GET with signed URL (one-click from an email button)
//        - Query: ?eventId=...&action=...&sig=...&snoozeDays=...
//        - Auth: sig == HMAC-SHA256(secret, `${eventId}:${action}:${snoozeDays|0}`)
//        - Returns a friendly HTML "✅ Logged" confirmation page
//        - Links never expire — simpler for the team
//
// PHASE 2 — currently DORMANT until followUpWebhook.enabled = true in
// content/settings.json AND the GHL workflow exists and is pointed at this URL.
//
// SECURITY:
//   - The shared secret is the only authentication. It never leaves the server
//     except via HMAC-derived signatures attached to URLs the server itself
//     generates. The team never sees, types, or pastes a token.
//   - Replay is harmless given the action set: status flips on an
//     already-handled lead are no-ops or recoverable from git history.
//==============================================================================

import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';
const EVENTS_PATH = 'content/events.json';
const SETTINGS_PATH = 'content/settings.json';

type Action = 'done' | 'snooze' | 'booked' | 'lost';
const ACTIONS: Action[] = ['done', 'snooze', 'booked', 'lost'];

//------------------------------------------------------------------------------
// GitHub helpers
//------------------------------------------------------------------------------
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

async function loadConfig(): Promise<{ enabled: boolean; secret: string }> {
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

//------------------------------------------------------------------------------
// Signed-URL helpers — exported via the buildActionUrl() module export so the
// outbound webhook payload can include pre-baked click links the team can use
// from inside an email without ever seeing a token.
//------------------------------------------------------------------------------
export function computeSignature(
  secret: string,
  eventId: string,
  action: Action,
  snoozeDays: number
): string {
  const payload = `${eventId}:${action}:${snoozeDays || 0}`;
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function verifySignature(
  secret: string,
  provided: string,
  eventId: string,
  action: Action,
  snoozeDays: number
): boolean {
  if (!secret || !provided) return false;
  const expected = computeSignature(secret, eventId, action, snoozeDays);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(provided, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Build a one-click URL safe to put in an email body. The team never sees the
 * sig — they just click "Mark Done" / "Snooze 3 days" / etc. URLs never expire.
 */
export function buildActionUrl(
  baseUrl: string,
  secret: string,
  eventId: string,
  action: Action,
  snoozeDays = 0
): string {
  const sig = computeSignature(secret, eventId, action, snoozeDays);
  const qs = new URLSearchParams({ eventId, action, sig });
  if (action === 'snooze' && snoozeDays > 0) qs.set('snoozeDays', String(snoozeDays));
  return `${baseUrl.replace(/\/$/, '')}/api/power-hub/events/webhook?${qs.toString()}`;
}

//------------------------------------------------------------------------------
// Core: apply an action to an event in content/events.json
//------------------------------------------------------------------------------
type ApplyResult =
  | { ok: true; event: Record<string, unknown> }
  | { ok: false; status: number; error: string };

async function applyAction(
  eventId: string,
  action: Action,
  snoozeDays: number,
  note: string,
  via: string
): Promise<ApplyResult> {
  const eventsEndpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${EVENTS_PATH}?ref=${GITHUB_BRANCH}`;
  const raw = await githubFetch(eventsEndpoint);
  const fileSha = raw.sha;
  const content = Buffer.from(raw.content, 'base64').toString('utf-8');
  const parsed = JSON.parse(content);
  const events = Array.isArray(parsed?.events) ? parsed.events : [];

  const idx = events.findIndex((e: { id?: string }) => e.id === eventId);
  if (idx === -1) {
    return { ok: false, status: 404, error: `Event not found: ${eventId}` };
  }

  const target = events[idx] as Record<string, unknown>;
  const now = new Date().toISOString();
  const logEntry = {
    at: now,
    who: via,
    note: note || `Action via ${via}: ${action.toUpperCase()}`,
  };
  const existingLog = Array.isArray(target.followUpLog) ? target.followUpLog : [];

  switch (action) {
    case 'done':
      target.followUpDone = true;
      break;
    case 'snooze': {
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
  const encoded = Buffer.from(JSON.stringify({ events }, null, 2)).toString('base64');

  await githubFetch(writeEndpoint, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Power Hub: follow-up ${action} on ${eventId} (via ${via})`,
      content: encoded,
      sha: fileSha,
      branch: GITHUB_BRANCH,
    }),
  });

  return { ok: true, event: target };
}

function normalizeAction(input: unknown): Action | null {
  if (typeof input !== 'string') return null;
  const v = input.toLowerCase() as Action;
  return ACTIONS.includes(v) ? v : null;
}

function clampSnooze(raw: unknown): number {
  const n = typeof raw === 'string' ? Number(raw) : Number(raw);
  if (!Number.isFinite(n)) return 3;
  return Math.max(1, Math.min(60, Math.round(n)));
}

//------------------------------------------------------------------------------
// POST — machine-to-machine (GHL workflow node, or any backend)
//------------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const cfg = await loadConfig();
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
    const action = normalizeAction(body?.action);
    const snoozeDays = clampSnooze(body?.snoozeDays);
    const note = typeof body?.note === 'string' ? body.note : '';

    if (!eventId) {
      return NextResponse.json({ error: 'eventId is required' }, { status: 400 });
    }
    if (!action) {
      return NextResponse.json(
        { error: 'action must be one of: done, snooze, booked, lost' },
        { status: 400 }
      );
    }

    const result = await applyAction(eventId, action, snoozeDays, note, 'GHL webhook');
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({ success: true, action, eventId });
  } catch (error) {
    console.error('Inbound webhook POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

//------------------------------------------------------------------------------
// GET — two modes
//   - No query params → health probe (returns JSON status)
//   - Has eventId + action + sig → one-click email action (returns HTML page)
//------------------------------------------------------------------------------
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId') || '';
  const rawAction = searchParams.get('action');
  const sig = searchParams.get('sig') || '';

  // Health probe
  if (!eventId && !rawAction && !sig) {
    const cfg = await loadConfig();
    return NextResponse.json({
      ok: true,
      enabled: cfg.enabled,
      hasSecret: !!cfg.secret,
      docs: {
        post: 'POST { eventId, action, snoozeDays?, note? } with X-CrockSpot-Signature header.',
        get: 'GET ?eventId=...&action=done|snooze|booked|lost&sig=<hmac>&snoozeDays=N',
      },
    });
  }

  // One-click action
  try {
    const cfg = await loadConfig();
    if (!cfg.enabled) {
      return htmlResponse(
        503,
        'Follow-ups are paused',
        'The Power Hub follow-up integration is currently disabled. Ask Brett to enable it in Settings.'
      );
    }
    if (!cfg.secret) {
      return htmlResponse(
        500,
        'Configuration missing',
        'No shared secret is configured. Ask Brett to set one in Power Hub Settings.'
      );
    }

    const action = normalizeAction(rawAction);
    if (!action) {
      return htmlResponse(
        400,
        'Unknown action',
        'That link isn’t valid. Open the event in Power Hub instead.'
      );
    }

    const snoozeDays = action === 'snooze' ? clampSnooze(searchParams.get('snoozeDays')) : 0;

    if (!eventId) {
      return htmlResponse(400, 'Missing event', 'No event was specified.');
    }

    if (!verifySignature(cfg.secret, sig, eventId, action, snoozeDays)) {
      return htmlResponse(
        401,
        'Signature mismatch',
        'This link was tampered with or generated by a different system. If you clicked it from an email Brett sent, forward that email to brett so he can check.'
      );
    }

    const result = await applyAction(
      eventId,
      action,
      snoozeDays,
      `Email click: ${action.toUpperCase()}${action === 'snooze' ? ` ${snoozeDays}d` : ''}`,
      'Email click-through'
    );
    if (!result.ok) {
      return htmlResponse(result.status, 'Event not found', result.error);
    }

    return htmlResponse(200, successTitle(action, snoozeDays), successBody(action, eventId, snoozeDays));
  } catch (error) {
    console.error('Inbound webhook GET error:', error);
    return htmlResponse(
      500,
      'Something went wrong',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

//------------------------------------------------------------------------------
// HTML response helper — friendly Crock-Spot-branded confirmation page
//------------------------------------------------------------------------------
function htmlResponse(status: number, title: string, body: string): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)} — Crock Spot</title>
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #2F2744, #614B8A, #2F2744);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #2F2744;
      padding: 1.5rem;
    }
    .card {
      background: #fff; border-radius: 1rem; padding: 2.5rem 2rem; max-width: 28rem; width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.25); text-align: center;
    }
    .badge {
      display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px;
      background: rgba(244,146,32,0.15); color: #C97817; font-size: 0.7rem;
      font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;
    }
    h1 { font-size: 1.75rem; margin: 0 0 0.5rem; color: #2F2744; }
    p { color: #4b5563; line-height: 1.5; margin: 0.5rem 0 1.5rem; }
    a.btn {
      display: inline-block; background: #F49220; color: #fff; padding: 0.75rem 1.5rem;
      border-radius: 0.5rem; text-decoration: none; font-weight: 600;
    }
    a.btn:hover { background: #e08519; }
    .tag { font-size: 0.75rem; color: #6b7280; margin-top: 1rem; font-style: italic; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Crock Spot · Power Hub</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${body}</p>
    <a class="btn" href="https://www.thecrockspot.com/power-hub/dashboard/events">Open Power Hub</a>
    <div class="tag">Let Us Crock Your World</div>
  </div>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function successTitle(action: Action, snoozeDays: number): string {
  switch (action) {
    case 'done':
      return '✅ Marked done';
    case 'snooze':
      return `⏰ Snoozed ${snoozeDays} day${snoozeDays === 1 ? '' : 's'}`;
    case 'booked':
      return '🎉 Marked as Booked';
    case 'lost':
      return '❌ Marked as Lost';
  }
}

function successBody(action: Action, eventId: string, snoozeDays: number): string {
  const link = `<a href="https://www.thecrockspot.com/power-hub/dashboard/events/${escapeHtml(eventId)}">View the event sheet</a>`;
  switch (action) {
    case 'done':
      return `Today’s follow-up is recorded as complete. ${link} to add more notes or update the next follow-up date.`;
    case 'snooze':
      return `The next follow-up is now ${snoozeDays} day${snoozeDays === 1 ? '' : 's'} from today. ${link} to edit details.`;
    case 'booked':
      return `Status updated to <strong>Booked</strong>. ${link} to fill in the rest of the event sheet.`;
    case 'lost':
      return `Status updated to <strong>Lost</strong>. ${link} to add why if you want — it helps with future leads.`;
  }
}
