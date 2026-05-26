'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/power-hub/Header';
import Link from 'next/link';
import {
  FileText,
  Image,
  Sparkles,
  Settings,
  TrendingUp,
  Calendar,
  ExternalLink,
  Utensils,
  Users,
  Star,
  Bell,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

const stats = [
  { name: 'Website Pages', value: '10', icon: FileText, change: 'All Active', color: 'text-blue-600' },
  { name: 'Media Files', value: '0', icon: Image, change: 'Upload images', color: 'text-purple-600' },
  { name: 'AI Assists', value: '0', icon: Sparkles, change: 'Try AI writing', color: 'text-green-600' },
];

const quickActions = [
  { name: 'Events', href: '/power-hub/dashboard/events', icon: ClipboardList, color: 'bg-amber-500', description: 'Event intake sheets' },
  { name: 'Edit Content', href: '/power-hub/dashboard/content', icon: FileText, color: 'bg-blue-500', description: 'Update website text' },
  { name: 'Upload Media', href: '/power-hub/dashboard/media', icon: Image, color: 'bg-purple-500', description: 'Add images & files' },
  { name: 'Calendar', href: '/power-hub/dashboard/calendar', icon: Calendar, color: 'bg-orange-500', description: 'Manage events' },
  { name: 'AI Assist', href: '/power-hub/dashboard/ai', icon: Sparkles, color: 'bg-green-500', description: 'AI-powered writing' },
  { name: 'Settings', href: '/power-hub/dashboard/settings', icon: Settings, color: 'bg-gray-500', description: 'Hub configuration' },
];

const websitePages = [
  { name: 'Home', path: '/', icon: Utensils },
  { name: 'About', path: '/about', icon: Users },
  { name: 'Catering', path: '/catering', icon: Star },
  { name: 'Menus', path: '/menus', icon: FileText },
  { name: 'Contact', path: '/contact', icon: FileText },
];

type EventSummary = {
  id: string;
  clientName: string;
  contactName: string;
  phone: string;
  email: string;
  eventType: string;
  status: string;
  updatedAt: string;
  nextFollowUpDate?: string;
  assignedTo?: 'Steven' | 'Peter' | 'Both' | '';
  followUpDone?: boolean;
};

const STALL_DAYS = 5; // "stalled" if no update for this many days

export default function Dashboard() {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/power-hub/events', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load events');
        const data = await res.json();
        if (!cancelled) setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) setEvents([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const { todayList, overdueList, upcomingList, stalledList } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const stallCutoff = new Date(today);
    stallCutoff.setDate(stallCutoff.getDate() - STALL_DAYS);

    const isOpenStatus = (s: string) =>
      !['Completed', 'Lost'].includes(s);

    const overdue: EventSummary[] = [];
    const todayItems: EventSummary[] = [];
    const upcoming: EventSummary[] = [];
    const stalled: EventSummary[] = [];

    for (const e of events) {
      if (!isOpenStatus(e.status)) continue;

      // Follow-up buckets
      if (e.nextFollowUpDate && !e.followUpDone) {
        const [y, m, d] = e.nextFollowUpDate.split('-').map(Number);
        if (y && m && d) {
          const target = new Date(y, m - 1, d);
          if (target < today) overdue.push(e);
          else if (target.getTime() === today.getTime()) todayItems.push(e);
          else if ((target.getTime() - today.getTime()) / 86400000 <= 7)
            upcoming.push(e);
        }
      }

      // Stalled bucket: open lead, no follow-up scheduled, last touched > STALL_DAYS ago
      if (
        !e.nextFollowUpDate &&
        e.updatedAt &&
        new Date(e.updatedAt) < stallCutoff
      ) {
        stalled.push(e);
      }
    }

    const byDate = (a: EventSummary, b: EventSummary) =>
      (a.nextFollowUpDate || '').localeCompare(b.nextFollowUpDate || '');

    return {
      todayList: todayItems.sort(byDate),
      overdueList: overdue.sort(byDate),
      upcomingList: upcoming.sort(byDate),
      stalledList: stalled.sort((a, b) =>
        (a.updatedAt || '').localeCompare(b.updatedAt || '')
      ),
    };
  }, [events]);

  return (
    <div>
      <Header title="Dashboard" subtitle="Welcome to your CrockSpot Power Hub" />

      <div className="p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#F49220] to-[#8C2D2E] rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Crock Spot Power Hub</h2>
              <p className="text-white/80 mt-1">Manage your website content, media, and more!</p>
            </div>
            <div className="text-6xl opacity-20">
              <Utensils className="w-16 h-16" />
            </div>
          </div>
        </div>

        {/* Follow-Up Command Center */}
        <FollowUpCommandCenter
          loading={loading}
          todayList={todayList}
          overdueList={overdueList}
          upcomingList={upcomingList}
          stalledList={stalledList}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-xs ${stat.color} mt-2 flex items-center gap-1`}>
                      <TrendingUp size={12} />
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#F49220]/10 rounded-xl flex items-center justify-center">
                    <Icon className="text-[#F49220]" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#F49220] hover:shadow-lg transition-all group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900">{action.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Website Pages */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Pages</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100">
            {websitePages.map((page) => {
              const Icon = page.icon;
              return (
                <div key={page.name} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F49220]/10 rounded-lg flex items-center justify-center">
                      <Icon className="text-[#F49220]" size={16} />
                    </div>
                    <span className="font-medium text-gray-900">{page.name}</span>
                    <span className="text-xs text-gray-400">{page.path}</span>
                  </div>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[#F49220] hover:text-[#e08519] transition-colors"
                  >
                    <ExternalLink size={14} />
                    View
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Powered by Total Success AI | Let Us Crock Your World!</p>
        </div>
      </div>
    </div>
  );
}

// ─── Follow-Up Command Center ─────────────────────────────────────────
// Front-page widget. Shows the team what to do TODAY without making them
// open the Events tab. Designed for a non-technical user to scan in 5
// seconds. Beats sticky notes because it's automatic, sorted, and complete.

function FollowUpCommandCenter({
  loading,
  todayList,
  overdueList,
  upcomingList,
  stalledList,
}: {
  loading: boolean;
  todayList: EventSummary[];
  overdueList: EventSummary[];
  upcomingList: EventSummary[];
  stalledList: EventSummary[];
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-[#F49220] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500">Loading follow-ups…</span>
        </div>
      </div>
    );
  }

  const allEmpty =
    todayList.length === 0 &&
    overdueList.length === 0 &&
    upcomingList.length === 0 &&
    stalledList.length === 0;

  if (allEmpty) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
          🎉
        </div>
        <div>
          <p className="font-semibold text-emerald-900">Inbox zero — nothing needs follow-up.</p>
          <p className="text-sm text-emerald-800/80">
            Add a Next Follow-Up Date to any open event and it’ll show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Bell size={18} className="text-[#F49220]" />
        Follow-Up Command Center
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Overdue */}
        {overdueList.length > 0 && (
          <FollowUpCard
            tone="red"
            icon={<AlertTriangle size={18} />}
            title={`Overdue (${overdueList.length})`}
            subtitle="These were due before today."
            events={overdueList}
            showOverdueBy
          />
        )}

        {/* Today */}
        {todayList.length > 0 && (
          <FollowUpCard
            tone="amber"
            icon={<Bell size={18} />}
            title={`Today (${todayList.length})`}
            subtitle="Call, text, or email these clients today."
            events={todayList}
          />
        )}

        {/* This week */}
        {upcomingList.length > 0 && (
          <FollowUpCard
            tone="blue"
            icon={<Calendar size={18} />}
            title={`This Week (${upcomingList.length})`}
            subtitle="Coming up in the next 7 days."
            events={upcomingList}
          />
        )}

        {/* Stalled */}
        {stalledList.length > 0 && (
          <FollowUpCard
            tone="gray"
            icon={<AlertTriangle size={18} />}
            title={`Stalled Leads (${stalledList.length})`}
            subtitle={`Open leads with no follow-up date and no update in ${STALL_DAYS}+ days.`}
            events={stalledList}
          />
        )}
      </div>
    </div>
  );
}

function FollowUpCard({
  tone,
  icon,
  title,
  subtitle,
  events,
  showOverdueBy,
}: {
  tone: 'red' | 'amber' | 'blue' | 'gray';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  events: EventSummary[];
  showOverdueBy?: boolean;
}) {
  const toneCls = {
    red: 'bg-red-50 border-red-200 text-red-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    gray: 'bg-gray-50 border-gray-200 text-gray-800',
  }[tone];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={`rounded-xl border ${toneCls}`}>
      <div className="px-4 py-3 border-b border-current/10 flex items-start gap-2">
        <div className="mt-0.5">{icon}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-xs opacity-80">{subtitle}</p>
        </div>
      </div>
      <ul className="divide-y divide-current/10">
        {events.slice(0, 5).map((e) => {
          let dateLabel = '';
          if (e.nextFollowUpDate) {
            const [y, m, d] = e.nextFollowUpDate.split('-').map(Number);
            if (y && m && d) {
              const target = new Date(y, m - 1, d);
              if (showOverdueBy) {
                const days = Math.round((today.getTime() - target.getTime()) / 86400000);
                dateLabel = `${days}d overdue`;
              } else {
                dateLabel = target.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
              }
            }
          } else if (e.updatedAt) {
            const daysAgo = Math.round(
              (today.getTime() - new Date(e.updatedAt).getTime()) / 86400000
            );
            dateLabel = `${daysAgo}d quiet`;
          }

          return (
            <li key={e.id}>
              <Link
                href={`/power-hub/dashboard/events/${e.id}`}
                className="block px-4 py-3 hover:bg-white/40 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">
                      {e.clientName || 'Untitled'}
                    </div>
                    <div className="text-xs opacity-80 truncate">
                      {e.contactName}
                      {e.phone ? ` · ${e.phone}` : ''}
                      {e.assignedTo ? ` · 👤 ${e.assignedTo}` : ''}
                    </div>
                  </div>
                  <div className="text-xs whitespace-nowrap opacity-80 font-medium">
                    {dateLabel}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {events.length > 5 && (
        <div className="px-4 py-2 border-t border-current/10 text-xs">
          <Link
            href="/power-hub/dashboard/events"
            className="underline hover:no-underline"
          >
            View all {events.length} →
          </Link>
        </div>
      )}
    </div>
  );
}
