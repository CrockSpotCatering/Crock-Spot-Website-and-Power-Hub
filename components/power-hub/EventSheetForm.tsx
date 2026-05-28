'use client';

//==============================================================================
// EventSheetForm — the Crock Spot Event Intake Sheet
//------------------------------------------------------------------------------
// Mirrors the printed `CrockSpot_Event-Sheet-Intake Form.docx` layout.
// Used by:
//   - /power-hub/dashboard/events/new
//   - /power-hub/dashboard/events/[id]   (edit)
//
// Pure controlled form. Persistence is owned by the parent — the form just
// emits its FormState through `onSubmit`. The parent decides whether to POST
// (create) or PUT (update) to /api/power-hub/events.
//==============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Save, Trash2 } from 'lucide-react';

export type EventFormState = {
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
  // Follow-Up (Phase 1 — recorded; Phase 2 — will sync to GHL when enabled)
  nextFollowUpDate: string;          // YYYY-MM-DD, blank = no follow-up scheduled
  assignedTo: 'Steven' | 'Peter' | 'Both' | '';
  followUpDone: boolean;             // Was today's follow-up completed?
  followUpLog: FollowUpLogEntry[];   // Append-only conversation history
};

export type FollowUpLogEntry = {
  at: string;       // ISO timestamp
  who: string;      // 'Steven' | 'Peter' | typed-in name
  note: string;     // What happened in this follow-up
};

export const emptyEventForm: EventFormState = {
  eventType: '',
  clientStatus: 'New Lead',
  clientName: '',
  contactName: '',
  phone: '',
  email: '',
  location: '',
  date: '',
  setupTime: '',
  serveTime: '',
  endTime: '',
  guestCount: '',
  serviceStyle: '',
  menu: '',
  chafers: '',
  servingUtensils: '',
  tables: '',
  truck: '',
  tents: '',
  otherEquipment: '',
  eventLead: '',
  supportStaff: '',
  pricingNotes: '',
  keyNotes: '',
  clientInsights: '',
  cl_headcount: false,
  cl_menu: false,
  cl_equipment: false,
  cl_staff: false,
  cl_location: false,
  cl_invoice: false,
  dayOfNotes: '',
  post_invoice: false,
  post_followup: false,
  post_notes: false,
  status: 'New Lead',
  nextFollowUpDate: '',
  assignedTo: 'Steven',
  followUpDone: false,
  followUpLog: [],
};

interface EventSheetFormProps {
  initial: EventFormState;
  mode: 'create' | 'edit';
  onSubmit: (form: EventFormState) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  saving?: boolean;
  deleting?: boolean;
  error?: string | null;
}

