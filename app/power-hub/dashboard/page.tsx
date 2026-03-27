'use client';

import Header from '@/components/power-hub/Header';
import Link from 'next/link';
import { FileText, Image, Sparkles, Settings, TrendingUp, Calendar, ExternalLink, Utensils, Users, Star } from 'lucide-react';

const stats = [
  { name: 'Website Pages', value: '10', icon: FileText, change: 'All Active', color: 'text-blue-600' },
  { name: 'Media Files', value: '0', icon: Image, change: 'Upload images', color: 'text-purple-600' },
  { name: 'AI Assists', value: '0', icon: Sparkles, change: 'Try AI writing', color: 'text-green-600' },
];

const quickActions = [
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

export default function Dashboard() {
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
