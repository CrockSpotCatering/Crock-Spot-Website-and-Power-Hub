'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Settings,
  LogOut,
  ChefHat
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/power-hub/dashboard', icon: LayoutDashboard },
  { name: 'Content', href: '/power-hub/dashboard/content', icon: FileText },
  { name: 'Media', href: '/power-hub/dashboard/media', icon: ImageIcon },
  { name: 'Calendar', href: '/power-hub/dashboard/calendar', icon: Calendar },
  { name: 'AI Assist', href: '/power-hub/dashboard/ai', icon: Sparkles },
  { name: 'Settings', href: '/power-hub/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('crockspot_power_hub_auth');
    router.push('/power-hub');
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#8C2D2E] to-[#2F2744] text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/power-hub/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F49220] flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Power Hub</h1>
            <p className="text-xs text-white/60">Crock Spot</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#F49220] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[#F49220] flex items-center justify-center">
            <span className="text-sm font-medium">CS</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-white/60">CrockSpot</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
