'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/power-hub/Header';
import { Save, Eye, EyeOff, Shield, Bell, Palette, Database } from 'lucide-react';

export default function SettingsPage() {
  const [username, setUsername] = useState('crockspot');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Site settings
  const [siteName, setSiteName] = useState('The Crock Spot');
  const [siteTagline, setSiteTagline] = useState('Let Us Crock Your World!');
  const [contactEmail, setContactEmail] = useState('steven@thecrockspot.com');

  useEffect(() => {
    // Load saved credentials
    const savedCreds = localStorage.getItem('crockspot_power_hub_creds');
    if (savedCreds) {
      try {
        const creds = JSON.parse(savedCreds);
        setUsername(creds.username || 'crockspot');
      } catch {
        // Use defaults
      }
    }

    // Load site settings
    const savedSettings = localStorage.getItem('crockspot_site_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setSiteName(settings.siteName || 'The Crock Spot');
        setSiteTagline(settings.siteTagline || 'Let Us Crock Your World!');
        setContactEmail(settings.contactEmail || 'steven@thecrockspot.com');
      } catch {
        // Use defaults
      }
    }
  }, []);

  const saveCredentials = () => {
    setError('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const creds = {
        username,
        password: password || 'crockspot2026',
      };
      localStorage.setItem('crockspot_power_hub_creds', JSON.stringify(creds));

      const settings = {
        siteName,
        siteTagline,
        contactEmail,
      };
      localStorage.setItem('crockspot_site_settings', JSON.stringify(settings));

      setSaving(false);
      setSaved(true);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div>
      <Header title="Settings" subtitle="Configure your Power Hub" />

      <div className="p-8 max-w-3xl">
        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#F49220]/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#F49220]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-500">Update your login credentials</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] pr-10"
                  placeholder="Leave blank to keep current"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
                placeholder="Confirm new password"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#F49220]/10 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-[#F49220]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Site Settings</h2>
              <p className="text-sm text-gray-500">Basic website configuration</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
              />
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Data Storage</h2>
              <p className="text-sm text-gray-500">Current storage configuration</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Status:</strong> Using browser localStorage (demo mode)
            </p>
            <p className="text-sm text-blue-600 mt-2">
              For production use, connect to Supabase for persistent data storage.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveCredentials}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] transition-colors disabled:opacity-50 shadow-lg"
        >
          <Save size={18} />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