export default function EventSheetForm({
  initial,
  mode,
  onSubmit,
  onDelete,
  saving = false,
  deleting = false,
  error = null,
}: EventSheetFormProps) {
  const [form, setForm] = useState<EventFormState>(initial);

  const update = (field: keyof EventFormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      // Tiny delay so any open dropdowns/focus rings settle before the
      // browser snapshots the page for the print preview.
      setTimeout(() => window.print(), 50);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    const label = form.clientName || form.contactName || 'this event';
    if (typeof window !== 'undefined' && !window.confirm(`Delete event sheet for "${label}"? This cannot be undone.`)) {
      return;
    }
    await onDelete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crock-dark via-crock-purple to-crock-dark print:bg-white print:min-h-0">
      {/* ──────────────────────────────────────────────────────────
          PRINT-ONLY VIEW
          Renders the current form data as plain text so the PDF
          actually contains the data. Inputs/textareas can't expand
          on print, so we render a separate read-only document.
          Hidden on screen, visible only via @media print.
         ────────────────────────────────────────────────────────── */}
      <EventSheetPrintView form={form} />

      {/* Top action bar — hidden on print */}
      <div className="print:hidden bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          href="/power-hub/dashboard/events"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft size={18} />
          Back to all events
        </Link>
        <div className="flex items-center gap-3">
          {mode === 'edit' && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || saving}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              <Trash2 size={16} />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <Printer size={16} />
            Print / Save PDF
          </button>
          <button
            type="submit"
            form="event-sheet-form"
            disabled={saving || deleting}
            className="flex items-center gap-2 px-5 py-2 bg-[#F49220] text-white font-semibold rounded-lg hover:bg-[#e08519] transition disabled:opacity-50 shadow-sm"
          >
            <Save size={16} />
            {saving ? 'Saving…' : mode === 'create' ? 'Save event' : 'Save changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="print:hidden max-w-5xl mx-auto mt-6 px-4">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 print:hidden">
        {/* Header (always visible — looks great in PDF too) */}
        <div className="mb-6 text-center print:mb-4">
          <div className="inline-block bg-crock-orange/20 border border-crock-orange/40 text-crock-orange px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 print:hidden">
            Event Intake Sheet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 print:text-3xl print:text-crock-dark">
            Event Sheet
          </h1>
          <p className="text-crock-yellow italic print:text-crock-gray-dark">
            Let Us Crock Your World
          </p>
        </div>

        <form
          id="event-sheet-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:overflow-visible"
        >
          {/* ── Event Overview ───────────────────────── */}
          <Section icon="📌" title="Event Overview">
            <Grid2>
              <Field label="Event Type">
                <select
                  value={form.eventType}
                  onChange={(e) => update('eventType', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  <option>Corporate</option>
                  <option>Wedding</option>
                  <option>Private Party</option>
                  <option>Food Truck</option>
                  <option>Government</option>
                  <option>Non-Profit</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Client Status">
                <select
                  value={form.clientStatus}
                  onChange={(e) => update('clientStatus', e.target.value)}
                  className={inputCls}
                >
                  <option>New Lead</option>
                  <option>Repeat Client</option>
                  <option>VIP</option>
                  <option>Referral</option>
                </select>
              </Field>
              <Field label="Client / Company Name">
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => update('clientName', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Contact Name">
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => update('contactName', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputCls}
                  placeholder="(303) 555-1234"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Grid2>
          </Section>

          {/* ── Event Details ────────────────────────── */}
          <Section icon="📍" title="Event Details">
            <Field label="Location / Venue">
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Grid4>
              <Field label="Date">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Setup Time">
                <input
                  type="time"
                  value={form.setupTime}
                  onChange={(e) => update('setupTime', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Serve Time">
                <input
                  type="time"
                  value={form.serveTime}
                  onChange={(e) => update('serveTime', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="End Time">
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => update('endTime', e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Grid4>
          </Section>

          {/* ── Service ──────────────────────────────── */}
          <Section icon="👥" title="Service Details">
            <Grid2>
              <Field label="Guest Count">
                <input
                  type="number"
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  className={inputCls}
                  placeholder="100"
                />
              </Field>
              <Field label="Service Style">
                <select
                  value={form.serviceStyle}
                  onChange={(e) => update('serviceStyle', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  <option>Buffet</option>
                  <option>Plated</option>
                  <option>Food Truck</option>
                  <option>Drop-Off</option>
                  <option>Stations</option>
                </select>
              </Field>
            </Grid2>
          </Section>

          {/* ── Menu ─────────────────────────────────── */}
          <Section icon="🥘" title="Menu">
            <Field label="Menu Items (one per line, or comma-separated)">
              <textarea
                value={form.menu}
                onChange={(e) => update('menu', e.target.value)}
                rows={5}
                className={inputCls}
                placeholder="Slow-cooked pulled pork&#10;Coconut basmati rice&#10;Black beans, corn salsa, fresh cilantro&#10;…"
              />
            </Field>
          </Section>

          {/* ── Equipment ────────────────────────────── */}
          <Section icon="🚚" title="Equipment & Setup">
            <Grid3>
              <Field label="Chafers">
                <input
                  type="text"
                  value={form.chafers}
                  onChange={(e) => update('chafers', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Serving Utensils">
                <input
                  type="text"
                  value={form.servingUtensils}
                  onChange={(e) => update('servingUtensils', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Tables">
                <input
                  type="text"
                  value={form.tables}
                  onChange={(e) => update('tables', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Truck">
                <input
                  type="text"
                  value={form.truck}
                  onChange={(e) => update('truck', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Tents">
                <input
                  type="text"
                  value={form.tents}
                  onChange={(e) => update('tents', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Other">
                <input
                  type="text"
                  value={form.otherEquipment}
                  onChange={(e) => update('otherEquipment', e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Grid3>
          </Section>

          {/* ── Staffing ─────────────────────────────── */}
          <Section icon="👨‍🍳" title="Staffing">
            <Grid2>
              <Field label="Event Lead">
                <input
                  type="text"
                  value={form.eventLead}
                  onChange={(e) => update('eventLead', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Support Staff">
                <input
                  type="text"
                  value={form.supportStaff}
                  onChange={(e) => update('supportStaff', e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Grid2>
          </Section>

          {/* ── Pricing ──────────────────────────────── */}
          <Section icon="💰" title="Pricing Notes">
            <Field label="">
              <textarea
                value={form.pricingNotes}
                onChange={(e) => update('pricingNotes', e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>
          </Section>

          {/* ── Key Notes ────────────────────────────── */}
          <Section icon="⚠️" title="Key Notes — Read First" highlight="amber">
            <Field label="">
              <textarea
                value={form.keyNotes}
                onChange={(e) => update('keyNotes', e.target.value)}
                rows={3}
                className={inputCls}
                placeholder="Allergies, must-know details, deal-breakers…"
              />
            </Field>
          </Section>

          {/* ── Client Insights ──────────────────────── */}
          <Section icon="🧠" title="Client Insights">
            <Field label="">
              <textarea
                value={form.clientInsights}
                onChange={(e) => update('clientInsights', e.target.value)}
                rows={3}
                className={inputCls}
                placeholder="Personality, preferences, history, referral source…"
              />
            </Field>
          </Section>

          {/* ── Follow-Up ────────────────────────────── */}
          <Section icon="🔔" title="Follow-Up" highlight="amber">
            <Grid3>
              <Field label="Next Follow-Up Date">
                <input
                  type="date"
                  value={form.nextFollowUpDate}
                  onChange={(e) => update('nextFollowUpDate', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Assigned To">
                <select
                  value={form.assignedTo}
                  onChange={(e) =>
                    update('assignedTo', e.target.value as EventFormState['assignedTo'])
                  }
                  className={inputCls}
                >
                  <option value="Steven">Steven</option>
                  <option value="Peter">Peter</option>
                  <option value="Both">Both</option>
                </select>
              </Field>
              <Field label="Status">
                <label className="flex items-center gap-3 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.followUpDone}
                    onChange={(e) => update('followUpDone', e.target.checked)}
                    className="w-5 h-5 accent-crock-orange cursor-pointer"
                  />
                  <span
                    className={`text-crock-dark ${
                      form.followUpDone ? 'line-through opacity-60' : ''
                    }`}
                  >
                    Today&rsquo;s follow-up done
                  </span>
                </label>
              </Field>
            </Grid3>

            <FollowUpLog
              entries={form.followUpLog}
              onAdd={(entry) =>
                setForm((f) => ({
                  ...f,
                  followUpLog: [...f.followUpLog, entry],
                }))
              }
              defaultAuthor={form.assignedTo === 'Peter' ? 'Peter' : 'Steven'}
            />
          </Section>

          {/* ── Pre-Event Checklist ──────────────────── */}
          <Section icon="✅" title="Pre-Event Checklist" highlight="green">
            <div className="space-y-2">
              <Check label="Headcount confirmed" value={form.cl_headcount} onChange={(v) => update('cl_headcount', v)} />
              <Check label="Menu confirmed" value={form.cl_menu} onChange={(v) => update('cl_menu', v)} />
              <Check label="Equipment packed" value={form.cl_equipment} onChange={(v) => update('cl_equipment', v)} />
              <Check label="Staff confirmed" value={form.cl_staff} onChange={(v) => update('cl_staff', v)} />
              <Check label="Location details reviewed" value={form.cl_location} onChange={(v) => update('cl_location', v)} />
              <Check label="Invoice prepared" value={form.cl_invoice} onChange={(v) => update('cl_invoice', v)} />
            </div>
          </Section>

          {/* ── Day-of Notes ─────────────────────────── */}
          <Section icon="📝" title="Day-of Notes">
            <Field label="">
              <textarea
                value={form.dayOfNotes}
                onChange={(e) => update('dayOfNotes', e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>
          </Section>

          {/* ── Post-Event ───────────────────────────── */}
          <Section icon="🏁" title="Post-Event">
            <div className="space-y-2">
              <Check label="Invoice sent" value={form.post_invoice} onChange={(v) => update('post_invoice', v)} />
              <Check label="Follow-up sent" value={form.post_followup} onChange={(v) => update('post_followup', v)} />
              <Check label="Notes saved for future" value={form.post_notes} onChange={(v) => update('post_notes', v)} />
            </div>
          </Section>

          {/* ── Footer / Status ──────────────────────── */}
          <div className="bg-crock-dark px-8 py-6 flex items-center justify-between print:bg-white print:border-t print:border-crock-gray-light print:px-0">
            <div className="text-white print:text-crock-dark">
              <div className="text-xs uppercase tracking-wider text-crock-yellow opacity-80 print:text-crock-gray-dark">
                Lead Status
              </div>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="bg-crock-dark text-white border border-white/20 rounded-lg px-3 py-2 mt-1 focus:border-crock-orange outline-none print:bg-white print:text-crock-dark print:border-crock-gray-light"
              >
                <option>New Lead</option>
                <option>Tasting Scheduled</option>
                <option>Quoted</option>
                <option>Booked</option>
                <option>Completed</option>
                <option>Lost</option>
              </select>
            </div>
            <div className="hidden print:block text-right text-xs text-crock-gray-dark">
              Crock Spot · Let Us Crock Your World
            </div>
          </div>
        </form>

        {/* Bottom action bar — mirrors the top sticky bar so the team
            can save without scrolling back up after editing the last
            section. Hidden on print. */}
        <div className="print:hidden mt-6 bg-white border border-crock-gray-light/40 rounded-2xl shadow-lg px-5 py-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Link
            href="/power-hub/dashboard/events"
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-3 py-2"
          >
            <ArrowLeft size={18} />
            Back to all events
          </Link>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {mode === 'edit' && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || saving}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
              >
                <Trash2 size={16} />
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
            <button
              type="submit"
              form="event-sheet-form"
              disabled={saving || deleting}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F49220] text-white font-semibold rounded-lg hover:bg-[#e08519] transition disabled:opacity-50 shadow-sm"
            >
              <Save size={16} />
              {saving ? 'Saving…' : mode === 'create' ? 'Save event' : 'Save changes'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-crock-yellow/60 text-xs print:hidden">
          Crock Spot · Internal · Saved to Power Hub
        </div>
      </div>

      {/* Print styles — make the saved PDF look clean */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          body {
            background: white !important;
          }
          /* Hide sidebar + any other dashboard chrome when printing */
          aside,
          nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Print View ────────────────────────────────────────────────────
// Mirrors the on-screen form's section layout but renders every value
// as plain text. Hidden on screen (`hidden print:block`) so users
// never see it directly — it's purely the PDF output.

function EventSheetPrintView({ form }: { form: EventFormState }) {
  const fmtDate = (iso: string) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const fmtTime = (t: string) => {
    if (!t) return '';
    const [hh, mm] = t.split(':').map(Number);
    if (Number.isNaN(hh)) return t;
    const period = hh >= 12 ? 'PM' : 'AM';
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${String(mm || 0).padStart(2, '0')} ${period}`;
  };

  return (
    <div className="hidden print:block text-black text-[11pt] leading-snug">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-black">
        <h1 className="text-3xl font-bold tracking-wide">EVENT SHEET</h1>
        <p className="italic text-sm mt-1">Let Us Crock Your World</p>
      </div>

      <PrintSection icon="📌" title="Event Overview">
        <PrintGrid2>
          <PrintRow label="Event Type" value={form.eventType} />
          <PrintRow label="Client Status" value={form.clientStatus} />
          <PrintRow label="Client / Company" value={form.clientName} />
          <PrintRow label="Contact Name" value={form.contactName} />
          <PrintRow label="Phone" value={form.phone} />
          <PrintRow label="Email" value={form.email} />
        </PrintGrid2>
      </PrintSection>

      <PrintSection icon="📍" title="Event Details">
        <PrintRow label="Location / Venue" value={form.location} block />
        <PrintGrid4>
          <PrintRow label="Date" value={fmtDate(form.date)} />
          <PrintRow label="Setup Time" value={fmtTime(form.setupTime)} />
          <PrintRow label="Serve Time" value={fmtTime(form.serveTime)} />
          <PrintRow label="End Time" value={fmtTime(form.endTime)} />
        </PrintGrid4>
      </PrintSection>

      <PrintSection icon="👥" title="Service Details">
        <PrintGrid2>
          <PrintRow label="Guest Count" value={form.guestCount} />
          <PrintRow label="Service Style" value={form.serviceStyle} />
        </PrintGrid2>
      </PrintSection>

      <PrintSection icon="🥘" title="Menu">
        <PrintBlock value={form.menu} />
      </PrintSection>

      <PrintSection icon="🚚" title="Equipment & Setup">
        <PrintGrid3>
          <PrintRow label="Chafers" value={form.chafers} />
          <PrintRow label="Serving Utensils" value={form.servingUtensils} />
          <PrintRow label="Tables" value={form.tables} />
          <PrintRow label="Truck" value={form.truck} />
          <PrintRow label="Tents" value={form.tents} />
          <PrintRow label="Other" value={form.otherEquipment} />
        </PrintGrid3>
      </PrintSection>

      <PrintSection icon="👨‍🍳" title="Staffing">
        <PrintGrid2>
          <PrintRow label="Event Lead" value={form.eventLead} />
          <PrintRow label="Support Staff" value={form.supportStaff} />
        </PrintGrid2>
      </PrintSection>

      <PrintSection icon="💰" title="Pricing Notes">
        <PrintBlock value={form.pricingNotes} />
      </PrintSection>

      <PrintSection icon="⚠️" title="Key Notes — Read First" highlight>
        <PrintBlock value={form.keyNotes} />
      </PrintSection>

      <PrintSection icon="🧠" title="Client Insights">
        <PrintBlock value={form.clientInsights} />
      </PrintSection>

      <PrintSection icon="🔔" title="Follow-Up" highlight>
        <div className="grid grid-cols-3 gap-x-6 gap-y-0.5 mb-2">
          <PrintRow label="Next Date" value={form.nextFollowUpDate ? fmtDate(form.nextFollowUpDate) : ''} />
          <PrintRow label="Assigned" value={form.assignedTo} />
          <PrintRow
            label="Today's nudge"
            value={form.followUpDone ? 'Complete' : 'Pending'}
          />
        </div>
        {form.followUpLog.length === 0 ? (
          <div className="text-gray-400 italic">—</div>
        ) : (
          <ol className="space-y-1">
            {[...form.followUpLog]
              .sort((a, b) => b.at.localeCompare(a.at))
              .map((entry, i) => (
                <li key={`p-${entry.at}-${i}`} className="mb-1">
                  <span className="font-semibold">{entry.who}</span>
                  <span className="text-gray-600"> · {formatLogStamp(entry.at)}</span>
                  <div className="whitespace-pre-wrap pl-2">{entry.note}</div>
                </li>
              ))}
          </ol>
        )}
      </PrintSection>

      <PrintSection icon="✅" title="Pre-Event Checklist">
        <PrintCheck label="Headcount confirmed" value={form.cl_headcount} />
        <PrintCheck label="Menu confirmed" value={form.cl_menu} />
        <PrintCheck label="Equipment packed" value={form.cl_equipment} />
        <PrintCheck label="Staff confirmed" value={form.cl_staff} />
        <PrintCheck label="Location details reviewed" value={form.cl_location} />
        <PrintCheck label="Invoice prepared" value={form.cl_invoice} />
      </PrintSection>

      <PrintSection icon="📝" title="Day-of Notes">
        <PrintBlock value={form.dayOfNotes} />
      </PrintSection>

      <PrintSection icon="🏁" title="Post-Event">
        <PrintCheck label="Invoice sent" value={form.post_invoice} />
        <PrintCheck label="Follow-up sent" value={form.post_followup} />
        <PrintCheck label="Notes saved for future" value={form.post_notes} />
      </PrintSection>

      <div className="mt-6 pt-3 border-t border-gray-400 flex items-center justify-between text-sm">
        <div>
          <span className="uppercase tracking-wider text-xs">Lead Status: </span>
          <strong>{form.status || 'New Lead'}</strong>
        </div>
        <div className="italic text-xs">
          Crock Spot · Let Us Crock Your World
        </div>
      </div>
    </div>
  );
}

function PrintSection({
  icon,
  title,
  children,
  highlight,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`mb-4 break-inside-avoid ${
        highlight ? 'border-l-4 border-black pl-3' : ''
      }`}
    >
      <h2 className="text-base font-bold uppercase tracking-wider mb-2 border-b border-gray-400 pb-1">
        <span className="mr-1">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function PrintRow({
  label,
  value,
  block,
}: {
  label: string;
  value: string;
  block?: boolean;
}) {
  const display = value && value.trim() !== '' ? value : '—';
  return (
    <div className={block ? 'mb-1' : 'mb-0.5'}>
      <span className="font-semibold">{label}:</span>{' '}
      <span className={!value ? 'text-gray-400' : ''}>{display}</span>
    </div>
  );
}

function PrintBlock({ value }: { value: string }) {
  const display = value && value.trim() !== '' ? value : '—';
  return (
    <div
      className={`whitespace-pre-wrap ${
        !value ? 'text-gray-400 italic' : ''
      }`}
    >
      {display}
    </div>
  );
}

function PrintCheck({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-0.5">
      <span className="inline-block w-4 h-4 border border-black text-center text-xs leading-4">
        {value ? '✓' : ''}
      </span>
      <span>{label}</span>
    </div>
  );
}

function PrintGrid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">{children}</div>;
}
function PrintGrid3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-x-6 gap-y-0.5">{children}</div>;
}
function PrintGrid4({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 gap-x-6 gap-y-0.5">{children}</div>;
}

// ─── Reusable bits ─────────────────────────────────────────────────

const inputCls =
  'w-full px-4 py-2.5 border border-crock-gray-light rounded-lg focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 outline-none transition text-crock-dark print:border-crock-gray-light print:bg-white';

function Section({
  icon,
  title,
  children,
  highlight,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  highlight?: 'amber' | 'green';
}) {
  const bg =
    highlight === 'amber'
      ? 'bg-crock-yellow/20 border-l-4 border-crock-orange'
      : highlight === 'green'
      ? 'bg-crock-green/10 border-l-4 border-crock-green'
      : 'bg-white';

  return (
    <div className={`${bg} px-8 py-6 border-b border-crock-gray-light/30 print:px-4 print:py-4 print:break-inside-avoid`}>
      <h2 className="text-xl font-bold text-crock-dark mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-crock-gray-dark mb-1.5">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}
function Grid3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>;
}
function Grid4({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{children}</div>;
}

function Check({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer hover:bg-crock-yellow/10 px-2 py-1.5 rounded transition">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-crock-orange cursor-pointer"
      />
      <span className={`text-crock-dark ${value ? 'line-through opacity-60' : ''}`}>
        {label}
      </span>
    </label>
  );
}

// ─── Follow-Up Log ─────────────────────────────────────────────
// Append-only timestamped conversation history. Replaces the single
// "client insights" textarea pattern with a real audit trail — critical
// because Steven is the sole point of lead intake; if Peter picks one
// up, he needs to know what's already been said.

function FollowUpLog({
  entries,
  onAdd,
  defaultAuthor,
}: {
  entries: FollowUpLogEntry[];
  onAdd: (entry: FollowUpLogEntry) => void;
  defaultAuthor: string;
}) {
  const [draft, setDraft] = useState('');
  const [who, setWho] = useState(defaultAuthor);

  const addEntry = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd({
      at: new Date().toISOString(),
      who: who.trim() || defaultAuthor,
      note: trimmed,
    });
    setDraft('');
  };

  const sorted = [...entries].sort((a, b) => b.at.localeCompare(a.at));

  return (
    <div className="mt-6">
      <div className="text-sm font-semibold text-crock-gray-dark mb-2 flex items-center gap-2">
        📝 Follow-Up Notes
        <span className="text-xs font-normal text-crock-gray-dark/60">
          ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
        </span>
      </div>

      {/* New entry form */}
      <div className="bg-white border border-crock-gray-light/40 rounded-lg p-3 mb-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Add a quick note about today's follow-up (e.g. 'Called Marcus, left voicemail. Try Tuesday after 10am.')"
          className="w-full px-3 py-2 border border-crock-gray-light rounded-md focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 outline-none transition text-sm text-crock-dark"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              e.preventDefault();
              addEntry();
            }
          }}
        />
        <div className="flex items-center justify-between mt-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-crock-gray-dark/70">
            <span>From:</span>
            <select
              value={who}
              onChange={(e) => setWho(e.target.value)}
              className="border border-crock-gray-light rounded px-2 py-1 text-sm text-crock-dark"
            >
              <option>Steven</option>
              <option>Peter</option>
              <option>Mandy</option>
              <option>Other</option>
            </select>
            <span className="hidden md:inline text-[10px] opacity-60">
              Tip: ⌘/Ctrl + Enter to add
            </span>
          </div>
          <button
            type="button"
            onClick={addEntry}
            disabled={!draft.trim()}
            className="px-4 py-1.5 text-sm font-semibold bg-crock-orange text-white rounded-md hover:bg-crock-orange-dark disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            + Add note
          </button>
        </div>
      </div>

      {/* History */}
      {sorted.length === 0 ? (
        <p className="text-sm text-crock-gray-dark/60 italic px-1">
          No follow-up notes yet. Add one above when you call, text, or email
          this client.
        </p>
      ) : (
        <ol className="space-y-2">
          {sorted.map((entry, i) => (
            <li
              key={`${entry.at}-${i}`}
              className="bg-white border border-crock-gray-light/40 rounded-lg p-3 text-sm"
            >
              <div className="flex items-center justify-between mb-1 text-xs text-crock-gray-dark/70">
                <span className="font-semibold text-crock-dark">{entry.who}</span>
                <span>{formatLogStamp(entry.at)}</span>
              </div>
              <div className="text-crock-dark whitespace-pre-wrap">{entry.note}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function formatLogStamp(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
