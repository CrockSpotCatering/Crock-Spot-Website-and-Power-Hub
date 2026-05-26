'use client';

//==============================================================================
// Power Hub → Events → New
//------------------------------------------------------------------------------
// Blank intake sheet. POSTs to /api/power-hub/events and redirects to the
// detail page on success so the team can keep editing or print to PDF.
//==============================================================================

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventSheetForm, {
  emptyEventForm,
  type EventFormState,
} from '@/components/power-hub/EventSheetForm';

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (form: EventFormState) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/power-hub/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: form }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Failed to save (${res.status})`);
      }
      const id = data?.event?.id;
      if (id) {
        router.push(`/power-hub/dashboard/events/${id}?saved=1`);
      } else {
        router.push('/power-hub/dashboard/events');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
      setSaving(false);
    }
  };

  return (
    <EventSheetForm
      initial={emptyEventForm}
      mode="create"
      onSubmit={handleSubmit}
      saving={saving}
      error={error}
    />
  );
}
