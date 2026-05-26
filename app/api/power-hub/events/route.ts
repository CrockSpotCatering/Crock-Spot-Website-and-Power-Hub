//==============================================================================
// POWER HUB CMS - Events API (Event Intake Sheets)
//==============================================================================
// CRUD for content/events.json. Each event is one filled-out intake sheet.
// Uses the same GitHub Contents API pattern as the content route so that
// every save commits to main and the change is durable + versioned.
//
// REQUIRED ENV VARS:
//   - GITHUB_TOKEN: Personal Access Token with 'repo' scope
//
// ENDPOINTS:
//   GET    /api/power-hub/events           - List all events
//   GET    /api/power-hub/events?id=X      - Get one event
//   POST   /api/power-hub/events           - Create event   (body: { event })
//   PUT    /api/power-hub/events           - Update event   (body: { event })
//   DELETE /api/power-hub/events?id=X      - Delete event
//==============================================================================

import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = 'CrockSpotCatering';
const GITHUB_REPO = 'Crock-Spot-Website-and-Power-Hub';
const GITHUB_BRANCH = 'main';
const EVENTS_PATH = 'content/events.json';

type EventRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  // Event Overview
  eventType: string;
  clientStatus: string;
  clientName: string;
  contactName: string;
  phone: string;
  email: string;
  // Event Details
  location: string;
  date: string;
  setupTime: string;
  serveTime: string;
  endTime: string;
  // Service
  guestCount: string;
  serviceStyle: string;
  // Menu
  menu: string;
  // Equipment
  chafers: string;
  servingUtensils: string;
  tables: string;
  truck: string;
  tents: string;
  otherEquipment: string;
  // Staffing
  eventLead: string;
  supportStaff: string;
  // Notes
  pricingNotes: string;
  keyNotes: string;
  clientInsights: string;
  // Pre-event checklist
  cl_headcount: boolean;
  cl_menu: boolean;
  cl_equipment: boolean;
  cl_staff: boolean;
  cl_location: boolean;
  cl_invoice: boolean;
  // Day-of
  dayOfNotes: string;
  // Post-event
  post_invoice: boolean;
  post_followup: boolean;
  post_notes: boolean;
  // Status
  status: string;
};

type EventsFile = { events: EventRecord[] };

//------------------------------------------------------------------------------
// GitHub helpers (mirror app/api/power-hub/content/route.ts)
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

async function readEventsFile(): Promise<{ data: EventsFile; sha: string }> {
  const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${EVENTS_PATH}?ref=${GITHUB_BRANCH}`;
  const raw = await githubFetch(endpoint);
  const content = Buffer.from(raw.content, 'base64').toString('utf-8');
  let data: EventsFile;
  try {
    data = JSON.parse(content);
  } catch {
    data = { events: [] };
  }
  if (!data || !Array.isArray(data.events)) {
    data = { events: [] };
  }
  return { data, sha: raw.sha };
}

async function writeEventsFile(data: EventsFile, sha: string, message: string) {
  const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${EVENTS_PATH}`;
  const encoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

  const result = await githubFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  // Optional Vercel deploy hook
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook) {
    try {
      await fetch(deployHook, { method: 'POST' });
    } catch (err) {
      console.error('Failed to trigger Vercel rebuild:', err);
    }
  }

  return result;
}

//------------------------------------------------------------------------------
// Validation
//------------------------------------------------------------------------------
function newId() {
  // Short, sortable, collision-resistant enough for a single-tenant CMS
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeEvent(input: Partial<EventRecord>): Omit<EventRecord, 'id' | 'createdAt' | 'updatedAt'> {
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const bool = (v: unknown) => v === true;
  return {
    eventType: str(input.eventType),
    clientStatus: str(input.clientStatus) || 'New Lead',
    clientName: str(input.clientName),
    contactName: str(input.contactName),
    phone: str(input.phone),
    email: str(input.email),
    location: str(input.location),
    date: str(input.date),
    setupTime: str(input.setupTime),
    serveTime: str(input.serveTime),
    endTime: str(input.endTime),
    guestCount: str(input.guestCount),
    serviceStyle: str(input.serviceStyle),
    menu: str(input.menu),
    chafers: str(input.chafers),
    servingUtensils: str(input.servingUtensils),
    tables: str(input.tables),
    truck: str(input.truck),
    tents: str(input.tents),
    otherEquipment: str(input.otherEquipment),
    eventLead: str(input.eventLead),
    supportStaff: str(input.supportStaff),
    pricingNotes: str(input.pricingNotes),
    keyNotes: str(input.keyNotes),
    clientInsights: str(input.clientInsights),
    cl_headcount: bool(input.cl_headcount),
    cl_menu: bool(input.cl_menu),
    cl_equipment: bool(input.cl_equipment),
    cl_staff: bool(input.cl_staff),
    cl_location: bool(input.cl_location),
    cl_invoice: bool(input.cl_invoice),
    dayOfNotes: str(input.dayOfNotes),
    post_invoice: bool(input.post_invoice),
    post_followup: bool(input.post_followup),
    post_notes: bool(input.post_notes),
    status: str(input.status) || 'New Lead',
  };
}

//------------------------------------------------------------------------------
// GET - list or single
//------------------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { data } = await readEventsFile();

    if (id) {
      const event = data.events.find((e) => e.id === id);
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json({ event });
    }

    // Sort newest first by updatedAt
    const events = [...data.events].sort((a, b) =>
      (b.updatedAt || '').localeCompare(a.updatedAt || '')
    );

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Events read error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to read events' },
      { status: 500 }
    );
  }
}

//------------------------------------------------------------------------------
// POST - create
//------------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = body?.event;
    if (!event || typeof event !== 'object') {
      return NextResponse.json({ error: 'event is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const record: EventRecord = {
      ...sanitizeEvent(event),
      id: newId(),
      createdAt: now,
      updatedAt: now,
    };

    const { data, sha } = await readEventsFile();
    const next: EventsFile = { events: [record, ...data.events] };
    const label = record.clientName || record.contactName || 'new event';
    await writeEventsFile(next, sha, `Power Hub: add event sheet — ${label}`);

    return NextResponse.json({ event: record });
  } catch (error) {
    console.error('Events create error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create event' },
      { status: 500 }
    );
  }
}

//------------------------------------------------------------------------------
// PUT - update
//------------------------------------------------------------------------------
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const event = body?.event;
    if (!event || typeof event !== 'object' || !event.id) {
      return NextResponse.json({ error: 'event with id is required' }, { status: 400 });
    }

    const { data, sha } = await readEventsFile();
    const idx = data.events.findIndex((e) => e.id === event.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const existing = data.events[idx];
    const updated: EventRecord = {
      ...sanitizeEvent(event),
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const nextEvents = [...data.events];
    nextEvents[idx] = updated;
    const label = updated.clientName || updated.contactName || existing.id;
    await writeEventsFile({ events: nextEvents }, sha, `Power Hub: update event sheet — ${label}`);

    return NextResponse.json({ event: updated });
  } catch (error) {
    console.error('Events update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update event' },
      { status: 500 }
    );
  }
}

//------------------------------------------------------------------------------
// DELETE - remove
//------------------------------------------------------------------------------
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const { data, sha } = await readEventsFile();
    const target = data.events.find((e) => e.id === id);
    if (!target) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const nextEvents = data.events.filter((e) => e.id !== id);
    const label = target.clientName || target.contactName || id;
    await writeEventsFile({ events: nextEvents }, sha, `Power Hub: delete event sheet — ${label}`);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Events delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete event' },
      { status: 500 }
    );
  }
}
