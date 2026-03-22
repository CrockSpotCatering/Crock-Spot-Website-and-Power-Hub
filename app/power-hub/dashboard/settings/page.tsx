'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/power-hub/Header';
import { Save, Eye, EyeOff, Shield, Palette, Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [username, setUsername] = useState('crockspot');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [credentialsSha, setCredentialsSha] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [storedPassword, setStoredPassword] = useState('');

  // Site settings
  const [siteName, setSiteName] = useState('The Crock Spot');
  const [siteTagline, setSiteTagline] = useState('Let Us Crock Your World!');
  const [contactEmail, setContactEmail] = useState('steven@thecrockspot.com');

  // Load credentials from GitHub on mount
  useEffect(() => {
    async function loadCredentials() {
      try {
        const response = await fetch('/api/power-hub/credentials');
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || 'crockspot');
          setStoredPassword(data.password || '');
          setCredentialsSha(data.sha);
          setLastUpdated(data.lastUpdated);
        }
      } catch (err) {
        console.error('Failed to load credentials:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCredentials();

    // Load site settings from localStorage (these are UI preferences)
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

  const saveCredentials = async () => {
    setError('');
    setSaved(false);

    // Validate current password if changing password
    if (newPassword) {
      if (currentPassword !== storedPassword) {
        setError('Current password is incorrect');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setSaving(true);

    try {
      // Save credentials to GitHub
      const passwordToSave = newPassword || storedPassword;

      const response = await fetch('/api/power-hub/credentials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: passwordToSave,
          sha: credentialsSha,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save credentials');
      }

      const data = await response.json();
      setCredentialsSha(data.newSha);
      setStoredPassword(passwordToSave);
      setLastUpdated(new Date().toISOString());

      // Save site settings to localStorage
      const settings = {
        siteName,
        siteTagline,
        contactEmail,
      };
      localStorage.setItem('crockspot_site_settings', JSON.stringify(settings));

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header title="Settings" subtitle="Configure your Power Hub" />
        <div className="p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F49220]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Settings" subtitle="Configure your Power Hub" />

      <div className="p-8 max-w-3xl">
        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">Settings saved successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

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

            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-sm text-gray-600 mb-4">
                To change your password, enter your current password and then your new password.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] pr-10"
                  placeholder="Enter current password to change"
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
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220]"
                placeholder="Enter new password"
              />
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

            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-2">
                Last updated: {new Date(lastUpdated).toLocaleDateString()} at {new Date(lastUpdated).toLocaleTimeString()}
              </p>
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
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Data Storage</h2>
              <p className="text-sm text-gray-500">Current storage configuration</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>Status:</strong> Connected to GitHub
            </p>
            <p className="text-sm text-green-600 mt-2">
              Credentials are stored securely in your GitHub repository and sync across all devices.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveCredentials}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] transition-colors disabled:opacity-50 shadow-lg"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
