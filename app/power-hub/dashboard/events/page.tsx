'use client';

//==============================================================================
// Power Hub → Events list
//------------------------------------------------------------------------------
// Front door for all saved event intake sheets.
//   - Loads from /api/power-hub/events (which reads content/events.json on GitHub)
//   - Search by client / contact / location
//   - Filter by status
//   - Click a row to open the full sheet (edit + print)
//   - "+ New Event Sheet" opens a blank form
//==============================================================================

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/power-hub/Header';
import {
  ClipboardList,
  Plus,
  Search,
  Calendar as CalendarIcon,
  MapPin,
  Users,
} from 'lucide-react';

type EventSummary = {
  id: string;
  createdAt: string;
  updatedAt: string;
  eventType: string;
  clientName: string;
  contactName: string;
  location: string;
  date: string;
  guestCount: string;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  'New Lead': 'bg-gray-100 text-gray-700',
  'Tasting Scheduled': 'bg-blue-100 text-blue-700',
  'Quoted': 'bg-purple-100 text-purple-700',
  'Booked': 'bg-emerald-100 text-emerald-700',
  'Completed': 'bg-amber-100 text-amber-800',
  'Lost': 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = [
  'All',
  'New Lead',
  'Tasting Scheduled',
  'Quoted',
  'Booked',
  'Completed',
  'Lost',
];

export default function EventsListPage() {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/power-hub/events', { cache: 'no-store' });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Failed to load events (${res.status})`);
        }
        const data = await res.json();
        if (!cancelled) setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load events');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      if (statusFilter !== 'All' && e.status !== statusFilter) return false;
      if (!q) return true;
      return (
        e.clientName.toLowerCase().includes(q) ||
        e.contactName.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.eventType.toLowerCase().includes(q)
      );
    });
  }, [events, search, statusFilter]);

  return (
    <div>
      <Header
        title="Event Intake Sheets"
        subtitle="Every booked event, in one place"
      />

      <div className="p-8">
        {/* Action bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-2xl">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client, contact, location…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] bg-white"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/power-hub/dashboard/events/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#F49220] text-white font-semibold rounded-lg hover:bg-[#e08519] transition-colors shadow-sm"
          >
            <Plus size={18} />
            New Event Sheet
          </Link>
        </div>

        {/* Body */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-10 h-10 border-4 border-[#F49220] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-4">Loading event sheets…</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState hasEvents={events.length > 0} />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Desktop table */}
            <table className="hidden md:table w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 font-semibold">Event Date</th>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Guests</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      window.location.href = `/power-hub/dashboard/events/${e.id}`;
                    }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                      {formatDate(e.date) || (
                        <span className="text-gray-400 italic">No date</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {e.clientName || (
                          <span className="text-gray-400 italic">Untitled</span>
                        )}
                      </div>
                      {e.contactName && (
                        <div className="text-xs text-gray-500">{e.contactName}</div>
                      )}
                      {e.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <MapPin size={12} />
                          {e.location}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {e.eventType || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {e.guestCount || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((e) => (
                <Link
                  key={e.id}
                  href={`/power-hub/dashboard/events/${e.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-gray-900">
                      {e.clientName || 'Untitled'}
                    </div>
                    <StatusBadge status={e.status} />
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {e.date && (
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon size={14} />
                        {formatDate(e.date)}
                      </div>
                    )}
                    {e.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {e.location}
                      </div>
                    )}
                    {e.guestCount && (
                      <div className="flex items-center gap-1.5">
                        <Users size={14} />
                        {e.guestCount} guests
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Count footer */}
        {!loading && filtered.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            Showing {filtered.length} of {events.length} event
            {events.length === 1 ? '' : 's'}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700';
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}
    >
      {status || 'New Lead'}
    </span>
  );
}

function formatDate(iso: string): string {
  if (!iso) return '';
  // Parse as local date (YYYY-MM-DD) to avoid TZ drift
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function EmptyState({ hasEvents }: { hasEvents: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <ClipboardList className="w-14 h-14 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasEvents ? 'No matching events' : 'No event sheets yet'}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {hasEvents
          ? 'Try clearing the search or status filter.'
          : 'When a lead books an event, fill out an intake sheet so the day-of details are all in one place.'}
      </p>
      {!hasEvents && (
        <Link
          href="/power-hub/dashboard/events/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F49220] text-white font-semibold rounded-lg hover:bg-[#e08519] transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create the first event sheet
        </Link>
      )}
    </div>
  );
}
