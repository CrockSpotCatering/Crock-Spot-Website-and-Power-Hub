'use client';

//==============================================================================
// Power Hub → Events → [id]
//------------------------------------------------------------------------------
// Load one event sheet, let the team edit it (PUT) or delete it (DELETE).
// Print/Save-PDF is handled inside EventSheetForm via the browser print dialog.
//==============================================================================

import { useEffect, useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EventSheetForm, {
  emptyEventForm,
  type EventFormState,
} from '@/components/power-hub/EventSheetForm';

type StoredEvent = EventFormState & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const justSaved = searchParams.get('saved') === '1';

  const [event, setEvent] = useState<StoredEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(
    justSaved ? 'Event sheet saved.' : null
  );

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3500);
    return () => clearTimeout(t);
  }, [flash]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/power-hub/events?id=${encodeURIComponent(id)}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || `Failed to load (${res.status})`);
        }
        if (!cancelled) setEvent(data.event);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load event');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (form: EventFormState) => {
    if (!event) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/power-hub/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: { ...form, id: event.id } }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Failed to save (${res.status})`);
      }
      setEvent(data.event);
      setFlash('Event sheet saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/power-hub/events?id=${encodeURIComponent(event.id)}`,
        { method: 'DELETE' }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Failed to delete (${res.status})`);
      }
      router.push('/power-hub/dashboard/events');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#F49220] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-4">Loading event sheet…</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Event not found
          </h2>
          <p className="text-gray-500 mb-6">
            {error || 'This event sheet may have been deleted.'}
          </p>
          <button
            onClick={() => router.push('/power-hub/dashboard/events')}
            className="px-5 py-2.5 bg-[#F49220] text-white font-semibold rounded-lg hover:bg-[#e08519] transition-colors"
          >
            Back to all events
          </button>
        </div>
      </div>
    );
  }

  // Strip meta fields when handing initial state to the form
  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...formInitial
  } = event;

  return (
    <>
      {flash && (
        <div className="print:hidden fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg">
          {flash}
        </div>
      )}
      <EventSheetForm
        initial={formInitial}
        mode="edit"
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        saving={saving}
        deleting={deleting}
        error={error}
      />
    </>
  );
}
