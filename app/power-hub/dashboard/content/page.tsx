'use client';

import { useState } from 'react';
import Header from '@/components/power-hub/Header';
import { FileText, Save, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';

interface ContentSection {
  id: string;
  name: string;
  page: string;
  content: string;
}

const initialSections: ContentSection[] = [
  {
    id: 'hero-title',
    name: 'Hero Title',
    page: 'Home',
    content: 'Let Us Crock Your World',
  },
  {
    id: 'hero-subtitle',
    name: 'Hero Subtitle',
    page: 'Home',
    content: 'Award-winning slow-cooked gourmet cuisine for your next event',
  },
  {
    id: 'about-intro',
    name: 'About Introduction',
    page: 'About',
    content: 'Founded in 2010 by Steven & Mandy, The Crock Spot brings comfort food to the streets of Denver.',
  },
  {
    id: 'catering-intro',
    name: 'Catering Introduction',
    page: 'Catering',
    content: 'From corporate events to weddings, we bring the flavor to your celebration.',
  },
];

export default function ContentPage() {
  const [sections, setSections] = useState<ContentSection[]>(initialSections);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      localStorage.setItem('crockspot_content', JSON.stringify(sections));
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const updateContent = (id: string, newContent: string) => {
    setSections(sections.map(s =>
      s.id === id ? { ...s, content: newContent } : s
    ));
  };

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.page]) acc[section.page] = [];
    acc[section.page].push(section);
    return acc;
  }, {} as Record<string, ContentSection[]>);

  return (
    <div>
      <Header title="Content Editor" subtitle="Edit your website text content" />

      <div className="p-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText size={16} />
            <span>{sections.length} content sections</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw size={16} />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Content Sections by Page */}
        <div className="space-y-4">
          {Object.entries(groupedSections).map(([page, pageSections]) => (
            <div key={page} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === page ? null : page)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F49220]/10 rounded-lg flex items-center justify-center">
                    <FileText className="text-[#F49220]" size={16} />
                  </div>
                  <span className="font-semibold text-gray-900">{page} Page</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {pageSections.length} sections
                  </span>
                </div>
                {expandedSection === page ? (
                  <ChevronDown className="text-gray-400" size={20} />
                ) : (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </button>

              {expandedSection === page && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  {pageSections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {section.name}
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => updateContent(section.id, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] transition-all text-gray-900 resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            <strong>Note:</strong> Content changes are saved locally. For production, connect to a database like Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}
